'use client'
import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Wrapper from '@/app/components/Wrapper'
import Image from 'next/image'
import Link from 'next/link'

function OrdersContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lookupEmail, setLookupEmail] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [emailError, setEmailError] = useState('')
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [justCompletedOrder, setJustCompletedOrder] = useState(null)

  useEffect(() => {
    // Read query params passed after a successful payment redirect
    const orderId = searchParams.get('orderId')
    const email = searchParams.get('email')
    const status = searchParams.get('status')

    if (status === 'success' && email) {
      setPaymentStatus('success')
      setLookupEmail(email)
      setEmailInput(email)
      if (orderId) {
        fetchSingleOrder(orderId, email)
      } else {
        fetchOrdersByEmail(email)
      }
    }
  }, [searchParams])

  const fetchSingleOrder = async (orderId, email) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/order?id=${orderId}&email=${encodeURIComponent(email)}`)
      const data = await res.json()
      if (data.success) {
        setJustCompletedOrder(data.data)
        setOrders([data.data])
      } else {
        setError(data.message || 'Order not found')
      }
    } catch (err) {
      setError('Failed to load order')
    } finally {
      setLoading(false)
    }
  }

  const fetchOrdersByEmail = async (email) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/order?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      if (data.success) {
        setOrders(data.data)
      } else {
        setError(data.message || 'No orders found')
      }
    } catch (err) {
      setError('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailLookup = (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailInput.trim() || !emailRegex.test(emailInput.trim())) {
      setEmailError('Please enter a valid email address')
      return
    }
    setEmailError('')
    const email = emailInput.trim().toLowerCase()
    setLookupEmail(email)
    setPaymentStatus(null)
    fetchOrdersByEmail(email)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'failed': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Wrapper>
      <div className="py-12 max-w-4xl mx-auto">

        {/* Success Banner */}
        {paymentStatus === 'success' && (
          <div className="mb-8 bg-green-50 border border-green-300 rounded-2xl p-6 flex items-start gap-4">
            <div className="text-4xl">🎉</div>
            <div>
              <h2 className="text-xl font-bold text-green-800">Payment Successful!</h2>
              <p className="text-green-700 mt-1">
                Your purchase is confirmed. Your Canva template link is ready below.
                We&apos;ve also sent the details to <strong>{lookupEmail}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-600">
            Enter your email address to view your purchased templates.
          </p>
        </div>

        {/* Email Lookup Form */}
        <form onSubmit={handleEmailLookup} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="order-email" className="sr-only">Email address</label>
              <input
                id="order-email"
                type="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value)
                  if (emailError) setEmailError('')
                }}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none text-gray-800 ${
                  emailError ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}
                autoComplete="email"
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600" role="alert">{emailError}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-red-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? 'Looking up...' : 'Find My Orders'}
            </button>
          </div>
        </form>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-red-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading your orders...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-200">
            <div className="text-5xl mb-3">❌</div>
            <h2 className="text-xl font-bold text-red-800 mb-2">No orders found</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {/* No orders yet (after search) */}
        {!loading && !error && lookupEmail && orders.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              No orders found for <strong>{lookupEmail}</strong>. Start shopping to see your orders here!
            </p>
            <Link
              href="/"
              className="inline-block bg-red-700 text-white px-8 py-3 rounded-xl hover:bg-red-800 transition-all font-semibold"
            >
              Browse Products
            </Link>
          </div>
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600 text-sm">
                Showing <strong>{orders.length}</strong> order{orders.length !== 1 ? 's' : ''} for <strong>{lookupEmail}</strong>
              </p>
            </div>

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Order ID</p>
                      <p className="font-mono text-sm font-semibold text-gray-800">{order._id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                      <p className="text-sm font-semibold text-gray-800">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Payment ID</p>
                      <p className="font-mono text-sm font-semibold text-gray-800">
                        {order.payment?.razorpayPaymentId || 'Pending'}
                      </p>
                    </div>
                    <div>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Products */}
                <div className="p-6">
                  {order.products?.map((product, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row gap-6 pb-6 mb-6 border-b border-gray-200 last:border-0 last:pb-0 last:mb-0"
                    >
                      {/* Product Image */}
                      <div className="relative w-full md:w-48 aspect-4/3 bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                        {product.imagePath ? (
                          <Image
                            src={product.imagePath}
                            alt={product.title}
                            fill
                            className="object-contain"
                            sizes="192px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span className="text-4xl">📄</span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
                        <p className="text-2xl font-bold text-red-700 mb-4">
                          ${product.salePrice?.toFixed(2)}
                        </p>

                        {/* Access Button */}
                        {order.orderStatus === 'completed' && product.canvaUrl && (
                          <div className="space-y-3">
                            <a
                              href={product.canvaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center bg-red-700 text-white px-6 py-3 rounded-xl hover:bg-red-800 transition-all font-semibold"
                            >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Access Canva Template
                            </a>
                            <p className="text-sm text-gray-500">
                              Click to open and edit your template in Canva
                            </p>
                          </div>
                        )}

                        {order.orderStatus === 'processing' && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm text-yellow-800">
                              <strong>Processing:</strong> Your order is being processed. You&apos;ll get access soon.
                            </p>
                          </div>
                        )}

                        {order.orderStatus === 'failed' && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm text-red-800">
                              <strong>Failed:</strong> Payment failed. Please contact support.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Order Total */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Order Total</p>
                        <p className="text-3xl font-bold text-gray-800">
                          ${order.totalAmount?.toFixed(2)}
                        </p>
                      </div>
                      {order.payment?.status === 'completed' && (
                        <div className="text-right">
                          <span className="inline-flex items-center text-green-600 font-semibold">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Payment Completed
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Browse more products CTA */}
        {!loading && (
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-block bg-gray-100 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium"
            >
              ← Browse More Products
            </Link>
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default function OrdersPage() {
  return (
    <Suspense fallback={
      <Wrapper>
        <div className="text-center py-20">
          <div className="w-16 h-16 border-4 border-red-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading orders...</p>
        </div>
      </Wrapper>
    }>
      <OrdersContent />
    </Suspense>
  )
}
