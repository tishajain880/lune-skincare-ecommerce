import { describe, it, expect } from "@jest/globals"
import request from "supertest"
import app from "../server.js"

describe("Authentication", () => {
  let token
  const testUser = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  }

  it("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send(testUser)

    expect(response.status).toBe(201)
    expect(response.body.user.email).toBe(testUser.email)
    expect(response.body.token).toBeDefined()
    token = response.body.token
  })

  it("should login with correct credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    })

    expect(response.status).toBe(200)
    expect(response.body.user.email).toBe(testUser.email)
    expect(response.body.token).toBeDefined()
  })

  it("should fail login with incorrect password", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: "wrongpassword",
    })

    expect(response.status).toBe(401)
  })
})
