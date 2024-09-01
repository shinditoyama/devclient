import * as Collapsible from "@radix-ui/react-collapsible";
import clsx from "clsx";
import { CircleArrowLeftIcon } from "lucide-react";
import { LinkContent } from "./NavLink";

export function Sidebar() {
  const isMacOS = process.platform === "darwin";

  return (
    <Collapsible.Content className="bg-gray-950 flex-shrink-0 border-r border-slate-600 h-screen relative group overflow-hidden data-[state=open]:animate-slideIn data-[state=closed]:animate-slideOut">
      <Collapsible.Trigger
        className={clsx(
          "absolute h-7 w-7 right-4 z-[99] hover:scale-105 duration-200 inline-flex items-cecnter justify-center",
          {
            "top-5": isMacOS,
            "top-6": !isMacOS,
          }
        )}
      >
        <CircleArrowLeftIcon className="w-6 h-6" />
      </Collapsible.Trigger>

      <div
        className={clsx("region-drag h-14 z-0 mt-10", {
          block: isMacOS,
          hidden: !isMacOS,
        })}
      />

      <div
        className={clsx(
          "flex-1 flex flex-col h-full gap-8 w-[220px] transition-opacity group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0 duration-200",
          {
            "pt-6": !isMacOS,
          }
        )}
      >
        <nav className="flex mx-2 flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="font-semibold uppercase mb-2 ml-2">MENU</div>
          </div>

          <section className="flex flex-col gap-px">
            <LinkContent to="/">Clientes</LinkContent>
            <LinkContent to="/create">Cadastrar cliente</LinkContent>
            <LinkContent to="/about">Sobre</LinkContent>
          </section>
        </nav>
      </div>
    </Collapsible.Content>
  );
}
