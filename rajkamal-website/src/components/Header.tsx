import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { publications } from '../data/publicationData';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
    const { cartCount, toggleCart } = useCart();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navItems = [
        // { name: 'Books', href: '/' },
        { name: 'Authors', href: '/authors' },
        { name: 'E-Books', href: '/ebooks' },
        { name: 'Publications', href: '/publications', hasDropdown: true },
        { name: 'Student Corner', href: '/student-corner' },
        { name: 'Blog', href: '/blog' },
        { name: 'Events', href: '/events' },
        { name: 'Press Corner', href: '/press' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-white sticky top-0 z-50 py-4 border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center">
                            <img
                                src="/rajkamal_logo.svg"
                                alt="Rajkamal Logo"
                                className="w-[120px] h-auto sm:w-[150px]"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex space-x-6 items-center">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative" ref={item.hasDropdown ? dropdownRef : null}>
                                {item.hasDropdown ? (
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="text-gray-600 hover:text-primary px-1 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                                    >
                                        {item.name}
                                        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                ) : (
                                    <Link
                                        to={item.href}
                                        className="text-gray-600 hover:text-primary px-1 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                )}

                                {/* Desktop Dropdown */}
                                {item.hasDropdown && isDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50">
                                        <div className="grid grid-cols-4 gap-4">
                                            {publications.map((pub) => (
                                                <Link
                                                    key={pub.name}
                                                    to={pub.href}
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-red-100"
                                                >
                                                    <div className="w-12 h-12 flex items-center justify-center mb-2">
                                                        <img
                                                            src={pub.image}
                                                            alt={pub.name}
                                                            className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                                                        />
                                                    </div>
                                                    <span className="text-[10px] uppercase font-bold text-gray-500 group-hover:text-red-600 text-center tracking-tighter leading-none">
                                                        {pub.name}
                                                    </span>
                                                </Link>
                                            ))}
                                            <Link
                                                to="/publications"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="col-span-4 mt-2 py-2 text-center text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-dashed border-red-200"
                                            >
                                                View All Publications
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/account" className="flex items-center text-gray-500 hover:text-primary transition-colors text-sm font-medium">
                            <User className="h-5 w-5 mr-2" />
                            My Account
                        </Link>
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
                    <div className="flex-1 overflow-y-auto py-4 px-6 space-y-2">
                        {navItems.map((item) => (
                            <React.Fragment key={item.name}>
                                {item.hasDropdown ? (
                                    <div className="border-b border-gray-50 last:border-0 py-2">
                                        <button
                                            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                                            className="flex items-center justify-between w-full text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                                        >
                                            {item.name}
                                            <ChevronDown className={`w-5 h-5 transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isMobileDropdownOpen && (
                                            <div className="grid grid-cols-2 gap-3 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                {publications.map((pub) => (
                                                    <Link
                                                        key={pub.name}
                                                        to={pub.href}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors group"
                                                    >
                                                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                                                            <img src={pub.image} alt={pub.name} className="max-w-full max-h-full object-contain" />
                                                        </div>
                                                        <span className="text-[10px] font-bold text-gray-600 group-hover:text-red-600 line-clamp-1 uppercase">
                                                            {pub.name}
                                                        </span>
                                                    </Link>
                                                ))}
                                                <Link
                                                    to="/publications"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="col-span-2 py-2 text-center text-xs font-bold text-red-600 bg-red-50 rounded-lg"
                                                >
                                                    View All
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors py-2 border-b border-gray-50 last:border-0"
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
                        <Link to="/account" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center w-full py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-white hover:border-gray-300 transition-all shadow-sm">
                            <User className="h-5 w-5 mr-2" />
                            My Account
                        </Link>
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
