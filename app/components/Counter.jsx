'use client'
import React, { useState, useEffect } from 'react'
import Wrapper from './Wrapper'

export default function Counter() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        // Set target date (e.g., 7 days from now)
        const targetDate = new Date()
        targetDate.setDate(targetDate.getDate() + 2)

        const timer = setInterval(() => {
            const now = new Date().getTime()
            const distance = targetDate - now

            if (distance < 0) {
                clearInterval(timer)
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                return
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <Wrapper>
            <div className='relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-700 via-red-700 to-emerald-900 p-12 shadow-2xl'>
                {/* Snowflakes Background Animation */}
                <div className='absolute inset-0 opacity-10'>
                    <div className='absolute top-10 left-10 text-6xl animate-bounce text-white'>❄</div>
                    <div className='absolute top-20 right-20 text-4xl animate-pulse text-white delay-300'>❄</div>
                    <div className='absolute bottom-20 left-32 text-5xl animate-bounce text-white delay-500'>❄</div>
                    <div className='absolute top-32 right-40 text-3xl animate-pulse text-white'>❄</div>
                    <div className='absolute bottom-32 right-10 text-6xl animate-bounce text-white delay-700'>❄</div>
                </div>

                {/* Glowing Orbs */}
                <div className='absolute inset-0 opacity-20'>
                    <div className='absolute top-0 left-0 w-96 h-96 bg-red-300 rounded-full blur-3xl animate-pulse'></div>
                    <div className='absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl animate-pulse delay-700'></div>
                </div>

                <div className='relative z-10 text-center space-y-8'>
                    {/* Heading */}
                    <div className='space-y-4'>
                        <div className='flex items-center justify-center gap-3 mb-2'>
                            <span className='text-4xl animate-pulse'>🎄</span>
                            <h2 className='text-3xl md:text-6xl font-black text-white uppercase tracking-tight'>
                                Christmas Special
                            </h2>
                            <span className='text-4xl animate-pulse'>🎄</span>
                        </div>
                        <p className='text-xl md:text-2xl text-red-50 font-semibold'>
                            Unwrap the Perfect Gift for {' '}
                            <span className='inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-4xl md:text-5xl font-black text-white shadow-lg'>
                                Christmas
                            </span>
                        </p>
                    </div>

                    {/* Countdown Timer */}
                    <div className='flex justify-center gap-4 md:gap-6 flex-wrap'>
                        <div className='flex flex-col items-center bg-white/15 backdrop-blur-md rounded-2xl p-6 min-w-[100px] md:min-w-[120px] border border-white/20 shadow-xl hover:scale-105 transition-transform'>
                            <span className='text-5xl md:text-6xl font-black text-white drop-shadow-lg'>{String(timeLeft.days).padStart(2, '0')}</span>
                            <span className='text-sm md:text-base text-red-100 uppercase font-bold mt-2 tracking-wider'>Days</span>
                        </div>
                        <div className='flex flex-col items-center bg-white/15 backdrop-blur-md rounded-2xl p-6 min-w-[100px] md:min-w-[120px] border border-white/20 shadow-xl hover:scale-105 transition-transform'>
                            <span className='text-5xl md:text-6xl font-black text-white drop-shadow-lg'>{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className='text-sm md:text-base text-red-100 uppercase font-bold mt-2 tracking-wider'>Hours</span>
                        </div>
                        <div className='flex flex-col items-center bg-white/15 backdrop-blur-md rounded-2xl p-6 min-w-[100px] md:min-w-[120px] border border-white/20 shadow-xl hover:scale-105 transition-transform'>
                            <span className='text-5xl md:text-6xl font-black text-white drop-shadow-lg'>{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className='text-sm md:text-base text-red-100 uppercase font-bold mt-2 tracking-wider'>Minutes</span>
                        </div>
                        <div className='flex flex-col items-center bg-white/15 backdrop-blur-md rounded-2xl p-6 min-w-[100px] md:min-w-[120px] border border-white/20 shadow-xl hover:scale-105 transition-transform'>
                            <span className='text-5xl md:text-6xl font-black text-white drop-shadow-lg'>{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <span className='text-sm md:text-base text-red-100 uppercase font-bold mt-2 tracking-wider'>Seconds</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className='pt-8'>
                        <button

                            className='inline-block uppercase py-2 md:py-5 px-3 md:px-12 rounded-full bg-linear-to-r from-red-500 to-green-500 text-white text-md md:text-xl font-black text-center '
                        >
                            🎁 Claim Your Holiday Deal Now
                        </button>
                        <p className='text-red-50 mt-4 text-sm md:text-base font-semibold flex items-center justify-center gap-2'>
                            <span className='animate-pulse'>⭐</span>
                            Limited Holiday Offer - Don't Miss Out!
                            <span className='animate-pulse'>⭐</span>
                        </p>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
