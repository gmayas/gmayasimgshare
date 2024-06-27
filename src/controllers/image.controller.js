const path = require('path');
const fse = require('fs-extra');
const { randonName } = require('../helpers/libs');

const imageCtrl = {};

imageCtrl.getImgId = (req, res) => {
    res.send('Image get page');
};

imageCtrl.createImg = async (req, res) => {
    try {
        const nameFile = randonName();
        const imageTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        const targetPath = path.resolve(`src/public/upload/${nameFile}${ext}`);
        const matchExt = [".jpg", ".jpeg", ".png", ".gif"];
        if (matchExt.some(e => e === ext)) {
            await fse.rename(imageTempPath, targetPath);
        };
        res.send('Work image loup ...');
    }
    catch (e) {
        console.log('erros: ', e);
    }
};

imageCtrl.removeImg = (req, res) => {
    res.send('Image post page');
};

imageCtrl.createLike = (req, res) => {
    res.send('Like image post page');
};
imageCtrl.createCmt = (req, res) => {
    res.send('Comment image post page');
};

module.exports = imageCtrl;