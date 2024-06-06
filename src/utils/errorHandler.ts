import { NextFunction, Request, Response } from "express"
import { errorResponse } from "./responseHandler"
import config from "../config/app.config"
import { app } from "../app"

export default () => {
  // handle error (which is not handled inside and unfortunately retured)
  app.use(
    async (error: any, req: Request, res: Response, next: NextFunction) => {
      if (!error.status || error.status === 500) {
        return await errorResponse(res, 500, 0, config.messages.unexpectedError)
      } else {
        return await errorResponse(res, error.status, 0, error.message)
      }
    }
  )

  // handle 404
  app.use(async (req: Request, res: Response) => {
    return await errorResponse(
      res,
      404,
      0,
      config.messages.invalidEndpointOrMethod
    )
  })
}
