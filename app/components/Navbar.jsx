"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const MenuClick = () => {
        setIsMenuOpen(false);
    }

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="shrink-0 flex items-center gap-3">
                        {/* <Link href="/">
                            <Image src="/logo.png" width={150} height={80} alt='logo' />
                        </Link> */}
                        <h1 className="text-xl font-semibold uppercase text-gray-800">CatchyDeals Digital Store</h1>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-700 px-3 py-2 font-medium">
                            Home
                        </Link>
                        <Link href="/about" className="text-gray-700  px-3 py-2 font-medium">
                            About
                        </Link>


                        <Link href="/contact" className="text-gray-700 px-3 py-2 font-medium">
                            Contact
                        </Link>
                    </nav>

                    <div className="hidden md:flex gap-2 items-center">
                        <SignedOut>
                            <SignInButton>
                                <button className="bg-transparent border-2 border-[#6c47ff] text-[#6c47ff] rounded-full font-medium text-sm sm:text-base py-2 px-4 sm:px-5 cursor-pointer hover:bg-[#6c47ff] hover:text-white transition-all duration-300 ease-in-out">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton>
                                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base py-2 px-4 sm:px-5 cursor-pointer hover:bg-[#5a3ad6] hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center gap-2 justify-center md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700  hover:bg-gray-100"
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
                        </button>
                        <div>
                            <SignedOut>
                                <SignInButton>
                                    <button className="bg-transparent border-2 border-[#6c47ff] text-[#6c47ff] rounded-full font-medium text-sm sm:text-base py-2 px-4 sm:px-5 cursor-pointer hover:bg-[#6c47ff] hover:text-white transition-all duration-300 ease-in-out">
                                        Sign In
                                    </button>
                                </SignInButton>
                                <SignUpButton>
                                    <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base py-2 px-4 sm:px-5 cursor-pointer hover:bg-[#5a3ad6] hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                                        Sign Up
                                    </button>
                                </SignUpButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white text-black">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            onClick={MenuClick}
                            href="/"
                            className="block px-3 py-2 text-base font-medium  hover:bg-gray-100 rounded-md"
                        >
                            Home
                        </Link>
                        <Link
                            onClick={MenuClick}
                            href="/about"
                            className="block px-3 py-2 text-base font-medium  hover:bg-gray-100 rounded-md"
                        >
                            About
                        </Link>
                        <Link
                            onClick={MenuClick}
                            href="/contact"
                            className="block px-3 py-2 text-base font-medium  hover:bg-gray-100 rounded-md"
                        >
                            Contact
                        </Link>

                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;