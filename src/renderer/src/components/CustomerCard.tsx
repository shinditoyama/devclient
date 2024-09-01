import { Customer } from "~/src/shared/types/ipc";

export function CustomerCard({ data }: { data: Customer }) {
  return (
    <article className="w-full relative bg-gray-800 rounded border-transparent hover:border-gray-300">
      <section className="px-4 py-3">
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
      </section>
    </article>
  );
}
