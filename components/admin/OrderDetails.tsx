"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface OrderDetailsProps {
  order: any
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString() + "đ"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      {/* Thông tin đơn hàng */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Đơn hàng #{order.orderNumber}</span>
            {getStatusBadge(order.status)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Ngày đặt hàng</p>
              <p className="text-sm">{formatDate(order.orderDate)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tổng tiền</p>
              <p className="text-sm font-bold text-red-600">{formatPrice(order.totalAmount)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phương thức thanh toán</p>
              <p className="text-sm">
                {order.paymentMethod === "cod"
                  ? "Thanh toán khi nhận hàng"
                  : order.paymentMethod === "bank"
                    ? "Chuyển khoản ngân hàng"
                    : "Thẻ tín dụng"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Trạng thái thanh toán</p>
              <Badge variant={order.paymentStatus === "paid" ? "default" : "outline"}>
                {order.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
              </Badge>
            </div>
          </div>
          {order.notes && (
            <div>
              <p className="text-sm font-medium text-gray-500">Ghi chú</p>
              <p className="text-sm">{order.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Thông tin khách hàng */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin khách hàng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-sm font-medium text-gray-500">Họ tên</p>
            <p className="text-sm">{order.customer.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-sm">{order.customer.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Số điện thoại</p>
            <p className="text-sm">{order.customer.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Địa chỉ giao hàng</p>
            <p className="text-sm">{order.customer.address}</p>
          </div>
        </CardContent>
      </Card>

      {/* Sản phẩm trong đơn hàng */}
      <Card>
        <CardHeader>
          <CardTitle>Sản phẩm đã đặt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div key={index}>
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 relative rounded overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.price)}</p>
                    <p className="text-sm text-gray-500">Thành tiền: {formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
                {index < order.items.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline trạng thái */}
      {(order.shippingDate || order.deliveryDate) && (
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Đơn hàng được đặt</p>
                  <p className="text-xs text-gray-500">{formatDate(order.orderDate)}</p>
                </div>
              </div>
              {order.shippingDate && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Đơn hàng được giao cho đơn vị vận chuyển</p>
                    <p className="text-xs text-gray-500">{formatDate(order.shippingDate)}</p>
                  </div>
                </div>
              )}
              {order.deliveryDate && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Đơn hàng đã được giao thành công</p>
                    <p className="text-xs text-gray-500">{formatDate(order.deliveryDate)}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
