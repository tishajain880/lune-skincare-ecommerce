import { MongoClient } from "mongodb"

let db

export const connectMongo = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI)
    await client.connect()
    db = client.db("lune")
    console.log("MongoDB connected")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}

export const getDb = () => db
