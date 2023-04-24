// //everything regarding customer will be routed here
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.load_form);
router.post('/newOrder', indexController.submit_order);

module.exports = router;