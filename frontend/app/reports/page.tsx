"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { API_URL } from "@/lib/constants"

export default function ReportsPage() {
  const { user, token } = useAuth()
  const router = useRouter()
  const [dailyRevenue, setDailyRevenue] = useState([])
  const [categorySales, setCategorySales] = useState([])
  const [topCustomers, setTopCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/")
      return
    }

    const fetchReports = async () => {
      try {
        const [revenueRes, categoryRes, customersRes] = await Promise.all([
          fetch(`${API_URL}/reports/daily-revenue`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/reports/category-sales`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/reports/top-customers`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const revenue = await revenueRes.json()
        const categories = await categoryRes.json()
        const customers = await customersRes.json()

        setDailyRevenue(revenue)
        setCategorySales(categories)
        setTopCustomers(customers)
      } catch (error) {
        console.error("Error fetching reports:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [user, token, router])

  if (loading) {
    return <div className="text-center py-12">Loading reports...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-light mb-12">Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Revenue */}
        <div className="border border-border p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-6">Daily Revenue</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {dailyRevenue.map((item: any, idx) => (
              <div key={idx} className="flex justify-between text-sm border-b border-border pb-2">
                <span className="text-muted-foreground">{item.date}</span>
                <div className="text-right">
                  <div className="font-medium">${Number.parseFloat(item.total_revenue).toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">{item.order_count} orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Sales */}
        <div className="border border-border p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-6">Category Sales</h2>
          <div className="space-y-4">
            {categorySales.map((item: any, idx) => (
              <div key={idx} className="border-b border-border pb-4">
                <h3 className="font-medium capitalize mb-2">{item._id}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>Products: {item.totalProducts}</div>
                  <div>Avg: ${item.avgPrice.toFixed(2)}</div>
                  <div>Min: ${item.minPrice.toFixed(2)}</div>
                  <div>Max: ${item.maxPrice.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="lg:col-span-2 border border-border p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-6">Top Customers</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-right py-2">Orders</th>
                  <th className="text-right py-2">Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer: any, idx) => (
                  <tr key={idx} className="border-b border-border">
                    <td className="py-2">{customer.name}</td>
                    <td className="py-2 text-muted-foreground">{customer.email}</td>
                    <td className="text-right">{customer.order_count}</td>
                    <td className="text-right font-medium">
                      ${Number.parseFloat(customer.total_spent || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
