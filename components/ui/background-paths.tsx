"use client";

import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";

function FloatingPaths() { // Removed position parameter
    const viewBoxWidth = 696;
    const viewBoxHeight = 316;
    const numPaths = 36;

    const paths = Array.from({ length: numPaths }, (_, i) => {
        // Paths start near the top (simulating near title) and end across the viewBox
        const startX = Math.random() * (viewBoxWidth / 4); // Start X in the left 1/4 of the viewbox
        const startY = Math.random() * (viewBoxHeight / 4); // Start Y in the top 1/4 of the viewbox

        // Paths end in the bottom-right 3/4 of the viewbox
        const endX = viewBoxWidth * (0.75 + Math.random() * 0.25); 
        const endY = viewBoxHeight * (0.5 + Math.random() * 0.5); // End Y in the bottom half

        // Control points to create a curve from top-left towards bottom-right
        const cp1x = startX + (Math.random() * viewBoxWidth) / 2;
        const cp1y = startY + (Math.random() * viewBoxHeight) / 2;
        const cp2x = endX - (Math.random() * viewBoxWidth) / 2;
        const cp2y = endY - (Math.random() * viewBoxHeight) / 2;

        return {
            id: i,
            d: `M ${startX} ${startY} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${endX} ${endY}`,
            color: `rgba(15,23,42,${0.03 + i * 0.015})`, // Adjusted opacity for subtlety
            width: 0.1 + i * 0.005, // Adjusted for thinner lines
        };
    });

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <FloatingPaths />
            </div>
            {/* Ensure children are rendered on top and within the container for content layout */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 w-full flex-grow flex flex-col">
                {children}
            </div>
        </div>
    );
}
