import { TypeOf, z } from "zod"
import config from "../config/app.config"

export const getUserSchema = z.object({
  params: z.object({
    userId: z.string({
      required_error: config.messages.invalidUserId,
    }),
  }),
})

export const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: config.messages.nameRequired,
    }),
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

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: config.messages.nameRequired,
    }),
  }),
  params: z.object({
    userId: z.string({
      required_error: config.messages.invalidUserId,
    }),
  }),
})

export const deleteUserSchema = z.object({
  params: z.object({
    userId: z.string({
      required_error: config.messages.invalidUserId,
    }),
  }),
})

export type getUserType = TypeOf<typeof getUserSchema>
export type createUserType = TypeOf<typeof createUserSchema>
export type updateUserType = TypeOf<typeof updateUserSchema>
export type deleteUserType = TypeOf<typeof deleteUserSchema>
