const homeCtrl = {};
const { Image } = require('../models');

homeCtrl.index = async (req, res) => {
    let images = await Image.find()
        .sort({ timestamp: -1 })
        .lean({ virtuals: true });
        console.log(images)
    res.render('index', { images });
};

module.exports = homeCtrl;