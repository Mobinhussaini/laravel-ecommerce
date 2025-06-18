'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag, Star } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface CarouselSlide {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    secondaryButtonText?: string;
    buttonLink: string;
    secondaryButtonLink?: string;
    imageSrc: string;
    mobileImageSrc?: string;
    textColor: string;
    darkTextColor?: string;
    overlayColor: string;
    darkOverlayColor?: string;
    alignment?: 'left' | 'right' | 'center';
    badge?: string;
    price?: string;
    originalPrice?: string;
    discount?: number;
}

const carouselData: CarouselSlide[] = [
    {
        id: 1,
        title: 'Our Newest & Trendy Shoes Collection',
        subtitle: 'Discover Your Own Shoes',
        description:
            'Step into style with our latest footwear designs. Premium comfort meets contemporary fashion. Handcrafted with the finest materials for lasting quality.',
        buttonText: 'Shop Collection',
        secondaryButtonText: 'View Lookbook',
        buttonLink: '/collections/shoes',
        secondaryButtonLink: '/lookbooks/shoes-2025',
        imageSrc:
            'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
        textColor: 'text-gray-900 dark:text-gray-50',
        darkTextColor: 'text-gray-50',
        overlayColor: 'from-white/80 to-white/40',
        darkOverlayColor: 'from-gray-900/80 to-gray-800/60',
        alignment: 'left',
        badge: 'NEW ARRIVAL',
        price: '$299',
        originalPrice: '$399',
        discount: 25,
    },
    {
        id: 2,
        title: 'Elegant Watches For Every Occasion',
        subtitle: 'Timeless Elegance',
        description:
            'Precision craftsmanship and sophisticated design. Our watches make a statement without saying a word. Each timepiece represents generations of watchmaking expertise.',
        buttonText: 'View Collection',
        secondaryButtonText: 'Learn More',
        buttonLink: '/collections/watches',
        secondaryButtonLink: '/about/craftsmanship',
        imageSrc:
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
        textColor: 'text-gray-900 dark:text-gray-50',
        darkTextColor: 'text-gray-50',
        overlayColor: 'from-gray-100/80 to-gray-50/60',
        darkOverlayColor: 'from-gray-900/80 to-gray-800/60',
        alignment: 'right',
        badge: 'PREMIUM',
        price: '$1,299',
        originalPrice: '$1,499',
        discount: 13,
    },
    {
        id: 3,
        title: 'Premium Bags & Accessories',
        subtitle: 'Carry Your Style',
        description:
            'Handcrafted with premium materials. Our bags combine functionality with uncompromising style. Designed for those who appreciate the finest details and superior quality.',
        buttonText: 'Explore Collection',
        secondaryButtonText: 'View Materials',
        buttonLink: '/collections/bags',
        secondaryButtonLink: '/materials/premium-leather',
        imageSrc:
            'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80',
        textColor: 'text-gray-900 dark:text-gray-50',
        darkTextColor: 'text-gray-50',
        overlayColor: 'from-amber-50/70 to-white/40',
        darkOverlayColor: 'from-gray-900/80 to-gray-800/60',
        alignment: 'left',
        badge: 'EXCLUSIVE',
        price: '$899',
        originalPrice: '$1,199',
        discount: 25,
    },
];

