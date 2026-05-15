import React from 'react';
import { ArrowRight } from 'lucide-react';

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
    <svg viewBox="0 0 192 192" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.141-23.82 1.374-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.452-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C33.591 139.911 28 120.134 28 96c0-24.134 5.591-43.911 16.625-58.8C55.84 23.484 73.091 16.17 95.9 16c22.975.17 40.526 7.52 52.171 21.847 5.72 6.997 10.036 15.808 12.84 26.11l16.166-4.305c-3.42-12.573-8.754-23.498-15.974-32.487C147.038 10.03 125.205.195 96.108 0h-.212C67.066.195 45.53 10.057 31.18 29.282 18.229 46.81 11.568 71.048 11.333 96.123v.154c.235 25.075 6.896 49.313 19.847 66.84C45.53 181.942 67.066 191.805 95.896 192h.212c26.095-.194 44.568-7.012 59.718-22.152 20.751-20.729 20.023-46.83 13.23-62.836-4.857-11.348-14.193-20.604-27.519-26.024Zm-47.883 50.181c-10.427.574-21.248-4.091-21.82-14.101-.427-8.017 5.7-16.965 24.257-18.031 2.12-.123 4.196-.184 6.229-.184 6.068 0 11.737.59 16.893 1.694-1.919 23.658-15.012 30.048-25.559 30.622Z" />
    </svg>
);

const connectWithUs = [
    { label: 'Rajkamal Prakashan', href: '#' },
    { label: 'Radhakrishna Prakashan', href: '#' },
    { label: 'Lokbharti Prakashan', href: '#' },
    { label: 'Saath Judein Saath Padhein', href: '#' },
    { label: 'Kitab Utsav', href: '#' },
];

const aboutUs = [
    { label: 'The Legacy', href: '#' },
    { label: 'Milestone', href: '#' },
    { label: 'Meet Our Team', href: '#' },
    { label: 'Careers', href: '#' },
    { label: "FAQ's", href: '#' },
];

const quickLinks = [
    { label: 'Publish With Us', href: '#' },
    { label: 'Track Your Order', href: '#' },
    { label: 'Customer Support', href: '#' },
    { label: 'Report an Issue', href: '#' },
    { label: 'Contact Us', href: '#' },
];

