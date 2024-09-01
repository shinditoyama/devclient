import * as Collapsible from "@radix-ui/react-collapsible";
import clsx from "clsx";
import { CircleArrowRightIcon } from "lucide-react";

interface HeaderProps {
  isOpen: boolean;
}

export function Header({ isOpen }: HeaderProps) {
  const isMacOS = process.platform === "darwin";

  return (
    <header
      id="header"
      className={clsx(
        "flex items-center gap-4 leading-tight relative border-b border-slate-600 transition-all duration-200 py-4 px-10 region-drag",
        {
          "pl-24": !isOpen && isMacOS,
          "w-screen": !isOpen,
          "w-[calc(100vw-220px)]": isOpen,
        }
      )}
    >
      <Collapsible.Trigger
        className={clsx("hover:scale-105 duration-200 relative z-[99]", {
          hidden: isOpen,
          block: !isOpen,
        })}
      >
        <CircleArrowRightIcon className="w-6 h-6" />
      </Collapsible.Trigger>

      <>
        <h1 className="text-lg font-bold">DevClient</h1>
      </>
    </header>
  );
}
