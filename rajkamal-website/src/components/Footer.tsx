import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full">
            {/* Newsletter Section */}
            <div className="bg-[#A4343A] py-12 sm:py-[88px] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-white text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Get newsletter offers and news</h2>
                        <p className="text-lg opacity-90">नवीनतम पुस्तकों और ऑफ़र्स की जानकारी पाएं</p>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                        <div className="relative flex-grow md:w-96">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-transparent border border-dotted border-white/40 rounded-full py-3 px-6 text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <button className="bg-white text-[#A4343A] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto">
                            Subscribe <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="bg-[#0F172A] text-gray-300 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img
                                src="/rajkamal_logo.svg"
                                alt="Rajkamal Logo"
                                className="w-[120px] h-auto sm:w-[180px]"
                            />
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400">
                            India's leading Hindi publishing house bringing you the finest literature since decades.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-red-500 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Categories</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-red-500 transition-colors">Fiction</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Poetry</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Non-Fiction</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Children's Books</a></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Customer Service</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-red-500 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Track Order</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Returns</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Shipping Info</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-[#0F172A] border-t border-gray-800 py-6 px-4">
                <p className="text-center text-gray-500 text-sm">
                    © 2025 राजकमल प्रकाशन समूह. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
