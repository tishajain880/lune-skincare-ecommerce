import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createUser, getUserByEmail } from "../models/User.js"

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await createUser(name, email, passwordHash)

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.status(201).json({ user, token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" })
    }

    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash)
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
