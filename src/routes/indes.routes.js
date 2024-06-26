const express = require('express');
const router = express.Router();
const homeCtrl = require('../controllers/home.controlller');
const imageCtrl = require('../controllers/image.controller');

module.exports = app => {
    // home   
    router.get('/', homeCtrl.index);
    // Methods for images
    router.get('/images/:image_id', imageCtrl.getImgId);
    router.post('/images', imageCtrl.createImg);
    router.post('/images/:image_id/like', imageCtrl.createLike);
    router.post('/images/:image_id/comment', imageCtrl.createCmt);
    router.delete('/images/:image_id', imageCtrl.removeImg);
    //
    app.use(router);
};