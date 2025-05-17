"use client";

import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './../context/CardContent';
import { Trash2 } from 'lucide-react';

export default function Carts() {
    const { cart, removeFromCart } = useContext(CartContext);
    const [cartJson, setCartJson] = useState(null);
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    // Convert cart to JSON
    useEffect(() => {
        if (cart.length > 0) {
            const cartData = {
                orders: cart.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    total: (item.price * item.quantity).toFixed(2),
                })),
                totalAmount: totalAmount,
            };

            setCartJson(JSON.stringify(cartData, null, 2));
        } else {
            setCartJson(null);
        }
    }, [cart, totalAmount]);

    const handleSaveCart = async () => {
        if (!cartJson) return;

        try {
            const response = await fetch('/api/saveCart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: cartJson
            });

            const data = await response.json();
            if (data.success) {
                alert(`Order Saved! Order ID: ${data.orderID}`);
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Failed to save cart:", error);
            alert("Failed to save cart.");
        }
    };


    return (
        <div className='p-6 relative'>
            {/* Total Price - Upper Right Position */}
            <div className="absolute top-6 right-6 bg-white text-black px-6 py-3 rounded-lg">
                <h2 className="text-2xl font-bold">Total: ₱{totalAmount}</h2>
            </div>

            <h1 className='text-2xl font-bold mb-4'>Your Cart</h1>
            {cart.length === 0 ? (
                <p className='text-gray-500'>Your cart is empty.</p>
            ) : (
                <>
                    <ul className='space-y-4 mt-8'>
                        {cart.map((item, index) => (
                            <li key={index} className='flex justify-between items-center border-b border-gray-200 py-4'>
                                <div>
                                    <h2 className='text-lg font-semibold'>{item.title}</h2>
                                    <p className='text-gray-600'>₱{Number(item.price).toFixed(2)} x {item.quantity}</p>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <span className='text-xl font-medium'>₱{(item.price * item.quantity).toFixed(2)}</span>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                                        title="Delete item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleSaveCart}
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
                    >
                        Save Order
                    </button>

                    {/* Display JSON Data */}
                    {/* <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                        <h2 className='text-lg font-semibold mb-2'>Cart JSON Data:</h2>
                        <pre className="text-sm bg-white p-2 rounded-lg border overflow-auto">{cartJson}</pre>
                    </div> */}
                </>
            )}
        </div>
    );
}
