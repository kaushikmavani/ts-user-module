import {
  CreateOptions,
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from "mongoose"
import User, { UserDocument, UserInput } from "../models/user.model"

export const findAllUserList = async (
  query: FilterQuery<UserDocument>,
  projection?: ProjectionType<UserDocument>
) => await User.find(query, projection)

export const findUser = async (query: FilterQuery<UserDocument>) =>
  await User.findOne(query)

export const findUserById = async (userId: UserDocument["_id"]) =>
  await User.findById(userId)

export const createUser = async (input: UserInput[], options?: CreateOptions) =>
  await User.create(input, options)

export const updateUser = async (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<Partial<UserInput>> | UpdateWithAggregationPipeline,
  options?: QueryOptions | null
) => await User.findOneAndUpdate(query, update, options)

export const deleteUser = async (
  userId: UserDocument["_id"],
  options?: QueryOptions
) => await User.deleteOne({ _id: userId }, options)
