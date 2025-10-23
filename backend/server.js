import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/products.js"
import cartRoutes from "./routes/cart.js"
import orderRoutes from "./routes/orders.js"
import reportRoutes from "./routes/reports.js"
import { connectPostgres } from "./config/postgres.js"
import { connectMongo } from "./config/mongo.js"

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Database connections
connectPostgres()
connectMongo()

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/reports", reportRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
