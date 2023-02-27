// //everything regarding customer will be routed here
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.render_customer);
// router.post('/', customerController.render_customer)
router.post('/submitOrders', customerController.check_in);
module.exports = router;