const Photo = require('../models/Photo');
const Gallery = require('../models/Gallery');

const uploadPhotos = async (req, res) => {
  try {
    const { galleryId, category } = req.body;
    const files = req.files;
    
    console.log('Upload request:', { galleryId, category, fileCount: files?.length });
    
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    if (!galleryId || !category) {
      return res.status(400).json({ message: 'Gallery ID and category are required' });
    }
    
    const gallery = await Gallery.findById(galleryId);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    
    const photos = await Promise.all(
      files.map(file => 
        Photo.create({
          url: file.path, // Cloudinary URL
          category,
          gallery: galleryId
        })
      )
    );
    
    console.log(`Successfully uploaded ${photos.length} photos`);
    res.status(201).json(photos);
  } catch (error) {
    console.error('Upload error details:', error);
    res.status(500).json({ 
      message: 'Upload failed', 
      error: error.message 
    });
  }
};

const getGalleryPhotos = async (req, res) => {
  try {
    const { galleryId } = req.params;
    const photos = await Photo.find({ gallery: galleryId });
    
    const groupedPhotos = {
      gusaba: [],
      church: [],
      reception: [],
      photoshoot: []
    };
    
    photos.forEach(photo => {
      if (groupedPhotos[photo.category]) {
        groupedPhotos[photo.category].push(photo);
      }
    });
    
    res.json(groupedPhotos);
  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadPhotos, getGalleryPhotos };