const policies = [
    { label: 'Return & Exchange', href: '#' },
    { label: 'Cancellation Policy', href: '#' },
    { label: 'Shipping Policy', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
];

const socialPlatforms = [
    {
        platform: 'YouTube',
        Icon: YoutubeIcon,
        accounts: [
            { name: 'Rajkamal Prakashan Samuh', url: 'https://www.youtube.com/@RajkamalBooks' },
        ],
    },
    {
        platform: 'Instagram',
        Icon: InstagramIcon,
        accounts: [
            { name: 'Rajkamal Prakashan', url: 'https://www.instagram.com/rajkamalbooks' },
            { name: 'Radhakrishna Prakashan', url: 'https://www.instagram.com/radhakrishnaprakashan' },
            { name: 'Lokbharti Prakashan', url: 'https://www.instagram.com/lokbhartiprakashan' },
            { name: 'Saath Judein Saath Padhein', url: 'https://www.instagram.com/sathjudeinsathpadhein' },
            { name: 'Kitab Utsav', url: 'https://www.instagram.com/kitab.utsav' },
            { name: 'Rajkamal Urdu', url: 'https://www.instagram.com/rajkamalurdu' },
        ],
    },
    {
        platform: 'Facebook',
        Icon: FacebookIcon,
        accounts: [
            { name: 'Rajkamal Prakashan', url: 'https://www.facebook.com/RajkamalPrakashanSamooh' },
            { name: 'Radhakrishna Prakashan', url: 'https://www.facebook.com/RadhakrishnaPrakashan' },
            { name: 'Lokbharti Prakashan', url: 'https://www.facebook.com/LokbhartiBooks' },
            { name: 'Rajkamal Urdu', url: 'https://www.facebook.com/rajkamalurdu' },
            { name: 'Saath Judein Saath Padhein', url: 'https://www.facebook.com/sathjudeinsathpadhein' },
            { name: 'Kitab Utsav', url: 'https://www.facebook.com/kitabutsav' },
        ],
    },
    {
        platform: 'X (Twitter)',
        Icon: XIcon,
        accounts: [
            { name: 'Rajkamal Prakashan', url: 'https://x.com/RajkamalBooks' },
            { name: 'Radhakrishna Prakashan', url: 'https://x.com/RadhakrishnaPub' },
            { name: 'Lokbharti Prakashan', url: 'https://x.com/LokbhartiBooks' },
            { name: 'Rajkamal Urdu', url: 'https://x.com/RajkamalUrdu' },
        ],
    },
    {
        platform: 'LinkedIn',
        Icon: LinkedinIcon,
        accounts: [
            { name: 'Rajkamal Prakashan Samuh', url: 'https://in.linkedin.com/company/rajkamalbooks' },
        ],
    },
    {
        platform: 'Threads',
        Icon: ThreadsIcon,
        accounts: [
            { name: 'Rajkamal Prakashan', url: 'https://www.threads.com/@rajkamalbooks' },
        ],
    },
];

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

const Footer: React.FC = () => {
    return (
        <footer className="w-full">
            {/* Newsletter Section */}
            <div className="bg-[#A4343A] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-white text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-1">Get newsletter offers and news</h2>
                        <p className="text-base opacity-80">नवीनतम पुस्तकों और ऑफ़र्स की जानकारी पाएं</p>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-grow md:w-80 bg-white/10 border border-white/40 rounded-full py-3 px-6 text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors"
                        />
                        <button className="bg-white text-[#A4343A] px-7 py-3 rounded-full font-semibold hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                            Subscribe <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="bg-[#FAF7F2] pt-16 pb-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Nav columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
                        {/* Brand column */}
                        <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-5">
                            <div>
                                <img
                                    src="/rajkamal_logo.svg"
                                    alt="Rajkamal Prakashan Samuh"
                                    className="w-44 h-auto mb-3"
                                />
                                <p className="text-[#A4343A] text-sm font-semibold tracking-wide">
                                    साहित्य की सेवा में
                                </p>
                            </div>
                            <p className="text-[#6B5E52] text-sm leading-relaxed">
                                भारत का अग्रणी हिंदी प्रकाशन समूह — दशकों से श्रेष्ठ साहित्य को पाठकों तक पहुँचाने में समर्पित।
                            </p>
                            <div className="pt-1 space-y-2">
                                <div className="flex items-start gap-2">
                                    <span className="text-[#A4343A] mt-0.5">✉</span>
                                    <a href="mailto:info@rajkamalprakashan.com" className="text-[#6B5E52] text-sm hover:text-[#A4343A] transition-colors">
                                        info@rajkamalprakashan.com
                                    </a>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#A4343A] mt-0.5">✆</span>
                                    <span className="text-[#6B5E52] text-sm">+91 11 2327 2783</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#A4343A] mt-0.5 leading-snug">⊙</span>
                                    <span className="text-[#6B5E52] text-sm leading-snug">
                                        1-B, नेताजी सुभाष मार्ग,<br />दरियागंज, नई दिल्ली — 110002
                                    </span>
                                </div>
                            </div>
                        </div>

                        <NavColumn title="Connect With Us" links={connectWithUs} />
                        <NavColumn title="About Us" links={aboutUs} />
                        <NavColumn title="Quick Links" links={quickLinks} />
                        <NavColumn title="Policies" links={policies} />
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#E2D9CE] mb-12" />

                    {/* Social Media breakdown */}
                    <div>
                        <h3 className="text-[#1A1A1A] font-bold text-xs uppercase tracking-widest mb-8">
                            Follow Us on Social Media
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                            {socialPlatforms.map(({ platform, Icon, accounts }) => (
                                <div key={platform}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-7 h-7 rounded-full bg-[#A4343A] flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <span className="text-[#1A1A1A] text-xs font-bold uppercase tracking-wide">{platform}</span>
                                    </div>
                                    <ul className="space-y-2.5">
                                        {accounts.map(({ name, url }) => (
                                            <li key={url}>
                                                <a
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#6B5E52] text-xs hover:text-[#A4343A] transition-colors leading-snug block"
                                                >
                                                    {name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-[#EFE8DF] border-t border-[#E2D9CE] py-5 px-4">
                <p className="text-center text-[#9B8C80] text-xs">
                    © 2025 राजकमल प्रकाशन समूह. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
