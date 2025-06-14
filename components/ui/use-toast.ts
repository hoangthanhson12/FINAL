// Shadcn/ui toast hook
"use client"

interface ToastProps {
  title: string
  description?: string
  duration?: number
}

export function toast({ title, description, duration = 3000 }: ToastProps) {
  // Simple implementation for now
  const toastElement = document.createElement("div")
  toastElement.className =
    "fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50 animate-in fade-in slide-in-from-top-2"

  const titleElement = document.createElement("h3")
  titleElement.className = "font-medium text-gray-900"
  titleElement.textContent = title
  toastElement.appendChild(titleElement)

  if (description) {
    const descElement = document.createElement("p")
    descElement.className = "text-sm text-gray-600 mt-1"
    descElement.textContent = description
    toastElement.appendChild(descElement)
  }

  document.body.appendChild(toastElement)

  setTimeout(() => {
    toastElement.classList.add("animate-out", "fade-out", "slide-out-to-right-2")
    setTimeout(() => {
      document.body.removeChild(toastElement)
    }, 300)
  }, duration)
}
