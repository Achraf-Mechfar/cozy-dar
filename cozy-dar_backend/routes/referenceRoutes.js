const express = require('express');
const router = express.Router();
const { cities,districts } = require('../controllers/referenceController');

router.get('/cities',cities)
router.get('/districts/:city',districts)

module.exports = router;