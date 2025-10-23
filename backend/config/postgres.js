import pkg from "pg"
const { Pool } = pkg

let pool

export const connectPostgres = () => {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err)
  })

  console.log("PostgreSQL connected")
}

export const query = (text, params) => {
  return pool.query(text, params)
}

export const getPool = () => pool
