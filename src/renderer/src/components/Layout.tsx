import * as Collapsible from "@radix-ui/react-collapsible";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    function handleNavigate() {
      navigate("/create");
    }

    const unsub = window.api.onNewCustomer(handleNavigate);

    return () => {
      unsub();
    };
  }, []);

  return (
    <Collapsible.Root
      defaultOpen
      className="h-screen w-screen flex bg-gray-950 text-white"
      onOpenChange={setIsOpen}
    >
      <Sidebar />
      <div className="flex flex-1 flex-col max-h-screen">
        <Header isOpen={isOpen} />
        <Outlet />
      </div>
    </Collapsible.Root>
  );
}
