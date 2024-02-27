import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8008/api/products/${id}`);
            const { name, description, price } = response.data;
            setName(name);
            setDescription(description);
            setPrice(price);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            name: name,
            description: description,
            price: price,
        }
        try {
            const response = await axios.put(`http://localhost:8008/api/products/update/${id}`, productData);
            console.log('Product updated:', response.data);
            navigate('/products');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                    <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
