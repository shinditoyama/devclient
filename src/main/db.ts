import { app } from "electron";
import fs from "node:fs";
import path from "node:path";
import PouchDB from "pouchdb";
import { Customer } from "../shared/types/ipc";

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
export const db = new PouchDB<Customer>(dbPath);
