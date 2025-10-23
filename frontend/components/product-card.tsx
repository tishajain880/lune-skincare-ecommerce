"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"

interface Product {
  _id: string
  name: string
  price: number
  category: string
  description: string
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <div className="group">
      <Link href={`/products/${product._id}`}>
        <div className="bg-muted h-64 rounded-lg mb-4 overflow-hidden">
          <Image
            src={`/.jpg?height=300&width=300&query=${product.name}`}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      <h3 className="font-medium mb-2 group-hover:text-muted-foreground transition-colors">{product.name}</h3>

      <p className="text-sm text-muted-foreground mb-4">{product.category}</p>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
        <button
          onClick={() => addToCart(product)}
          className="px-4 py-2 bg-accent text-accent-foreground hover:bg-accent/90 text-sm transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  )
}
