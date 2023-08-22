import { z } from "zod";

export const schema = z.object({
  name: z
    .string()
    .nonempty("Nome é obrigatório")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  rg: z
    .string()
    .max(7, "RG incorreto")
    .nonempty("RG é obrigatório")
    .regex(/^\d+$/, "RG deve conter apenas números"),
  cpf: z
    .string()
    .max(11, "CPF incorreto")
    .nonempty("CPF é obrigatório")
    .regex(/^\d+$/, "CPF deve conter apenas números"),
  cnpj: z.string(),
  inscmunicipal: z.string(),
  email: z.string().email("Deve ser um e-mail"),
  phone: z
    .string()
    .min(8, "Telefone deve ter no mínimo 8 números")
    .nonempty("Telefone é obrigatório")
    .regex(/^\d+$/, "Apenas números são permitidos"),
  address: z.string().nonempty("Endereço é obrigatório"),
  neighborhood: z.string().nonempty("Bairro é obrigatório"),
  licenseType: z.string(),
  personType: z.string(),
  landType: z.string().nonempty("Tipo de Terreno é obrigatório"),
  reason: z.string().nonempty("Motivo é obrigatório"),
  additionalInformation: z.string(),
});

export type SolicitationData = z.infer<typeof schema>;
