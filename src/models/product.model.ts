import mongoose, { Model, QueryWithHelpers, Schema, Types } from "mongoose"

interface ProductInput {
  name: string
  price: number
  qty: number
  category: string
  subCategory: string
  color: string
  size: string
}

interface ProductDocument extends ProductInput, Document {
  createdAt: Date
  updateAt: Date
}

interface ProductMethods {
  getProductName: (productId: Types.ObjectId) => string
}

interface ProductQueryHelpers {
  byName: (
    name: string
  ) => QueryWithHelpers<ProductDocument[], ProductDocument, ProductQueryHelpers>
}

interface ProductModel
  extends Model<ProductDocument, ProductQueryHelpers, ProductMethods> {
  getDefaultPrice: () => number
}

const productSchema = new Schema<
  ProductDocument,
  ProductModel,
  ProductMethods,
  ProductQueryHelpers
>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

productSchema.statics.getDefaultPrice = function () {
  return 100
}

productSchema.query.byName = function (
  this: QueryWithHelpers<
    ProductDocument[],
    ProductDocument,
    ProductQueryHelpers
  >,
  name
) {
  return this.find({ name })
}

productSchema.methods.getProductName = function (productId) {
  console.log(productId)
  return "test"
}

const Product = mongoose.model<ProductDocument, ProductModel>(
  "Product",
  productSchema
)

export default Product
