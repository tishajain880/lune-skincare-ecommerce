import { query } from "../config/postgres.js"

export const createUser = async (name, email, passwordHash) => {
  const result = await query(
    'INSERT INTO users (name, email, "passwordHash", role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    [name, email, passwordHash, "customer"],
  )
  return result.rows[0]
}

export const getUserByEmail = async (email) => {
  const result = await query("SELECT * FROM users WHERE email = $1", [email])
  return result.rows[0]
}

export const getUserById = async (id) => {
  const result = await query("SELECT id, name, email, role FROM users WHERE id = $1", [id])
  return result.rows[0]
}
