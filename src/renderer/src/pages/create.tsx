import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NewCustomer } from "~/src/shared/types/ipc";

export function Create() {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: NewCustomer) => {
      try {
        await window.api.addCustomer(data);
      } catch (err) {
        console.log("Erro ao cadastrar: ", err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      navigate("/");
    },
  });

  async function handleAddCustomer(e: FormEvent) {
    e.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const address = addressRef.current?.value;
    const phone = phoneRef.current?.value;
    const role = roleRef.current?.value;

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

  return (
    <div className="flex flex-1 flex-col py-12 text-white overflow-y-auto">
      <section className="flex flex-1 flex-col items-center">
        <h1 className="text-xl lg:text-2xl font-semibold">Cadastrar cliente</h1>

        <form onSubmit={handleAddCustomer} className="w-full max-w-96 mt-4">
          <div className="mb-4">
            <label className="text-lg">Nome:</label>
            <input
              type="text"
              placeholder="Digite o nome do cliente..."
              className="w-full h-10 px-2 text-black rounded"
              ref={nameRef}
            />
          </div>

          <div className="mb-4">
            <label className="text-lg">E-mail:</label>
            <input
              type="email"
              placeholder="Digite o email do cliente..."
              className="w-full h-10 px-2 text-black rounded"
              ref={emailRef}
            />
          </div>

          <div className="mb-4">
            <label className="text-lg">Endereço:</label>
            <input
              type="text"
              placeholder="Digite o endereço do cliente..."
              className="w-full h-10 px-2 text-black rounded"
              ref={addressRef}
            />
          </div>

          <div className="mb-4">
            <label className="text-lg">Telefone:</label>
            <input
              type="text"
              placeholder="Digite o telefone do cliente..."
              className="w-full h-10 px-2 text-black rounded"
              ref={phoneRef}
            />
          </div>

          <div className="mb-8">
            <label className="text-lg">Cargo:</label>
            <input
              type="text"
              placeholder="Digite o cargo do cliente..."
              className="w-full h-10 px-2 text-black rounded"
              ref={roleRef}
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 flex items-center justify-center rounded bg-blue-500 disabled:bg-gray-500"
            disabled={isPending}
            onClick={() => {}}
          >
            CADASTRAR
          </button>
        </form>
      </section>
    </div>
  );
}