export default function ShopBanner() {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const slideCount: number = carouselData.length;
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    const progressRef = useRef<NodeJS.Timeout | null>(null);
    const slideDuration = 8000;
    const animationDuration = 700;

    useEffect(() => {
        setProgress(0);

        if (progressRef.current) {
            clearInterval(progressRef.current);
        }

        if (!isHovering) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        return 0;
                    }
                    return prev + 100 / (slideDuration / 100);
                });
            }, 100);

            progressRef.current = interval;
        }

        return () => {
            if (progressRef.current) {
                clearInterval(progressRef.current);
            }
        };
    }, [currentSlide, isHovering, slideDuration]);

    useEffect(() => {
        if (autoPlayRef.current) {
            clearTimeout(autoPlayRef.current);
        }

        if (!isHovering && !isAnimating) {
            autoPlayRef.current = setTimeout(() => {
                goToNextSlide();
            }, slideDuration);
        }

        return () => {
            if (autoPlayRef.current) {
                clearTimeout(autoPlayRef.current);
            }
        };
    }, [currentSlide, isAnimating, isHovering]);

    const goToSlide = useCallback(
        (index: number): void => {
            if (isAnimating) return;
            setIsAnimating(true);
            setCurrentSlide(index);
            setTimeout(() => setIsAnimating(false), animationDuration);
        },
        [isAnimating],
    );

    const goToPrevSlide = useCallback((): void => {
        const newIndex = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(newIndex);
    }, [currentSlide, goToSlide, slideCount]);

    const goToNextSlide = useCallback((): void => {
        const newIndex = (currentSlide + 1) % slideCount;
        goToSlide(newIndex);
    }, [currentSlide, goToSlide, slideCount]);

    return (
        <section
            className="relative mx-auto h-screen max-h-[800px] min-h-[600px] w-full overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="absolute inset-0 h-full w-full">
                {carouselData.map((slide: CarouselSlide, index: number) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 h-full w-full transition-all duration-700 ease-in-out ${
                            currentSlide === index ? 'z-10 scale-100 transform opacity-100' : 'z-0 scale-105 transform opacity-0'
                        }`}
                    >
                        <div className="absolute inset-0 h-full w-full">
                            <img src={slide.imageSrc} alt={`${slide.title}`} className="h-full w-full object-cover" sizes="100vw" />
                            <div
                                className={`absolute inset-0 bg-gradient-to-r ${slide.overlayColor} dark:${slide.darkOverlayColor || 'from-gray-900/80 to-gray-800/60'} backdrop-blur-[2px]`}
                            ></div>
                        </div>

                        <div className="relative z-10 h-full w-full">
                            <div className="container mx-auto flex h-full items-center px-4 md:px-8">
                                <div
                                    className={`w-full max-w-xl lg:w-1/2 ${
                                        slide.alignment === 'right'
                                            ? 'mr-0 ml-auto'
                                            : slide.alignment === 'center'
                                              ? 'mx-auto text-center'
                                              : 'mr-auto ml-0'
                                    }`}
                                >
                                    <div className="rounded-2xl border border-white/50 bg-white/30 p-6 shadow-xl backdrop-blur-sm md:p-8 lg:p-10 dark:border-gray-700 dark:bg-gray-900/70">
                                        {slide.badge && (
                                            <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 dark:bg-white/80">
                                                <Star className="h-3 w-3 fill-amber-400 text-amber-400 dark:fill-gray-900 dark:text-gray-900" />
                                                <span className="text-xs font-bold tracking-wider text-white dark:text-gray-900">{slide.badge}</span>
                                            </div>
                                        )}

                                        <span className="mb-2 inline-block text-sm font-medium tracking-wider text-blue-700 uppercase dark:text-blue-400">
                                            {slide.subtitle}
                                        </span>

                                        <h2 className={`mb-4 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl ${slide.textColor}`}>
                                            {slide.title}
                                        </h2>

                                        <p
                                            className={`mb-6 text-base md:mb-8 md:text-lg ${slide.textColor.replace('900', '700').replace('50', '200')}`}
                                        >
                                            {slide.description}
                                        </p>

                                        {slide.price && (
                                            <div className="mb-6 inline-block rounded-lg bg-black/10 px-4 py-2 backdrop-blur-sm dark:bg-white/20">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{slide.price}</span>
                                                    {slide.originalPrice && (
                                                        <span className="text-base text-gray-500 line-through dark:text-gray-300">
                                                            {slide.originalPrice}
                                                        </span>
                                                    )}
                                                    {slide.discount && (
                                                        <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                                            SAVE {slide.discount}%
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-4">
                                            <Button
                                                asChild
                                                className="flex h-12 items-center rounded-full bg-blue-700 px-8 py-2 text-base font-medium text-white shadow-lg transition-all duration-300 hover:bg-blue-800 hover:shadow-xl dark:bg-blue-600 dark:hover:bg-blue-700"
                                            >
                                                <Link href={slide.buttonLink}>
                                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                                    {slide.buttonText}
                                                </Link>
                                            </Button>

                                            {slide.secondaryButtonText && slide.secondaryButtonLink && (
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    className="flex h-12 items-center rounded-full border-gray-400 bg-white/50 px-6 py-2 text-base font-medium text-gray-800 transition-all duration-300 hover:bg-white/80 dark:border-gray-600 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-800/70"
                                                >
                                                    <Link href={slide.secondaryButtonLink}>
                                                        {slide.secondaryButtonText}
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={goToPrevSlide}
                className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full border border-white/60 bg-white/30 p-3 text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:outline-none md:left-8 md:p-4 dark:border-gray-600 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-700"
                aria-label="Previous slide"
                type="button"
            >
                <ChevronLeft className="h-5 w-5 hover:cursor-pointer md:h-6 md:w-6" />
            </button>

            <button
                onClick={goToNextSlide}
                className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full border border-white/60 bg-white/30 p-3 text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:outline-none md:right-8 md:p-4 dark:border-gray-600 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-700"
                aria-label="Next slide"
                type="button"
            >
                <ChevronRight className="h-5 w-5 hover:cursor-pointer md:h-6 md:w-6" />
            </button>

            <div className="absolute right-0 bottom-8 left-0 z-20 flex justify-center px-4">
                <div className="flex items-center gap-4 rounded-full border border-white/20 bg-black/20 px-4 py-3 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/50">
                    <div className="text-sm font-medium text-white dark:text-gray-200">
                        <span className="text-base font-bold">{currentSlide + 1}</span>
                        <span className="mx-1">/</span>
                        <span>{slideCount}</span>
                    </div>

                    <div className="flex space-x-3">
                        {carouselData.map((_: CarouselSlide, index: number) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                                    currentSlide === index
                                        ? 'w-8 bg-blue-600 dark:bg-blue-500'
                                        : 'w-2 bg-white/50 hover:bg-white/80 dark:bg-gray-500/50 dark:hover:bg-gray-400'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={currentSlide === index ? 'true' : 'false'}
                                type="button"
                            />
                        ))}
                    </div>

                    <div className="h-1 w-24 overflow-hidden rounded-full bg-white/20 dark:bg-gray-600/50">
                        <div
                            className="h-full rounded-full bg-blue-600 transition-all ease-linear dark:bg-blue-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
