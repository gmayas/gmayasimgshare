const path = require('path');
const fse = require('fs-extra');
const { randonName } = require('../helpers/libs');
const { Image } = require('../models/');
const imageCtrl = {};

imageCtrl.getImgId = async (req, res) => {
    try {
        const image = await Image.findOne({uniqueId: req.params.image_id})
        .lean({ virtuals: true })
        console.log('Image: ', image);
        res.render('image', { image });
    }
    catch (e) {
        console.log('erros: ', e);
    }
};

imageCtrl.createImg = async (req, res) => {
    try {
        await saveImg(req, res);
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

const saveImg = async (req, res) => {
    try {
        const nameFile = randonName();
        const findResult = await Image.find({ fileName: nameFile });
        if (findResult.length > 0) {
            await saveImg(req, res);
        } else {
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${nameFile}${ext}`);
            const matchExt = [".jpg", ".jpeg", ".png", ".gif"];
            if (matchExt.some(e => e === ext)) {
                await fse.rename(imageTempPath, targetPath);
                const newImg = new Image({
                    uniqueId: nameFile,
                    title: req.body.title,
                    filename: `${nameFile}${ext}`,
                    description: req.body.description,
                });
                console.log("newImg: ", newImg)
                const imgSave = await newImg.save();
                res.redirect(`/images/${nameFile}`);
                //res.status(200).json({ 'message': 'Image saved successfully' });
            } else {
                await fse.unlink(imageTempPath);
                res.status(500).json({ 'error': 'Image not found' });
            };
        };
    }
    catch (e) {
        console.log('error: ', e);
    };
}

module.exports = imageCtrl;