import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { designs } from '../components/Footer';

const FooterDesigns: React.FC = () => {
    const [current, setCurrent] = useState(() => {
        const stored = localStorage.getItem('active-footer-design');
        if (stored !== null) {
            const index = parseInt(stored, 10);
            if (index >= 0 && index < designs.length) {
                return index;
            }
        }
        return 0;
    });

    const total = designs.length;
    const { name, description, component: ActiveFooter } = designs[current];

    const changeDesign = (index: number) => {
        setCurrent(index);
        localStorage.setItem('active-footer-design', String(index));
        // Dispatch local storage event for current tab live update
        window.dispatchEvent(new Event('storage'));
    };

    const prev = () => changeDesign((current - 1 + total) % total);
    const next = () => changeDesign((current + 1) % total);

    // Sync state if localStorage changes in other windows or contexts
    useEffect(() => {
        const handleStorage = () => {
            const stored = localStorage.getItem('active-footer-design');
            if (stored !== null) {
                const index = parseInt(stored, 10);
                if (index >= 0 && index < designs.length) {
                    setCurrent(index);
                }
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return (
        <div className="relative min-h-screen bg-gray-100 flex flex-col justify-between">
            {/* ── Top label bar ── */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white flex items-center justify-between px-6 py-4 shadow-lg border-b border-gray-800">
                <div className="flex flex-col">
                    <span className="text-[#A4343A] font-extrabold text-[10px] uppercase tracking-widest">
                        Design {current + 1} of {total}
                    </span>
                    <p className="font-bold text-base leading-tight text-white">{name}</p>
                    <p className="text-gray-400 text-xs hidden sm:block mt-0.5">{description}</p>
                </div>

                {/* Dots Picker */}
                <div className="flex items-center gap-2">
                    {designs.map((d, i) => (
                        <button
                            key={d.id}
                            onClick={() => changeDesign(i)}
                            className={`rounded-full transition-all duration-300 ${
                                i === current 
                                ? 'w-8 h-2.5 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' 
                                : 'w-2.5 h-2.5 bg-gray-600 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to Design ${i + 1}`}
                            title={d.name}
                        />
                    ))}
                </div>
            </div>

            {/* ── Footer preview area (offset for fixed top bar) ── */}
            <div className="flex-grow pt-[76px] flex flex-col justify-end bg-gray-50">
                <div className="w-full transition-all duration-500 ease-in-out">
                    <ActiveFooter />
                </div>
            </div>

            {/* ── Left floating arrow ── */}
            <button
                onClick={prev}
                aria-label="Previous design"
                className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-gray-950/80 text-white shadow-2xl flex items-center justify-center hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/10 backdrop-blur-md"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>

            {/* ── Right floating arrow ── */}
            <button
                onClick={next}
                aria-label="Next design"
                className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-gray-950/80 text-white shadow-2xl flex items-center justify-center hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/10 backdrop-blur-md"
            >
                <ChevronRight className="w-8 h-8" />
            </button>
        </div>
    );
};

export default FooterDesigns;
