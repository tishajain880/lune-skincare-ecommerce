import express from "express"
import { verifyToken, verifyAdmin } from "../middleware/auth.js"
import { getDailyRevenue, getCategoryWiseSales, getTopCustomers } from "../controllers/reportController.js"

const router = express.Router()

router.get("/daily-revenue", verifyToken, verifyAdmin, getDailyRevenue)
router.get("/category-sales", verifyToken, verifyAdmin, getCategoryWiseSales)
router.get("/top-customers", verifyToken, verifyAdmin, getTopCustomers)

export default router
