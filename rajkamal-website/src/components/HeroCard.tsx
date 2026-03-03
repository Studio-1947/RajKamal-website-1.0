import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroCardProps {
    title: string;
    subtitle: string;
    image: string;
    className?: string; // For layout positioning (e.g. row-span-2)
    overlayClassName?: string; // For gradient/background overlays
    onClick?: () => void;
    link?: string;
}

const HeroCard: React.FC<HeroCardProps> = ({
    title,
    subtitle,
    image,
    className = "",
    overlayClassName = "bg-gradient-to-t from-black/80 via-black/30 to-transparent",
    onClick,
    link
}) => {
    const CardContent = (
        <>
            <img
                src={image}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={title}
            />

            <div className={`absolute inset-0 p-5 md:p-6 flex items-end justify-between ${overlayClassName}`}>
                <div className="flex-1 pr-4">
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-1 transform transition-transform duration-300 group-hover:-translate-y-1">
                        {title}
                    </h3>
                    <p className="text-gray-100/90 text-sm md:text-base transform transition-transform duration-300 group-hover:-translate-y-1">
                        {subtitle}
                    </p>
                </div>
                <button className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#E4B9B9] flex items-center justify-center text-[#714040] font-semibold transition-all duration-300 hover:bg-[#F16F6F] hover:text-white group-hover:scale-110 shadow-sm">
                    <ArrowRight size={20} />
                </button>
            </div>
        </>
    );

    if (link) {
        return (
            <Link
                to={link}
                className={`relative rounded-[32px] overflow-hidden shadow-lg group cursor-pointer block ${className}`}
            >
                {CardContent}
            </Link>
        );
    }

    return (
        <div
            onClick={onClick}
            className={`relative rounded-[32px] overflow-hidden shadow-lg group cursor-pointer ${className}`}
        >
            {CardContent}
        </div>
    );
};

export default HeroCard;
