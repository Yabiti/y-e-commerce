import { IProduct } from "@/types/product";
import { PRODUCTS } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";

interface ICartItem {
    product: IProduct;
    quantity: number;
}

interface ICartState {
    items: ICartItem[];
    products: IProduct[];
}

const initialState: ICartState = {
    items: [],
    products: PRODUCTS
}

const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        AddToCart: (state, action) => {
            const { product, quantity = 1 } = action.payload;
            const ExistingItemsIndex = state.items.findIndex(
                (item) => item.product.id === product.id,
            );
            if (ExistingItemsIndex >= 0) {
                state.items[ExistingItemsIndex].quantity += quantity;
            } else {
                state.items.push({ product, quantity });
            }
        },
        removeFromCart: (state, action) => {
            const { productId, quantity = 1 } = action.payload;
            const ExistingItemsIndex = state.items.findIndex(
                (item) => item.product.id === productId
            );

            if (ExistingItemsIndex === -1) return;

            const ExistingItem = state.items[ExistingItemsIndex];

            if (ExistingItem.quantity > quantity) {
                ExistingItem.quantity -= quantity;
            } else {
                state.items.splice(ExistingItemsIndex, 1);
            }
        },
        filterProduct: (state, action) => {
            const SearchTerm = action.payload.toLowerCase();
            state.products = PRODUCTS.filter((item) =>
                item.name.toLowerCase().includes(SearchTerm) ||
                item.category.toLowerCase().includes(SearchTerm)
            );
        }
    }
});

export const { AddToCart, removeFromCart, filterProduct } = cartSlice.actions;
export default cartSlice.reducer;
