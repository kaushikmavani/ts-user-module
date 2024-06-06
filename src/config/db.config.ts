import mongoose from "mongoose"
import config from "../config/app.config"
import logger from "../utils/logger"

export default async () => {
  try {
    if (config.db.mongoURI === undefined) {
      throw new Error("Mongodb URI is missing.")
    }
    await mongoose.connect(config.db.mongoURI)
  } catch (error: any) {
    logger.error(`MONGODB ERROR: ${error.message}`)
    process.exit(1)
  }
}
