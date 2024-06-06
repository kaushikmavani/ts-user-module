import mongoose, { Document, Model, Schema } from "mongoose"
import bcrypt from "bcryptjs"
import config from "../config/app.config"

export interface UserInput {
  name: string
  email: string
  password: string
  isEmailVerified?: number
  verifyToken?: string
  status?: number
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date
  updatedAt: Date
}

interface UserMethods {
  comparePassword: (password: string) => boolean
}

type UserModel = Model<UserDocument, {}, UserMethods>

const userSchema = new Schema<UserDocument, UserModel, UserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      email: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Number,
      default: 0,
    },
    verifyToken: {
      type: String,
      default: "",
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

userSchema.pre("save", function (next) {
  const user = this as UserDocument

  if (!user.isModified("password")) {
    return next()
  }

  const salt = bcrypt.genSaltSync(config.auth.bcryptSaltLength)
  const hashPassword = bcrypt.hashSync(user.password, salt)

  user.password = hashPassword

  return next()
})

userSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model<UserDocument, UserModel>("User", userSchema)

export default User
