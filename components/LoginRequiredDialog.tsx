"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface LoginRequiredDialogProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export default function LoginRequiredDialog({ isOpen, onClose, onLogin }: LoginRequiredDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yêu cầu đăng nhập</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn cần đăng nhập để sử dụng các chức năng. Bạn có muốn đăng nhập ngay bây giờ không?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={onLogin} className="cursor-pointer">
            Đăng nhập
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
