"use client"
import { Badge } from "@/shared/ui/Badge";
import { filterProduct } from "@/store/cartSlice";
import { UseAppSelector } from "@/store/Hooks";
import { Package, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


export default function Header() {
    const pathname = usePathname();
    const showSearchbar = pathname === "/"; 
    const items = UseAppSelector((state) => state.cart.items)
    const dispath = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");

    const totalQunatity = items.reduce((acc, curr) => curr.quantity + acc, 0);

    useEffect(() => {
        const timer = setTimeout(() => {}, 500)
        dispath(filterProduct(searchTerm))

        return () => {
            clearTimeout(timer)
        }
    }, [searchTerm])
    return(
        <header className="sticky top-0 z-10 backdrop-blur w-full
        flex justify-between py-6 px-6 border-b border-athens-gray">
            <Link href="/" className="flex gap-2">
            <Package className="text-red-500"/>
            <span>TechStore</span>
            </Link>
            <div className="flex gap-4 items-center">
                {showSearchbar ? (
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4
                    text-santas-gray"/>
                    <input className="outline-none w-80 border border-athens-gray
                    py-2 pl-8 rounded-md text-sm"
                    placeholder="Search Products..."
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>) : null}
                <Link href="/cart" className="relative">
                <ShoppingCart className="h-5 w-5"/>
                {totalQunatity > 0 ? (
                <Badge className="bg-red-500 h-5 w-5 text-white text-center
                text-xs absolute -top-3 -right-4">{totalQunatity}</Badge>) : null
                }
                </Link>
            </div>
        </header>
    )
}