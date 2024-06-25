
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const errorHandler = require('errorhandler');
const routes = require('../routes/indes.routes')
//
module.exports = app => {
    // Settings
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('.hbs', exphbs.engine({
        defaulLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set('view engine', '.hbs');
    // Middleware
    app.use(morgan('dev'));
    app.use(multer({
        dest: path.join(__dirname, '../public/upload/temp')})
        .single('image'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json()); 
    // Routes
    routes(app);
    // Static files
    app.use('/public',express.static(path.join(__dirname, '../public')))
    // Error Handlers
    if (app.get('env') === 'development'){
        app.use(errorHandler)
    }



    return app;
}