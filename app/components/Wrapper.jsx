import React from 'react'

export default function Wrapper({ children, className = '' }) {
    return (
        <div className={`max-w-5xl md:max-w-7xl mx-auto py-16 px-8 lg:px-0 ${className}`} >{children}</div>
    )
}