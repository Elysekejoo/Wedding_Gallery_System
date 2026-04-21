import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { verifyAccessCode } from '../services/galleryService'

const AccessGallery = () => {
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await verifyAccessCode(accessCode)
      navigate(`/gallery/${data.galleryId}`)
    } catch (err) {
      setError('Invalid access code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Split Design */}
      <div className="relative min-h-screen flex">
        {/* Left Side - Brand/Info Area */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col justify-between p-12 w-full">
            <div>
              <div className="flex items-center gap-3 mb-16">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </div>
                <span className="text-white text-lg font-semibold">PhotoStudio</span>
              </div>
            </div>
            
            <div className="max-w-md">
              <h2 className="text-4xl font-bold text-white mb-4">Memories That Last Forever</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Access your wedding photos with a unique code. Every moment captured, every smile preserved.
              </p>
              <div className="mt-8 flex gap-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 text-sm">High Quality Photos</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 text-sm">Easy Download</span>
                </div>
              </div>
            </div>
            
            <div className="text-gray-500 text-sm">
              © 2026 PhotoStudio. All rights reserved.
            </div>
          </div>
        </div>

        {/* Right Side - Access Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
          <div className="max-w-md w-full">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </div>
                <span className="text-xl font-semibold text-gray-900">PhotoStudio</span>
              </div>
            </div>

            {/* Photographer Link */}
            <div className="flex justify-end mb-6">
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Photographer Login
              </Link>
            </div>

            {/* Access Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Access Your Gallery</h1>
                <p className="text-gray-500 mt-2">Enter the access code provided by your photographer</p>
              </div>
              
              {error && (
                <div className="mb-6 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-4 text-center text-2xl tracking-[0.5em] font-mono font-bold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    maxLength="6"
                    required
                    autoFocus
                  />
                  <p className="mt-2 text-xs text-gray-400 text-center">
                    Example: A1B2C3
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 text-white px-6 py-3.5 rounded-xl font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Gallery
                    </span>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">
                  Lost your code? Contact your photographer for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccessGallery