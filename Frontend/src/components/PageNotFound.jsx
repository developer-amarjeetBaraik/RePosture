import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Functional component for displaying a 404 Page Not Found message.
 * @returns JSX element displaying the 404 error message and a link to the home page.
 */
const PageNotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
            <div className="max-w-xl text-center">
                <h1 className="text-6xl sm:text-8xl font-bold text-red-500 mb-4">404</h1>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-gray-300 mb-6">
                    The page you're looking for doesn’t exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 rounded-full text-white font-medium shadow-lg"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;
