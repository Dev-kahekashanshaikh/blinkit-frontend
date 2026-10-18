import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Add product to cart
    const addToCart = (product) => {

        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    // Remove product
    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    };

    // Increase quantity
    const increaseQuantity = (productId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Decrease quantity
    const decreaseQuantity = (productId) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };


    // Calculate cart values from cartItems
    const itemsTotalMrp = cartItems.reduce(
        (total, item) => total + (item.mrp || item.price) * item.quantity,
        0
    );

    const itemsTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const numberOfItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );
    const deliveryCharge = cartItems.length > 0 ? 30 : 0;
    const handlingCharge = cartItems.length > 0 ? 5 : 0;

    const grandTotal =
        itemsTotal + deliveryCharge + handlingCharge;

    const totalSavings = itemsTotalMrp - itemsTotal;

    const moreToSave = 44;
    const deliverySaving = 30;




    return (
        <CartContext.Provider
            value={{
                cartItems,
                // Functions
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                // Calculations
                numberOfItems,
                itemsTotalMrp,
                itemsTotal,
                deliveryCharge,
                handlingCharge,
                grandTotal,
                totalSavings,
                moreToSave,
                deliverySaving,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);