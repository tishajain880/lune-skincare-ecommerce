"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"

export default function Navigation() {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b border-border sticky top-0 bg-background z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Lune
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm hover:text-muted-foreground">
              Products
            </Link>
            {user?.role === "admin" && (
              <Link href="/admin" className="text-sm hover:text-muted-foreground">
                Admin
              </Link>
            )}
            {user?.role === "admin" && (
              <Link href="/reports" className="text-sm hover:text-muted-foreground">
                Reports
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <div className="text-sm hover:text-muted-foreground">Cart</div>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{user.name}</span>
                <button onClick={logout} className="text-sm px-3 py-1 border border-border hover:bg-muted">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-sm px-3 py-1 border border-border hover:bg-muted">
                Login
              </Link>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/products" className="block text-sm py-2 hover:text-muted-foreground">
              Products
            </Link>
            {user?.role === "admin" && (
              <>
                <Link href="/admin" className="block text-sm py-2 hover:text-muted-foreground">
                  Admin
                </Link>
                <Link href="/reports" className="block text-sm py-2 hover:text-muted-foreground">
                  Reports
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
