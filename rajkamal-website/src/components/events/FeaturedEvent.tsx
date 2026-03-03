import React from 'react';
import { motion } from 'framer-motion';

const FeaturedEvent: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row gap-8 items-stretch bg-white rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 p-8 md:p-10"
        >
            {/* Left Image Section */}
            <div className="w-full lg:w-1/2 relative">
                <div className="relative aspect-[4/3] lg:h-full w-full overflow-hidden rounded-2xl bg-gray-100">
                    <img
                        src="/events/mumbai utsV.jpg"
                        alt="Stree Barsh 2026"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D93025]/40 to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[#D93025] font-black text-sm uppercase tracking-tighter">
                            Featured Edition
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Details Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                        Stree Barsh 2026 <br />
                        <span className="text-[#D93025]">(स्त्री वर्ष: एक विशेष आयोजन)</span>
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-600 font-medium italic">
                        "Celebrating Literature in the Heart of Bihar. राजकमल प्रकाशन का पटना गाँधी मैदान में भव्य साहित्यिक पर्व।"
                    </p>
                </div>

                {/* Description Text */}
                <p className="text-gray-500 leading-relaxed text-sm">
                    Rajkamal Prakashan invites you to the historic Gandhi Maidan for an extensive 12-day literary celebration. This year, we bring you our latest releases including "Kaya Aur Maya" and "Sukhan Tumhare". Visit our stall to engage in "Jan Samwad" (People's Dialogue), attend author launches, and explore a vast collection.
                </p>

                {/* Meta Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#FFF5E6] rounded-2xl p-6 border border-[#FFE8CC]">
                        <p className="text-xs text-[#D97706] font-bold uppercase tracking-widest mb-1">Duration (अवधि)</p>
                        <p className="text-xl font-black text-[#D93025]">05 Dec - 16 Dec 2025</p>
                    </div>
                    <div className="bg-[#EEF2FF] rounded-2xl p-6 border border-[#E0E7FF]">
                        <p className="text-xs text-[#4F46E5] font-bold uppercase tracking-widest mb-1">Highlights (विशेषता)</p>
                        <p className="text-xl font-black text-[#0066CC]">200+ Stalls</p>
                    </div>
                </div>

                <div className="pt-2">
                    <button className="bg-[#D93025] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-black transition-all transform hover:scale-[1.05] shadow-xl shadow-[#D93025]/20">
                        View Stall Details &rarr;
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default FeaturedEvent;
