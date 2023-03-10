const express = require('express');
const router = express.Router();
const channelCtrl = require('../controllers/channel');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/create-channel', auth, multer, channelCtrl.createChannel);
router.get('/api/channels', auth, channelCtrl.getChannels);
router.get('/api/channels/:id', auth, channelCtrl.getOneChannel);
router.put('/edit-channel/:id', auth, multer, channelCtrl.modifyChannel);
router.delete('/api/channels/:id', auth, channelCtrl.deleteChannel);

module.exports = router;
