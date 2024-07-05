const homeCtrl = {};
const { Image } = require('../models');

homeCtrl.index = async (req, res) => {
    let images = await Image.find()
        .sort({ timestamp: -1 })
        .lean({ virtuals: true })
    res.render('index', { images });
};

module.exports = homeCtrl;