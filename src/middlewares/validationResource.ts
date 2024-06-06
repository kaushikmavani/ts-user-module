import { NextFunction, Request, Response } from "express"
import { AnyZodObject, ZodError } from "zod"
import { errorResponse } from "../utils/responseHandler"

export default (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (error: any) {
      if (error instanceof ZodError) {
        return errorResponse(res, 422, 0, error.errors[0].message)
      }
      return errorResponse(res, 500, 0, error.message)
    }
  }
}
