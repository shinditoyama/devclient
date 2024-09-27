import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NewCustomer } from "~/src/shared/types/ipc";

export function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isFetching } = useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const response = await window.api.fetchCustomerById(id!);
      return response;
    },
  });

  const [name, setName] = useState(data?.name);
  const [email, setEmail] = useState(data?.email);
  const [address, setAddress] = useState(data?.address);
  const [phone, setPhone] = useState(data?.phone);
  const [role, setRole] = useState(data?.role);

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (d: NewCustomer) => {
      try {
        await window.api.editCustomer(id!, d);
      } catch (err) {
        console.log("Erro ao cadastrar: ", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      navigate("/");
    },
  });

  async function handleEditCustomer(e: FormEvent) {
    e.preventDefault();

    if (!name || !email || !address || !phone || !role) return;

    await mutateAsync({
      name: name,
      email: email,
      address: address,
      phone: phone,
      role: role,
      status: true,
    });
  }

  useEffect(() => {
    setName(data?.name);
    setEmail(data?.email);
    setAddress(data?.address);
    setPhone(data?.phone);
    setRole(data?.role);
  }, [data]);

  return (
    <div className="flex flex-1 flex-col p-10">
      <div className="flex">
        <Link to="/" className="flex items-center gap-2 group">
          <ArrowLeftIcon className="w-6 h-6 group-hover:-translate-x-1 duration-300" />
          <span>Voltar</span>
        </Link>
      </div>

      <section className="flex flex-1 flex-col items-center">
        <h1 className="text-2xl font-semibold">Editar cliente</h1>

        {!isFetching && data && (
          <form
            onSubmit={handleEditCustomer}
            className="w-full max-w-[600px] mt-4"
          >
            <div className="mb-4">
              <label className="text-lg">Nome:</label>
              <input
                type="text"
                placeholder="Digite o nome..."
                className="w-full h-10 px-2 text-black rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="text-lg">E-mail:</label>
              <input
                type="email"
                placeholder="Digite o email..."
                className="w-full h-10 px-2 text-black rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="text-lg">Endereço:</label>
              <input
                type="text"
                placeholder="Digite o endereço..."
                className="w-full h-10 px-2 text-black rounded"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid-cols-2 gap-2 md:grid">
              <div className="mb-4 col-span-1">
                <label className="text-lg">Telefone:</label>
                <input
                  type="text"
                  placeholder="Digite o telefone..."
                  className="w-full h-10 px-2 text-black rounded"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="mb-8 col-span-1">
                <label className="text-lg">Cargo:</label>
                <input
                  type="text"
                  placeholder="Digite o cargo..."
                  className="w-full h-10 px-2 text-black rounded"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-10 flex items-center justify-center rounded bg-blue-500 disabled:bg-gray-500"
              disabled={isPending}
              onClick={() => {}}
            >
              EDITAR
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
