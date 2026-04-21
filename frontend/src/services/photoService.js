import api from './api'

export const uploadPhotos = async (galleryId, category, files) => {
  const formData = new FormData()
  formData.append('galleryId', galleryId)
  formData.append('category', category)
  
  for (let i = 0; i < files.length; i++) {
    formData.append('photos', files[i])
  }
  
  const response = await api.post('/photos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const getGalleryPhotos = async (galleryId) => {
  const response = await api.get(`/photos/gallery/${galleryId}`)
  return response.data
}