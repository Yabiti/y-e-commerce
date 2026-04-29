"use client";

import { findProductById } from "@/lib/utils";
import { ArrowLeft, ShoppingCart} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { UseAppSelector } from "@/store/Hooks";
import QuantityButton from "@/components/QuantityButton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AddToCart } from "@/store/cartSlice";

const productDetails = () => {
    const { id } = useParams();

    const product = findProductById(id as string);
    const dispatch = useDispatch();
    const router = useRouter();
    const items = UseAppSelector((state) => state.cart.items)
    if (!product) {
        return ( 
        <div className="flex flex-col items-center justify-center gap-2 mt-16">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <p className="text-pale-sky">The product you're looking doesn't exist.</p>
            <Link href="/" className="text-sm font-md py-2 px-4 rounded-md bg-red-500 text-white mt-6">Go to products</Link>
        </div>
        )
    }
 const handleAddToCart = () => {
    dispatch(AddToCart({ product }))
 };
    return (
    <div className="pb-8 max-w-7xl m-auto">
        <Link href="/" className="flex items-center gap-2 font-medium text-sm">
            <ArrowLeft className="h-4 w-4"/>
            Back
        </Link>
        <div className="flex gap-8 mt-2 w-full h-full">
            <div className="aspect-square overflow-hidden rounded-2xl flex-1">
              <Image
                src={product.image}
                width={400}
                height={400}
                priority
                alt={product.name}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="flex gap-2 flex-col flex-1">
                <p className="text-sm font-medium uppercase tracking-wider text-red-500">
                    {product.category}
                </p>
                <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
                <p className="mt-4 text-4xl font-bold text-shark">${product.price}</p>
                <p className="mt-6 leading-relaxed">{product.description}</p>
                <div className="flex gap-4 mt-6">
                    {items.some((item) => item.product.id === product.id) ? (
                     <QuantityButton product={product}/>) : (
                        <button className="font-medium flex-3 text-sm border
                        border-athens-gray py-2.5 cursor-pointer rounded-md
                        flex items-center justify-center shadow-xs bg-red-500 text-white"
                        onClick={handleAddToCart}>
                            <ShoppingCart className="h-4 w-4"/>
                            Add To Cart
                        </button>
                     )}
                     <button className="font-medium flex-1 text-sm border
                     border-athens-gray cursor-pointer rounded-md shadow-xs
                    "onClick={() => router.push("/cart")}>
                    View Cart</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default productDetails;