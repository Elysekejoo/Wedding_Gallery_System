const express = require('express');
const { createGallery, getMyGalleries, verifyAccessCode, getGalleryById } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createGallery);
router.get('/my', protect, getMyGalleries);
router.post('/verify', verifyAccessCode);
router.get('/:id', getGalleryById);

module.exports = router;