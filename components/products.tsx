"use client";

import { AddToCart } from "@/store/cartSlice";
import { UseAppSelector } from "@/store/Hooks";
import { IProduct } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import QuantityButton from "./QuantityButton";
import { useRouter } from "next/navigation";

export default function Products() {
  const { items, products } = UseAppSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) => {
    e.stopPropagation();
    dispatch(AddToCart({ product }));
  };

  const handleProductClick = (id: string | number) => {
    router.push(`/product/${String(id)}`);
  };

  return (
    <div className="p-6 px-20">
      <div className="grid grid-cols-4 gap-6 w-full">
        {products.map((product) => (
          <div
            key={String(product.id)}
            className="rounded-lg shadow-sm border border-athens-gray overflow-hidden 
            flex flex-col cursor-pointer hover:border-zinc-300 transition-colors"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={product.image}
                width={400}
                height={400}
                priority
                alt={product.name}
                className="object-cover h-full w-full"
              />
            </div>

            <div className="p-4 flex flex-col grow justify-between">
              <div className="flex flex-col gap-1.5">
                <p className="text-pale-sky text-xs font-medium uppercase tracking-wider">
                  {product.category}
                </p>
                <h3 className="font-medium leading-tight text-base">
                  {product.name}
                </h3>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-semibold text-zinc-900">
                  ${product.price}
                </p>

                {items.some(
                  (item) => String(item.product.id) === String(product.id)
                ) ? (
                  <QuantityButton product={product} />
                ) : (
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="font-medium text-sm px-3 border border-zinc-200 py-2 cursor-pointer rounded-md flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col gap-4 items-center py-8">
          <p className="text-lg font-bold">No products found</p>
          <p className="text-pale-sky">
            Try adjusting your search to find what you're looking for
          </p>
        </div>
      ) : null}
    </div>
  );
}
















