import { dialog } from "electron";
import { randomUUID } from "node:crypto";
import { Customer, NewCustomer } from "../shared/types/ipc";
import { db } from "./db";

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
export async function addCustomer(doc: NewCustomer) {
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
export async function deleteCustomer(docId: string) {
  const doc = await db.get(docId);

  const response = dialog.showMessageBoxSync({
    type: "warning",
    title: "Excluir Cliente",
    message: `Tem certeza de que deseja excluir: ${doc.name}?`,
    detail: "Esta ação não pode ser desfeita.",
    buttons: ["Cancel", "OK"], // 0 is Cancel, 1 is OK
    defaultId: 0,
    cancelId: 0,
    noLink: true,
  });

  if (response === 0) {
    return false;
  }

  if (response === 1) {
    await db.remove(doc._id, doc._rev);
    return true;
  }
}
