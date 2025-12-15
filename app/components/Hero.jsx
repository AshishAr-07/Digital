import React from 'react'
import Wrapper from './Wrapper'
import Image from 'next/image'
import { CiFileOn } from "react-icons/ci";
import Link from 'next/link';

export default function Hero() {
    return (
         <Wrapper className='pt-8 pb-24'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                        {/* Left Content Section */}
                        <section className='flex flex-col relative z-20 space-y-6'>
                            
                            
                            <span className="inline-flex items-center px-4 py-2 bg-linear-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-900/30 rounded-full border border-red-200 dark:border-red-800 w-fit">
                                <CiFileOn className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                                <span className="text-sm font-medium text-red-600 dark:text-red-400">Digital Products</span>
                            </span>
                            
                            <h1 className='font-black uppercase text-5xl md:text-6xl flex flex-col leading-none dark:text-white text-gray-800'>
                                Greetings
                                <span className="text-3xl md:text-4xl  bg-linear-to-r from-red-600 to-red-900 bg-clip-text text-transparent">
                                    Games & Gifts
                                </span>
                            </h1>
                            
                            <p className='text-gray-700 leading-relaxed max-w-xl'>
                                Discover a world of digital delights. From heartfelt greetings to thrilling games and unforgettable gifts—all at your fingertips.
                            </p>
                            
                            <div className='flex flex-col sm:flex-row gap-4 mt-8'>
                                <Link
                                    href="/products"
                                    className='uppercase py-3 px-6 rounded-lg bg-linear-to-r from-red-600 to-red-900 text-white text-sm font-semibold text-center hover:shadow-xl hover:scale-105 transition-all duration-300'
                                >
                                    Explore Products
                                </Link>
                                <Link
                                    href="/about"
                                    className='uppercase py-3 px-6 rounded-lg bg-transparent border-2 border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white text-sm font-semibold text-center transition-all duration-300'
                                >
                                    Learn More
                                </Link>
                            </div>
                        </section>
                        
                        {/* Right Image Section */}
                        <section className='relative'>
                          
                            
                            {/* Image Container */}
                        <div className='relative z-10 transform hover:scale-105 transition-transform duration-500'>
                            <div className='relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700'>
                                <Image 
                                    src='/hero.webp' 
                                    alt="Hero Image" 
                                    width={600} 
                                    height={400} 
                                    className='w-full h-auto object-cover'
                                    priority
                                />
                            </div>
                        </div>
                        </section>
                    </div>
                </Wrapper>
    )
}
