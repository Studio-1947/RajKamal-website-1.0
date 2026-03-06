import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount, toggleCart } = useCart();

    const navItems = [
        { name: 'Books', href: '/' },
        { name: 'Authors', href: '/authors' },
        { name: 'E-Books', href: '/ebooks' },
        { name: 'Student Corner', href: '/student-corner' },
        { name: 'Blog', href: '/blog' },
        { name: 'Events', href: '/events' },
        { name: 'Press Corner', href: '/press' },
    ];

    return (
        <header className="bg-white sticky top-0 z-50 py-4 border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="flex items-center">
                            <img
                                src="/rajkamal_logo.svg"
                                alt="Rajkamal Logo"
                                className="w-[120px] h-auto sm:w-[150px]"
                            />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex space-x-6">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-gray-600 hover:text-primary px-1 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#" className="flex items-center text-gray-500 hover:text-primary transition-colors text-sm font-medium">
                            <User className="h-5 w-5 mr-2" />
                            My Account
                        </a>
                        <button
                            onClick={toggleCart}
                            className="flex items-center bg-primary text-white px-5 py-2 rounded-full hover:bg-red-700 transition-colors shadow-md relative"
                        >
                            <span className="mr-2 text-sm font-medium">Cart</span>
                            <div className="bg-white/20 rounded-full p-1">
                                <ShoppingCart className="h-4 w-4" />
                            </div>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-700 text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="xl:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-primary focus:outline-none"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`xl:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
                <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col">
                    <div className="p-4 flex justify-end border-b border-gray-100">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors py-2 border-b border-gray-50 last:border-0"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
                        <a href="#" className="flex items-center justify-center w-full py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-white hover:border-gray-300 transition-all shadow-sm">
                            <User className="h-5 w-5 mr-2" />
                            My Account
                        </a>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                toggleCart();
                            }}
                            className="flex items-center justify-center w-full bg-primary text-white py-3 px-4 rounded-xl font-medium hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                        >
                            <span className="mr-2">View Cart {cartCount > 0 && `(${cartCount})`}</span>
                            <ShoppingCart className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
