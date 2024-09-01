import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon, TrashIcon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const response = await window.api.fetchCustomerById(id!);
      return response;
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string) => {
      try {
        await window.api.deleteCustomer(id);
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      navigate("/");
    },
  });

  return (
    <div className="flex flex-1 flex-col py-12 px-10">
      <Link to="/" className="flex items-center gap-2 mb-2 group">
        <ArrowLeftIcon className="w-6 h-6 group-hover:-translate-x-1 duration-300" />
        <span>Voltar</span>
      </Link>

      <h1 className="text-xl lg:text-2xl font-semibold mb-4">
        Detalhes do cliente
      </h1>

      <section className="flex flex-col gap-6 w-full">
        {!isFetching && data && (
          <article className="w-full relative flex flex-col gap-1">
            <section className="bg-gray-800 rounded px-4 py-3">
              <p className="mb-2 text-lg font-semibold">{data.name}</p>
              <p>
                <span className="font-semibold">E-mail: </span>
                {data.email}
              </p>

              {data.address && (
                <p>
                  <span className="font-semibold">Endereço: </span>
                  {data.address}
                </p>
              )}

              {data.phone && (
                <p>
                  <span className="font-semibold">Telefone: </span>
                  {data.phone}
                </p>
              )}

              <div className="absolute -top-4 right-4">
                <button
                  className="p-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 rounded-full z-20"
                  disabled={isPending}
                  onClick={() => mutateAsync(data._id)}
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </div>
            </section>

            <section className="bg-gray-800 rounded px-4 py-3">
              <p>
                <span className="font-semibold">Cargo: </span>
                {data.role}
              </p>
              <p>
                <span className="font-semibold">Status: </span>
                {data.status ? "ATIVO" : "INATIVO"}
              </p>
            </section>
          </article>
        )}
      </section>
    </div>
  );
}
