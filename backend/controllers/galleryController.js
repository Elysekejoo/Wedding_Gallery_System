const Gallery = require('../models/Gallery');
const generateCode = require('../utils/generateCode');

const createGallery = async (req, res) => {
  try {
    const { title } = req.body;
    
    let accessCode;
    let codeExists = true;
    
    while (codeExists) {
      accessCode = generateCode();
      codeExists = await Gallery.findOne({ accessCode });
    }
    
    const gallery = await Gallery.create({
      title,
      accessCode,
      photographer: req.user._id
    });
    
    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find({ photographer: req.user._id });
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyAccessCode = async (req, res) => {
  try {
    const { accessCode } = req.body;
    const gallery = await Gallery.findOne({ accessCode });
    
    if (!gallery) {
      return res.status(404).json({ message: 'Invalid access code' });
    }
    
    res.json({ galleryId: gallery._id, title: gallery.title });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createGallery, getMyGalleries, verifyAccessCode, getGalleryById };