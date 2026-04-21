import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getGalleryPhotos } from '../services/photoService'
import { getGalleryById } from '../services/galleryService'
import { downloadImage } from '../utils/downloadImage'

const GalleryView = () => {
  const { galleryId } = useParams()
  const [photos, setPhotos] = useState({
    gusaba: [],
    church: [],
    reception: [],
    photoshoot: []
  })
  const [gallery, setGallery] = useState(null)
  const [activeCategory, setActiveCategory] = useState('gusaba')
  const [loading, setLoading] = useState(true)
  const [downloadingId, setDownloadingId] = useState(null)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    fetchGalleryAndPhotos()
  }, [])

  const fetchGalleryAndPhotos = async () => {
    try {
      const [galleryData, photosData] = await Promise.all([
        getGalleryById(galleryId),
        getGalleryPhotos(galleryId)
      ])
      setGallery(galleryData)
      setPhotos(photosData)
    } catch (error) {
      console.error('Failed to load gallery')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (photoUrl, photoId) => {
    setDownloadingId(photoId)
    try {
      await downloadImage(photoUrl, `wedding-${photoId}.jpg`)
    } finally {
      setDownloadingId(null)
    }
  }

  const categories = [
    { id: 'gusaba', label: 'Gusaba', iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z' },
    { id: 'church', label: 'Church', iconPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { id: 'reception', label: 'Reception', iconPath: 'M3 18h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V8H3v2zm0-6v2h18V4H3z' },
    { id: 'photoshoot', label: 'Photoshoot', iconPath: 'M15 3h-3v3h3V3zM9 3H6v3h3V3zM3 3H0v3h3V3zm12 6h-3v3h3V9zm-6 0H6v3h3V9zM3 9H0v3h3V9zm12 6h-3v3h3v-3zm-6 0H6v3h3v-3zM3 15H0v3h3v-3z' }
  ]

  const currentPhotos = photos[activeCategory] || []

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-gray-900 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500">Loading your memories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-95"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Different Access Code
            </Link>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-200">{Object.values(photos).flat().length} Photos</span>
            </div>
          </div>

          {/* Gallery Title */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4 backdrop-blur-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
              <span className="text-xs uppercase tracking-wider">Wedding Gallery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">{gallery?.title}</h1>
            <p className="text-gray-300 max-w-md mx-auto">
              Browse through all the beautiful moments captured on your special day
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Category Navigation - Modern Card Style */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 mb-8">
          <div className="flex flex-wrap gap-1">
            {categories.map(cat => {
              const isActive = activeCategory === cat.id
              const photoCount = photos[cat.id]?.length || 0
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={cat.iconPath} />
                  </svg>
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {photoCount}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Photos Grid */}
        {currentPhotos.length > 0 ? (
          <>
            {/* Category Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-gray-900 rounded-full"></div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {categories.find(c => c.id === activeCategory)?.label}
                </h2>
              </div>
              <p className="text-sm text-gray-400">{currentPhotos.length} photos</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {currentPhotos.map((photo, index) => (
                <div
                  key={photo._id}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300"
                >
                  {/* Image Container with Zoom on Click */}
                  <div 
                    className="relative aspect-square bg-gray-100 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.url}
                      alt={`Wedding ${activeCategory} ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Download Button */}
                  <div className="p-3">
                    <button
                      onClick={() => handleDownload(photo.url, photo._id)}
                      disabled={downloadingId === photo._id}
                      className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-lg font-medium text-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {downloadingId === photo._id ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No photos yet</h3>
            <p className="text-gray-500">
              This category doesn't have any photos at the moment
            </p>
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={selectedPhoto.url}
            alt="Full size"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDownload(selectedPhoto.url, selectedPhoto._id)
            }}
            className="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
        </div>
      )}
    </div>
  )
}

export default GalleryView