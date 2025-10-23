import { query } from "../config/postgres.js"
import { getDb } from "../config/mongo.js"

export const getDailyRevenue = async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        DATE(o."createdAt") as date,
        COUNT(o.id) as order_count,
        SUM(o.total) as total_revenue,
        AVG(o.total) as avg_order_value
      FROM orders o
      GROUP BY DATE(o."createdAt")
      ORDER BY date DESC
      LIMIT 30
    `)

    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getCategoryWiseSales = async (req, res) => {
  try {
    const db = getDb()

    const result = await db
      .collection("products")
      .aggregate([
        {
          $group: {
            _id: "$category",
            totalProducts: { $sum: 1 },
            avgPrice: { $avg: "$price" },
            minPrice: { $min: "$price" },
            maxPrice: { $max: "$price" },
          },
        },
        { $sort: { totalProducts: -1 } },
      ])
      .toArray()

    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getTopCustomers = async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        u.id,
        u.name,
        u.email,
        COUNT(o.id) as order_count,
        SUM(o.total) as total_spent
      FROM users u
      LEFT JOIN orders o ON u.id = o.userId
      GROUP BY u.id, u.name, u.email
      ORDER BY total_spent DESC
      LIMIT 10
    `)

    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
