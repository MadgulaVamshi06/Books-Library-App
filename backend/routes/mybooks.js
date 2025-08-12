const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getMyBooks, addMyBook, updateStatus, updateRating } = require('../controllers/myBooksController');

router.get('/', auth, getMyBooks);
router.post('/:bookId', auth, addMyBook);
router.patch('/:bookId/status', auth, updateStatus);
router.patch('/:bookId/rating', auth, updateRating);

module.exports = router;
