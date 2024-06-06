import "dotenv/config"
import messages from "./messages"

const config = {
  app: {
    appName: process.env.APP_NAME,
    port: process.env.PORT || "3030",
    nodeEnv: process.env.NODE_ENV || "production",
  },
  db: {
    mongoURI: process.env.MONGO_URI,
  },
  auth: {
    jwtSecret:
      "WG00SXN1UUAXF6Nu5ujIDp7pOr752wAgj9cOOqsG4xadres+G6rLU0eP/wjwGU6YYW0=",
    jwtExpiresIn: "31d",
    bcryptSaltLength: 10,
  },
  messages,
}

export default config
