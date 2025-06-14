export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export interface MockOrder {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: OrderItem[]
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
  paymentMethod: "cod" | "bank" | "card"
  orderDate: string
  shippingDate?: string
  deliveryDate?: string
  notes?: string
}

export const mockOrders: MockOrder[] = [
  {
    id: "order-1",
    orderNumber: "DH001234",
    customer: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phone: "0123456789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
    },
    items: [
      {
        id: 1,
        name: "Camera HD Pro 4K",
        price: 15500000,
        quantity: 1,
        image: "/img/camera.jpg",
      },
      {
        id: 13,
        name: "Chuột Gaming Logitech",
        price: 1200000,
        quantity: 2,
        image: "/placeholder.svg",
      },
    ],
    totalAmount: 17900000,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "bank",
    orderDate: "2024-12-01T10:30:00Z",
    shippingDate: "2024-12-02T09:00:00Z",
    deliveryDate: "2024-12-05T14:30:00Z",
    notes: "Giao hàng giờ hành chính",
  },
  {
    id: "order-2",
    orderNumber: "DH001235",
    customer: {
      name: "Trần Thị B",
      email: "tranthib@gmail.com",
      phone: "0987654321",
      address: "456 Đường XYZ, Quận 3, TP.HCM",
    },
    items: [
      {
        id: 2,
        name: "Dell Inspiron 15 3000",
        price: 12990000,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    totalAmount: 12990000,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "cod",
    orderDate: "2024-12-03T14:15:00Z",
    shippingDate: "2024-12-04T08:00:00Z",
  },
  {
    id: "order-3",
    orderNumber: "DH001236",
    customer: {
      name: "Lê Văn C",
      email: "levanc@gmail.com",
      phone: "0912345678",
      address: "789 Đường DEF, Quận 7, TP.HCM",
    },
    items: [
      {
        id: 5,
        name: "MacBook Pro M3",
        price: 52990000,
        quantity: 1,
        image: "/placeholder.svg",
      },
      {
        id: 14,
        name: "Bàn phím cơ RGB",
        price: 2800000,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    totalAmount: 55790000,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "bank",
    orderDate: "2024-12-05T16:45:00Z",
  },
  {
    id: "order-4",
    orderNumber: "DH001237",
    customer: {
      name: "Phạm Thị D",
      email: "phamthid@gmail.com",
      phone: "0934567890",
      address: "321 Đường GHI, Quận 5, TP.HCM",
    },
    items: [
      {
        id: 15,
        name: "Tai nghe Gaming",
        price: 3500000,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    totalAmount: 3500000,
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "cod",
    orderDate: "2024-12-06T09:20:00Z",
    notes: "Khách hàng yêu cầu gọi trước khi giao",
  },
  {
    id: "order-5",
    orderNumber: "DH001238",
    customer: {
      name: "Hoàng Văn E",
      email: "hoangvane@gmail.com",
      phone: "0945678901",
      address: "654 Đường JKL, Quận 10, TP.HCM",
    },
    items: [
      {
        id: 4,
        name: "Canon EOS R6 Mark II",
        price: 45000000,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    totalAmount: 45000000,
    status: "cancelled",
    paymentStatus: "failed",
    paymentMethod: "card",
    orderDate: "2024-12-02T11:10:00Z",
    notes: "Khách hàng hủy do thay đổi ý định",
  },
]
