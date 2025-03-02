"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import products from './../../../data/products';
import Link from 'next/link';

export default function Desserts() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFoods = products.filter(
        (p) => p.productcategory === "dessert" &&
            p.productname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full flex flex-col items-center px-4 py-6 gap-6">
            <input
                type="text"
                placeholder="Search foods..."
                className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {filteredFoods.map((food) => (
                    <motion.div
                        key={food.productid}
                        className="bg-white p-4 rounded-xl shadow-lg transition duration-300 relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Link href={`/desserts/${food.productid}`}>
                            <div className="cursor-pointer relative group">
                                <img
                                    src={food.productimage}
                                    alt={food.productname}
                                    className="w-full h-40 object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-50"
                                />
                                <div className="mt-2 text-left font-bold text-black text-2xl">PHP {food.productprice}</div>
                                <h2 className="mt-2 text-lg font-semibold text-right">{food.productname}</h2>
                                <motion.div
                                    className="absolute inset-0 bg-black bg-opacity-75 text-white flex items-center justify-center text-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                >
                                    {food.productdescription}
                                </motion.div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}