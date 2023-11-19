const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const app = express();
//const {sendBasicEmail} = require('./services/email-service');
const TicketController = require('./controllers/ticket-controller');

const {subscribeMessage , createChannel} = require('./utils/messageQueue');
const {REMINDER_BINDING_KEY} = require('./config/serverConfig');

const EmailService = require('./services/email-service');

const jobs = require('./utils/job');
const setupAndStartServer = async()=>{
   
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.post('/api/v1/tickets' , TicketController.create)
    
    const channel = await createChannel();
    subscribeMessage(channel , EmailService.subscribeEvents , REMINDER_BINDING_KEY);

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
