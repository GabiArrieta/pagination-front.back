const express = require('express');
const router = express.Router();
const { getAllPosts } = require('../controllers/getAllPosts');

router.route('/').get(getAllPosts);

module.exports = router;
