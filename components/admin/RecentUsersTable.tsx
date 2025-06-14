"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockUsers } from "@/lib/users"

interface RecentUsersTableProps {
  limit?: number
}

export default function RecentUsersTable({ limit = 5 }: RecentUsersTableProps) {
  const recentUsers = mockUsers
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)

  return (
    <div className="space-y-4">
      {recentUsers.map((user) => (
        <div key={user.id} className="flex items-center space-x-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.fullName} />
            <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{user.fullName}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto">
            <Badge variant={user.role === "admin" ? "destructive" : "secondary"}>
              {user.role === "admin" ? "Admin" : "User"}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
