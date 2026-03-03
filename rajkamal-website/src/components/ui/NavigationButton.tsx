import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationButtonProps {
    direction: 'left' | 'right';
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
    direction,
    onClick,
    className = "",
    disabled = false
}) => {
    const Icon = direction === 'left' ? ArrowLeft : ArrowRight;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                p-2 rounded-full shadow-md transition-all duration-300
                bg-[#E4B9B9] hover:bg-[#F16F6F] text-[#714040] hover:text-white
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center
                ${className}
            `}
            aria-label={direction === 'left' ? "Scroll Left" : "Scroll Right"}
        >
            <Icon className="h-6 w-6" />
        </button>
    );
};

export default NavigationButton;
