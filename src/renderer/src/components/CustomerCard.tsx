import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Customer } from "~/src/shared/types/ipc";

export function CustomerCard({ data }: { data: Customer }) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const user = await window.api.deleteCustomer(id);
      if (user) {
        new window.Notification("Nova mensagem", {
          body: `Cliente: ${data?.name} foi excluído com sucesso.`,
          silent: true,
        });
        // navigate("/");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  return (
    <article className="w-full relative flex flex-col gap-1">
      <section className="bg-gray-800 rounded px-4 py-3">
        <p className="mb-2 text-xl font-semibold">{data.name}</p>
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

        {data.role && (
          <p>
            <span className="font-semibold">Cargo: </span>
            {data.role}
          </p>
        )}

        {data.status && (
          <p>
            <span className="font-semibold">Status: </span>
            {data.status ? "ATIVO" : "INATIVO"}
          </p>
        )}

        <div className="absolute -top-4 right-16">
          <Link to={`/edit/${data._id}`}>
            <button className="p-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 rounded-full z-20">
              <PencilIcon className="w-6 h-6" />
            </button>
          </Link>
        </div>
        <div className="absolute -top-4 right-4">
          <button
            className="p-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 rounded-full z-20"
            disabled={isPending}
            onClick={() => mutateAsync(data._id!)}
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </div>
      </section>
    </article>
  );
}
