import express from "express"
import {
  create,
  getUser,
  getAllUsers,
  update,
  destory,
} from "../controllers/user.controller"
import validationResource from "../middlewares/validationResource"
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../schema/user.schema"

const router = express.Router()

router.get("/", getAllUsers)
router.get("/:userId", validationResource(getUserSchema), getUser)
router.post("/", validationResource(createUserSchema), create)
router.patch("/:userId", validationResource(updateUserSchema), update)
router.delete("/:userId", validationResource(deleteUserSchema), destory)

export default router
