export interface MockUser {
  id: string
  fullName: string
  email: string
  phone: string
  role: "admin" | "user"
  status: "active" | "inactive"
  avatar?: string
  createdAt: Date
  lastActive: Date
}

export const mockUsers: MockUser[] = [
  {
    id: "user-1",
    fullName: "Nguyễn Văn Admin",
    email: "admin@techstore.com",
    phone: "0123456789",
    role: "admin",
    status: "active",
    avatar: "/img/admin-avatar.jpg",
    createdAt: new Date("2024-01-01"),
    lastActive: new Date(),
  },
  {
    id: "user-2",
    fullName: "Trần Thị Lan",
    email: "lan.tran@gmail.com",
    phone: "0987654321",
    role: "user",
    status: "active",
    avatar: "/placeholder.svg",
    createdAt: new Date("2024-02-15"),
    lastActive: new Date("2024-12-05"),
  },
  {
    id: "user-3",
    fullName: "Lê Văn Minh",
    email: "minh.le@gmail.com",
    phone: "0912345678",
    role: "user",
    status: "active",
    avatar: "/placeholder.svg",
    createdAt: new Date("2024-03-10"),
    lastActive: new Date("2024-12-04"),
  },
  {
    id: "user-4",
    fullName: "Phạm Thị Hoa",
    email: "hoa.pham@gmail.com",
    phone: "0934567890",
    role: "user",
    status: "inactive",
    avatar: "/placeholder.svg",
    createdAt: new Date("2024-04-20"),
    lastActive: new Date("2024-11-20"),
  },
  {
    id: "user-5",
    fullName: "Hoàng Văn Đức",
    email: "duc.hoang@gmail.com",
    phone: "0945678901",
    role: "user",
    status: "active",
    avatar: "/placeholder.svg",
    createdAt: new Date("2024-05-05"),
    lastActive: new Date("2024-12-03"),
  },
]
