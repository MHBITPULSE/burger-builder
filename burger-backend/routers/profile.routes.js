const express = require('express')

const router = express.Router();

const authorize = require('../middlewares/authorize')

const { getProfile, setProfile } = require('../controllers/profile.controllers');

router.post('/', authorize, setProfile);

router.get('/', authorize, getProfile);

module.exports = router