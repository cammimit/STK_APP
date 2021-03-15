/* RAPI Messages Picking Module */
/* main module for our messages */
/* we put all of the tests and functions */
/* into here and as we do them we move them */
/* out to the other modules */
/* cammi 2019 */
//reConfigFile  = require('../READCONFIG/ReadConfig');	
//counters      = require('../FCSTKPROC/ConfigCounters');
//reconMethods  = require('../MESSAGES/MessagePackRecon');
var lauth = require('../AUTH/Auth.js');
var MSQL = require('mysql');
var ModVer = 'PICKING_ORDER_LIST:0.01';
function picking_Get_Order_List(req, res, connection) {
    console.log('In processService.Picking_Order_List');
    var sType = req.body.stype;
    var token = req.body.token;
    var testObj = new Object();
    var found = 0;
    console.log('Validating token:' + token);
    if (typeof token == 'undefined') {
        res.sendStatus(403);
        return;
    }
    if (token.length == 0) {
        res.sendStatus(403);
        ;
        return;
    }
    if (token == 0) {
        res.sendStatus(403);
        return;
    }
    if (typeof sType == 'undefined') {
        res.sendStatus(403);
        return;
    }
    if (sType.length == 0) {
        res.sendStatus(403);
        return;
    }
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var uLvl = tokenObj.uLvl;
    if (typeof uLvl == 'undefined') {
        iBatchUserLevel = 0;
        uLvl = 0;
    }
    if (uLvl == null) {
        iBatchUserLevel = 0;
        uLvl = 0;
    }
    if (typeof uLvl == 'undefined') {
        failService(req, res);
        return;
    }
    if (typeof uLvl == 'undefined') {
        iBatchUserLevel = 0;
    }
    if (uLvl.length == 0) {
        iBatchUserLeveln = 0;
    }
    else {
        iBatchUserLevel = uLvl;
    }
    console.log('Done with User Validation and Auth');
    console.log('Now getting onto list of pickable orders');
    console.log('The requested service is: ' + sType);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var userid = tokenObj.guid;
    var q2 = 'SELECT * FROM s_sup_doc_h_h WHERE STATUS= ? and COUNTRY="SOUTH AFRICA" and COMPANY="FITCHEF"';
    connection.query(q2, ['SCHEDULING', userid], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        //convet from the rowDataPacketFormat to real JSON
        batches = retrRecsCBUser(rows);
        res.json({ status: 0, results: { batches: batches } });
        return;
    });
}
function retrRecsCBUser(rows) {
    //retr rows callback for showOpenBatchesAdmin function
    var rescount = 0;
    var rChain = '';
    var aRecs = new Object();
    //console.log(rows);
    for (key in rows) {
        rescount++;
        rec = rows[key];
        BID = rec.BID;
        VERGUID = rec.VERGUID;
        SSID = rec.SSID;
        CDT = rec.CREATE;
        PNID = rec.PNID;
        //console.log('USER: Retrieved BID & VERGUID & SSID: ' + BID + ' ' + VERGUID + ' ' + SSID);
        if (typeof (VERGUID) == 'undefined') {
            VERGUID = 0;
        }
        if (typeof (SSID) == 'undefined') {
            SSID = 0;
        }
        if (typeof (CREATE) == 'undefined') {
            CREATE = 0;
        }
        VERGUID = encodeURIComponent(VERGUID);
        SSID = encodeURIComponent(SSID);
        CREATE = encodeURIComponent(CREATE);
        BID = encodeURIComponent(BID);
        PNID = encodeURIComponent(PNID);
        aRecs[rescount] = ({ REC: rescount, BID: BID, VERGUID: VERGUID, SSID: SSID, CREATE: CDT, PNID: PNID });
    }
    //console.log(aRecs);
    rChain = JSON.stringify(aRecs);
    return (rChain);
}
function failService(req, res) {
    // sorry friend, no can do for token reasons
    // imply refresh token
    console.log('bombing out a service request - sending status -1 token failure');
    res.json({ status: -1, data: { key: 0 } });
    return;
}
/* exports*/
module.exports =
    {
        picking_Get_Order_List: picking_Get_Order_List
    };
/* END */ 
//# sourceMappingURL=Picking_Order_List.js.map