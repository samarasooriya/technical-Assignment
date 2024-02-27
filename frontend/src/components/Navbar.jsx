import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem('token');
        // Redirect to the login page
        navigate('/');
    };

    return (
        <div className="w-screen h-auto p-2 text-white bg-blue-950">
            <div className='flex items-center justify-between max-w-screen-xl p-2 mx-auto'>
                <Link to='/products' className="text-4xl font-bold">Products</Link>
                <div className="flex items-center">
                    <Link to='/products' className="mx-4">Products</Link>
                    {token && <Link to='/addproducts' className="mx-4">Add Product</Link>}
                    {token && <button onClick={handleLogout} className="mx-4">Logout</button>}
                    {!token && <Link to='/' className="mx-4">Login</Link>}
                    {!token && <Link to='/register' className="mx-4">Register</Link>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
