import { BrowserWindow, Menu, nativeImage, Tray } from "electron";
import path from "node:path";

export function createTray(window: BrowserWindow) {
  const appIcon = path.join(__dirname, "resources", "menuTemplate.png");
  let icon = nativeImage.createFromPath(appIcon);

  const tray = new Tray(icon);
  const menu = Menu.buildFromTemplate([
    { label: "Dev Clients", enabled: false },
    { type: "separator" },
    {
      label: "Abrir",
      click: () => {
        window.show();
      },
    },
    {
      label: "Cadastrar cliente",
      click: () => {
        // Enviar mensagem do processo (main) para o processo front-end (renderer)
        window.webContents.send("new-customer");

        if (window.isMaximizable()) window.restore();
        window.focus();
      },
    },
    { type: "separator" },
    { label: "Sair", role: "quit" },
  ]);

  tray.setToolTip("Dev Clients");
  tray.setContextMenu(menu);
}
