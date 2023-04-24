// //everything regarding customer will be routed here
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.load_form);
// router.get('/', customerController.load_dropdown);
router.post('/customer/checkin', customerController.check_in);
// router.get('/get_data', customerController.get_dynamic_data);

module.exports = router;