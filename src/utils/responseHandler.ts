import { Response, json } from "express"
import config from "../config/app.config"
import logger from "./logger"

export type SendableReponse = {
  ResponseCode: number
  ResponseMsg: string
  Result: string
  ServerTime: string
  data?: unknown
}

export const errorResponse = async (
  res: Response,
  statusCode: number,
  responseCode: number,
  responseMsg: string
) => {
  try {
    logger.error(responseMsg)
    const response: SendableReponse = {
      ResponseCode: responseCode,
      ResponseMsg: responseMsg,
      Result: "False",
      ServerTime: "UTC",
    }

    const sendableReponse = await prepareResponse(JSON.stringify(response))
    return res.status(statusCode).json(sendableReponse)
  } catch (error: any) {
    const response = {
      ResponseCode: "0",
      ResponseMsg: config.messages.somethingWrong,
      Result: "False",
      ServerTime: "UTC",
    }
    return res.status(500).json(response)
  }
}

export const successResponse = async (
  res: Response,
  statusCode: number,
  responseCode: number,
  responseMsg: string,
  data?: unknown
) => {
  try {
    let response: SendableReponse = {
      ResponseCode: responseCode,
      ResponseMsg: responseMsg,
      Result: "True",
      ServerTime: "UTC"
    }
    if (data && data != null) {
      response.data = data
    }

    const sendableReponse = await prepareResponse(JSON.stringify(response))
    return res.status(statusCode).json(sendableReponse)
  } catch (error: any) {
    return errorResponse(res, 500, 0, error.message)
  }
}

async function prepareResponse(respnse: string) {
  return await deepConverter(JSON.parse(respnse))
}

async function deepConverter(
  object: Record<string, any>
): Promise<Record<string, any>> {
  const entries = Object.entries(object).map(([key, value]) => {
    const newValue =
      (value === "" || value == null) && typeof value != "boolean" ? "" : value
    return [key, newValue]
  })

  const converted = await Promise.all(
    entries.map(async ([key, value]) => {
      if (Array.isArray(value)) {
        const convertedValue = await deepConverter(value)
        return [key, Object.values(convertedValue)]
      } else if (typeof value == "object") {
        const convertedValue = await deepConverter(value)
        return [key, convertedValue]
      } else if (typeof value == "boolean") {
        return [key, value]
      }

      return [key, value.toString()]
    })
  )

  return Object.fromEntries(converted)
}
