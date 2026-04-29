import { IProduct } from "@/types/product";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRODUCTS: IProduct[] = [
  {
    id: "1",
    name: "wireless noise-cancelling Headphones",
    description: "High-quality over-ear headphones designed for deep bass, clear vocals, and long listening comfort during work or travel.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Audio",
  },
  {
    id: "2",
    name: "Ultrabook Laptop",
    description: "A lightweight and powerful laptop built for productivity, featuring fast performance, long battery life, and a sleek modern design.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    category: "Computers",
  },
  {
    id: "3",
    name: "Smartphone Pro",
    description: "A next-generation smartphone with a sharp display, fast processor, and advanced camera system for everyday photography and apps.",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    category: "Mobile",
  },
  {
    id: "4",
    name: "Smart Watch Series",
    description: "A modern smartwatch that tracks fitness, notifications, and health metrics while keeping a stylish and comfortable wrist design.",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Wearables",
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    description: "Compact and truly wireless earbuds with noise isolation, balanced sound, and a portable charging case for everyday use.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Audio",
  },
  {
    id: "6",
    name: "Mechanical Keyboard",
    description: "A durable mechanical keyboard with tactile switches, RGB lighting, and a responsive typing experience for gaming and work.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Accessories",
  },
  {
    id: "7",
    name: "Gaming Desktop PC",
    description: "A high-performance gaming PC built with powerful graphics, fast processing, and RGB lighting for an immersive gaming experience.",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Computers",
  },
  {
    id: "8",
    name: "4K Ultra Monitor",
    description: "A crystal-clear 4K monitor with vibrant colors, smooth refresh rate, and wide viewing angles for work, gaming, and media.",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Computers",
  },
];

export const findProductById = (id: string) => {
  return PRODUCTS.find((p) => p.id === id);
};