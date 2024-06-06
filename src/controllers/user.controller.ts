import { Request, Response } from "express"
import { omit } from "lodash"
import { errorResponse, successResponse } from "../utils/responseHandler"
import config from "../config/app.config"
import {
  createUserType,
  deleteUserType,
  getUserType,
  updateUserType,
} from "../schema/user.schema"
import {
  createUser,
  deleteUser,
  findAllUserList,
  findUser,
  findUserById,
  updateUser,
} from "../services/user.service"
import mongoose from "mongoose"

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllUserList({}, "-password")

    return successResponse(
      res,
      200,
      1,
      config.messages.getAllUsersSuccessful,
      users
    )
  } catch (error: any) {
    return errorResponse(res, 500, 0, error.message)
  }
}

export const getUser = async (
  req: Request<getUserType["params"]>,
  res: Response
) => {
  try {
    const user = await findUserById(req.params.userId)
    if (!user) {
      return errorResponse(res, 400, 0, config.messages.invalidUserId)
    }

    return successResponse(res, 200, 1, config.messages.getUserSuccessful, user)
  } catch (error: any) {
    return errorResponse(res, 500, 0, error.message)
  }
}

export const create = async (
  req: Request<{}, {}, createUserType["body"]>,
  res: Response
) => {
  const session = await mongoose.startSession()
  await session.startTransaction()
  try {
    const user = await findUser({ email: req.body.email })
    if (user) {
      return errorResponse(res, 400, 0, config.messages.emailAlreadyRegistered)
    }

    await createUser([req.body], { session })

    await session.commitTransaction()

    return successResponse(res, 201, 1, config.messages.userCreatedSuccessful)
  } catch (error: any) {
    await session.abortTransaction()
    return errorResponse(res, 500, 0, error.message)
  } finally {
    await session.endSession()
  }
}

export const update = async (
  req: Request<updateUserType["params"], {}, updateUserType["body"]>,
  res: Response
) => {
  const session = await mongoose.startSession()
  await session.startTransaction()
  try {
    const userId = req.params.userId

    const user = await findUserById(userId)
    if (!user) {
      return errorResponse(res, 400, 0, config.messages.invalidUserId)
    }

    const updatedUser = await updateUser(
      { _id: userId },
      { name: req.body.name },
      { new: true, session }
    )

    await session.commitTransaction()

    return successResponse(
      res,
      202,
      1,
      config.messages.userUpdatedSuccessful,
      omit(updatedUser!.toJSON(), ["password"])
    )
  } catch (error: any) {
    await session.abortTransaction()
    return errorResponse(res, 500, 0, error.message)
  } finally {
    await session.endSession()
  }
}

export const destory = async (
  req: Request<deleteUserType["params"]>,
  res: Response
) => {
  const session = await mongoose.startSession()
  await session.startTransaction()
  try {
    const { userId } = req.params
    const user = await findUserById(userId)
    if (!user) {
      return errorResponse(res, 400, 0, config.messages.invalidUserId)
    }

    await deleteUser(userId, { session })

    await session.commitTransaction()

    return successResponse(res, 200, 1, config.messages.userDeletedSuccessful)
  } catch (error: any) {
    await session.abortTransaction()
    return errorResponse(res, 500, 0, error.message)
  } finally {
    await session.endSession()
  }
}
