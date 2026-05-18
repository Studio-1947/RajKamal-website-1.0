import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { Palette } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            
            {/* Floating Customizer Button */}
            <Link 
                to="/footer-designs" 
                className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-gray-900 hover:bg-[#A4343A] text-white text-xs font-extrabold uppercase tracking-wider px-5 py-3.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
                <Palette className="w-4 h-4 text-red-500 group-hover:text-white transition-colors duration-300" />
                <span>Footer Style</span>
            </Link>
        </div>
    );
};

export default Layout;
