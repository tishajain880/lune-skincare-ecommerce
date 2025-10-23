import * as Order from "../models/Order.js"
import * as Product from "../models/Product.js"

export const checkout = async (req, res) => {
  try {
    const { items } = req.body
    const userId = req.user.id

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" })
    }

    let total = 0
    const orderItems = []

    for (const item of items) {
      const product = await Product.getProductById(item.productId)
      if (!product) {
        return res.status(404).json({ error: `Product ${item.productId} not found` })
      }

      const itemTotal = product.price * item.quantity
      total += itemTotal
      orderItems.push({ ...item, priceAtPurchase: product.price })
    }

    const order = await Order.createOrder(userId, total)

    for (const item of orderItems) {
      await Order.createOrderItem(order.id, item.productId, item.quantity, item.priceAtPurchase)
    }

    res.status(201).json({ order, items: orderItems })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id
    const orders = await Order.getOrdersByUserId(userId)

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await Order.getOrderItems(order.id)
        return { ...order, items }
      }),
    )

    res.json(ordersWithItems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
