const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

router.get('/', controller.getCandidateData);
// router.post('/', controller.sendCandidateData);

module.exports = router;
