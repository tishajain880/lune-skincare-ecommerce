import * as Product from "../models/Product.js"

export const createProduct = async (req, res) => {
  try {
    const { sku, name, price, category, description } = req.body

    if (!sku || !name || !price || !category) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const id = await Product.createProduct({
      sku,
      name,
      price,
      category,
      description,
    })

    res.status(201).json({ id, sku, name, price, category, description })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getProducts = async (req, res) => {
  try {
    const { sortBy = "price", sortOrder = "-1", category, page = 1, limit = 12 } = req.query

    const result = await Product.getProducts(
      sortBy,
      Number.parseInt(sortOrder),
      category,
      Number.parseInt(page),
      Number.parseInt(limit),
    )

    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const searchProducts = async (req, res) => {
  try {
    const { q, page = 1, limit = 12 } = req.query

    if (!q) {
      return res.status(400).json({ error: "Search query required" })
    }

    const result = await Product.searchProducts(q, Number.parseInt(page), Number.parseInt(limit))
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const success = await Product.updateProduct(id, updateData)
    if (!success) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json({ message: "Product updated" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    const success = await Product.deleteProduct(id)
    if (!success) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json({ message: "Product deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
