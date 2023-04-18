// //everything regarding customer will be routed here
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

//route the new order input page
router.get('/', customerController.load_dropdown);
//route to the new order result page
// router.post('/newOrder', customerController.form_submit);
// router.post('/getData', customerController.form_submit);

module.exports = router;