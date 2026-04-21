import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { uploadPhotos } from '../services/photoService'
import { getGalleryById } from '../services/galleryService'

const UploadPhotos = () => {
  const { galleryId } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState('gusaba')
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [gallery, setGallery] = useState(null)
  const [previews, setPreviews] = useState([])
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    fetchGallery()
  }, [])

  // Cleanup previews
  useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview))
    }
  }, [previews])

  const fetchGallery = async () => {
    const data = await getGalleryById(galleryId)
    setGallery(data)
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)
    
    // Create preview URLs
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file))
    setPreviews(newPreviews)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
    if (droppedFiles.length > 0) {
      setFiles(droppedFiles)
      const newPreviews = droppedFiles.map(file => URL.createObjectURL(file))
      setPreviews(newPreviews)
    }
  }

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    URL.revokeObjectURL(previews[index])
    setFiles(newFiles)
    setPreviews(newPreviews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (files.length === 0) return

    setUploading(true)
    try {
      await uploadPhotos(galleryId, category, files)
      alert('Photos uploaded successfully!')
      setFiles([])
      setPreviews([])
    } catch (error) {
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const categories = [
    { id: 'gusaba', label: 'Gusaba', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z' },
    { id: 'church', label: 'Church', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { id: 'reception', label: 'Reception', icon: 'M3 18h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V8H3v2zm0-6v2h18V4H3z' },
    { id: 'photoshoot', label: 'Photoshoot', icon: 'M15 3h-3v3h3V3zM9 3H6v3h3V3zM3 3H0v3h3V3zm12 6h-3v3h3V9zm-6 0H6v3h3V9zM3 9H0v3h3V9zm12 6h-3v3h3v-3zm-6 0H6v3h3v-3zM3 15H0v3h3v-3z' }
  ]

  const getCategoryIcon = (iconPath) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
    </svg>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/dashboard')} 
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-200 hidden sm:block" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Upload Photos</h1>
                {gallery && (
                  <p className="text-sm text-gray-500 hidden sm:block">{gallery.title}</p>
                )}
              </div>
            </div>
            {gallery && (
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="text-sm text-gray-700">{gallery.title}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Progress Steps */}
              <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                    <span className="text-sm font-medium text-gray-900">Select Category</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-200 mx-4" />
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${files.length > 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                    <span className={`text-sm font-medium ${files.length > 0 ? 'text-gray-900' : 'text-gray-400'}`}>Upload Photos</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Category Selection */}
                <div className="p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Choose a category for these photos
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl font-medium transition-all duration-200 ${
                          category === cat.id
                            ? 'bg-gray-900 text-white shadow-lg'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          category === cat.id ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          {getCategoryIcon(cat.icon)}
                        </div>
                        <span className="text-sm">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Upload Area */}
                <div className="px-6 pb-6">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl p-10 transition-all cursor-pointer ${
                      dragActive 
                        ? 'border-gray-900 bg-gray-50' 
                        : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="file-upload"
                    />
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-medium mb-1">
                        Drag & drop photos here
                      </p>
                      <p className="text-sm text-gray-400">
                        or click to browse
                      </p>
                      <p className="text-xs text-gray-400 mt-3">
                        Supports JPG, PNG, GIF • Max 10MB each
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={uploading || files.length === 0}
                    className="w-full bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {uploading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading {files.length} file{files.length !== 1 ? 's' : ''}...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        {files.length === 0 ? 'Select photos to upload' : `Upload ${files.length} photo${files.length !== 1 ? 's' : ''}`}
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - File Previews */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden sticky top-20">
              <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="font-semibold text-gray-900">Selected Files</h3>
                  </div>
                  {previews.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setFiles([])
                        previews.forEach(preview => URL.revokeObjectURL(preview))
                        setPreviews([])
                      }}
                      className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4">
                {previews.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-500 mb-2">
                      {files.length} file{files.length !== 1 ? 's' : ''} ready to upload
                    </div>
                    <div className="max-h-[500px] overflow-y-auto space-y-2 pr-1">
                      {previews.map((preview, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100 group hover:border-gray-200 transition-all"
                        >
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-14 h-14 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {files[index]?.name || `Photo ${index + 1}`}
                            </p>
                            <p className="text-xs text-gray-400">
                              {(files[index]?.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">No files selected</p>
                    <p className="text-xs text-gray-400 mt-1">Select photos to see previews</p>
                  </div>
                )}
              </div>

              {/* Upload Summary */}
              {previews.length > 0 && (
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total size:</span>
                    <span className="font-medium text-gray-900">
                      {(files.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UploadPhotos