"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "@/components/product-card"
import { API_URL } from "@/lib/constants"

interface Product {
  _id: string
  name: string
  price: number
  category: string
  description: string
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("price")
  const [sortOrder, setSortOrder] = useState("-1")
  const [page, setPage] = useState(1)

  const category = searchParams.get("category")
  const query = searchParams.get("q")

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        let url = `${API_URL}/products?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=12`

        if (category) {
          url += `&category=${category}`
        }

        if (query) {
          url = `${API_URL}/products/search?q=${query}&page=${page}&limit=12`
        }

        const response = await fetch(url)
        const data = await response.json()
        setProducts(data.products)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [sortBy, sortOrder, page, category, query])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light">
          {query ? `Search: ${query}` : category ? `${category}` : "All Products"}
        </h1>

        <div className="flex gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-border bg-background"
          >
            <option value="price">Price</option>
            <option value="name">Name</option>
            <option value="updatedAt">Newest</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border border-border bg-background"
          >
            <option value="-1">Descending</option>
            <option value="1">Ascending</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No products found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-12">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-4 py-2 border border-border disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button onClick={() => setPage(page + 1)} className="px-4 py-2 border border-border">
          Next
        </button>
      </div>
    </div>
  )
}
