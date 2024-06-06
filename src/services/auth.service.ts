import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
import User, { UserDocument, UserInput } from "../models/user.model"

export const findUserById = async (userId: UserDocument["_id"]) =>
  await User.findById(userId)

export const findUser = async (query: FilterQuery<UserDocument>) =>
  await User.findOne(query)

export const findAllUsers = async (query: FilterQuery<UserDocument>) =>
  await User.find(query)

export const createUser = async (input: UserInput) => await User.create([input])

export const udpateUser = async (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<Partial<UserDocument>>,
  options?: QueryOptions
) => await User.updateOne(query, update, { ...options, new: true })

export const deleteUser = async (userId: UserDocument["_id"]) =>
  await User.deleteOne({ _id: userId })
