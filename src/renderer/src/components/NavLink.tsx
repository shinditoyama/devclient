import clsx from "clsx";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface LinkProps {
  to: string;
  children: ReactNode;
}

export function LinkContent({ to, children }: LinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return clsx("flex items-center text-sm gap-2 py-2 px-3 rounded group", {
          "text-black bg-gray-50 font-bold": isActive,
          "text-gray-300": !isActive,
        });
      }}
    >
      <span className="truncate flex-1">{children}</span>
    </NavLink>
  );
}
