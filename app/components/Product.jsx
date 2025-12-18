'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Wrapper from './Wrapper'

export default function Product() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currency, setCurrency] = useState('USD')

  const currencies = {
    INR: { symbol: '₹', rate: 83.12, name: 'Indian Rupee' },
    USD: { symbol: '$', rate: 1, name: 'US Dollar' },
    EUR: { symbol: '€', rate: 0.92, name: 'Euro' },
    GBP: { symbol: '£', rate: 0.79, name: 'British Pound' },
    CAD: { symbol: 'C$', rate: 1.36, name: 'Canadian Dollar' },
    AUD: { symbol: 'A$', rate: 1.53, name: 'Australian Dollar' },
  }

  const convertPrice = (price) => {
    const converted = price * currencies[currency].rate
    return currency === 'JPY' ? Math.round(converted) : converted.toFixed(2)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/product')
      if (response.data.success) {
        setProducts(response.data.data)
      }
      console.log(response)
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setError(error.response?.data?.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Wrapper>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
          <div className="text-xl text-gray-600">Loading products...</div>
        </div>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper>
        <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-200">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-2xl text-red-600 mb-2">Error loading products</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </Wrapper>
    )
  }

  if (products.length === 0) {
    return (
      <Wrapper>
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
          <div className="text-6xl mb-4">📦</div>
          <div className="text-2xl text-gray-800 mb-2">No products available</div>
          <div className="text-gray-600">Check back soon for new festive content!</div>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-6">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Our Digital Products</h2>
            <p className="text-gray-600 text-sm sm:text-base">Browse our collection of festive digital templates</p>
          </div>
          <div className="flex items-center gap-2 justify-center lg:justify-end">
            <label htmlFor="currency" className="text-sm font-medium text-gray-700 whitespace-nowrap">Currency:</label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer hover:border-red-500 text-sm sm:text-base"
            >
              {Object.entries(currencies).map(([code, { symbol, name }]) => (
                <option key={code} value={code}>
                  {symbol} {code} - {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/product/${product._id}`}
            className="group bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-500/20"
          >
            <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-50">
              <img
                src={product.imagesPath && product.imagesPath[0] ? product.imagesPath[0] : '/placeholder.png'}
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />

              {product.originalPrice && product.originalPrice !== product.salePrice && (
                <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  SAVE {currencies[currency].symbol}{convertPrice(product.originalPrice - product.salePrice)}
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-red-700 transition-colors line-clamp-1">
                {product.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                {product.description}
              </p>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-red-700">
                  {currencies[currency].symbol}{convertPrice(product.salePrice)}
                </span>
                {product.originalPrice && product.originalPrice !== product.salePrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {currencies[currency].symbol}{convertPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <button className="w-full bg-red-700 hover:bg-red-800 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 group-hover:scale-105">
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>
    </Wrapper>
  )
}
