const express = require('express');
const router = express.Router();
const { getBooks } = require('../controllers/bookController');

router.get('/', getBooks);
router.post("/", addBook);
module.exports = router;
