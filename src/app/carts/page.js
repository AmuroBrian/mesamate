"use client";

import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './../context/CardContent';

export default function Carts() {
    const { cart } = useContext(CartContext);
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

    return (
        <div className='p-6 relative'>
            {/* Total Price - Upper Right Position */}
            <div className="absolute top-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Total: ₱{totalAmount}</h2>
            </div>

            <h1 className='text-2xl font-bold mb-4'>Your Cart</h1>
            {cart.length === 0 ? (
                <p className='text-gray-500'>Your cart is empty.</p>
            ) : (
                <>
                    <ul className='space-y-4'>
                        {cart.map((item, index) => (
                            <li key={index} className='flex justify-between items-center border p-4 rounded-lg shadow-md'>
                                <div>
                                    <h2 className='text-lg font-semibold'>{item.title}</h2>
                                    <p className='text-gray-600'>₱{Number(item.price).toFixed(2)} x {item.quantity}</p>
                                </div>
                                <span className='text-xl font-medium'>₱{(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>

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
