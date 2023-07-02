const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const app = express();
//const {sendBasicEmail} = require('./services/email-service');
const {createChannel} = require('./utils/messageQueue');
const TicketController = require('./controllers/ticket-controller');
//const db = require('./models/index');
const jobs = require('./utils/job');
const setupAndStartServer = async()=>{
   
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.post('/api/v1/tickets' , TicketController.create)
    
    app.listen(PORT , ()=>{
        console.log(`sever is running at ${PORT}`);

        
        /*
        sendBasicEmail(
            'support@admin.com',
            'hk8810254@gmail.com',
            'This is testing email',
            'Hi , How are you'
        )*/
        //cron.schedule('*/2 * * * *', () => {
           // console.log('running a task every two minutes');
        //}); */
        //jobs();
    })
}
setupAndStartServer();
