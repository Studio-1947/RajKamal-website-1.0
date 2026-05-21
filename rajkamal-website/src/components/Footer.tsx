import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, Quote } from 'lucide-react';
import { connectWithUs, aboutUs, quickLinks, policies, socialPlatformsData, brandSocialData } from '../data/footerData';

// ─── Shared Icon Components ──────────────────────────────────────────────────
type IconProps = { className?: string };

const YoutubeIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

const InstagramIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
);

const FacebookIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const XIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

const LinkedinIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const ThreadsIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 192 192" fill="currentColor" className={className}>
        <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.141-23.82 1.374-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.452-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C33.591 139.911 28 120.134 28 96c0-24.134 5.591-43.911 16.625-58.8C55.84 23.484 73.091 16.17 95.9 16c22.975.17 40.526 7.52 52.171 21.847 5.72 6.997 10.036 15.808 12.84 26.11l16.166-4.305c-3.42-12.573-8.754-23.498-15.974-32.487C147.038 10.03 125.205.195 96.108 0h-.212C67.066.195 45.53 10.057 31.18 29.282 18.229 46.81 11.568 71.048 11.333 96.123v.154c.235 25.075 6.896 49.313 19.847 66.84C45.53 181.942 67.066 191.805 95.896 192h.212c26.095-.194 44.568-7.012 59.718-22.152 20.751-20.729 20.023-46.83 13.23-62.836-4.857-11.348-14.193-20.604-27.519-26.024Zm-47.883 50.181c-10.427.574-21.248-4.091-21.82-14.101-.427-8.017 5.7-16.965 24.257-18.031 2.12-.123 4.196-.184 6.229-.184 6.068 0 11.737.59 16.893 1.694-1.919 23.658-15.012 30.048-25.559 30.622Z" />
    </svg>
);

const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
        case 'youtube': return YoutubeIcon;
        case 'instagram': return InstagramIcon;
        case 'facebook': return FacebookIcon;
        case 'x (twitter)': return XIcon;
        case 'linkedin': return LinkedinIcon;
        case 'threads': return ThreadsIcon;
        default: return () => null;
    }
};

