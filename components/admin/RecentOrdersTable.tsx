"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockOrders } from "@/lib/orders"

interface RecentOrdersTableProps {
  limit?: number
}

export default function RecentOrdersTable({ limit = 5 }: RecentOrdersTableProps) {
  const recentOrders = mockOrders.slice(0, limit)

  const formatPrice = (price: number) => {
    return price.toLocaleString() + "đ"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Chờ xử lý</Badge>
      case "processing":
        return <Badge variant="secondary">Đang xử lý</Badge>
      case "shipped":
        return <Badge variant="secondary">Đang giao</Badge>
      case "delivered":
        return <Badge variant="default">Đã giao</Badge>
      case "cancelled":
        return <Badge variant="destructive">Đã hủy</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mã đơn hàng</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead>Tổng tiền</TableHead>
          <TableHead>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.orderNumber}</TableCell>
            <TableCell>{order.customer.name}</TableCell>
            <TableCell className="font-medium">{formatPrice(order.totalAmount)}</TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
