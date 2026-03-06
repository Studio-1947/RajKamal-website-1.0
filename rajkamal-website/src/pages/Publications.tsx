import { Link } from 'react-router-dom';
import { ChevronRight, LayoutGrid } from 'lucide-react';

const publications = [
    { name: 'Akshar Prakashan', image: '/publication/akshar_lo.png' },
    { name: 'Bani Prakashan', image: '/publication/bani.jpg' },
    { name: 'Fanda', image: '/publication/fanda.jpg' },
    { name: 'Hans', image: '/publication/han.jpg' },
    { name: 'Lokbharti', image: '/publication/lokh.jpg' },
    { name: 'Purvanchal', image: '/publication/pur.jpg' },
    { name: 'Rajkamal', image: '/publication/ra.jpg' },
    { name: 'Radhakrishna', image: '/publication/radha.jpg' },
    { name: 'Remadhav', image: '/publication/re.jpg' },
    { name: 'Rekhta', image: '/publication/rekhta_1.jpg' },
    { name: 'Sahitya', image: '/publication/sahi.jpg' },
    { name: 'Saransh', image: '/publication/sarn.jpg' },
    { name: 'Sarthak', image: '/publication/sart.jpg' },
];

const Publications = () => {
    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-red-500 hover:underline">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-gray-900 font-medium">Publications</span>
                </div>
            </div>

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="bg-gradient-to-r from-[#8B0000] to-[#C41E3A] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-lg">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-10 w-32 h-32 border border-white/30 rounded-full" />
                        <div className="absolute bottom-2 right-20 w-48 h-48 border border-white/20 rounded-full" />
                    </div>

                    <div className="relative z-10 flex items-center justify-center flex-col text-center">
                        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm mb-4">
                            <LayoutGrid className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Publications</h1>
                        <p className="text-white/80 max-w-2xl text-lg">
                            Rajkamal Prakashan Group brings together a diverse family of imprints, each committed to literary excellence and cultural depth.
                        </p>
                    </div>
                </div>
            </div>

            {/* Publications Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {publications.map((pub) => (
                        <div
                            key={pub.name}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-200 transition-all group flex flex-col items-center justify-center text-center aspect-square"
                        >
                            <div className="w-full h-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                                <img
                                    src={pub.image}
                                    alt={pub.name}
                                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                                />
                            </div>
                            <h2 className="mt-4 text-sm font-semibold text-gray-700 group-hover:text-red-600 transition-colors uppercase tracking-wider">{pub.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Publications;
