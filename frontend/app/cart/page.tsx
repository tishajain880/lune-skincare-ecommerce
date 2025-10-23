"use client"

import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { API_URL } from "@/lib/constants"

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()
  const { user, token } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/orders/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        }),
      })

      if (response.ok) {
        clearCart()
        router.push("/orders")
      } else {
        alert("Checkout failed")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Checkout failed")
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl font-light mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-6">Your cart is empty</p>
          <Link href="/products" className="inline-block px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-light mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b border-border pb-4">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item._id)} className="text-sm text-red-600 hover:text-red-700">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border p-6 h-fit">
          <h2 className="text-lg font-medium mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t border-border pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full px-4 py-3 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors font-medium"
          >
            {loading ? "Processing..." : "Checkout"}
          </button>

          <Link href="/products" className="block text-center text-sm text-muted-foreground hover:text-foreground mt-4">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
