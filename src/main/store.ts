import { app } from "electron";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import PouchDB from "pouchdb";
import { Customer, NewCustomer } from "../shared/types/ipc";

// Determinar o caminho base para o banco de dados com base no SO
let dbPath;
if (process.platform === "darwin") {
  dbPath = path.join(app.getPath("appData"), "dev-clients", "my_db");
} else {
  dbPath = path.join(app.getPath("userData"), "my_db");
}

// Verificar e criar o diretório se não existir
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Inicializar o db
const db = new PouchDB<Customer>(dbPath);

// ------------------------------------------------------------------

// Funcão para buscar todos os clientes
export async function fetchAllCustomer(): Promise<Customer[]> {
  try {
    const result = await db.allDocs({ include_docs: true });
    return result.rows.map((row) => row.doc as Customer);
  } catch (err) {
    console.log("Erro ao buscar cliente", err);
    return [];
  }
}

// Funcão para buscar cliente pelo ID
export async function fetchCustomerById(
  docId: string
): Promise<Customer | null> {
  return db
    .get(docId)
    .then((doc) => doc)
    .catch((err) => {
      console.log("Erro ao buscar pelo ID", err);
      return null;
    });
}

// Função para cadastrar cliente
export async function addCustomer(
  doc: NewCustomer
): Promise<PouchDB.Core.Response | void> {
  const id = randomUUID();

  const data: Customer = {
    ...doc,
    _id: id,
  };

  return db
    .put(data)
    .then((res) => res)
    .catch((err) => console.log("Erro ao cadastrar", err));
}

// Função para deletar cliente
export async function deleteCustomer(
  docId: string
): Promise<PouchDB.Core.Response | null> {
  try {
    const doc = await db.get(docId);
    const result = await db.remove(doc._id, doc._rev);
    return result;
  } catch (err) {
    console.log("Erro ao deletar cliente", err);
    return null;
  }
}
