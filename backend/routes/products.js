import express from "express"
import { verifyToken, verifyAdmin } from "../middleware/auth.js"
import {
  createProduct,
  getProducts,
  searchProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js"

const router = express.Router()

router.post("/", verifyToken, verifyAdmin, createProduct)
router.get("/", getProducts)
router.get("/search", searchProducts)
router.put("/:id", verifyToken, verifyAdmin, updateProduct)
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct)

export default router
