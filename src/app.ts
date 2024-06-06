import express from "express"
import "dotenv/config"
import cors from "cors"
import errorHandler from "./utils/errorHandler"
import router from "./routers/index.router"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", "views")

app.use("/api", router)

errorHandler()

export { app }
