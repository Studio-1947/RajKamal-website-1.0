import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const FlipWords = ({
    words,
    duration = 3000,
    className,
}: {
    words: string[];
    duration?: number;
    className?: string;
}) => {
    const [index, setIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const startAnimation = useCallback(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(true);
    }, [words.length]);

    useEffect(() => {
        if (isAnimating) return;
        const timeout = setTimeout(startAnimation, duration);
        return () => clearTimeout(timeout);
    }, [isAnimating, duration, startAnimation]);

    const currentWord = words[index] ?? words[0];

    return (
        <AnimatePresence
            onExitComplete={() => {
                setIsAnimating(false);
            }}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 16,
                }}
                exit={{
                    opacity: 0,
                    y: -12,
                    filter: "blur(6px)",
                    position: "absolute",
                }}
                className={`z-10 inline-block relative text-left px-2 whitespace-nowrap ${className}`}
                key={currentWord}
            >
                {currentWord.split("").map((letter, letterIndex) => (
                    <motion.span
                        key={currentWord + letterIndex}
                        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                            delay: letterIndex * 0.04,
                            duration: 0.3,
                        }}
                        className="inline-block"
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};
