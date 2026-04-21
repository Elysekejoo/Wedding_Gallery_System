import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import CreateGallery from '../pages/CreateGallery'
import UploadPhotos from '../pages/UploadPhotos'
import AccessGallery from '../pages/AccessGallery'
import GalleryView from '../pages/GalleryView'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <Routes>
      <Route path="/" element={<AccessGallery />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/create-gallery" element={
        <ProtectedRoute>
          <CreateGallery />
        </ProtectedRoute>
      } />
      <Route path="/upload/:galleryId" element={
        <ProtectedRoute>
          <UploadPhotos />
        </ProtectedRoute>
      } />
      <Route path="/gallery/:galleryId" element={<GalleryView />} />
    </Routes>
  )
}

export default AppRoutes