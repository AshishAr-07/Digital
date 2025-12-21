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
            <div className="max-w-7xl mx-auto px-3 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="shrink-0 flex items-center gap-2 sm:gap-3 flex-1 md:flex-initial">
                        {/* <Link href="/">
                            <Image src="/logo.png" width={150} height={80} alt='logo' />
                        </Link> */}
                        <h1 className="text-sm sm:text-base md:text-xl font-semibold uppercase text-gray-800">
                            <span className="block sm:inline">CatchyDeals</span>
                            <span className="block sm:inline sm:ml-1">Digital Store</span>
                        </h1>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-700 px-3 py-2 font-medium hover:text-red-600 transition-colors">
                            Home
                        </Link>
                        <Link href="/about" className="text-gray-700 px-3 py-2 font-medium hover:text-red-600 transition-colors">
                            About
                        </Link>
                        <Link href="/contact" className="text-gray-700 px-3 py-2 font-medium hover:text-red-600 transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex gap-2 items-center">
                        <SignedOut>
                            <SignInButton>
                                <button className="bg-transparent border-2 border-red-600 text-red-600 rounded-full font-medium text-sm lg:text-base py-2 px-4 lg:px-5 cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton>
                                <button className="bg-red-600 text-white rounded-full font-medium text-sm lg:text-base py-2 px-4 lg:px-5 cursor-pointer hover:bg-red-700 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>

                    {/* Mobile menu button and auth */}
                    <div className="flex items-center gap-1 sm:gap-2 justify-end md:hidden">
                        <div className="flex items-center gap-1">
                            <SignedOut>
                                <SignInButton>
                                    <button className="bg-transparent border-2 border-red-600 text-red-600 rounded-full font-medium text-xs py-1.5 px-3 cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out whitespace-nowrap">
                                        Sign In
                                    </button>
                                </SignInButton>
                                <SignUpButton>
                                    <button className="bg-red-600 text-white rounded-full font-medium text-xs py-1.5 px-3 cursor-pointer hover:bg-red-700 transition-all duration-300 ease-in-out whitespace-nowrap">
                                        Sign Up
                                    </button>
                                </SignUpButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 ml-1"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white text-black border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            onClick={MenuClick}
                            href="/"
                            className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            onClick={MenuClick}
                            href="/about"
                            className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            onClick={MenuClick}
                            href="/contact"
                            className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md transition-colors"
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