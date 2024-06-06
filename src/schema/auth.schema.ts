import { TypeOf, z } from "zod"
import config from "../config/app.config"

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: config.messages.emailRequired,
      })
      .email(),
    password: z.string({
      required_error: config.messages.passwordRequired,
    }),
  }),
})

export type loginSchemaType = TypeOf<typeof loginSchema>["body"]
