import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
    ShieldCheck, RotateCcw, Camera, Package, Wallet,
    Ticket, Mail, CreditCard, Truck, Gift, RefreshCw, Timer, Clock,
    BookOpen, Headphones, Users, Check
} from 'lucide-react';

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeUp = (delay = 0): Variants => ({
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { delay, duration: 0.45, ease: 'easeOut' } },
});



// ─── Shared Section Header Component ─────────────────────────────────────────
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

const ReturnRefundPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#FAF7F2] font-sans selection:bg-[#A4343A]/10 selection:text-[#A4343A]">
            
            {/* ── Hero Section (Typographic & Clean) ─────────────────────────── */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#8B1F25] to-[#A4343A] py-14 sm:py-16">
                {/* Decorative radial gradients */}
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

                    {/* Logo Icon */}
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

                    {/* Page Main Title */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3"
                    >
                        Return &amp; Refund Policy
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18, duration: 0.4 }}
                        className="text-white/70 text-xs sm:text-sm font-semibold tracking-wider uppercase"
                    >
                        Shop with Confidence – We're Here to Help!
                    </motion.p>
                </div>
            </div>

            {/* ── Policy Content (3 Columns) ────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Column 1: Return Eligibility */}
                    <motion.div 
                        variants={fadeUp(0)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl border border-[#E2D9CE] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                        <SectionHeading 
                            num="1" 
                            icon={ShieldCheck} 
                            title="Return Eligibility" 
                            bgColor="bg-[#8B1F25]" 
                            textColor="#8B1F25"
                        />
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div className="space-y-5">
                                {/* 48 Hours Timeline Box */}
                                <div className="flex items-center gap-4 bg-[#FAF7F2] border border-[#E2D9CE] rounded-xl px-4 py-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#A4343A] flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                                        <Clock className="w-4 h-4 text-white mb-0.5" />
                                        <span className="text-base font-black text-white leading-none">48</span>
                                        <span className="text-[7px] font-bold uppercase tracking-wide text-white/80">hrs</span>
                                    </div>
                                    <p className="text-[#6B5E52] text-xs leading-snug">
                                        Request a return within <span className="font-bold text-[#1A1A1A]">48 Hours (2 Days)</span> of receiving your order.
                                    </p>
                                </div>

                                {/* Acceptance header */}
                                <div className="bg-[#B48425] text-white py-2 px-3 text-center uppercase tracking-wider text-[9px] font-black rounded-lg shadow-sm">
                                    Returns are accepted only in the following cases:
                                </div>

                                {/* List of Cases */}
                                <ul className="space-y-2.5">
                                    {[
                                        { text: 'Wrong item received' },
                                        { text: 'Damaged or defective item received' },
                                        { text: 'Missing item in the package' }
                                    ].map((c, i) => (
                                        <li key={i} className="flex items-center gap-3 bg-[#FAF7F2]/60 p-3 rounded-xl border border-[#E2D9CE]/50">
                                            <div className="w-5 h-5 rounded-full bg-[#8B1F25]/10 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3.5 h-3.5 text-[#8B1F25]" />
                                            </div>
                                            <span className="text-[#4A3E34] text-xs font-semibold">{c.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Column 2: How to Raise a Request */}
                    <motion.div 
                        variants={fadeUp(0.08)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl border border-[#E2D9CE] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                        <SectionHeading 
                            num="2" 
                            icon={Camera} 
                            title="How to Raise a Request" 
                            bgColor="bg-[#B48425]" 
                            textColor="#B48425"
                        />
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div className="space-y-4">
                                <p className="text-[#6B5E52] text-xs leading-relaxed">
                                    To help us process your return request quickly, please share clear photographs of:
                                </p>

                                {/* 3 Photo Cards */}
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { label: 'The product received', icon: BookOpen },
                                        { label: 'The outer packaging', icon: Package },
                                        { label: 'Damaged portion (if any)', icon: Camera }
                                    ].map((p, i) => (
                                        <div key={i} className="bg-[#FAF7F2]/50 border border-[#E2D9CE] rounded-xl p-2.5 flex flex-col items-center justify-between text-center min-h-[92px] hover:border-[#A4343A]/40 transition-colors">
                                            <div className="w-7 h-7 rounded-full bg-white border border-[#E2D9CE] flex items-center justify-center text-[#A4343A] shadow-sm">
                                                <p.icon className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-[9px] text-[#5C4A3C] font-bold leading-tight mt-2">{p.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="h-px bg-[#E2D9CE]/70 my-1" />

                                {/* Ticket Details */}
                                <div className="flex items-start gap-2.5 bg-[#FAF7F2]/80 p-3 border border-[#E2D9CE]/50 rounded-xl text-xs text-[#6B5E52] leading-relaxed">
                                    <Ticket className="w-4.5 h-4.5 text-[#A4343A] flex-shrink-0 mt-0.5" />
                                    <p>
                                        Submit your return request through our Help Desk by clicking on the <span className="font-bold text-[#1A1A1A]">"Raise a Request"</span> options on our website.
                                    </p>
                                </div>

                                {/* Fallback support detail */}
                                <div className="space-y-1">
                                    <p className="text-[11px] text-[#6B5E52] flex items-start gap-1.5">
                                        <Mail className="w-4 h-4 text-[#A4343A] flex-shrink-0 mt-0.5" />
                                        <span>Or email photographs directly to:</span>
                                    </p>
                                    <div className="bg-[#8B1F25] text-white text-center py-2 rounded-lg font-bold text-xs tracking-wide select-all hover:bg-[#A4343A] transition-colors shadow-sm">
                                        online@rajkamalprakashan.com
                                    </div>
                                    <p className="text-[10px] text-[#9B8C80] text-center pt-0.5">
                                        Our support team will review and assist you at the earliest.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Column 3: Refund Process */}
                    <motion.div 
                        variants={fadeUp(0.16)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl border border-[#E2D9CE] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                        <SectionHeading 
                            num="3" 
                            icon={Wallet} 
                            title="Refund Process" 
                            bgColor="bg-[#8B1F25]" 
                            textColor="#8B1F25"
                        />
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div className="space-y-4">
                                <p className="text-[#6B5E52] text-xs font-semibold">
                                    Once your return request is approved:
                                </p>

                                <ul className="space-y-3">
                                    {[
                                        { text: 'Refund will be credited to the original payment method used while placing the order.', icon: CreditCard },
                                        { text: 'Applicable shipping charges, if any, may be deducted from the refund amount.', icon: Truck },
                                        { text: 'If any Reward Points were used while placing the order, those Reward Points will be credited back to your account.', icon: Gift },
                                        { text: 'Refunded Reward Points can be reused for future purchases on our website.', icon: RefreshCw },
                                        { text: 'Refund processing timelines may vary depending on the payment method and banking partner.', icon: Timer }
                                    ].map((r, i) => (
                                        <li key={i} className="flex gap-3 items-start text-xs text-[#5C4D40] leading-snug">
                                            <div className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#E2D9CE] flex items-center justify-center flex-shrink-0 text-[#A4343A] mt-0.5 shadow-sm">
                                                <r.icon className="w-3.5 h-3.5" />
                                            </div>
                                            <p className="flex-1 pt-0.5">{r.text}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ─── Trust Badges Strip ────────────────────────────────────────── */}
            <div className="bg-[#5C1217] py-8 shadow-inner">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { title: 'Genuine Books', desc: '100% Authentic & Original Publications', icon: BookOpen },
                            { title: 'Secure Payments', desc: 'Safe, Trusted & Encrypted Transactions', icon: ShieldCheck },
                            { title: 'Fast Dispatch', desc: 'Quick Processing & On-Time Delivery', icon: Truck },
                            { title: 'Dedicated Support', desc: "We're Here to Help You Always", icon: Headphones },
                            { title: 'Hassle-Free Returns', desc: 'Easy & Transparent Return Process', icon: RotateCcw },
                            { title: 'Trusted by Readers', desc: 'Across India for Over 75+ Years', icon: Users }
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

            {/* Tagline Bottom Ribbon */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-[#EFE8DF] border border-[#E2D9CE] rounded-full py-3 px-6 flex items-center justify-center shadow-sm">
                    <p className="text-[#9B8C80] text-[10px] sm:text-xs text-center font-semibold leading-none">
                        Thank you for choosing <span className="font-bold text-[#6B5E52]">Rajkamal Prakashan Pvt. Ltd.</span> — Your trust inspires us to keep delivering the best.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReturnRefundPolicy;
