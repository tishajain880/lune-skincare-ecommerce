import { query } from "../config/postgres.js"

export const createOrder = async (userId, total) => {
  const result = await query(
    'INSERT INTO orders (userId, total, "createdAt") VALUES ($1, $2, NOW()) RETURNING id, userId, total, "createdAt"',
    [userId, total],
  )
  return result.rows[0]
}

export const createOrderItem = async (orderId, productId, quantity, priceAtPurchase) => {
  const result = await query(
    'INSERT INTO order_items (orderId, productId, quantity, "priceAtPurchase") VALUES ($1, $2, $3, $4) RETURNING id',
    [orderId, productId, quantity, priceAtPurchase],
  )
  return result.rows[0]
}

export const getOrdersByUserId = async (userId) => {
  const result = await query('SELECT * FROM orders WHERE userId = $1 ORDER BY "createdAt" DESC', [userId])
  return result.rows
}

export const getOrderById = async (orderId) => {
  const result = await query("SELECT * FROM orders WHERE id = $1", [orderId])
  return result.rows[0]
}

export const getOrderItems = async (orderId) => {
  const result = await query("SELECT * FROM order_items WHERE orderId = $1", [orderId])
  return result.rows
}
