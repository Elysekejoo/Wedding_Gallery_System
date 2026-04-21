import api from './api'

export const createGallery = async (title) => {
  const response = await api.post('/gallery/create', { title })
  return response.data
}

export const getMyGalleries = async () => {
  const response = await api.get('/gallery/my')
  return response.data
}

export const verifyAccessCode = async (accessCode) => {
  const response = await api.post('/gallery/verify', { accessCode })
  return response.data
}

export const getGalleryById = async (id) => {
  const response = await api.get(`/gallery/${id}`)
  return response.data
}