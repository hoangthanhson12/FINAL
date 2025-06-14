"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "T1", revenue: 4000000 },
  { name: "T2", revenue: 3000000 },
  { name: "T3", revenue: 5000000 },
  { name: "T4", revenue: 4500000 },
  { name: "T5", revenue: 6000000 },
  { name: "T6", revenue: 5500000 },
  { name: "T7", revenue: 7000000 },
  { name: "T8", revenue: 6500000 },
  { name: "T9", revenue: 8000000 },
  { name: "T10", revenue: 7500000 },
  { name: "T11", revenue: 9000000 },
  { name: "T12", revenue: 8500000 },
]

export default function AdminChart() {
  const formatRevenue = (value: number) => {
    return (value / 1000000).toFixed(1) + "M"
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatRevenue} />
        <Tooltip
          formatter={(value: number) => [formatRevenue(value) + "đ", "Doanh thu"]}
          labelFormatter={(label) => `Tháng ${label}`}
        />
        <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
