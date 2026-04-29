"use client";

import { UseAppSelector } from "@/store/Hooks";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import QuantityButton from "@/components/QuantityButton";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";

const Cart = () => {
  const items = UseAppSelector((state) => state.cart.items);
  const router = useRouter();
  const dispatch = useDispatch();

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const taxrate = subtotal * 0.08;

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-start gap-4 h-full w-full">
        <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
          <ShoppingBag className="h-12 w-12 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-gray-500">
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/"
          className="bg-red-500 text-white text-sm font-medium py-2.5 px-4 rounded-md flex gap-2 mt-2 items-center"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {items.length} items in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-100 p-4 shadow-sm bg-white">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-6 py-4 border-b last:border-b-0"
                >
                  <div
                    className="h-24 w-24 shrink-0 rounded-xl overflow-hidden cursor-pointer bg-gray-50 border"
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <Image
                      src={product.image}
                      width={96}
                      height={96}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex flex-1 items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {product.price} each
                      </p>

                      <div className="flex items-center gap-3 mt-3 border rounded-lg w-fit px-2 py-1">
                        <QuantityButton product={product} />
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-24">
                      <p className="font-bold text-lg text-gray-900">
                        ${(product.price * quantity).toFixed(2)}
                      </p>

                      {/* FIXED HERE */}
                      <button
                        onClick={() => handleRemove(String(product.id))}
                        className="flex items-center gap-2 text-red-500 cursor-pointer text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/"
              className="flex items-center mt-6 gap-2 font-medium text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border shadow-sm sticky top-24 p-6 flex flex-col gap-4 bg-white">

              <h1 className="tracking-tight text-2xl font-semibold">
                Order Summary
              </h1>

              <div className="flex flex-col gap-3 mt-2">
                <div className="flex justify-between">
                  <span className="text-pale-sky">Subtotal</span>
                  <span className="font-medium">
                    {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-pale-sky">Tax (8%)</span>
                  <span className="font-medium">
                    {taxrate.toLocaleString()}
                  </span>
                </div>

                <div className="h-px w-full bg-athens-gray" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>
                    {(subtotal + taxrate).toLocaleString()}
                  </span>
                </div>

                <button className="bg-red-500 text-white rounded-lg font-medium text-sm py-3 mt-2 cursor-pointer w-full">
                  Proceed to checkout
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;