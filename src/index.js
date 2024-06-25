const express = require('express');
const config = require('./server/config.js');
require('dotenv/config');
//Data base
require('./database.js');
// Starter server
const app = config(express());
//
app.listen(app.get('port'), () =>{
    console.log('Server on port: ', app.get('port'));
});