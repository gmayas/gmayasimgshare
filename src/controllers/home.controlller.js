const homeCtrl = {};

homeCtrl.index = (req, res) =>{
    res.render('index');
};

module.exports = homeCtrl;