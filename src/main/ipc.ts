import { app, ipcMain } from "electron";
import { Customer } from "../shared/types/ipc";
import {
  addCustomer,
  deleteCustomer,
  editCustomer,
  fetchAllCustomer,
  fetchCustomerById,
} from "./store";

ipcMain.handle("get-version", () => app.getVersion());

ipcMain.handle("fetch-customers", async () => await fetchAllCustomer());

ipcMain.handle(
  "fetch-customer-id",
  async (event, docId: string) => await fetchCustomerById(docId)
);

ipcMain.handle(
  "add-customer",
  async (event, doc: Customer) => await addCustomer(doc)
);

ipcMain.handle(
  "edit-customer",
  async (event, docId: string, doc: Customer) => await editCustomer(docId, doc)
);

ipcMain.handle(
  "delete-customer",
  async (event, docId: string) => await deleteCustomer(docId)
);
