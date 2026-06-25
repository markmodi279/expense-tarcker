"use client";

import React, {
    useRef,
    useState,
} from "react";

type AnalyticsCarouselProps = {
    children: React.ReactNode;
};

const AnalyticsCarousel = ({
    children,
}: AnalyticsCarouselProps) => {

    const scrollRef = useRef<HTMLDivElement>(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const totalCharts = React.Children.count(children);

    const handleScroll = () => {
        if (!scrollRef.current) return;

        const container =
            scrollRef.current;

        const currentIndex =
            Math.round(
                container.scrollLeft /
                container.clientWidth
            );

        setActiveIndex(
            currentIndex
        );
    };

    return (
        <div className="relative">
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="
                    flex
                    gap-2 sm:gap-4
                    overflow-x-auto
                    hide-scrollbar
                    snap-x
                    snap-mandatory
                    scroll-smooth
                    pb-2
                "
            >
                {React.Children.map(
                    children,
                    (child, index) => (
                        <div
                            key={index}
                            className="
                                w-full
                                flex-shrink-0
                                snap-center
                            "
                        >
                            {child}
                        </div>
                    )
                )}
            </div>
            <div className="mt-4 flex h-4 justify-center gap-2">
                {/* dots go here */}
                {Array.from({
                    length: totalCharts,
                }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (!scrollRef.current)
                                return;

                            scrollRef.current.scrollTo({
                                left:
                                    scrollRef.current
                                        .clientWidth *
                                    index,
                                behavior: "smooth",
                            });
                        }}
                        className={`
                            h-2.5
                            w-2.5
                            rounded-full
                            transition-all
                            duration-200
                            ${
                                activeIndex === index
                                    ? "bg-slate-900 dark:bg-slate-100 scale-125"
                                    : "bg-slate-300 dark:bg-slate-700"
                            }
                        `}
                    />
                ))}
            </div>
        </div>
    );
};

export default AnalyticsCarousel;