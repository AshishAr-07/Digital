import Link from 'next/link';
import React from 'react'
import { FiPackage } from "react-icons/fi";

export default function Icon() {
  return (
    <div className='fixed z-50 right-4 bottom-4 group'>
      <Link href='/orders' className='relative flex items-center justify-center p-3 rounded-full bg-linear-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110'>
        <FiPackage size={36} color='white' />
        <span className='absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none'>
          My Orders
        </span>
      </Link>
    </div>
  )
}