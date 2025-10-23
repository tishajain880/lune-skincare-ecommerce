import express from "express"

const router = express.Router()

// Cart is managed client-side in this implementation
// These endpoints are placeholders for future server-side cart management

router.get("/", (req, res) => {
  res.json({ message: "Cart endpoints" })
})

export default router
