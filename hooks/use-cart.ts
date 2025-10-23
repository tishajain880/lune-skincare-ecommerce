"use client"

import { useState, useEffect, useCallback } from "react"

interface CartItem {
  _id: string
  name: string
  price: number
  quantity: number
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const addToCart = useCallback((product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id)

      let newCart
      if (existingItem) {
        newCart = prevCart.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }]
      }

      localStorage.setItem("cart", JSON.stringify(newCart))
      return newCart
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item._id !== productId)
      localStorage.setItem("cart", JSON.stringify(newCart))
      return newCart
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    localStorage.removeItem("cart")
  }, [])

  return { cart, addToCart, removeFromCart, clearCart }
}
