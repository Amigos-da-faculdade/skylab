import { z } from "zod"

export const authCredentials = z.object({
  email: z
    .string({ required_error: "O e-mail é obrigatório", invalid_type_error: "Dados inválidos" })
    .email("Digite um e-mail válido"),
  password: z
    .string({
      required_error: "A senha é obrigatória",
      invalid_type_error: "Dados inválidos",
    })
    .min(2, {
      message: "A senha é obrigatória",
    }),
})

export const signUpCredentials = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .regex(
      new RegExp(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/),
      "Nome não deve conter números ou caracteres especiais"
    ),
  email: z
    .string({ required_error: "O e-mail é obrigatório", invalid_type_error: "Dados inválidos" })
    .email("Digite um e-mail válido"),
  password: z
    .string({
      required_error: "A senha é obrigatória",
      invalid_type_error: "Dados inválidos",
    })
    .min(2, {
      message: "A senha é obrigatória",
    }),
  phone_number: z.string({ required_error: "O número de telefone é obrigatório" }).refine(
    (value) => {
      const phoneNumberRegex = /^(?:(?:\+\d{2}\s?)?\(\d{2}\)\s?)?\d{4,5}[-\s]?\d{4}$/
      return phoneNumberRegex.test(value)
    },
    {
      message: "O número de telefone brasileiro não é válido.",
    }
  ),
})

export type AuthCredentials = z.input<typeof authCredentials>
export type SignUpCredentials = z.input<typeof signUpCredentials>
