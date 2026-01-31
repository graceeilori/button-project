"use client";

import Image from 'next/image';
import "../app/background.css";

const STAR_ASSETS = [
    '/assets/four_pointed_star_orange.svg',
    '/assets/four_pointed_star_red.svg',
    '/assets/regular_star_small.svg',
    '/assets/regular_star.svg',
    '/assets/tiny_star.svg',
];

export default function StarBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none">
            <div className="tiny-stars"></div>
            {/* Shooting stars */}
            <Image
                src="/assets/shooting_star.svg"
                alt="shooting star"
                width={115}
                height={115}
                className="absolute -top-[10%] right-[10%] shooting-star-1"
            />
            <Image
                src="/assets/shooting_star.svg"
                alt="shooting star"
                width={130}
                height={130}
                className="absolute top-[5%] -right-[5%] shooting-star-2"
            />
            <Image
                src="/assets/shooting_star.svg"
                alt="shooting star"
                width={160}
                height={160}
                className="absolute -top-[15%] right-[40%] shooting-star-3"
            />
            <Image
                src="/assets/shooting_star.svg"
                alt="shooting star"
                width={80}
                height={80}
                className="absolute top-[45%] -right-[8%] shooting-star-4"
            />
            <Image
                src="/assets/shooting_star.svg"
                alt="shooting star"
                width={80}
                height={80}
                className="absolute -top-[5%] left-[10%] shooting-star-5"
            />

            {/* Four-pointed twinkling stars */}
            <Image
                src="/assets/four_pointed_star_orange.svg"
                alt="star"
                width={20}
                height={20}
                className="absolute top-[12%] right-[25%] twinkle-star-1"
            />
            <Image
                src="/assets/four_pointed_star_red.svg"
                alt="star"
                width={18}
                height={18}
                className="absolute top-[35%] left-[8%] twinkle-star-2"
            />
            <Image
                src="/assets/four_pointed_star_orange.svg"
                alt="star"
                width={18}
                height={18}
                className="absolute bottom-[20%] right-[12%] twinkle-star-3"
            />
            <Image
                src="/assets/four_pointed_star_red.svg"
                alt="star"
                width={16}
                height={16}
                className="absolute top-[60%] right-[45%] twinkle-star-4"
            />
            <Image
                src="/assets/four_pointed_star_orange.svg"
                alt="star"
                width={16}
                height={16}
                className="absolute bottom-[40%] left-[20%] twinkle-star-5"
            />
            <Image
                src="/assets/four_pointed_star_red.svg"
                alt="star"
                width={16}
                height={16}
                className="absolute bottom-[10%] right-[35%] twinkle-star-6"
            />
        </div>
    );
}