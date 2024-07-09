const slidebar = require('../helpers/sidebar');
const { Image } = require('../models');
const homeCtrl = {};

homeCtrl.index = async (req, res) => {
    try {
        let images = await Image.find()
            .sort({ timestamp: -1 })
            .lean({ virtuals: true })
        let viewModel = { images };
        viewModel = await slidebar(viewModel);
        res.render('index', viewModel);
    } catch (e) {
        next(e);
    };
};

module.exports = homeCtrl;