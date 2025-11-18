const express = require('express');
const upload = require('../utils/upload');
const auth = require('../middleware/auth');
const router = express.Router();

// Upload image endpoint
router.post('/image', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Return the Cloudinary URL
    res.json({
      success: true,
      url: req.file.path, // Cloudinary URL
      publicId: req.file.filename,
      secureUrl: req.file.path.replace('http://', 'https://')
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ 
      message: 'Failed to upload image',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;

