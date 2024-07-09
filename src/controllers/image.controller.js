const path = require('path');
const fse = require('fs-extra');
const md5 = require('md5');
const { randonName } = require('../helpers/libs');
const { Image, Comment } = require('../models/');
const sidebar = require('../helpers/sidebar')
const imageCtrl = {};

imageCtrl.getImgId = async (req, res) => {
    try {
        const image_id = req.params.image_id;
        const image = await Image.findOneAndUpdate(
            { uniqueId: image_id },
            { $inc: { views: 1 } }
        ).lean({ virtuals: true })
        if (image) {
            image.views += 1;
            console.log('Image: ', image);
            const comments = await getCmtId(image._id);
            let  viewModel = { image, comments };
            viewModel = await sidebar(viewModel);
            res.render('image', viewModel);
        } else {
            res.redirect('/');
        };
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

imageCtrl.removeImg = async (req, res) => {
    try {
        const image = await removeImg(req, res);
        console.log('removeImg: ', image);
        res.json(image);
    }
    catch (e) {
        console.log('error: ', e);
    }
};

imageCtrl.createLike = async (req, res) => {
    try {
        const image = await saveLike(req, res);
        console.log('createLike: ', image);
        res.json({ likes: image.likes });
    }
    catch (e) {
        console.log('error: ', e);
    }
};
imageCtrl.createCmt = async (req, res) => {
    try {
        await saveCmt(req, res);
    }
    catch (e) {
        console.log('error: ', e);
    }
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

const removeImg = async (req, res) => {
    try {
        const image_id = req.params.image_id;
        const image = await Image.findOne({ uniqueId: image_id })
            .lean({ virtuals: true })
        if (image) {
            const targetPath = path.resolve(`src/public/upload/${image.filename}`);
            const delComment = await Comment.deleteOne( {image_id: image._id});
            console.log('delComment:', delComment);
            const delImg = await Image.deleteOne( {_id: image._id});
            console.log('delImg:', delImg);
            await fse.unlink(targetPath)
            return true;
        } else {
            return false;
        };
    }
    catch (e) {
        console.log('error: ', e);
        return false;        
    };
}

const saveCmt = async (req, res) => {
    try {
        const image_id = req.params.image_id;
        const image = await Image.findOne({ uniqueId: image_id })
            .lean({ virtuals: true });
        if (image) {
            const body = req.body
            const newCmt = new Comment(body);
            newCmt.gravatar = md5(newCmt.email);
            newCmt.image_id = image._id;
            const cmtSave = await newCmt.save();
            console.log("cmtSave: ", cmtSave)
            res.redirect(`/images/${image_id}`);
        } else {
            res.redirect('/');
        };
    }
    catch (e) {
        console.log('error: ', e);
    };
}

const getCmtId = async (image_id) => {
    try {
        const cmntId = await Comment.find({ image_id })
            .lean({ virtuals: true });
        return cmntId
    }
    catch (e) {
        console.log('error: ', e);
    };
};

const saveLike = async (req, res) => {
    try {
        const image_id = req.params.image_id;
        const image = await Image.findOneAndUpdate(
            { uniqueId: image_id },
            { $inc: { likes: 1 } }
        ).lean({ virtuals: true })
        if (image) {
            image.likes += 1;
            return image;
        } else {
            res.redirect('/');
        };
    }
    catch (e) {
        console.log('error: ', e);
        return {}
    };
}

module.exports = imageCtrl;