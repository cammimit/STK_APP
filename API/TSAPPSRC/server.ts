//the environment options are local, dev or  prod

//make sure you set up the environment correctly otherwise all the wheels will fall off.
import { Application } from './Application'

/**
 * Entrypoint for bootstrapping and starting the application.
 * Might configure aspects like logging, telemetry, memory leak observation or even orchestration before.
 * This is about to come later!
 */

var exmode: string = '';
if (typeof (process.env.NODE_ENV) == 'undefined') {
    exmode = 'dev';
}
else {
    exmode = process.env.NODE_ENV;
}
Application.createApplication(exmode).then(() => {
    console.info('The application was started! Kill it using Ctrl + C')
    })








//import * as datalayer from './Datalayer';
//let datalayer = new datalayer();
//const express = import('express');
//const session = require('express-session');
//const bodyParser = require('body-parser');
//const router:  = express.Router();
//const cors = require('cors');
//const config = require('./ReadConfig.js');
//var confObject: any = new Object();
//async function getConfig(confObject) {
//    let v = await config.rcReadConfigFile(confObject);
//
//    if (!v.ok) { throw new Error(`HTTP error! status: ${v.status}`); }
//    else {
//        console.log('Testing Config: ' + confObject.LOCALDBPWD);
//    }
//}

//getConfig(confObject);



//console.log('ENV: ' + process.env.NODE_ENV);
//console.log('Exiting');


///* simple server to do a few things */
///* 1. supply login form */
///* 2. auth the login credentials */
///* 3. supply the count form */
///* 4. allow batch creation */
///* 5. count items */
///* 6. lookup names */
///* 7. close batch */
///* a. show open batches and users */
///* b. force close a batch for user */
///* c. show all users with open tokens */
///* d. log off a user token */
///* remember to install crypto-random-string */
//
//const app = express();
//const ourMessages = require('./MESSAGES/Messages.js');
//const ourPickingOrderList = require('./MESSAGES/Picking_Order_List.js');
//const auth = require('./AUTH/Auth.js');
//const mysql = require('mysql');
//const stats = require('./STATS/Stats.js');
//const cryptoRandomString = require('crypto-random-string');
//
//app.use(cors());
//app.use(session({ secret: 'gjgjd%dd&ss$ss&ss_EW', saveUninitialized: true, resave: true }));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/pages/'));
//app.use(express.static(__dirname + '/images/'));
//
//let Env = "DEV";
//let Counters = '';
//let Configs = '';
//Counters['db_conn_status'] = 0;
////so we can use REDIS if we ever get big enough to justify it
////just to make life longer with less suffering.
////but religious purists have taken over the store so we have to
////pop it into the module [which is just fine in this instance]
////tokenStore= new Object();
////will install the jwt support, much better
//
///* Assuming that window.crypto.getRandomValues is available */
//
//// global session, NOT recommended
////var sess; 
////const dboptions = {
////  user: 'stockt8keNodeSrv',
////  host: '10.0.33.130',
////  password: '$tockT8<swsj;H',
////  database: 'fitchef2020live'
////}
////
//
////just seeing if you are awake. cannot get mysql to use a limited power user
////we have to give the user every goddamn right under the sun before it fucking connects
//
//let conMgr = 0;
//let lhost = '';
//let lpassword = '';
//let ldatabase = '';
//let luser = '';
//
//if (Env == "DEV") { lhost = '127.0.0.1'; lpassword = 'P8ll8nd0#_#_'; ldatabase = 'fitchef2020live'; luser = 'root'; }
//else { lhost = '10.0.33.130'; lpassword = 'fitchef2017$$'; ldatabase = 'fitchef2020live'; luser = 'fitchef2017'; }
//
//
//let connection = mysql.createConnection({
//	user: luser,
//	host: lhost,
//	password: lpassword,
//	database: ldatabase
//});
////now this truly ugly keepalive that ties up a mariadb thread.
////because life is just too short otherwise.  
////don't tell anyone
//setInterval(function () {
//	connection.query('SELECT 1');
//}, 5000);
//
//setInterval(function () {
//	if (typeof connection == 'undefined') {
//		connection = mysql.createConnection({
//			user: luser,
//			host: lhost,
//			password: lpassword,
//			database: ldatabase
//		});
//	};
//	conMgr++;
//}, 20000);
//
///* routes first */
//router.get('/', (req, res) => {
//	sess = req.session;
//	if (sess.ourtoken) {
//		return res.redirect('/countform');
//	}
//	var options = {};
//	if (Env == "DEV") { options = { 'root': "D:/DEV/Node/FSTCK2/pages/" }; }
//	else { options = { 'root': "D:/DEV/Node/FSTCK2/pages/" }; }
//	res.sendFile(__dirname + '/pages/' + 'fcc1.html');
//});
//
//router.post('/login', (req, res) => {
//	testUser = req.body.user;
//	if (typeof testUser == 'undefined') { return; }
//	if (testUser.length < 8) { return; }
//	testPass = req.body.pass;
//	if (testPass.length < 10) { return; }
//	auth.testCreds(req, res, connection, testUser, testPass, tokenStore);
//});
//
//router.post('/auth', (req, res) => {
//	console.log('Attempt to Auth the User');
//	sess = req.session;
//	testUser = req.body.currentUser;
//	testPass = req.body.currentPass;
//	ourMessages.testCreds(req, res, testUser, testPass, tokenStore);
//});
//
//router.get('/countform', (req, res) => {
//	console.log('Attempt to Auth the User');
//	/* if not auth cannot get this page at all */
//	/* the rapi will also check auth separately */
//	res.sendFile(__dirname + '/pages/' + 'fcc1.html');
//});
//
//router.get('/fcSe', (req, res) => {
//	/* service end, multiple micro-services */
//	console.log('Received get request for service end');
//	ourMessages.processService(req, res, connection);
//	/* hand it off completely */
//});
//
//router.post('/fcSe', (req, res) => {
//	/* service end, multiple micro-services */
//	ourMessages.processService(req, res, connection);
//	/* hand it off completely */
//});
//
//router.get('/fcGPB', (req, res) => {
//	/* service end. Just get lists of 'pickable' batches */
//	ourPickingOrderList.picking_Get_order_List(req, res, connection);
//});
//
//
//router.get('/cstat', (req, res) => {
//	stats.cStat(req, res);
//});
//
//router.get('/status', (req, res) => {
//	ourMessages.streamAdminStat(req, res, Counters, Configs, tokenStore);
//});
//
//router.get('/shutdown', (req, res) => {
//	console.log('Shutdown requested');
//	//need an auth module to verify if this user is allowed to shutdown the service
//	//then the cron can restart it
//	//connection.end((err) => {
//	// The connection is terminated gracefully
//	// Ensures all previously enqueued queries are still
//	// before sending a COM_QUIT packet to the MySQL server.
//	// });
//	//serverObj.close;
//	//process.exit(0);	
//});
//
//
///* call back functions */
//function tokenStoreMaintanance() {
//	//called by time trigger.	
//	//reaps any token that is older then 15 minutes
//	//with no activity
//
//
//}
//
//
///*instantiate the routes*/
//
//app.use('/', router);
//
///*start the server*/
//
//var serverObj = app.listen(process.env.PORT || 3000, () => {
//	console.log(`App Started on PORT ${process.env.PORT || 3000}`);
//	console.log('...');
//	var td = Date();
//	console.log(td)
//});