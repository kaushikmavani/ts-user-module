import express from "express"
import { login } from "../controllers/auth.controller"
import { loginSchema } from "../schema/auth.schema"
import validationResource from "../middlewares/validationResource"

const router = express.Router()

router.patch("/login", validationResource(loginSchema), login)

export default router
