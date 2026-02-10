import React from 'react';

const FeaturedEvent: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-6">
            {/* Left Image Section */}
            <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100">
                    <img
                        src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Stree Barsh 2026"
                        className="h-full w-full object-cover"
                    />
                    {/* Overlay Text if needed, similar to screenshot 'Stree Varsh' logo/text on image */}
                </div>
            </div>

            {/* Right Details Section */}
            <div className="w-full lg:w-1/2 space-y-6">
                {/* Description Text */}
                <p className="text-sm leading-relaxed text-gray-600">
                    Celebrating Literature in the Heart of Bihar Rajkamal Prakashan invites you to the historic Gandhi Maidan for a 12-day literary celebration. This year, we bring you our latest 2025 releases, including Kaya Aur Maya and Sukhan Tumhare. Visit our stall to engage in "Jan Samwad" (People's Dialogue), attend exclusive book launches, and explore a vast collection of Hindi novels, poetry, and criticism.
                </p>

                {/* Info Grid (Start, End) */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#FFF5E6] rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Start</p>
                        <p className="text-lg font-bold text-[#D93025]">05 Dec 2025</p>
                    </div>
                    <div className="bg-[#FFF5E6] rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">End</p>
                        <p className="text-lg font-bold text-[#D93025]">16 Dec 2025</p>
                    </div>
                </div>

                {/* Venue Box */}
                <div className="bg-[#FFF5E6] rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Venue</p>
                    <p className="text-lg font-bold text-[#D93025]">Gandhi Maidan, Patna, Bihar</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-500">Stalls</p>
                        <p className="text-xl font-bold text-[#0066CC]">200+</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Meets</p>
                        <p className="text-xl font-bold text-[#0066CC]">Author</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Cultural Program</p>
                        <p className="text-xl font-bold text-[#0066CC]">Various</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedEvent;
