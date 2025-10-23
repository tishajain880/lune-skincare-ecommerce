"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { API_URL } from "@/lib/constants"

interface Product {
  _id: string
  name: string
  price: number
  category: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products?limit=6`)
        const data = await response.json()
        setProducts(data.products || [])
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Lune</h1>
        <p className="text-lg text-muted-foreground mb-8">Premium skincare for modern beauty</p>
        <Link href="/products" className="inline-block px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90">
          Shop Now
        </Link>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Featured Products</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-muted h-64 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <div className="group cursor-pointer">
                  <div className="bg-muted h-64 rounded-lg mb-4 group-hover:bg-muted/80 transition-colors" />
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.category}</p>
                  <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
