

export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  images: string[];
  category: string;
  rating: number;
  description: string[];
  specifications: {
    camera?: {
      resolution: string;
      viewAngle: string;
      rotationAngles: {
        vertical: string;
        horizontal: string;
        diagonal: string;
      };
      nightVision: string;
      features: string[];
      twoWayAudio: string;
    };
  }
  reviews: number;
  discount: string;
  priceNumber: number;
  createdAt: Date;
  stock: number;
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: "Camera HD Pro 4K",
    price: "15,500,000",
    originalPrice: "18,000,000",
    image: "/img/camera.jpg",
    images: ["/anhcon/1.jpg", "/anhcon/2.jpg", "/anhcon/3.jpg"],
    category: "Camera",
    rating: 4.5,
    description: ["Giải pháp bảo vệ không gian sống của bạn với mức giá hợp lý và nhiều chức năng ưu việt. Xiaomi Smart Camera C200 có thể quay video Full HD, xoay 360 độ linh hoạt, hỗ trợ tính năng hồng ngoại để nhìn trong môi trường thiếu sáng và được trang bị công nghệ theo dõi, nhận diện cử động con người.",
    
    "So với các dòng camera an ninh thông thường chỉ quay được hình ảnh 720p, Xiaomi Smart Camera C200 cho thấy độ vượt trội khi cung cấp tín hiệu quay chụp Full HD 1080p, hỗ trợ WDR và dễ dàng bắt được các khuôn hình ở bối cảnh ngược sáng hết sức rõ nét, chi tiết. Nhờ đó, bạn sẽ có được trợ thủ hỗ trợ quan sát rõ ràng, bảo vệ không gian sống và làm việc mọi lúc."],
    specifications: {
    camera: {
      resolution: "3 MP (1080p)",
      viewAngle: "360 độ",
      rotationAngles: {
        vertical: "42 độ",
        horizontal: "76.7 độ",
        diagonal: "89.7 độ"
      },
      nightVision: "12 m trong tối",
      features: [
        "Phát hiện chuyển động",
        "Phát hiện con người",
        "Phát hiện tiếng khóc",
        "Đàm thoại 2 chiều",
        "Tích hợp Google Assistant và Amazon Alexa"
      ],
      twoWayAudio: "Có"
    }
  },
    reviews: 128,
    discount: "14%",
    priceNumber: 15500000,
    createdAt: new Date("2024-01-15"),
    stock: 20
  },
  {
    id: 2,
    name: "Dell Inspiron 15 3000",
    price: "12,990,000",
    originalPrice: "14,500,000",
    image: "/placeholder.svg?height=200&width=200",
    images: ["/anhcon/1.jpg", "/anhcon/2.jpg", "/anhcon/3.jpg"],
    category: "Laptop",
    rating: 4.3,
    description: ["ok nhé1111"],
    specifications: {

    },
    reviews: 89,
    discount: "10%",
    priceNumber: 12990000,
    createdAt: new Date("2024-01-10"),
    stock: 20
  },
  {
    id: 3,
    name: "Lenovo ThinkPad X1",
    price: "25,900,000",
    originalPrice: "28,000,000",
    image: "/placeholder.svg?height=200&width=200",
    images: [],
    category: "Laptop",
    rating: 4.8,
    description: ["ok nhé"],
        specifications: {

    },
    reviews: 156,
    discount: "8%",
    priceNumber: 25900000,
    createdAt: new Date("2024-01-20"),
    stock: 20
  },
  {
    id: 4,
    name: "Canon EOS R6 Mark II",
    price: "45,000,000",
    originalPrice: "48,500,000",
    image: "/placeholder.svg?height=200&width=200",
    images: [],
    category: "Camera",
    rating: 4.9,
    description: ["ok nhé"],
        specifications: {

    },
    reviews: 203,
    discount: "7%",
    priceNumber: 45000000,
    createdAt: new Date("2024-01-25"),
    stock: 20
  },
  {
    id: 5,
    name: "MacBook Pro M3",
    price: "52,990,000",
    originalPrice: "55,000,000",
    image: "/placeholder.svg?height=200&width=200",
    images: [],
    category: "Laptop",
    rating: 4.7,
    description: ["ok nhé"],
        specifications: {

    },
    reviews: 312,
    discount: "4%",
    priceNumber: 52990000,
    createdAt: new Date("2024-01-30"),
    stock: 20
  },
  {
    id: 6,
    name: "Sony Alpha A7 IV",
    price: "38,900,000",
    originalPrice: "42,000,000",
    image: "/placeholder.svg?height=200&width=200",
    images: [],
    category: "Camera",
    rating: 4.6,
    description: ["ok nhé"],
        specifications: {

    },
    reviews: 178,
    discount: "7%",
    priceNumber: 38900000,
    createdAt: new Date("2024-02-01"),
    stock: 20
  },
  {
    id: 7,
    name: "Dell XPS 13",
    price: "28,500,000",
    originalPrice: "32,000,000",
    image: "/placeholder.svg?height=200&width=200",
    images: [],
    category: "Laptop",
    rating: 4.4,
    description: ["ok nhé"],
        specifications: {

    },
    reviews: 95,
    discount: "11%",
    priceNumber: 28500000,
    createdAt: new Date("2024-02-05"),
    stock: 20
  },
  {
    id: 8,
    name: "Lenovo Legion 5",
    price: "22,900,000",
    originalPrice: "25,000,000",
    image: "/placeholder.svg?height=200&width=200",
    images: [],
    category: "Laptop",
    rating: 4.5,
     description: ["ok nhé"],
         specifications: {

    },
    reviews: 142,
    discount: "8%",
    priceNumber: 22900000,
    createdAt: new Date("2024-02-10"),
    stock: 20
  },
  {
    id: 9,
    name: "Nikon D850",
    price: "35,500,000",
    originalPrice: "38,000,000",
    image: "/placeholder.svg?height=200&width=200",
    images: [],
    category: "Camera",
    rating: 4.7,
    description: ["ok nhé"],
        specifications: {

    },
    reviews: 167,
    discount: "7%",
    priceNumber: 35500000,
    createdAt: new Date("2024-02-15"),
    stock: 20
  },
  {
    id: 10,
    name: "HP Pavilion Gaming",
    price: "18,900,000",
    originalPrice: "21,000,000",
    image: "/placeholder.svg?height=200&width=200",
    images: [],
    category: "Laptop",
    rating: 4.2,
    description: ["ok nhé"],
        specifications: {

    },
    reviews: 78,
    discount: "10%",
    priceNumber: 18900000,
    createdAt: new Date("2024-02-20"),
    stock: 20
  },
  {
    id: 11,
    name: "Fujifilm X-T5",
    price: "42,500,000",
    originalPrice: "45,000,000",
    image: "/placeholder.svg?height=200&width=200",
    images: [],
    category: "Camera",
    rating: 4.8,
     description: ["ok nhé"],
         specifications: {

    },
    reviews: 134,
    discount: "6%",
    priceNumber: 42500000,
    createdAt: new Date("2024-02-25"),
    stock: 20
  },
  {
    id: 12,
    name: "ASUS ROG Strix",
    price: "31,900,000",
    originalPrice: "35,000,000",
    image: "/placeholder.svg?height=200&width=200",
    images: [],
    category: "Laptop",
    rating: 4.6,
    description: ["ok nhé"],
        specifications: {

    },
    reviews: 189,
    discount: "9%",
    priceNumber: 31900000,
    createdAt: new Date("2024-03-01"),
    stock: 20
  },
  {
    id: 13,
    name: "Chuột Gaming Logitech",
    price: "1,200,000",
    originalPrice: "1,500,000",
    image: "/placeholder.svg?height=200&width=200",
    images: [],
    category: "Phụ kiện",
    rating: 4.3,
    description: ["ok nhé"],
        specifications: {

    },
    reviews: 45,
    discount: "20%",
    priceNumber: 1200000,
    createdAt: new Date("2024-03-05"),
    stock: 20
  },
  {
    id: 14,
    name: "Bàn phím cơ RGB",
    price: "2,800,000",
    originalPrice: "3,200,000",
    image: "/placeholder.svg?height=200&width=200",
    images: [],
    category: "Phụ kiện",
    rating: 4.5,
    description: ["ok nhé"],
        specifications: {

    },
    reviews: 67,
    discount: "13%",
    priceNumber: 2800000,
    createdAt: new Date("2024-03-10"),
    stock: 20
  },
  {
    id: 15,
    name: "Tai nghe Gaming",
    price: "3,500,000",
    originalPrice: "4,000,000",
    image: "/placeholder.svg?height=200&width=200",
    images: [],
    category: "Phụ kiện",
    rating: 4.4,
    description: ["ok nhé"],
        specifications: {

    },
    reviews: 89,
    discount: "13%",
    priceNumber: 3500000,
    createdAt: new Date("2024-03-15"),
    stock: 20
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "Tất cả sản phẩm") {
    return allProducts;
  }
  return allProducts.filter((product) => product.category === category);
};

export const getCameraProducts = (): Product[] => {
  return allProducts.filter((product) => product.category === "Camera");
};

export const getLaptopProducts = (): Product[] => {
  return allProducts.filter((product) => product.category === "Laptop");
};

export const getAccessoryProducts = (): Product[] => {
  return allProducts.filter((product) => product.category === "Phụ kiện");
};

// Utility functions for product detail page
export const getProductBySlug = (slug: string): Product | undefined => {
  return allProducts.find((product) => toSlug(product.name) === slug);
};

export const getProductById = (id: number): Product | undefined => {
  return allProducts.find((product) => product.id === id);
};

export const getRelatedProducts = (currentProduct: Product, limit = 4): Product[] => {
  return allProducts
    .filter(
      (product) => product.category === currentProduct.category && product.id !== currentProduct.id
    )
    .slice(0, limit);
};

export function toSlug(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/\s+/g, "-") // thay space bằng -
    .toLowerCase();
}
