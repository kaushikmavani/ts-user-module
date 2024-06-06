import { createLogger, format, transports } from "winston"
import config from "../config/app.config"

const { combine, timestamp, printf } = format

const logFormat = printf(({ timestamp, level, message, ...meta }) => {
  return `${timestamp} [${level}] ${message} | ${JSON.stringify(meta)}`
})

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({
      filename: "error.log",
      level: "error",
    }),
    new transports.File({ filename: "combined.log" }),
  ],
})

if (config.app.nodeEnv === "local") {
  logger.add(new transports.Console())
}

export default logger
