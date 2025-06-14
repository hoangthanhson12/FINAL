"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  ChevronDown,
  ChevronRight,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
  children?: {
    title: string;
    href: string;
  }[];
}

const SidebarItem = ({ icon, title, href, isActive, isCollapsed, children }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();


  // Nếu có menu con
  if (children) {
    return (
      <div className={cn("flex flex-col", isActive && "bg-orange-50")}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center py-2 px-3 rounded-md w-full cursor-pointer", // Thêm cursor-pointer
            isActive ? "text-orange-600" : "text-gray-700 hover:text-orange-600 hover:bg-orange-50",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <span className="mr-2">{icon}</span>
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{title}</span>
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </>
          )}
        </button>
        {isOpen && !isCollapsed && (
          <div className="ml-6 mt-1 space-y-1">
            {children.map((child, index) => (
              <Link
                key={index}
                href={child.href}
                className={cn(
                  "block py-1.5 px-3 rounded-md text-sm",
                  pathname === child.href
                    ? "text-orange-600 bg-orange-50"
                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                )}
              >
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Nếu không có menu con
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center py-2 px-3 rounded-md",
        isActive
          ? "text-orange-600 bg-orange-50"
          : "text-gray-700 hover:text-orange-600 hover:bg-orange-50",
        isCollapsed && "justify-center"
      )}
    >
      <span className={cn("mr-2", isCollapsed && "mr-0")}>{icon}</span>
      {!isCollapsed && <span>{title}</span>}
    </Link>
  );
};

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { logout } = useAuth();
  const pathname = usePathname();
  const isItemActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }
  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const sidebarItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      title: "Dashboard",
      href: "/admin"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Người dùng",
      href: "/admin/users"
    },
    {
      icon: <Package className="h-5 w-5" />,
      title: "Sản phẩm",
      href: "/admin/products"
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      title: "Đơn hàng",
      href: "/admin/orders"
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Báo cáo",
      href: "/admin/reports",
      children: [
        { title: "Doanh thu", href: "/admin/reports/revenue" },
        { title: "Sản phẩm", href: "/admin/reports/products" },
        { title: "Khách hàng", href: "/admin/reports/customers" }
      ]
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Cài đặt",
      href: "/admin/settings"
    }
  ];

  // Mobile toggle
  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={toggleMobileSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 z-50 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isMobileOpen ? "fixed inset-y-0 left-0" : "hidden lg:block"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div
            className={cn(
              "h-16 flex items-center px-4 border-b",
              isCollapsed ? "justify-center" : "justify-between"
            )}
          >
            {!isCollapsed && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center lg:w-10 lg:h-10">
                  <Link href="/admin">
                    <img src="/img/logo.png" alt="" className="rounded-full" />
                  </Link>
                </div>
                <div>
                  <Link href="/admin">
                    <h1 className=" text-xl font-bold text-gray-900 ">TechStore</h1>
                    <p className="hidden lg:block text-xs text-gray-500">Công nghệ cho mọi nhà</p>
                  </Link>
                </div>
              </div>
            )}

            {/* Mobile Close Button */}
            {isMobileOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            )}

            {/* Desktop Collapse Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 py-4 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {sidebarItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  href={item.href}
                  isActive={isItemActive(item.href)}
                  isCollapsed={isCollapsed}
                  children={item.children}
                />
              ))}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-2 border-t">
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center py-2 px-3 rounded-md w-full text-red-600 hover:bg-red-50",
                isCollapsed && "justify-center"
              )}
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && <span className="ml-2">Đăng xuất</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
