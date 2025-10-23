import express from "express"
import { verifyToken } from "../middleware/auth.js"
import { checkout, getOrders } from "../controllers/orderController.js"

const router = express.Router()

router.post("/checkout", verifyToken, checkout)
router.get("/", verifyToken, getOrders)

export default router
