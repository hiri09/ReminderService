const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const app = express();
const {sendBasicEmail} = require('./services/email-service');

const setupAndStartServer = ()=>{
   
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.listen(PORT , ()=>{
        console.log(`sever is running at ${PORT}`);

        sendBasicEmail(
            'support@admin.com',
            'hk8810254@gmail.com',
            'This is testing email',
            'Hi , How are you'
        )
    })
}
setupAndStartServer();
