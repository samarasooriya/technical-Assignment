import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        const errors = {};
        if (!name.trim()) {
            errors.name = 'Name is required';
        }
        if (!description.trim()) {
            errors.description = 'Description is required';
        }
        if (!price.trim()) {
            errors.price = 'Price is required';
        } else if (isNaN(price)) {
            errors.price = 'Price must be a number';
        }

        if (Object.keys(errors).length === 0) {
            const productData = {
                name: name,
                description: description,
                price: price,
            }
            try {
                const response = await axios.post("http://localhost:8008/api/products/add", productData);
                console.log('Product added:', response.data);
                // Clear form fields after successful submission
                setName('');
                setDescription('');
                setPrice('');
                navigate('/products')
            } catch (error) {
                console.error('Error adding product:', error);
            }
        } else {
            setErrors(errors);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}  className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                    <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)}  className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>
                <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Product</button>
            </form>
        </div>
    );
};

export default ProductForm;
