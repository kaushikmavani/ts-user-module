import connectDB from "./config/db.config"
import config from "./config/app.config"
import logger from "./utils/logger"
import { app } from "./app"

connectDB()
  .then(() => {
    logger.info("Database Connected!")
    app.listen(config.app.port, () => {
      logger.info(`Server is running on: ${config.app.port}`)
    })
  })
  .catch((error: any) => {
    logger.error("MONGODB ERROR: ", error.message)
  })
