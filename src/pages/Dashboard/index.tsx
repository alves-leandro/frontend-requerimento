import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SolicitationData, schema } from "./validator";
import "../../styles/global.css";

export const Dashboard = () => {
  const [output, setOutput] = useState("");
  const [showTreeFields, setShowTreeFields] = useState(false);
  const [showRgCpfFields, setShowRgCpfFields] = useState(false);
  const [showCnpjInscFields, setShowCnpjInscFields] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SolicitationData>({
    resolver: zodResolver(schema),
  });

  const createSolicitation = (data: SolicitationData) => {
    console.log(data);
    setOutput(JSON.stringify(data, null, 2));

    const emailSubject = "Resposta do Formulário";
    const emailContent = `
      <html>
        <head>
          <title>${emailSubject}</title>
        </head>
        <body>
          <h1>Conteúdo do Formulário:</h1>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </body>
      </html>
    `;

    const mailtoLink = `mailto:l.alves85@live.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailContent)}`;
    window.location.href = mailtoLink;
  };

  return (
    <main className="h-auto bg-zinc-50 flex items-center justify-center py-10">
      {/* <h1>Faça aqui sua solicitação</h1> */}

      <form
        // action="mailto:l.alves85@live.com"
        // method="post"
        // encType="text/plain"
        onSubmit={handleSubmit(createSolicitation)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome Completo</label>
          <input
            className="border border-zinc-500 shadow-sm rounded h-10 px-3"
            type="name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>Tipo de Pessoa</label>
          <div className="flex gap-8">
            <label>
              <input
                type="radio"
                value="Pessoa Física"
                {...register("personType")}
                onChange={() => {
                  setShowRgCpfFields(true);
                  setShowCnpjInscFields(false);
                }}
              />
              Pessoa Física
            </label>
            <label>
              <input
                type="radio"
                value="Pessoa Jurídica"
                {...register("personType")}
                onChange={() => {
                  setShowRgCpfFields(false);
                  setShowCnpjInscFields(true);
                }}
              />
              Pessoa Jurídica
            </label>
          </div>
        </div>

        {showRgCpfFields && (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="rg">RG</label>
              <input
                className="border border-zinc-500 shadow-sm rounded h-10 px-3"
                type="rg"
                {...register("rg")}
              />
              {errors.rg && (
                <span className="text-red-500 text-sm">{errors.rg.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="cpf">CPF</label>
              <input
                className="border border-zinc-500 shadow-sm rounded h-10 px-3"
                type="cpf"
                {...register("cpf")}
              />
              {errors.cpf && (
                <span className="text-red-500 text-sm">{errors.cpf.message}</span>
              )}
            </div>
          </>
        )}

        {showCnpjInscFields && (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="cnpj">CNPJ</label>
              <input
                className="border border-zinc-500 shadow-sm rounded h-10 px-3"
                type="cnpj"
                {...register("cnpj")}
              />
              {errors.cnpj && (
                <span className="text-red-500 text-sm">{errors.cnpj.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="inscmunicipal">INSC. Municipal</label>
              <input
                className="border border-zinc-500 shadow-sm rounded h-10 px-3"
                type="inscmunicipal"
                {...register("inscmunicipal")}
              />
              {errors.inscmunicipal && (
                <span className="text-red-500 text-sm">
                  {errors.inscmunicipal.message}
                </span>
              )}
            </div>
          </>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            className="border border-zinc-500 shadow-sm rounded h-10 px-3"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone">Telefone</label>
          <input
            className="border border-zinc-500 shadow-sm rounded h-10 px-3"
            type="phone"
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="address">Endereço</label>
          <input
            className="border border-zinc-500 shadow-sm rounded h-10 px-3"
            type="address"
            {...register("address")}
          />
          {errors.address && (
            <span className="text-red-500 text-sm">
              {errors.address.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="neighborhood">Bairro</label>
          <input
            className="border border-zinc-500 shadow-sm rounded h-10 px-3"
            type="neighborhood"
            {...register("neighborhood")}
          />
          {errors.neighborhood && (
            <span className="text-red-500 text-sm">
              {errors.neighborhood.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>Tipo de Licença</label>
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="radio"
                value="Avaliação/Poda de Árvore"
                {...register("licenseType")}
                onChange={() => {
                  setShowTreeFields(true);
                }}
              />
              Avaliação/Poda de Árvore
            </label>
            <label>
              <input
                type="radio"
                value="Avaliação/Retirada de Árvore"
                {...register("licenseType")}
                onChange={() => {
                  setShowTreeFields(true);
                }}
              />
              Avaliação/Retirada de Árvore
            </label>

          </div>
        </div>
        
        {showTreeFields && (
          <div className="flex flex-col gap-1">
            <label>Tipo de Terreno</label>
            <select
              {...register("landType")}
              className="border border-zinc-500 shadow-sm rounded h-10 px-3"
            >
              <option value="">Selecione uma opção</option>
              <option value="Terreno Proprio">Terreno Próprio</option>
              <option value="Terreno de Terceiros">Terreno de Terceiros</option>
            </select>
            {errors.landType && (
              <span className="text-red-500 text-sm">
                {errors.landType.message}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="reason">Motivo</label>
          <textarea
            className="border border-zinc-500 shadow-sm rounded h-20 px-3"
            {...register("reason")}
          />
          {errors.reason && (
            <span className="text-red-500 text-sm">
              {errors.reason.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="additionalInformation">Informações Adicionais</label>
          <textarea
            className="border border-zinc-500 shadow-sm rounded h-20 px-3"
            {...register("additionalInformation")}
          />
          {errors.additionalInformation && (
            <span className="text-red-500 text-sm">
              {errors.additionalInformation.message}
            </span>
          )}
        </div>

        <button
          className="bg-red-500 rounded text-white h-10 hover:bg-red-600"
          type="submit"
        >
          Enviar
        </button>
      </form>

      <pre>{output}</pre>
    </main>
  );
};
