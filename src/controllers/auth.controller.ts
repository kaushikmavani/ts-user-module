import { omit } from "lodash"
import { Request, Response } from "express"
import { errorResponse, successResponse } from "../utils/responseHandler"
import { loginSchemaType } from "../schema/auth.schema"
import config from "../config/app.config"
import { findUser, udpateUser } from "../services/auth.service"

export const login = async (
  req: Request<{}, {}, loginSchemaType>,
  res: Response
) => {
  try {
    const { email, password } = req.body

    const user = await findUser({ email })
    if (!user) {
      return errorResponse(res, 400, 0, config.messages.emailNotRegistered)
    }

    await udpateUser({ email: user.email }, req.body)

    // if (!user.isEmailVerified) {
    //   return errorResponse(res, 400, 0, config.messages.emailNotConfirmed)
    // }

    // if (!user.comparePassword(password)) {
    //   return errorResponse(res, 400, 0, config.messages.invalidPassword)
    // }

    return successResponse(
      res,
      200,
      1,
      "success",
      omit(user.toJSON(), ["password"])
    )
  } catch (error: any) {
    return errorResponse(res, 500, 0, error.message)
  }
}
