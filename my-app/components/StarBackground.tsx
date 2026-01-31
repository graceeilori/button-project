"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const STAR_COUNT = 50;

type StarType = {
    id: number;
    src: string;
    top: number;
    left: number;
    size: number;
    delay: number;
    duration: number;
};

const STAR_ASSETS = [
    '/assets/four_pointed_star_orange.svg',
    '/assets/four_pointed_star_red.svg',
    '/assets/regular_star_small.svg',
    '/assets/regular_star.svg',
    '/assets/tiny_star.svg',
];

export default function StarBackground() {
    const [stars, setStars] = useState<StarType[]>([]);

    useEffect(() => {
        const newStars = Array.from({ length: STAR_COUNT }).map((_, i) => ({
            id: i,
            src: STAR_ASSETS[Math.floor(Math.random() * STAR_ASSETS.length)],
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() * 20 + 10, // 10px to 30px
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 2,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-black">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute animate-twinkle"
                    style={{
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        width: star.size,
                        height: star.size,
                        animationDelay: `${star.delay}s`,
                        animationDuration: `${star.duration}s`,
                    }}
                >
                    <Image
                        src={star.src}
                        alt="star"
                        width={star.size}
                        height={star.size}
                        className="w-full h-full"
                    />
                </div>
            ))}
            {/* Shooting Star */}
            <div
                className="absolute animate-shooting-star"
                style={{
                    top: '20%',
                    left: '100%',
                    width: 100,
                    height: 100,
                }}
            >
                <Image
                    src="/assets/shooting_star.svg"
                    alt="shooting star"
                    width={100}
                    height={100}
                    className="w-full h-full"
                />
            </div>
            <div
                className="absolute animate-shooting-star"
                style={{
                    top: '60%',
                    left: '100%',
                    width: 80,
                    height: 80,
                    animationDelay: '4s',
                    animationDuration: '3s'
                }}
            >
                <Image
                    src="/assets/shooting_star.svg"
                    alt="shooting star"
                    width={80}
                    height={80}
                    className="w-full h-full"
                />
            </div>
        </div>
    );
}
