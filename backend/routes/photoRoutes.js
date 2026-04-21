const express = require('express');
const { uploadPhotos, getGalleryPhotos } = require('../controllers/photoController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../utils/upload');
const router = express.Router();

router.post('/upload', protect, upload, uploadPhotos);
router.get('/gallery/:galleryId', getGalleryPhotos);

module.exports = router;