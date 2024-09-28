import { createSlice } from "@reduxjs/toolkit";

// Helper function to calculate item price based on discount
const calculateItemPrice = (item) => {
    let result = item.discount_price
    ? item.price * (1 - item.discount_price / 100)
    : item.price;
    console.log("Current price of the product: ", result);
    return result;
};

const getLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

const initialState = {
    cartItems: getLocalStorage(),
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.uuid === newItem.uuid
            );

            const itemPrice = calculateItemPrice(newItem);

            if (!existingItem) {
                state.cartItems.push({
                    ...newItem,
                    uuid: newItem.uuid,
                    name: newItem.name,
                    price: Number(itemPrice),
                    quantity: 1,
                });
                state.totalQuantity += 1;
                state.totalPrice += Number(itemPrice);
            } else {
                existingItem.quantity += 1;
                state.totalQuantity += 1;
                state.totalPrice += Number(existingItem.price);
            }

            // Recalculate totals after adding item
            cartSlice.caseReducers.calculateTotal(state);

            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },

        removeFromCart(state, action) {
            const uuid = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.uuid === uuid
            );

            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.cartItems = state.cartItems.filter(
                        (item) => item.uuid !== uuid
                    );
                    state.totalQuantity -= 1;
                    state.totalPrice -= Number(existingItem.price);
                } else {
                    existingItem.quantity -= 1;
                    state.totalQuantity -= 1;
                    state.totalPrice -= Number(existingItem.price);
                }

                // Recalculate totals after removing an item
                cartSlice.caseReducers.calculateTotal(state);

                localStorage.setItem("cart", JSON.stringify(state.cartItems));
            }
        },

        removeItem(state, action) {
            const uuid = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.uuid === uuid
            );

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -=
                    Number(existingItem.price) * existingItem.quantity;

                state.cartItems = state.cartItems.filter(
                    (item) => item.uuid !== uuid
                );

                // Recalculate totals after removing the whole item
                cartSlice.caseReducers.calculateTotal(state);

                localStorage.setItem("cart", JSON.stringify(state.cartItems));
            }
        },

        calculateTotal(state) {
            let total = 0;
            let quantity = 0;
            state.cartItems.forEach((item) => {
                total += Number(item.price) * Number(item.quantity);
                quantity += Number(item.quantity);
            });
            state.totalPrice = total;
            state.totalQuantity = quantity;
        },
    },
});

export const { addToCart, removeFromCart, removeItem, calculateTotal } =
    cartSlice.actions;

export default cartSlice.reducer;
