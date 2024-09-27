import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CustomerCard } from "../components/CustomerCard";

export function Home() {
  const { data, isFetching } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await window.api.fetchCustomers();
      return response;
    },
  });

  return (
    <div className="flex flex-1 flex-col py-12 px-10">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl lg:text-2xl font-semibold">Todos os clientes</h1>
        <Link
          to="/create"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded text-sm px-4 py-2 focus:outline-none"
        >
          Cadastrar cliente
        </Link>
      </div>

      <section className="flex flex-col gap-6 w-full h-screen pt-6 pb-44 overflow-y-auto no-scrollbar">
        {!isFetching && data?.length === 0 && (
          <p className="text-gray-400">Nenhum cliente cadastrado...</p>
        )}
        {data?.map((customer) => (
          <CustomerCard data={customer} key={customer._id} />
        ))}
      </section>
    </div>
  );
}
