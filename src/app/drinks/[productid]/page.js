"use client";

import React, { useState, useContext } from 'react';
import products from '../../../../data/products';
import { useParams } from "next/navigation";
import { CartContext } from './../../context/CardContent';

export default function Product() {
    const { productid } = useParams();
    const { addToCart } = useContext(CartContext);
    const product = products.find((p) => p.productid === productid);
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);

    if (!product) {
        return <div className='text-center text-red-500'>Product not found</div>;
    }

    const handleAdd = () => setQuantity(quantity + 1);
    const handleMinus = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        addToCart(
            {
                id: product.productid,
                title: product.productname,
                price: product.productprice,
                image: product.productimage,
            },
            quantity
        );

        // Show the modal for 2 seconds
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    return (
        <div className='flex flex-col items-center p-6'>
            <div className='w-full max-w-4xl flex border border-gray-300 rounded-lg p-4 shadow-lg'>
                {/* Left Side - Image, Title, and Description */}
                <div className='w-1/2 flex flex-col gap-4'>
                    <img src={product.productimage} alt={product.productname} className='w-full h-48 object-cover rounded-lg' />
                    <h2 className='text-xl font-bold'>{product.productname}</h2>
                    <p className='text-gray-600'>{product.productdescription}</p>
                </div>

                {/* Right Side - Price and Quantity Controls */}
                <div className='w-1/2 flex flex-col justify-between items-end'>
                    <h3 className='text-2xl font-semibold'>₱{Number(product.productprice).toFixed(2)}</h3>
                    <div className='flex items-center gap-4'>
                        <button onClick={handleMinus} className='px-3 py-1 bg-gray-200 rounded-lg text-lg'>-</button>
                        <span className='text-xl font-medium'>{quantity}</span>
                        <button onClick={handleAdd} className='px-3 py-1 bg-gray-200 rounded-lg text-lg'>+</button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg"
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>

            {/* Success Modal */}
            {showModal && (
                <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-500">
                    ✅ {product.productname} added to cart!
                </div>
            )}
        </div>
    );
}
