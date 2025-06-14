"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFormProps {
  product?: any
  onSubmit: (productData: any) => void
  onCancel: () => void
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    discount: "",
    stock: "",
    image: "",
    description: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    stock: "",
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        originalPrice: product.originalPrice || "",
        discount: product.discount || "",
        stock: product.stock?.toString() || "",
        image: product.image || "",
        description: product.description?.join("\n") || "",
      })
    }
  }, [product])

  const validateForm = () => {
    const newErrors = {
      name: "",
      category: "",
      price: "",
      originalPrice: "",
      stock: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Tên sản phẩm là bắt buộc"
    }

    if (!formData.category) {
      newErrors.category = "Danh mục là bắt buộc"
    }

    if (!formData.price.trim()) {
      newErrors.price = "Giá bán là bắt buộc"
    }

    if (!formData.originalPrice.trim()) {
      newErrors.originalPrice = "Giá gốc là bắt buộc"
    }

    if (!formData.stock.trim()) {
      newErrors.stock = "Số lượng kho là bắt buộc"
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Số lượng kho phải là số không âm"
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => !error)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const productData = {
        ...formData,
        stock: Number(formData.stock),
        description: formData.description.split("\n").filter((line) => line.trim()),
      }
      onSubmit(productData)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
      <div className="space-y-2">
        <Label htmlFor="name">Tên sản phẩm *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className={errors.name ? "border-red-500" : ""}
          placeholder="Nhập tên sản phẩm"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Danh mục *</Label>
        <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
          <SelectTrigger className={errors.category ? "border-red-500" : ""}>
            <SelectValue placeholder="Chọn danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Camera">Camera</SelectItem>
            <SelectItem value="Laptop">Laptop</SelectItem>
            <SelectItem value="Phụ kiện">Phụ kiện</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Giá bán *</Label>
          <Input
            id="price"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            className={errors.price ? "border-red-500" : ""}
            placeholder="15,500,000"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="originalPrice">Giá gốc *</Label>
          <Input
            id="originalPrice"
            value={formData.originalPrice}
            onChange={(e) => handleInputChange("originalPrice", e.target.value)}
            className={errors.originalPrice ? "border-red-500" : ""}
            placeholder="18,000,000"
          />
          {errors.originalPrice && <p className="text-red-500 text-sm">{errors.originalPrice}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="discount">Giảm giá</Label>
          <Input
            id="discount"
            value={formData.discount}
            onChange={(e) => handleInputChange("discount", e.target.value)}
            placeholder="14%"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Số lượng kho *</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => handleInputChange("stock", e.target.value)}
            className={errors.stock ? "border-red-500" : ""}
            placeholder="10"
            min="0"
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">URL hình ảnh</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => handleInputChange("image", e.target.value)}
          placeholder="/img/product.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả sản phẩm</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Nhập mô tả sản phẩm (mỗi dòng là một đoạn)"
          rows={4}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          {product ? "Cập nhật" : "Thêm mới"}
        </Button>
      </div>
    </form>
  )
}
