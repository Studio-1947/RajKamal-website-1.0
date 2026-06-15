import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
    Truck, Zap, MapPin, CreditCard, Wallet, Smartphone,
    AlertCircle, Camera, Package, BookOpen, ShieldCheck,
    Headphones, Users, RotateCcw, Check, Mail, Ticket,
    Clock, RefreshCw
} from 'lucide-react';

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeUp = (delay = 0): Variants => ({
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { delay, duration: 0.45, ease: 'easeOut' } },
});

// ─── Shared Section Header ─────────────────────────────────────────────────────
const SectionHeading: React.FC<{
    num: string;
    icon: React.FC<{ className?: string }>;
    title: string;
    bgColor: string;
    textColor: string;
}> = ({ num, icon: Icon, title, bgColor, textColor }) => (
    <div className={`px-5 py-4 flex items-center gap-3 border-b border-[#E2D9CE]/40 ${bgColor}`}>
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[11px] font-black" style={{ color: textColor }}>
            {num}
        </div>
        <Icon className="w-4 h-4 text-white" />
        <h2 className="text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-widest">{title}</h2>
    </div>
);

const ShippingDelivery: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#FAF7F2] font-sans selection:bg-[#A4343A]/10 selection:text-[#A4343A]">

            {/* ── Hero ────────────────────────────────────────────────────────── */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#8B1F25] to-[#A4343A] py-14 sm:py-16">
                <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 right-10 w-96 h-96 rounded-full bg-black/10 blur-3xl pointer-events-none" />

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white/60 text-[10px] font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-3"
                    >
                        <span className="w-6 h-px bg-white/20" />
                        Rajkamal Prakashan Samuh
                        <span className="w-6 h-px bg-white/20" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05, type: 'spring' }}
                        className="mb-4"
                    >
                        <img
                            src="/LogoIcon2_rajkamallogo.svg"
                            alt="Rajkamal Prakashan Logo"
                            className="h-10 w-auto object-contain brightness-0 invert opacity-95"
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3"
                    >
                        Shipping &amp; Delivery
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18, duration: 0.4 }}
                        className="text-white/70 text-xs sm:text-sm font-semibold tracking-wider uppercase"
                    >
                        Fast. Reliable. Safe Delivery of Books to Your Doorstep.
                    </motion.p>
                </div>
            </div>

            {/* ── Row 1: Dispatch · Delivery Timeline · Shipping Charges ─────── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Col 1 — Fast Dispatch */}
                    <motion.div
                        variants={fadeUp(0)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl border border-[#E2D9CE] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                        <SectionHeading num="1" icon={Zap} title="Fast Dispatch" bgColor="bg-[#8B1F25]" textColor="#8B1F25" />
                        <div className="p-6 flex-1 flex flex-col gap-5">

                            {/* Standard dispatch box */}
                            <div className="flex items-center gap-4 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl px-4 py-4">
                                <div className="w-12 h-12 rounded-xl bg-[#A4343A] flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                                    <Clock className="w-4 h-4 text-white mb-0.5" />
                                    <span className="text-base font-black text-white leading-none">1–2</span>
                                    <span className="text-[7px] font-bold uppercase tracking-wide text-white/80">days</span>
                                </div>
                                <p className="text-[#6B5E52] text-xs leading-snug">
                                    Most orders dispatched within <span className="font-bold text-[#1A1A1A]">1–2 business days</span> of payment confirmation.
                                </p>
                            </div>

                            <div className="bg-[#B48425] text-white py-2 px-3 text-center uppercase tracking-wider text-[9px] font-black rounded-lg shadow-sm">
                                Business Days: Monday – Saturday
                            </div>

                            {/* High-demand notice */}
                            <div className="flex items-start gap-3 bg-[#FAF7F2]/80 border border-[#E2D9CE]/60 rounded-xl p-3">
                                <div className="w-5 h-5 rounded-full bg-[#8B1F25]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <AlertCircle className="w-3.5 h-3.5 text-[#8B1F25]" />
                                </div>
                                <p className="text-[#6B5E52] text-xs leading-snug">
                                    During <span className="font-bold text-[#1A1A1A]">book fairs, sales &amp; festivals</span>, dispatch may take up to{' '}
                                    <span className="font-bold text-[#A4343A]">3–4 business days</span>.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Col 2 — Delivery Timeline */}
                    <motion.div
                        variants={fadeUp(0.08)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl border border-[#E2D9CE] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                        <SectionHeading num="2" icon={Truck} title="Delivery Timeline" bgColor="bg-[#B48425]" textColor="#B48425" />
                        <div className="p-6 flex-1 flex flex-col gap-4">

                            {[
                                { zone: 'Metro Cities', sub: 'Delhi, Mumbai, Bengaluru, Kolkata, Chennai…', days: '2–4', color: '#8B1F25', icon: MapPin },
                                { zone: 'Tier-2 & Tier-3 Cities', sub: 'All major towns & cities across India', days: '3–6', color: '#B48425', icon: MapPin },
                                { zone: 'Remote & North-East', sub: 'Remote locations & North-East India', days: '5–10', color: '#6B5E52', icon: MapPin },
                            ].map((z, i) => (
                                <div key={i} className="flex items-center gap-3 bg-[#FAF7F2]/60 border border-[#E2D9CE]/60 rounded-xl px-4 py-3">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: z.color + '18' }}>
                                        <z.icon className="w-4 h-4" style={{ color: z.color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[#1A1A1A] text-xs font-bold leading-tight">{z.zone}</p>
                                        <p className="text-[#9B8C80] text-[9px] leading-tight mt-0.5 truncate">{z.sub}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <span className="text-sm font-black" style={{ color: z.color }}>{z.days}</span>
                                        <p className="text-[9px] text-[#9B8C80] font-semibold uppercase tracking-wide">Days</p>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-1 flex items-start gap-2 bg-[#FAF7F2] border border-[#E2D9CE]/50 rounded-xl p-3">
                                <AlertCircle className="w-3.5 h-3.5 text-[#9B8C80] flex-shrink-0 mt-0.5" />
                                <p className="text-[#9B8C80] text-[9px] leading-snug">
                                    Timelines are estimates and may vary due to courier delays, public holidays, or weather conditions.
                                </p>
                            </div>

                            <div className="mt-auto flex items-center gap-2 bg-[#8B1F25]/5 border border-[#8B1F25]/10 rounded-xl p-3">
                                <AlertCircle className="w-3.5 h-3.5 text-[#8B1F25] flex-shrink-0" />
                                <p className="text-[#8B1F25] text-[9px] font-bold uppercase tracking-wide">International Orders — Currently Not Supported</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Col 3 — Shipping Charges */}
                    <motion.div
                        variants={fadeUp(0.16)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl border border-[#E2D9CE] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                        <SectionHeading num="3" icon={CreditCard} title="Shipping Charges" bgColor="bg-[#8B1F25]" textColor="#8B1F25" />
                        <div className="p-6 flex-1 flex flex-col gap-5">

                            {/* Prepaid */}
                            <div className="rounded-xl border border-[#E2D9CE] overflow-hidden">
                                <div className="bg-[#FAF7F2] border-b border-[#E2D9CE] px-4 py-2.5 flex items-center gap-2">
                                    <CreditCard className="w-3.5 h-3.5 text-[#8B1F25]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#8B1F25]">Prepaid Orders</span>
                                </div>
                                <div className="divide-y divide-[#E2D9CE]/60">
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        <div className="w-5 h-5 rounded-full bg-[#8B1F25]/10 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3.5 h-3.5 text-[#8B1F25]" />
                                        </div>
                                        <p className="text-xs text-[#4A3E34] flex-1">Orders above <span className="font-bold text-[#1A1A1A]">₹1200</span></p>
                                        <span className="text-xs font-black text-[#8B1F25] whitespace-nowrap">Free Shipping</span>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        <div className="w-5 h-5 rounded-full bg-[#8B1F25]/10 flex items-center justify-center flex-shrink-0">
                                            <Truck className="w-3.5 h-3.5 text-[#8B1F25]" />
                                        </div>
                                        <p className="text-xs text-[#4A3E34] flex-1">Orders below <span className="font-bold text-[#1A1A1A]">₹1200</span></p>
                                        <span className="text-xs font-black text-[#8B1F25] whitespace-nowrap">₹70 Charge</span>
                                    </div>
                                </div>
                            </div>

                            {/* COD */}
                            <div className="rounded-xl border border-[#E2D9CE] overflow-hidden">
                                <div className="bg-[#FAF7F2] border-b border-[#E2D9CE] px-4 py-2.5 flex items-center gap-2">
                                    <Wallet className="w-3.5 h-3.5 text-[#B48425]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#B48425]">Cash on Delivery (COD)</span>
                                </div>
                                <div className="divide-y divide-[#E2D9CE]/60">
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        <div className="w-5 h-5 rounded-full bg-[#B48425]/10 flex items-center justify-center flex-shrink-0">
                                            <Truck className="w-3.5 h-3.5 text-[#B48425]" />
                                        </div>
                                        <p className="text-xs text-[#4A3E34] flex-1">Shipping Charge</p>
                                        <span className="text-xs font-black text-[#B48425] whitespace-nowrap">₹70</span>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        <div className="w-5 h-5 rounded-full bg-[#B48425]/10 flex items-center justify-center flex-shrink-0">
                                            <Wallet className="w-3.5 h-3.5 text-[#B48425]" />
                                        </div>
                                        <p className="text-xs text-[#4A3E34] flex-1">COD Handling Charge</p>
                                        <span className="text-xs font-black text-[#B48425] whitespace-nowrap">₹50</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Row 2: Order Tracking · Failed Delivery · Damaged Product ──── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Col 4 — Order Tracking */}
                    <motion.div
                        variants={fadeUp(0)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl border border-[#E2D9CE] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                        <SectionHeading num="4" icon={MapPin} title="Track Your Order" bgColor="bg-[#8B1F25]" textColor="#8B1F25" />
                        <div className="p-6 flex-1 flex flex-col gap-5">

                            <div className="flex items-center gap-4 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl px-4 py-4">
                                <div className="w-12 h-12 rounded-xl bg-[#A4343A] flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <Smartphone className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-[#6B5E52] text-xs leading-snug">
                                    Once dispatched, you will receive a <span className="font-bold text-[#1A1A1A]">WhatsApp notification</span> with tracking details.
                                </p>
                            </div>

                            <div className="bg-[#B48425] text-white py-2 px-3 text-center uppercase tracking-wider text-[9px] font-black rounded-lg shadow-sm">
                                Live Shipment Tracking Available
                            </div>

                            {[
                                { label: 'Real-time tracking updates', icon: RefreshCw },
                                { label: 'WhatsApp delivery alerts', icon: Smartphone },
                                { label: 'Track via our Order Tracking page', icon: MapPin },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-[#FAF7F2]/60 p-3 rounded-xl border border-[#E2D9CE]/50">
                                    <div className="w-5 h-5 rounded-full bg-[#8B1F25]/10 flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-3.5 h-3.5 text-[#8B1F25]" />
                                    </div>
                                    <span className="text-[#4A3E34] text-xs font-semibold">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Col 5 — Failed Delivery */}
                    <motion.div
                        variants={fadeUp(0.08)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl border border-[#E2D9CE] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                        <SectionHeading num="5" icon={AlertCircle} title="Failed Delivery" bgColor="bg-[#B48425]" textColor="#B48425" />
                        <div className="p-6 flex-1 flex flex-col gap-5">

                            {/* Attempts box */}
                            <div className="flex items-center gap-4 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl px-4 py-4">
                                <div className="w-12 h-12 rounded-xl bg-[#B48425] flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                                    <Truck className="w-4 h-4 text-white mb-0.5" />
                                    <span className="text-base font-black text-white leading-none">3</span>
                                    <span className="text-[7px] font-bold uppercase tracking-wide text-white/80">tries</span>
                                </div>
                                <p className="text-[#6B5E52] text-xs leading-snug">
                                    Our logistics partner will make up to <span className="font-bold text-[#1A1A1A]">3 delivery attempts</span> before returning the order.
                                </p>
                            </div>

                            <ul className="space-y-3">
                                {[
                                    { text: 'If delivery is unsuccessful after 3 attempts, the order will be returned to us.', icon: RotateCcw },
                                    { text: 'You may contact us to arrange a re-dispatch; additional shipping charges may apply.', icon: Truck },
                                    { text: 'Ensure your contact number and address are accurate to avoid missed deliveries.', icon: Check },
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-start text-xs text-[#5C4D40] leading-snug">
                                        <div className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#E2D9CE] flex items-center justify-center flex-shrink-0 text-[#B48425] mt-0.5 shadow-sm">
                                            <item.icon className="w-3.5 h-3.5" />
                                        </div>
                                        <p className="flex-1 pt-0.5">{item.text}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Col 6 — Damaged in Transit */}
                    <motion.div
                        variants={fadeUp(0.16)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl border border-[#E2D9CE] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                        <SectionHeading num="6" icon={Camera} title="Damaged Product?" bgColor="bg-[#8B1F25]" textColor="#8B1F25" />
                        <div className="p-6 flex-1 flex flex-col gap-4">

                            <div className="flex items-center gap-4 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl px-4 py-4">
                                <div className="w-12 h-12 rounded-xl bg-[#A4343A] flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                                    <Clock className="w-4 h-4 text-white mb-0.5" />
                                    <span className="text-base font-black text-white leading-none">48</span>
                                    <span className="text-[7px] font-bold uppercase tracking-wide text-white/80">hrs</span>
                                </div>
                                <p className="text-[#6B5E52] text-xs leading-snug">
                                    Report damaged items within <span className="font-bold text-[#1A1A1A]">48 hours</span> of delivery with clear photographs.
                                </p>
                            </div>

                            {/* 3 Photo Cards */}
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: 'Product Photos', icon: BookOpen },
                                    { label: 'Packaging Images', icon: Package },
                                    { label: 'Damage / Defect', icon: Camera },
                                ].map((p, i) => (
                                    <div key={i} className="bg-[#FAF7F2]/50 border border-[#E2D9CE] rounded-xl p-2.5 flex flex-col items-center justify-between text-center min-h-[88px] hover:border-[#A4343A]/40 transition-colors">
                                        <div className="w-7 h-7 rounded-full bg-white border border-[#E2D9CE] flex items-center justify-center text-[#A4343A] shadow-sm">
                                            <p.icon className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-[9px] text-[#5C4A3C] font-bold leading-tight mt-2">{p.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-[#E2D9CE]/70" />

                            <div className="flex items-start gap-2.5 bg-[#FAF7F2]/80 p-3 border border-[#E2D9CE]/50 rounded-xl text-xs text-[#6B5E52] leading-relaxed">
                                <Ticket className="w-4 h-4 text-[#A4343A] flex-shrink-0 mt-0.5" />
                                <p>
                                    Raise a ticket via our <span className="font-bold text-[#1A1A1A]">Help Desk</span> or email us directly — we'll arrange a replacement or refund at no additional cost.
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[11px] text-[#6B5E52] flex items-start gap-1.5">
                                    <Mail className="w-4 h-4 text-[#A4343A] flex-shrink-0 mt-0.5" />
                                    <span>Email us at:</span>
                                </p>
                                <div className="bg-[#8B1F25] text-white text-center py-2 rounded-lg font-bold text-xs tracking-wide select-all hover:bg-[#A4343A] transition-colors shadow-sm">
                                    online@rajkamalprakashan.com
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Trust Badges Strip ─────────────────────────────────────────── */}
            <div className="bg-[#5C1217] py-8 shadow-inner">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { title: 'Genuine Books', desc: '100% Authentic & Original Publications', icon: BookOpen },
                            { title: 'Secure Payments', desc: 'Safe, Trusted & Encrypted Transactions', icon: ShieldCheck },
                            { title: 'Fast Dispatch', desc: 'Quick Processing & On-Time Delivery', icon: Truck },
                            { title: 'Dedicated Support', desc: "We're Here to Help You Always", icon: Headphones },
                            { title: 'Easy Returns', desc: 'Transparent & Hassle-Free Process', icon: RotateCcw },
                            { title: 'Trusted by Readers', desc: 'Across India for Over 75+ Years', icon: Users },
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center text-center gap-2 group">
                                <div className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 border border-white/20 flex items-center justify-center group-hover:bg-[#FAF7F2] group-hover:text-[#5C1217] transition-all duration-300">
                                    <b.icon className="w-5 h-5 text-[#FAF7F2] group-hover:text-[#5C1217] transition-colors" />
                                </div>
                                <div>
                                    <p className="text-white text-xs font-black tracking-wide leading-tight">{b.title.toUpperCase()}</p>
                                    <p className="text-white/60 text-[9px] mt-0.5 leading-snug max-w-[140px] mx-auto">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Bottom Tagline ─────────────────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-[#EFE8DF] border border-[#E2D9CE] rounded-full py-3 px-6 flex items-center justify-center shadow-sm">
                    <p className="text-[#9B8C80] text-[10px] sm:text-xs text-center font-semibold leading-none">
                        We are committed to delivering your books safely and on time. —{' '}
                        <span className="font-bold text-[#6B5E52]">Thank you for choosing Rajkamal Prakashan Pvt. Ltd.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShippingDelivery;
