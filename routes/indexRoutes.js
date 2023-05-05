// //everything regarding customer will be routed here
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexControllerFinal');

router.get('/', indexController.load_form);
router.get('/autoTest', indexController.load_autoTest_form);
router.get('/manualTest', indexController.load_manualTest_form);
router.post('/newOrder', indexController.submit_order);

module.exports = router;