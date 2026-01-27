import React from 'react';

const FeaturedEvent: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="w-full lg:w-2/3">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100">
                    <img
                        src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Stree Barsh 2026"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Placeholder for the specific bag/book image if not available, using a generic one for now */}
                        {/* In a real scenario, we would use the exact image from the design */}
                    </div>
                </div>
            </div>

            <div className="w-full space-y-6 lg:w-1/3">
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-gray-600">
                        Celebrating Literature in the Heart of Bihar Rajkamal Prakashan invites you to the historic Gandhi Maidan for a 12-day literary celebration. This year, we bring you our latest 2025 releases, including Kaya Aur Maya and Sukhan Tumhare. Visit our stall to engage in "Jan Samwad" (People's Dialogue), attend exclusive book launches, and explore a vast collection of Hindi novels, poetry, and criticism.
                    </p>
                </div>

                <div className="grid gap-4">
                    <div className="rounded-lg bg-[#FFF5E6] p-4">
                        <p className="text-xs text-gray-500">Start</p>
                        <p className="text-lg font-bold text-[#D93025]">05 Dec 2025</p>
                    </div>

                    <div className="rounded-lg bg-[#FFF5E6] p-4">
                        <p className="text-xs text-gray-500">End</p>
                        <p className="text-lg font-bold text-[#D93025]">16 Dec 2025</p>
                    </div>

                    <div className="rounded-lg bg-[#FFF5E6] p-4">
                        <p className="text-xs text-gray-500">Venue</p>
                        <p className="text-lg font-bold text-[#D93025]">Gandhi Maidan, Patna, Bihar</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                    <div>
                        <p className="text-xs text-gray-500">Stalls</p>
                        <p className="text-lg font-bold text-[#0066CC]">200+</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Meets</p>
                        <p className="text-lg font-bold text-[#0066CC]">Author</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Cultural Program</p>
                        <p className="text-lg font-bold text-[#0066CC]">Various</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedEvent;
