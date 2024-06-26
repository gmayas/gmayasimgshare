const imageCtrl = {};

imageCtrl.getImgId = (req, res) =>{
    res.send('Image get page');
};

imageCtrl.createImg = (req, res) =>{
    res.send('Image post page');
};

imageCtrl.removeImg = (req, res) =>{
    res.send('Image post page');
};

imageCtrl.createLike = (req, res) =>{
    res.send('Like image post page');
};
imageCtrl.createCmt = (req, res) =>{
    res.send('Comment image post page');
};

module.exports = imageCtrl;