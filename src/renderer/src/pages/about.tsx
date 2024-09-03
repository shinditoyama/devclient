import { useQuery } from "@tanstack/react-query";

export function About() {
  const { data: version } = useQuery({
    queryKey: ["version-app"],
    queryFn: async () => {
      return await window.api.getVersion();
    },
  });

  return (
    <div className="flex flex-1 flex-col py-12 px-10">
      <h1 className="text-xl lg:text-2xl font-semibold mb-4">Sobre</h1>

      <p>
        Projeto criado no curso <b>@sujeitoprogramador</b>
      </p>
      <p>Versão atual do projeto: {version}</p>
    </div>
  );
}
