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
      <h1 className="text-xl lg:text-2xl font-semibold mb-4">
        Todos os clientes
      </h1>

      <section className="flex flex-col gap-4 w-full h-screen pb-44 overflow-y-auto no-scrollbar">
        {!isFetching && data?.length === 0 && (
          <p className="text-gray-400">Nenhum cliente cadastrado...</p>
        )}
        {data?.map((customer) => (
          <Link to={`/customer/${customer._id}`} key={customer._id}>
            <CustomerCard data={customer} />
          </Link>
        ))}
      </section>
    </div>
  );
}