const NavColumn: React.FC<{ title: string; links: { label: string; href: string }[] }> = ({ title, links }) => (
    <div>
        <h3 className="text-[#1A1A1A] font-bold text-xs uppercase tracking-widest mb-5 pb-2 border-b border-[#E2D9CE]">
            {title}
        </h3>
        <ul className="space-y-3">
            {links.map(({ label, href }) => (
                <li key={label}>
                    <a href={href} className="text-[#6B5E52] text-sm hover:text-[#A4343A] transition-colors leading-snug">
                        {label}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

const ConnectWithUsColumn: React.FC<{
    titleClassName?: string;
    brandTitleClassName?: string;
    iconContainerClassName?: string;
    iconClassName?: string;
}> = ({
    titleClassName = "text-[#1A1A1A] font-bold text-xs uppercase tracking-widest mb-5 pb-2 border-b border-[#E2D9CE]",
    brandTitleClassName = "text-[#6B5E52] text-xs font-semibold leading-none",
    iconContainerClassName = "w-7 h-7 bg-[#1A1A1A] hover:bg-[#A4343A] text-white rounded transition-all duration-200",
    iconClassName = "w-3.5 h-3.5"
}) => (
    <div>
        <h3 className={titleClassName}>Connect With Us</h3>
        <div className="space-y-4">
            {brandSocialData.map(({ brand, socials }) => (
                <div key={brand} className="space-y-2">
                    <p className={brandTitleClassName}>{brand.toUpperCase()}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {socials.map(({ platform, url }) => {
                            const Icon = getSocialIcon(platform);
                            return (
                                <a
                                    key={platform}
                                    href={url}
                                    title={platform}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center ${iconContainerClassName}`}
                                >
                                    <Icon className={iconClassName} />
                                </a>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// ─── Design 1: Warm Classic ──────────────────────────────────────────────────
export const Design1: React.FC = () => (
    <footer className="w-full">
        <div className="bg-[#A4343A] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-white text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-1">Get newsletter offers and news</h2>
                    <p className="text-base opacity-80">नवीनतम पुस्तकों और ऑफ़र्स की जानकारी पाएं</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                    <input type="email" placeholder="Enter your email" className="flex-grow md:w-80 bg-white/10 border border-white/40 rounded-full py-3 px-6 text-white placeholder-white/60 focus:outline-none focus:border-white" />
                    <button className="bg-white text-[#A4343A] px-7 py-3 rounded-full font-semibold hover:bg-[#FAF7F2] flex items-center justify-center gap-2 whitespace-nowrap">
                        Subscribe <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        <div className="bg-[#FAF7F2] pt-16 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
                    <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-5">
                        <div>
                            <img src="/rajkamal_logo.svg" alt="Logo" className="w-44 h-auto mb-3" />
                            <p className="text-[#A4343A] text-sm font-semibold tracking-wide">साथ जुड़े साथ पढ़े</p>
                        </div>

                        <div className="pt-1 space-y-2">
                            <div className="flex items-start gap-2"><span className="text-[#A4343A] mt-0.5"><Mail className="w-4 h-4 inline" /></span><a href="mailto:info@rajkamalprakashan.com" className="text-[#6B5E52] text-sm hover:text-[#A4343A]">info@rajkamalprakashan.com</a></div>
                            <div className="flex items-start gap-2"><span className="text-[#A4343A] mt-0.5"><Phone className="w-4 h-4 inline" /></span><span className="text-[#6B5E52] text-sm">+91 11 2327 2783</span></div>
                            <div className="flex items-start gap-2"><span className="text-[#A4343A] mt-0.5"><MapPin className="w-4 h-4 inline" /></span><span className="text-[#6B5E52] text-sm leading-snug">1-B, नेताजी सुभाष मार्ग,<br />दरियागंज, नई दिल्ली — 110002</span></div>
                        </div>
                    </div>
                    <NavColumn title="Connect With Us" links={connectWithUs} />
                    <NavColumn title="About Us" links={aboutUs} />
                    <NavColumn title="Quick Links" links={quickLinks} />
                    <NavColumn title="Policies" links={policies} />
                </div>
                <div className="border-t border-[#E2D9CE] mb-12" />
                <div>
                    <h3 className="text-[#1A1A1A] font-bold text-xs uppercase tracking-widest mb-8">Follow Us on Social Media</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                        {socialPlatformsData.map(({ platform, accounts }) => {
                            const Icon = getSocialIcon(platform);
                            return (
                                <div key={platform}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-7 h-7 rounded-full bg-[#A4343A] flex items-center justify-center flex-shrink-0"><Icon className="w-3.5 h-3.5 text-white" /></div>
                                        <span className="text-[#1A1A1A] text-xs font-bold uppercase tracking-wide">{platform}</span>
                                    </div>
                                    <ul className="space-y-2.5">{accounts.map(a => <li key={a.name}><a href={a.url} className="text-[#6B5E52] text-xs hover:text-[#A4343A] block">{a.name}</a></li>)}</ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-[#EFE8DF] border-t border-[#E2D9CE] py-5 px-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
            <p className="text-center text-[#9B8C80] text-xs">© 2025 राजकमल प्रकाशन समूह. All rights reserved.</p>
            <span className="text-[#E2D9CE] hidden sm:inline">|</span>
            <a href="/footer-designs" className="text-[#A4343A] hover:underline text-xs font-semibold">Footer Styles</a>
        </div>
    </footer>
);

// ─── Design 2: Dark Elegant ──────────────────────────────────────────────────
export const Design2: React.FC = () => (
    <footer className="w-full">
        <div className="bg-[#7A1E23] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-white text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-1">Get newsletter offers and news</h2>
                    <p className="text-base opacity-80">नवीनतम पुस्तकों और ऑफ़र्स की जानकारी पाएं</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                    <input type="email" placeholder="Enter your email" className="flex-grow md:w-80 bg-white/10 border border-white/20 rounded-sm py-3 px-6 text-white placeholder-white/40 focus:outline-none focus:border-white/60" />
                    <button className="bg-[#A4343A] text-white border border-[#C4545A] px-7 py-3 rounded-sm font-semibold hover:bg-[#B4444A] flex items-center justify-center gap-2 whitespace-nowrap">
                        Subscribe <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        <div className="bg-[#1A1510] pt-16 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
                    <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-5">
                        <div>
                            <img src="/rajkamal_logo.svg" alt="Logo" className="w-44 h-auto mb-3 brightness-0 invert opacity-80" />
                            <p className="text-[#A4343A] text-sm font-semibold tracking-wide">साथ जुड़े साथ पढ़े</p>
                        </div>

                        <div className="pt-1 space-y-2">
                            <div className="flex items-start gap-2"><span className="text-[#A4343A] mt-0.5"><Mail className="w-4 h-4 text-primary" /></span><a href="mailto:info@rajkamalprakashan.com" className="text-[#6A5A50] text-sm hover:text-white transition-colors">info@rajkamalprakashan.com</a></div>
                            <div className="flex items-start gap-2"><span className="text-[#A4343A] mt-0.5"><Phone className="w-4 h-4 text-primary" /></span><span className="text-[#6A5A50] text-sm">+91 11 2327 2783</span></div>
                            <div className="flex items-start gap-2"><span className="text-[#A4343A] mt-0.5"><MapPin className="w-4 h-4 text-primary" /></span><span className="text-[#6A5A50] text-sm leading-snug">1-B, नेताजी सुभाष मार्ग,<br />दरियागंज, नई दिल्ली — 110002</span></div>
                        </div>
                    </div>
                    {[{ title: 'Connect With Us', links: connectWithUs }, { title: 'About Us', links: aboutUs }, { title: 'Quick Links', links: quickLinks }, { title: 'Policies', links: policies }].map(({ title, links }) => (
                        <div key={title}>
                            <h3 className="text-[#3E3028] font-bold text-xs uppercase tracking-widest mb-5 pb-2 border-b border-[#2A2018]">{title}</h3>
                            <ul className="space-y-3">{links.map(l => <li key={l.label}><a href={l.href} className="text-[#5A4A40] text-sm hover:text-white transition-colors">{l.label}</a></li>)}</ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-[#2A2018] mb-12" />
                <div>
                    <h3 className="text-[#3E3028] font-bold text-xs uppercase tracking-widest mb-8">Follow Us on Social Media</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                        {socialPlatformsData.map(({ platform, accounts }) => {
                            const Icon = getSocialIcon(platform);
                            return (
                                <div key={platform}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-7 h-7 rounded-full border border-[#A4343A] flex items-center justify-center flex-shrink-0"><Icon className="w-3.5 h-3.5 text-[#A4343A]" /></div>
                                        <span className="text-[#4A3A30] text-xs font-bold uppercase tracking-wide">{platform}</span>
                                    </div>
                                    <ul className="space-y-2.5">{accounts.map(a => <li key={a.name}><a href={a.url} className="text-[#5A4A40] text-xs hover:text-white transition-colors block">{a.name}</a></li>)}</ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-[#111009] border-t border-[#2A2018] py-5 px-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
            <p className="text-center text-[#3E3028] text-xs">© 2025 राजकमल प्रकाशन समूह. All rights reserved.</p>
            <span className="text-[#2A2018] hidden sm:inline">|</span>
            <a href="/footer-designs" className="text-[#A4343A] hover:underline text-xs font-semibold">Footer Styles</a>
        </div>
    </footer>
);

// ─── Design 3: Brand Red ─────────────────────────────────────────────────────
export const Design3: React.FC = () => (
    <footer className="w-full">
        <div className="bg-[#8B1F25] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-white text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-1">Get newsletter offers and news</h2>
                    <p className="text-base opacity-80">नवीनतम पुस्तकों और ऑफ़र्स की जानकारी पाएं</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                    <input type="email" placeholder="Enter your email" className="flex-grow md:w-80 bg-white/10 border border-white/30 rounded-full py-3 px-6 text-white placeholder-white/50 focus:outline-none focus:border-white" />
                    <button className="bg-white text-[#A4343A] px-7 py-3 rounded-full font-semibold hover:bg-[#FAF7F2] flex items-center justify-center gap-2 whitespace-nowrap">
                        Subscribe <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        <div className="bg-[#A4343A] pt-16 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
                    <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-5">
                        <div>
                            <img src="/rajkamal_logo.svg" alt="Logo" className="w-44 h-auto mb-3 brightness-0 invert" />
                            <p className="text-white/60 text-sm font-semibold tracking-wide">साथ जुड़े साथ पढ़े</p>
                        </div>

                        <div className="pt-1 space-y-2">
                            <div className="flex items-start gap-2"><span className="text-white/60 mt-0.5"><Mail className="w-4 h-4 text-white/70" /></span><a href="mailto:info@rajkamalprakashan.com" className="text-white/60 text-sm hover:text-white transition-colors">info@rajkamalprakashan.com</a></div>
                            <div className="flex items-start gap-2"><span className="text-white/60 mt-0.5"><Phone className="w-4 h-4 text-white/70" /></span><span className="text-white/60 text-sm">+91 11 2327 2783</span></div>
                            <div className="flex items-start gap-2"><span className="text-white/60 mt-0.5"><MapPin className="w-4 h-4 text-white/70" /></span><span className="text-white/60 text-sm leading-snug">1-B, नेताजी सुभाष मार्ग,<br />दरियागंज, नई दिल्ली — 110002</span></div>
                        </div>
                    </div>
                    {[{ title: 'Connect With Us', links: connectWithUs }, { title: 'About Us', links: aboutUs }, { title: 'Quick Links', links: quickLinks }, { title: 'Policies', links: policies }].map(({ title, links }) => (
                        <div key={title}>
                            <h3 className="text-white/40 font-bold text-xs uppercase tracking-widest mb-5 pb-2 border-b border-white/20">{title}</h3>
                            <ul className="space-y-3">{links.map(l => <li key={l.label}><a href={l.href} className="text-white/65 text-sm hover:text-white transition-colors">{l.label}</a></li>)}</ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-white/20 mb-12" />
                <div>
                    <h3 className="text-white/40 font-bold text-xs uppercase tracking-widest mb-8">Follow Us on Social Media</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                        {socialPlatformsData.map(({ platform, accounts }) => {
                            const Icon = getSocialIcon(platform);
                            return (
                                <div key={platform}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0"><Icon className="w-3.5 h-3.5 text-white" /></div>
                                        <span className="text-white/60 text-xs font-bold uppercase tracking-wide">{platform}</span>
                                    </div>
                                    <ul className="space-y-2.5">{accounts.map(a => <li key={a.name}><a href={a.url} className="text-white/55 text-xs hover:text-white transition-colors block">{a.name}</a></li>)}</ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-[#8B1F25] border-t border-white/10 py-5 px-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
            <p className="text-center text-white/40 text-xs">© 2025 राजकमल प्रकाशन समूह. All rights reserved.</p>
            <span className="text-white/10 hidden sm:inline">|</span>
            <a href="/footer-designs" className="text-white/60 hover:text-white transition-colors text-xs font-semibold">Footer Styles</a>
        </div>
    </footer>
);

// ─── Design 4: Split Two-Tone ────────────────────────────────────────────────
export const Design4: React.FC = () => (
    <footer className="w-full">
        <div className="bg-[#A4343A] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-white text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-1">Get newsletter offers and news</h2>
                    <p className="text-base opacity-80">नवीनतम पुस्तकों और ऑफ़र्स की जानकारी पाएं</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                    <input type="email" placeholder="Enter your email" className="flex-grow md:w-80 bg-white/10 border border-white/40 rounded-full py-3 px-6 text-white placeholder-white/60 focus:outline-none focus:border-white" />
                    <button className="bg-white text-[#A4343A] px-7 py-3 rounded-full font-semibold hover:bg-[#FAF7F2] flex items-center justify-center gap-2 whitespace-nowrap">
                        Subscribe <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        <div className="flex flex-col lg:flex-row">
            {/* Dark left */}
            <div className="bg-[#1C1510] lg:w-[340px] xl:w-[380px] flex-shrink-0 px-8 xl:px-12 py-14 flex flex-col">
                <img src="/rajkamal_logo.svg" alt="Logo" className="w-44 h-auto mb-3 brightness-0 invert opacity-80" />
                <p className="text-[#A4343A] text-sm font-semibold tracking-wide mb-5">साथ जुड़े साथ पढ़े</p>

                <div className="space-y-3 mb-10">
                    <div className="flex items-start gap-3"><span className="text-[#A4343A] mt-0.5 flex-shrink-0"><Mail className="w-4 h-4" /></span><a href="mailto:info@rajkamalprakashan.com" className="text-[#7A6A60] text-sm hover:text-white transition-colors">info@rajkamalprakashan.com</a></div>
                    <div className="flex items-start gap-3"><span className="text-[#A4343A] mt-0.5 flex-shrink-0"><Phone className="w-4 h-4" /></span><span className="text-[#7A6A60] text-sm">+91 11 2327 2783</span></div>
                    <div className="flex items-start gap-3"><span className="text-[#A4343A] mt-0.5 flex-shrink-0"><MapPin className="w-4 h-4" /></span><span className="text-[#7A6A60] text-sm leading-snug">1-B, नेताजी सुभाष मार्ग,<br />दरियागंज, नई दिल्ली — 110002</span></div>
                </div>
                <div className="mt-auto">
                    <p className="text-[#3E3028] text-xs uppercase tracking-widest mb-4 font-bold">Follow Us</p>
                    <div className="flex flex-wrap gap-2.5">
                        {socialPlatformsData.map(({ platform, accounts }) => {
                            const Icon = getSocialIcon(platform);
                            return (
                                <a key={platform} href={accounts[0].url} title={platform} className="group">
                                    <div className="w-9 h-9 rounded-full border border-[#352A24] flex items-center justify-center group-hover:border-[#A4343A] group-hover:bg-[#A4343A] transition-all duration-200">
                                        <Icon className="w-4 h-4 text-[#5A4A40] group-hover:text-white transition-colors duration-200" />
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Cream right */}
            <div className="bg-[#FAF7F2] flex-1 px-8 xl:px-14 py-14">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
                    {[{ title: 'Connect With Us', links: connectWithUs }, { title: 'About Us', links: aboutUs }, { title: 'Quick Links', links: quickLinks }, { title: 'Policies', links: policies }].map(({ title, links }) => (
                        <div key={title}>
                            <h3 className="text-[#1A1A1A] font-bold text-xs uppercase tracking-widest mb-5 pb-2 border-b border-[#E2D9CE]">{title}</h3>
                            <ul className="space-y-3">{links.map(l => <li key={l.label}><a href={l.href} className="text-[#6B5E52] text-sm hover:text-[#A4343A] transition-colors">{l.label}</a></li>)}</ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-[#E2D9CE] mb-10" />
                <div>
                    <h3 className="text-[#1A1A1A] font-bold text-xs uppercase tracking-widest mb-7">Follow Us on Social Media</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-7">
                        {socialPlatformsData.map(({ platform, accounts }) => {
                            const Icon = getSocialIcon(platform);
                            return (
                                <div key={platform} className="flex gap-3">
                                    <div className="w-7 h-7 rounded-full bg-[#A4343A] flex items-center justify-center flex-shrink-0 mt-0.5"><Icon className="w-3.5 h-3.5 text-white" /></div>
                                    <div>
                                        <p className="text-[#1A1A1A] text-xs font-bold uppercase tracking-wide mb-2">{platform}</p>
                                        <ul className="space-y-1.5">{accounts.map(a => <li key={a.name}><a href={a.url} className="text-[#6B5E52] text-xs hover:text-[#A4343A] transition-colors block">{a.name}</a></li>)}</ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col lg:flex-row">
            <div className="bg-[#100D09] lg:w-[340px] xl:w-[380px] flex-shrink-0 py-5 px-8 xl:px-12 flex items-center justify-between">
                <p className="text-[#3E3028] text-xs">© 2025 राजकमल प्रकाशन समूह</p>
                <a href="/footer-designs" className="text-[#A4343A] hover:underline text-xs font-semibold">Footer Styles</a>
            </div>
            <div className="bg-[#EFE8DF] flex-1 border-t border-[#E2D9CE] py-5 px-8 xl:px-14 lg:flex lg:justify-end">
                <p className="text-[#9B8C80] text-xs">All rights reserved.</p>
            </div>
        </div>
    </footer>
);

// ─── Design 5: Minimal Light ─────────────────────────────────────────────────
export const Design5: React.FC = () => (
    <footer className="w-full border-t border-gray-200">
        <div className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Get newsletter offers and news</h2>
                    <p className="text-base text-gray-500">नवीनतम पुस्तकों और ऑफ़र्स की जानकारी पाएं</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                    <input type="email" placeholder="Enter your email" className="flex-grow md:w-80 bg-white border border-gray-300 rounded py-3 px-6 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#A4343A] focus:ring-1 focus:ring-[#A4343A]" />
                    <button className="bg-[#A4343A] text-white px-7 py-3 rounded font-semibold hover:bg-[#8B1F25] flex items-center justify-center gap-2 whitespace-nowrap transition-colors">
                        Subscribe <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        <div className="bg-white pt-14 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-12">
                    <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-4">
                        <img src="/rajkamal_logo.svg" alt="Logo" className="w-40 h-auto" />
                        <p className="text-[#A4343A] text-xs font-semibold uppercase tracking-widest">साथ जुड़े साथ पढ़े</p>

                        <div className="space-y-1.5 text-sm text-gray-500">
                            <div><a href="mailto:info@rajkamalprakashan.com" className="hover:text-[#A4343A] transition-colors">info@rajkamalprakashan.com</a></div>
                            <div>+91 11 2327 2783</div>
                            <div className="leading-snug">1-B, नेताजी सुभाष मार्ग, दरियागंज, नई दिल्ली</div>
                        </div>
                    </div>
                    {[{ title: 'Connect With Us', links: connectWithUs }, { title: 'About Us', links: aboutUs }, { title: 'Quick Links', links: quickLinks }, { title: 'Policies', links: policies }].map(({ title, links }) => (
                        <div key={title}>
                            <h3 className="text-gray-900 font-semibold text-sm mb-4">{title}</h3>
                            <ul className="space-y-2.5">{links.map(l => <li key={l.label}><a href={l.href} className="text-gray-500 text-sm hover:text-[#A4343A] transition-colors">{l.label}</a></li>)}</ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-100 mb-10" />
                <div>
                    <h3 className="text-gray-400 font-semibold text-xs uppercase tracking-widest mb-6">Follow Us on Social Media</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        {socialPlatformsData.map(({ platform, accounts }) => {
                            const Icon = getSocialIcon(platform);
                            return (
                                <div key={platform}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Icon className="w-4 h-4 text-[#A4343A]" />
                                        <span className="text-gray-700 text-xs font-semibold">{platform}</span>
                                    </div>
                                    <ul className="space-y-1.5">{accounts.map(a => <li key={a.name}><a href={a.url} className="text-gray-400 text-xs hover:text-[#A4343A] transition-colors block">{a.name}</a></li>)}</ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-gray-50 border-t border-gray-200 py-5 px-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
            <p className="text-center text-gray-400 text-xs">© 2025 राजकमल प्रकाशन समूह. All rights reserved.</p>
            <span className="text-gray-200 hidden sm:inline">|</span>
            <a href="/footer-designs" className="text-[#A4343A] hover:underline text-xs font-semibold">Footer Styles</a>
        </div>
    </footer>
);

// ─── Design 6: Modern Slate Grid (Creative & Cards) ─────────────────────────
export const Design6: React.FC = () => (
    <footer className="w-full bg-slate-950 text-slate-100 border-t border-slate-900">
        {/* Newsletter Promo Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20">
            <div className="relative overflow-hidden bg-gradient-to-r from-red-950/40 via-slate-900/60 to-amber-950/40 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 text-center lg:text-left max-w-xl">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 mb-3 uppercase tracking-wide">Newsletter</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">Subscribe to our Literary Circle</h2>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">पाएं नई किताबों, लेखक चर्चाओं और विशेष छूट की जानकारी सीधे अपने इनबॉक्स में।</p>
                </div>
                <div className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                    <input type="email" placeholder="Your Email Address" className="w-full sm:w-80 bg-slate-950/80 border border-slate-700 rounded-2xl py-4 px-6 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/40 transition-all duration-300" />
                    <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap">
                        Join Circle <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

        {/* Brand and Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-8 mb-16">
                {/* Brand card */}
                <div className="lg:col-span-1 space-y-6">
                    <div>
                        <img src="/rajkamal_logo.svg" alt="Logo" className="w-40 h-auto mb-3 brightness-0 invert opacity-90" />
                        <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-red-500 bg-red-500/10 px-2 py-0.5 rounded">Est. 1947</span>
                    </div>

                    <div className="space-y-3.5 text-sm text-slate-400 pt-1">
                        <div className="flex items-center gap-2.5 hover:text-white transition-colors"><Mail className="w-4 h-4 text-red-500" /><a href="mailto:info@rajkamalprakashan.com">info@rajkamalprakashan.com</a></div>
                        <div className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-red-500" /><span>+91 11 2327 2783</span></div>
                        <div className="flex items-start gap-2.5 leading-snug"><MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" /><span>1-B, नेताजी सुभाष मार्ग, दरियागंज, नई दिल्ली — 110002</span></div>
                    </div>
                </div>

                {/* Nav Lists in visual cards */}
                {[{ title: 'Connect With Us', links: connectWithUs }, { title: 'About Us', links: aboutUs }, { title: 'Quick Links', links: quickLinks }, { title: 'Policies', links: policies }].map(({ title, links }) => (
                    <div key={title} className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 sm:p-5 flex flex-col">
                        <h3 className="text-slate-100 font-extrabold text-sm uppercase tracking-wider mb-5 pb-2 border-b border-slate-800">{title}</h3>
                        <ul className="space-y-3.5 flex-1">{links.map(l => (
                            <li key={l.label}>
                                <a href={l.href} className="text-slate-400 text-sm hover:text-red-400 transition-all duration-200 block hover:translate-x-1">{l.label}</a>
                            </li>
                        ))}</ul>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-900 mb-10" />

            {/* Social Grid showing all imprint handles */}
            <div className="mt-16 pt-12 border-t border-slate-900">
                <h3 className="text-slate-100 font-extrabold text-sm uppercase tracking-widest mb-8">Follow Our Imprints on Social Media</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {socialPlatformsData.map(({ platform, accounts }) => {
                        const Icon = getSocialIcon(platform);
                        return (
                            <div key={platform} className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0 border border-red-500/20">
                                        <Icon className="w-4 h-4 text-red-500" />
                                    </div>
                                    <span className="text-slate-200 text-xs font-bold uppercase tracking-wider">{platform}</span>
                                </div>
                                <ul className="space-y-2">
                                    {accounts.map(a => (
                                        <li key={a.name}>
                                            <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 text-xs hover:text-red-400 transition-colors block hover:translate-x-0.5 transform duration-150 leading-snug">
                                                {a.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* Deep Footer */}
        <div className="bg-slate-950 border-t border-slate-900 py-6 px-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
            <p className="text-center text-slate-500 text-xs font-medium">© 2025 राजकमल प्रकाशन समूह. All rights reserved.</p>
            <span className="text-slate-800 hidden sm:inline">|</span>
            <a href="/footer-designs" className="text-slate-500 hover:text-red-500 transition-colors text-xs font-semibold">Footer Styles</a>
        </div>
    </footer>
);

// ─── Design 7: Editorial Crimson (Typographic Serif & Literary Quotes) ──────
export const Design7: React.FC = () => (
    <footer className="w-full bg-[#450A0C] text-[#FAF7F2]">
        {/* Quote Header Banner */}
        <div className="bg-[#330507] border-b border-[#5C1214] py-12 px-4 text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <Quote className="w-8 h-8 text-red-400/30 mb-4" />
                <p className="font-serif italic text-lg sm:text-2xl text-[#F3D5B5] leading-relaxed font-light">
                    "किताबें झांकती हैं बंद आलमारी के शीशों से, बड़ी हसरत से तकती हैं, महीनों अब मुलाक़ातें नहीं होतीं..."
                </p>
                <span className="text-xs font-semibold text-red-300 uppercase tracking-widest mt-3">— गुलज़ार</span>
            </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-8 mb-16">
                {/* Brand description */}
                <div className="lg:col-span-1 space-y-6">
                    <div>
                        <img src="/rajkamal_logo.svg" alt="Logo" className="w-44 h-auto mb-3 brightness-0 invert opacity-95" />
                        <h4 className="font-serif italic text-[#F3D5B5] text-sm">साथ जुड़े साथ पढ़े</h4>
                    </div>

                    <div className="pt-2 space-y-3 text-sm text-[#FAF7F2]/60 font-light">
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#F3D5B5]" /><a href="mailto:info@rajkamalprakashan.com" className="hover:underline hover:text-white">info@rajkamalprakashan.com</a></div>
                        <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#F3D5B5]" /><span>+91 11 2327 2783</span></div>
                        <div className="flex items-start gap-2 leading-relaxed"><MapPin className="w-4 h-4 text-[#F3D5B5] flex-shrink-0 mt-0.5" /><span>1-B, नेताजी सुभाष मार्ग, दरियागंज, नई दिल्ली</span></div>
                    </div>
                </div>

                {/* Link columns */}
                {[{ title: 'Connect With Us', links: connectWithUs }, { title: 'About Us', links: aboutUs }, { title: 'Quick Links', links: quickLinks }, { title: 'Policies', links: policies }].map(({ title, links }) => (
                    <div key={title}>
                        <h3 className="font-serif italic text-[#F3D5B5] text-lg mb-5 pb-2 border-b border-[#5C1214]">{title}</h3>
                        <ul className="space-y-3">{links.map(l => (
                            <li key={l.label}>
                                <a href={l.href} className="text-[#FAF7F2]/70 text-sm hover:text-white transition-colors block leading-relaxed">{l.label}</a>
                            </li>
                        ))}</ul>
                    </div>
                ))}
            </div>

            {/* Newsletter & Social Block */}
            <div className="border-t border-[#5C1214] pt-12 flex flex-col lg:flex-row justify-between items-center gap-8">
                <div className="text-center lg:text-left">
                    <h3 className="font-serif italic text-[#F3D5B5] text-xl mb-1">हमारे साहित्यिक जगत से जुड़ें</h3>
                    <p className="text-[#FAF7F2]/60 text-sm font-light">नवीनतम पुस्तकों और लेखक संगोष्ठियों की जानकारी पाएं</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
                    <input type="email" placeholder="Your Email Address" className="w-full sm:w-80 bg-[#330507] border border-[#5C1214] rounded py-3 px-5 text-white placeholder-white/20 focus:outline-none focus:border-[#F3D5B5] transition-colors" />
                    <button className="bg-[#A4343A] hover:bg-[#C4444A] text-white px-7 py-3 rounded font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                        Subscribe <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Social handles list showing all sub-brands */}
            <div className="border-t border-[#5C1214]/40 pt-16 pb-6">
                <h3 className="font-serif italic text-[#F3D5B5] text-lg mb-8">Follow Our Literary Imprints</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                    {socialPlatformsData.map(({ platform, accounts }) => {
                        const Icon = getSocialIcon(platform);
                        return (
                            <div key={platform} className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#330507] border border-[#5C1214] flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-3.5 h-3.5 text-[#F3D5B5]" />
                                    </div>
                                    <span className="font-serif text-[#FAF7F2] text-xs font-medium uppercase tracking-wide">{platform}</span>
                                </div>
                                <ul className="space-y-2">
                                    {accounts.map(a => (
                                        <li key={a.name}>
                                            <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-[#FAF7F2]/60 text-xs hover:text-white transition-colors block font-light leading-snug">
                                                {a.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Copyright bottom section */}
            <div className="mt-12 pt-8 border-t border-[#5C1214]/40 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                    <p className="text-[#FAF7F2]/50 text-xs font-light">© 2025 राजकमल प्रकाशन समूह. All rights reserved.</p>
                    <span className="text-[#FAF7F2]/20 text-xs hidden md:inline">|</span>
                    <a href="/footer-designs" className="text-[#FAF7F2]/40 hover:text-[#F3D5B5] text-xs font-light transition-colors">Footer Styles</a>
                </div>
            </div>
        </div>
    </footer>
);

// ─── Design 8: Minimalist Neo-Brutalist (Bold & Sharp) ──────────────────────
export const Design8: React.FC = () => (
    <footer className="w-full bg-[#FFF9F2] text-black border-t-4 border-black font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header Newsletter Card */}
            <div className="bg-yellow-100 border-4 border-black p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">JOIN OUR LITERARY CLUB</h2>
                    <p className="text-sm font-semibold opacity-90 uppercase">नवीनतम पुस्तकों और ऑफर्स की विशेष जानकारी।</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
                    <input type="email" placeholder="ENTER YOUR EMAIL" className="w-full sm:w-72 bg-white border-2 border-black py-3 px-4 font-bold placeholder-gray-500 focus:outline-none" />
                    <button className="bg-red-500 hover:bg-red-400 text-white font-black uppercase border-2 border-black py-3 px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                        SUBSCRIBE!
                    </button>
                </div>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-8 mb-16">
                {/* Brand */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="border-4 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
                        <img src="/rajkamal_logo.svg" alt="Logo" className="w-36 h-auto" />
                    </div>

                    <div className="space-y-2 text-xs font-bold uppercase pt-1">
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-black flex-shrink-0" /><a href="mailto:info@rajkamalprakashan.com" className="hover:underline">info@rajkamalprakashan.com</a></div>
                        <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-black flex-shrink-0" /><span>+91 11 2327 2783</span></div>
                        <div className="flex items-start gap-2 leading-tight"><MapPin className="w-4 h-4 text-black flex-shrink-0 mt-0.5" /><span>1-B, NETAJI SUBHASH MARG, DARIYAGANJ, DELHI</span></div>
                    </div>
                </div>

                {/* Column Links */}
                {[{ title: 'CONNECT', links: connectWithUs }, { title: 'ABOUT US', links: aboutUs }, { title: 'QUICK LINKS', links: quickLinks }, { title: 'POLICIES', links: policies }].map(({ title, links }) => (
                    <div key={title} className="border-2 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="font-black text-sm uppercase tracking-wide border-b-2 border-black pb-2 mb-4">{title}</h3>
                        <ul className="space-y-3 font-semibold text-xs uppercase">{links.map(l => (
                            <li key={l.label}>
                                <a href={l.href} className="hover:underline hover:text-red-500 transition-colors block">{l.label}</a>
                            </li>
                        ))}</ul>
                    </div>
                ))}
            </div>

            {/* Bottom Border Line */}
            <div className="border-t-4 border-black mb-10" />

            {/* Social handles list showing all sub-brands */}
            <div className="border-t-4 border-black pt-16 pb-8">
                <h3 className="font-black text-sm uppercase tracking-wide mb-8">FOLLOW OUR LITERARY IMPRINTS</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {socialPlatformsData.map(({ platform, accounts }) => {
                        const Icon = getSocialIcon(platform);
                        return (
                            <div key={platform} className="border-2 border-black p-4 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-black/10">
                                    <div className="w-7 h-7 border-2 border-black bg-yellow-200 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-3.5 h-3.5 text-black" />
                                    </div>
                                    <span className="font-black text-xs uppercase tracking-tight">{platform}</span>
                                </div>
                                <ul className="space-y-2 font-semibold text-[10px] uppercase">
                                    {accounts.map(a => (
                                        <li key={a.name}>
                                            <a href={a.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-red-500 block leading-tight">
                                                {a.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Copyright & Styles */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                    <p className="text-xs font-black uppercase">© 2025 RAJKAMAL PRAKASHAN. ALL RIGHTS RESERVED.</p>
                    <span className="text-black/10 hidden md:inline">|</span>
                    <a href="/footer-designs" className="text-xs font-black uppercase hover:underline">FOOTER STYLES</a>
                </div>
            </div>
        </div>
    </footer>
);

// ─── Design 9: Brand-Wise Social (Penguin-Inspired) ─────────────────────────
export const Design9: React.FC = () => (
    <footer className="w-full">
        {/* Top nav — icon + all four columns */}
        <div className="bg-[#FAF7F2] pt-16 pb-0 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 pb-14">
                    {/* Icon only, no text logo */}
                    <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-5">
                        <img src="/LogoIcon2_rajkamallogo.svg" alt="Rajkamal Prakashan" className="w-48 h-24 object-contain" />
                        <div className="space-y-2.5">
                            <div className="flex items-start gap-2"><Mail className="w-4 h-4 text-[#A4343A] mt-0.5 flex-shrink-0" /><a href="mailto:info@rajkamalprakashan.com" className="text-[#6B5E52] text-sm hover:text-[#A4343A] transition-colors">info@rajkamalprakashan.com</a></div>
                            <div className="flex items-start gap-2"><Phone className="w-4 h-4 text-[#A4343A] mt-0.5 flex-shrink-0" /><span className="text-[#6B5E52] text-sm">+91 11 2327 2783</span></div>
                            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-[#A4343A] mt-0.5 flex-shrink-0" /><span className="text-[#6B5E52] text-sm leading-snug">1-B, नेताजी सुभाष मार्ग,<br />दरियागंज, नई दिल्ली — 110002</span></div>
                        </div>
                    </div>
                    <ConnectWithUsColumn
                        titleClassName="text-[#1A1A1A] font-bold text-xs uppercase tracking-widest mb-5 pb-2 border-b border-[#E2D9CE]"
                        brandTitleClassName="text-[#6B5E52] text-xs font-semibold leading-none"
                        iconContainerClassName="w-7 h-7 bg-[#1A1A1A] hover:bg-[#A4343A] text-white rounded transition-all duration-200"
                        iconClassName="w-3.5 h-3.5"
                    />
                    <NavColumn title="About Us" links={aboutUs} />
                    <NavColumn title="Quick Links" links={quickLinks} />
                    <NavColumn title="Policies" links={policies} />
                </div>
            </div>
        </div>
        {/* Watermark section — sits above the copyright bar */}
        <div className="bg-[#EDE5DB] border-t border-[#D8CFC5] py-14 flex items-center justify-center select-none overflow-hidden px-4">
            <span
                className="font-bold text-center leading-none w-full text-[#1A1A1A]/10"
                style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
            >
                साथ जुड़े साथ पढ़े
            </span>
        </div>

        {/* Copyright Bar */}
        <div className="bg-[#FAF7F2] border-t border-[#D8CFC5] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-center text-[#6B5E52] text-xs tracking-wide">© 2025 राजकमल प्रकाशन समूह. All rights reserved.</p>
                <a href="/footer-designs" className="text-[#A4343A]/70 hover:text-[#A4343A] transition-colors text-xs font-semibold">Footer Styles</a>
            </div>
        </div>
    </footer>
);

// ─── Design registry ──────────────────────────────────────────────────────────
export const designs = [
    { id: 1, name: 'Warm Classic', description: 'Current design — warm cream tones, approachable & timeless', component: Design1 },
    { id: 2, name: 'Dark Elegant', description: 'Deep charcoal background, premium editorial feel', component: Design2 },
    { id: 3, name: 'Brand Red', description: 'Bold brand-red backdrop, strong identity statement', component: Design3 },
    { id: 4, name: 'Split Two-Tone', description: 'Dark left panel + cream right — asymmetric & modern', component: Design4 },
    { id: 5, name: 'Minimal Light', description: 'Clean white, light grays, understated & contemporary', component: Design5 },
    { id: 6, name: 'Modern Slate Grid', description: 'Slate blue back, glassmorphic card, clean cards & grid layout', component: Design6 },
    { id: 7, name: 'Editorial Crimson', description: 'Serif fonts, deep brand-crimson back, prominent quote block, elegant style', component: Design7 },
    { id: 8, name: 'Neo-Brutalist', description: 'Retro-modern sand style, thick borders, high-contrast block layouts', component: Design8 },
    { id: 9, name: 'Brand-Wise Social', description: 'Icon-only logo, brand-wise social icons, Hindi watermark — Penguin-inspired', component: Design9 },
];

const Footer: React.FC = () => {
    const [currentDesign, setCurrentDesign] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const stored = localStorage.getItem('active-footer-design');
        if (stored !== null) {
            const index = parseInt(stored, 10);
            if (index >= 0 && index < designs.length) {
                setCurrentDesign(index);
            }
        }
    }, [location]);

    // Handle local storage change event if changed dynamically on the same page
    useEffect(() => {
        const handleStorageChange = () => {
            const stored = localStorage.getItem('active-footer-design');
            if (stored !== null) {
                const index = parseInt(stored, 10);
                if (index >= 0 && index < designs.length) {
                    setCurrentDesign(index);
                }
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const ActiveFooter = designs[currentDesign].component;

    return <ActiveFooter />;
};

export default Footer;
