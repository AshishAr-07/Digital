import React from 'react'
import Wrapper from './Wrapper'
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebookF,} from "react-icons/fa";
import Link from 'next/link';
import { FaPinterest } from 'react-icons/fa6';


export default function Footer() {
    return (
        <footer className='w-full bg-gray-900 text-white'>
            <Wrapper className='pb-2 pt-8'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-12 py-6'>
                    <section className='flex flex-col gap-2 md:col-span-2'>
                        <div>
                            {/* <Link href='/'>
                                <Image src="/logo.png" alt="Eimpika Logo" width={80} height={50} />
                            </Link> */}
                            <p className='text-lg pt-2'>We are committed to your holiday cheer by offering a wide range of high-quality digital templates and games at affordable prices.</p>
                        </div>
                        {/* <div className='grid grid-cols-1 md:grid-cols-2 pt-6 gap-4'>
                            <section className='flex flex-col gap-2'>
                                <span className='flex items-center gap-3'>
                                    <IoMailUnreadOutline size={28} className="min-w-[25px] mt-1" />
                                    <h2 className=' sm:text-base'>Mail </h2>
                                </span>
                                <p>eimpikaweb@gmail.com</p>
                            </section>
                            <section className='flex flex-col gap-2'>
                                <span className='flex items-center gap-3'>
                                    <RiMapPinLine size={28} className="min-w-[25px] mt-1" />
                                    <h2 className=' sm:text-base'>Address</h2>
                                </span>
                                <p>Aurora Waterfront, 10th Floor, Unit No. 1016 & 1017 GN BLOCK, Plot No. 34/1, Sector V, Salt Lake, Kolkata-700091, W.B, IN</p>
                            </section>

                        </div> */}
                    </section>
                    <section className='flex flex-col gap-2'>
                        <h1 className='text-2xl pb-2 font-medium '>Useful Links</h1>
                        <Link href='/about'>
                            <span className='flex items-center gap-2'><IoIosArrowForward size={15} />About</span></Link>
                        <Link href='/contact'>
                            <span className='flex items-center gap-2'><IoIosArrowForward size={15} />Contact</span></Link>
                        <Link href='/shipping-policy'>
                            <span className='flex items-center gap-2'><IoIosArrowForward size={15} />Shipping Policy</span></Link>
                        <Link href='/refund-policy'>
                            <span className='flex items-center gap-2'><IoIosArrowForward size={15} />Refund Policy</span></Link>

                    </section>
                    <section className='flex flex-col gap-2'>
                        <h1 className='text-2xl pb-2 font-medium '>Social Links</h1>
                        <div className='flex gap-4'>
                            <Link href="https://www.facebook.com/catchydeals07/" target="_blank" rel="noopener noreferrer"
                                className='p-2 rounded-full bg-blue-600'>
                                <FaFacebookF size={20} />
                            </Link>

                            <Link href="https://in.pinterest.com/Catchydeals07" target="_blank" rel="noopener noreferrer"
                                className='p-2 rounded-full bg-pink-600'>
                                <FaPinterest size={20} />
                            </Link>

                        </div>
                    </section>
                </div>
                <div className='w-full mt-8 text-sm py-4 border-t border-gray-200'>

                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className=" text-center md:text-left">
              © {new Date().getFullYear()} All rights reserved.
            </div>
            <nav>
              <ul className="flex justify-center md:justify-end space-x-8 ">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-white hover:scale-105 transform transition-all duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="terms-and-conditions"
                    className="hover:text-white hover:scale-105 transform transition-all duration-300"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
            
                </div>

            </Wrapper>
        </footer>
    )
}