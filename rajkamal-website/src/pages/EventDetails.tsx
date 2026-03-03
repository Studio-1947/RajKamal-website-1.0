import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Share2, Clock, Map } from 'lucide-react';
import { events } from '../data/events';
import { motion } from 'framer-motion';

const EventDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const event = events.find(e => e.id === id);

    if (!event) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-32 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Event not found</h2>
                <Link to="/events" className="text-[#D93025] hover:underline font-bold inline-flex items-center gap-2">
                    <ArrowLeft className="h-5 w-5" /> Back to Events
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#FAFAFA] min-h-screen pb-20">
            {/* Hero Image Section with Dual Layer to prevent cropping */}
            <div className="relative h-[450px] md:h-[600px] w-full overflow-hidden bg-black">
                {/* Layer 1: Blurred Background */}
                <motion.img
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 0.5 }}
                    transition={{ duration: 1.5 }}
                    src={event.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-2xl"
                />

                {/* Layer 2: Contained Foreground Image */}
                <div className="absolute inset-0 flex items-center justify-center p-4 md:p-12">
                    <motion.img
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        src={event.image}
                        alt={event.title}
                        className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                    />
                </div>

                {/* Layer 3: Gradient Overlays for Readability */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full pb-24 md:pb-32 pt-32 px-4 z-10">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link to="/events" className="text-white/90 hover:text-white flex items-center gap-2 mb-6 w-fit bg-white/10 backdrop-blur-md px-4 py-2 rounded-full transition-all border border-white/20">
                                <ArrowLeft className="h-5 w-5" /> Back to Events
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-4"
                        >
                            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg ${event.status === 'Ongoing' ? 'bg-green-500 text-white' :
                                event.status === 'Upcoming' ? 'bg-[#F26B5E] text-white' :
                                    'bg-gray-500 text-white'
                                }`}>
                                {event.status}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-2xl max-w-4xl">
                                {event.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-12 md:-mt-20">

                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl shadow-gray-200/50 space-y-10"
                        >
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-4">
                                    <span className="w-2 h-10 bg-[#D93025] rounded-full"></span>
                                    About the Event (आयोजन के बारे में)
                                </h2>
                                <p className="text-gray-600 text-xl leading-relaxed font-medium">
                                    {event.description}
                                </p>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-[#D93025]" />
                                        Highlights (विशेष आकर्षण)
                                    </h3>
                                    <ul className="space-y-4">
                                        {['Meet renowned authors', 'Book launches and signings', 'Cultural performances', 'Workshops for children'].map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-gray-700">
                                                <div className="w-2 h-2 rounded-full bg-[#D93025]/30" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <Map className="h-5 w-5 text-[#D93025]" />
                                        Venue Features (स्थान की विशेषताएं)
                                    </h3>
                                    <ul className="space-y-4">
                                        {['Accessibility Friendly', 'Parking Available', 'Food Court', 'Reading Zones'].map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-gray-700">
                                                <div className="w-2 h-2 rounded-full bg-[#D93025]/30" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar Sticky Panel */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="lg:sticky lg:top-24 space-y-6"
                        >
                            <div className="bg-[#1A1A1A] text-white rounded-[32px] p-8 shadow-2xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D93025] rounded-full blur-[80px] opacity-20 -mr-10 -mt-10" />

                                <h3 className="text-2xl font-bold mb-8 relative z-10">Event Details (विवरण)</h3>

                                <div className="space-y-8 relative z-10">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white/10 p-3 rounded-2xl">
                                            <Calendar className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-1">Date</p>
                                            <p className="text-xl font-bold text-white">{event.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-white/10 p-3 rounded-2xl">
                                            <MapPin className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-1">Location</p>
                                            <p className="text-xl font-bold text-white">{event.location}</p>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full mt-10 bg-white text-black py-5 rounded-2xl font-bold hover:bg-[#D93025] hover:text-white transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 relative z-10">
                                    <Share2 className="h-5 w-5" /> Share Event
                                </button>
                            </div>

                            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
                                <h4 className="font-bold text-gray-900 mb-4">Need help?</h4>
                                <p className="text-gray-500 text-sm mb-6">If you have any questions regarding this event, please contact our support team.</p>
                                <button className="text-[#D93025] font-bold text-sm hover:underline">Contact Support &rarr;</button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
