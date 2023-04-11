// //everything regarding customer will be routed here
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.get_user_inputs );
router.post('/newOrder', customerController.form_submit);
module.exports = router;