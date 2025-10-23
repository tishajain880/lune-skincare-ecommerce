import { getDb } from "../config/mongo.js"
import { ObjectId } from "mongodb"

export const createProduct = async (productData) => {
  const db = getDb()
  const result = await db.collection("products").insertOne({
    ...productData,
    updatedAt: new Date(),
  })
  return result.insertedId
}

export const getProducts = async (sortBy = "price", sortOrder = -1, category = null, page = 1, limit = 12) => {
  const db = getDb()
  const skip = (page - 1) * limit

  const filter = category ? { category } : {}
  const sortObj = { [sortBy]: sortOrder }

  const products = await db.collection("products").find(filter).sort(sortObj).skip(skip).limit(limit).toArray()

  const total = await db.collection("products").countDocuments(filter)

  return { products, total, page, limit }
}

export const getProductById = async (id) => {
  const db = getDb()
  return await db.collection("products").findOne({ _id: new ObjectId(id) })
}

export const updateProduct = async (id, updateData) => {
  const db = getDb()
  const result = await db
    .collection("products")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...updateData, updatedAt: new Date() } })
  return result.modifiedCount > 0
}

export const deleteProduct = async (id) => {
  const db = getDb()
  const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}

export const searchProducts = async (query, page = 1, limit = 12) => {
  const db = getDb()
  const skip = (page - 1) * limit

  const products = await db
    .collection("products")
    .find({
      $or: [{ name: { $regex: query, $options: "i" } }, { category: { $regex: query, $options: "i" } }],
    })
    .skip(skip)
    .limit(limit)
    .toArray()

  const total = await db.collection("products").countDocuments({
    $or: [{ name: { $regex: query, $options: "i" } }, { category: { $regex: query, $options: "i" } }],
  })

  return { products, total, page, limit }
}
