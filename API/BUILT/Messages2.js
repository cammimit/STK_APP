/* FCSTK Messages Module */
/* main module for our messages */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* we put all of the tests and functions */
/* into here and as we do them we move them */
/* out to the other modules */
/* cammi 2019 */
reConfigFile = require('../READCONFIG/ReadConfig');
counters = require('../FCSTKPROC/ConfigCounters');
//reconMethods  = require('../MESSAGES/MessagePackRecon');
var lauth = require('../AUTH/Auth.js');
var MSQL = require('mysql');
var ModVer = 'MESSAGES:2.001';
function processService(req, res, connection) {
    console.log('In processService.1');
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
    console.log('Now getting onto actual services');
    console.log('The requested service is: ' + sType);
    console.log('The requested service is: ' + sType);
    console.log('The requested service is: ' + sType);
    console.log('The requested service is: ' + sType);
    if (sType == 'trcs') {
        console.log('Running a trcs');
        showOpenBatchesUser(req, res, connection, 1);
        return;
    }
    if (sType == 'lcbu') {
        showClosedBatchesUser(req, res, connection);
    }
    if (sType == 'loba') {
        if (uLvl >= 2) {
            showOpenBatchesAdmin(req, res, connection);
        }
        else {
            showOpenBatchesUser(req, res, connection, 0);
        }
    }
    if (sType == 'rnb') {
        requestNewBatch(req, res, connection);
    }
    if (sType == 'rab') {
        retrieveABatch(req, res, connection);
    }
    if (sType == 'rabo') {
        retrieveABatchOpen(req, res, connection);
    }
    if (sType == 'cab') {
        closeABatch(req, res, connection);
    }
    if (sType == 'cpl') {
        commitProductLookup(req, res, connection);
    }
    if (sType == 'gpn') {
        getProductName(req, res, connection);
    }
    if (sType == 'fin') {
        finishBatch1(req, res, connection);
    }
    if (sType == 'ob') {
        openBatch(req, res, connection);
    }
    if (sType == 'rec') {
        finishBatch1(req, res, connection);
    }
    if (sType == 'lpck') {
        getPackersNames(req, res, connection);
    }
    if (sType == 'pndet') {
        getPackingNoteDetails(req, res, connection);
    }
    if (sType == 'dell') {
        deleteScanLine(req, res, connection);
    }
    if (sType == 'arb') {
        archiveSumBatch(req, res, connection);
    }
    console.log('Apparently reviewed/returned from the services');
}
//now the handlers
//show open batches	
function showOpenBatchesAdmin(req, res, connection) {
    /* send a one by one list of the open batches to an admin */
    //console.log('Will attempt to display batches with admin privileges');
    var q2 = 'SELECT * FROM s_v_dat_batch_hdr WHERE STATUS= ?';
    connection.query(q2, ['OPEN'], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            //console.error('An error occurred while executing the query: ' + q);
            throw error;
        }
        //console.log('Result set returned for batches, parsing it');
        batches = retrRecsOB(rows);
        // console.log('Batches returned: ' + batches);
        res.json({ status: 0, results: { batches: batches } });
    });
}
function retrRecsOB(rows) {
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
    rChain = JSON.stringify(aRecs);
    return (rChain);
}
function showOpenBatchesUser(req, res, connection, m) {
    /* send a one by one list of the open batches for a user */
    console.log('Will attempt to display batches for the current user');
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var userid = tokenObj.guid;
    console.log('Tested the token, guid is : ' + userid);
    var q2 = 'SELECT * FROM s_v_dat_batch_hdr WHERE STATUS= ? and VERGUID = ?';
    console.log('Running query: ' + q2);
    connection.query(q2, ['OPEN', userid], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        //convert from the rowDataPacketFormat to real JSON
        batches = retrRecsOBUser(rows, m);
        res.json({ status: 0, results: { batches: batches } });
        return;
    });
}
function retrRecsOBUser(rows, m) {
    //retr rows callback for showOpenBatchesUser function
    var rescount = 0;
    var rChain = '';
    var aRecs = new Object();
    for (key in rows) {
        rescount++;
        rec = rows[key];
        BID = encodeURIComponent(rec.BID);
        VERGUID = encodeURIComponent(rec.VERGUID);
        SSID = encodeURIComponent(rec.SSID);
        CREATE = encodeURIComponent(rec.CREATE);
        PNID = encodeURIComponent(rec.PNID);
        CUSTNAME = encodeURIComponent(rec.CUSTNAME);
        if ((m > 0) && (rescount > 1)) {
            rChain = JSON.stringify(aRecs);
            return (rChain);
        }
        aRecs[rescount] = ({ REC: rescount, BID: BID, VERGUID: VERGUID, SSID: SSID, CREATE: CREATE, PNID: PNID, CUSTNAME: CUSTNAME });
    }
    //console.log(aRecs);
    rChain = JSON.stringify(aRecs);
    return (rChain);
}
function showClosedBatchesUser(req, res, connection) {
    /* send a one by one list of the closed batches for a user */
    //console.log('Will attempt to display closed batches for the current user');
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var userid = tokenObj.guid;
    var q2 = 'SELECT * FROM s_v_dat_batch_hdr WHERE STATUS= ? and VERGUID = ?';
    connection.query(q2, ['CLOSED', userid], function (error, rows) {
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
function commitProductLookup(req, res, connection) {
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var userid = tokenObj.guid;
    var SCANID = req.body.SCANID;
    var batchID = req.body.batchID;
    var CLID = req.body.CCLN;
    var PID = '';
    //get the prod name first, write the count second
    var q2 = 'SELECT * FROM p_dat_prod WHERE barcode = ?';
    connection.query(q2, [SCANID], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        //console.log('Result set returned for SCANID, parsing it and CLID ' + CLID);
        prodNameStr = procProdNameCommit(rows, res, CLID);
        if (prodNameStr == -1) {
            return;
        }
        var pns = prodNameStr.split('|');
        prodName = pns[0];
        PID = pns[1];
        //	console.log('ProdName/PID for Commit Returned: ' + prodName + ' ' + pid  );
        //	console.log('Now attempting to commit line');
        writeBatchLine(req, res, connection, batchID, SCANID, CLID, PID, prodName);
    });
}
function procProdNameCommit(rows, res, CLID) {
    prodName = '';
    pid = '';
    var retStr = JSON.stringify(rows);
    var item = retStr[0];
    var aRecs = new Object();
    aRecs = JSON.parse(retStr);
    for (keys in aRecs) {
        tRig = aRecs[keys];
        nowRec = tRig;
        for (realKey in nowRec) {
            if (realKey == 'NAME') {
                prodName = nowRec[realKey];
            }
            if (realKey == 'ID') {
                pid = nowRec[realKey];
            }
        }
    }
    if (typeof prodName == 'undefined') {
        res.json({ status: 6, CCLN: CLID });
        return (-1);
    }
    if (prodName.length < 1) {
        res.json({ status: 6, CCLN: CLID });
        return (-1);
    }
    if (typeof pid == 'undefined') {
        res.json({ status: 7, CCLN: CLID });
        return (-1);
    }
    if (pid.length < 1) {
        res.json({ status: 7, CCLN: CLID });
        return (-1);
    }
    return prodName + '|' + pid;
}
function retrieveABatch(req, res, connection) {
    var batchID = req.body.batid;
    if (typeof batchID == 'undefined') {
        res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
        return;
    }
    //	console.log('Attempting to retrieve batch: ' + batchID);
    getBatchHeader(req, res, connection, batchID);
    return;
}
function getBatchHeader(req, res, connection, batchID) {
    var q2 = 'SELECT * FROM s_v_dat_batch_hdr WHERE BID = ?';
    connection.query(q2, [batchID], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        //console.log('Result set returned for batch header unique ID, parsing it');
        batchHeader = procRetrHead(rows);
        //console.log('Header Processing Returned: ' + batchHeader);
        getBatchBody(req, res, connection, batchID, batchHeader);
    });
}
function procRetrHead(rows) {
    //retr rows for getBatchHEader
    var rescount = 0;
    var rChain = '';
    var aRecs = new Object();
    //console.log(rows);
    for (key in rows) {
        //rescount++;
        rec = rows[key];
        BID = rec.BID;
        VERGUID = rec.VERGUID;
        SSID = rec.SSID;
        CDT = rec.CREATE;
        PNID = rec.PNID;
        if (typeof (VERGUID) == 'undefined') {
            VERGUID = 0;
        }
        if (typeof (SSID) == 'undefined') {
            SSID = 0;
        }
        if (typeof (CREATE) == 'undefined') {
            CREATE = 0;
        }
        if (typeof (PNID) == 'undefined') {
            PNID = 0;
        }
        VERGUID = encodeURIComponent(VERGUID);
        SSID = encodeURIComponent(SSID);
        CREATE = encodeURIComponent(CREATE);
        BID = encodeURIComponent(BID);
        PNID = encodeURIComponent(PNID);
        outRec = ({ BID: BID, VERGUID: VERGUID, SSID: SSID, CREATE: CDT, PNID: PNID });
    }
    rChain = JSON.stringify(outRec);
    return (rChain);
}
function getBatchBody(req, res, connection, batchID, batchHeader) {
    var q2 = 'SELECT * FROM s_v_dat_batch_det WHERE BID = ? ORDER by RID';
    connection.query(q2, [batchID], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        //console.log('Result set returned for batch body unique HeaderID, parsing it');
        batchBody = procRetrBody(rows);
        //console.log('Body Processing Returned: ' + batchBody);
        res.json({ status: 0, batchHeader: { batchHeader: batchHeader }, batchBody: { batchBody: batchBody } });
        return;
    });
}
function procRetrBody(rows) {
    //retr rows for open batches function
    var rescount = 0;
    var rChain = '';
    var aRecs = new Object();
    //console.log(rows);
    for (key in rows) {
        rescount++;
        rec = rows[key];
        RID = rec.RID;
        BID = rec.BID;
        SSID = rec.SSID;
        PNID = rec.PNID;
        PID = rec.PID;
        SCANID = rec.SCANID;
        CDT = rec.CREATED;
        PNAME = rec.PNAME;
        SCODE = rec.SCODE;
        if (typeof (PNID) == 'undefined') {
            PNID = 0;
        }
        if (typeof (SSID) == 'undefined') {
            SSID = 0;
        }
        if (typeof (PID) == 'undefined') {
            PID = 0;
        }
        if (typeof (CREATED) == 'undefined') {
            CREATED = 0;
        }
        if (typeof (PNAME) == 'undefined') {
            PNAME = 'NoName';
        }
        if (typeof (SCODE) == 'undefined') {
            SCODE = 'NoCode';
        }
        RID = encodeURIComponent(RID);
        BID = encodeURIComponent(BID);
        SSID = encodeURIComponent(SSID);
        PNID = encodeURIComponent(PNID);
        CREATE = encodeURIComponent(CREATE);
        PID = encodeURIComponent(PID);
        SCANID = encodeURIComponent(SCANID);
        PNAME = encodeURIComponent(PNAME);
        SCODE = encodeURIComponent(SCODE);
        aRecs[rescount] = ({ RID: RID, BID: BID, SSID: SSID, SCANID: SCANID, PNID: PNID, CREATED: CDT, PID: PID, PNAME: PNAME, SCODE: SCODE });
    }
    rChain = JSON.stringify(aRecs);
    return (rChain);
}
//variant of retrieve - will update status to OPEN
function retrieveABatchOpen(req, res, connection) {
    var batchID = req.body.batid;
    if (typeof batchID == 'undefined') {
        res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
        return;
    }
    getBatchHeaderRO(req, res, connection, batchID);
    return;
}
function getBatchHeaderRO(req, res, connection, batchID) {
    var q2 = 'SELECT * FROM s_v_dat_batch_hdr WHERE BID = ?';
    connection.query(q2, [batchID], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        //console.log('Result set returned for batch header unique ID :  RO, parsing it');
        batchHeader = procRetrHeadRO(rows);
        //console.log('Header Processing Returned: ' + batchHeader);
        getBatchBodyRO(req, res, connection, batchID, batchHeader);
    });
}
function procRetrHeadRO(rows) {
    //retr rows for getBatchHEader
    var rescount = 0;
    var rChain = '';
    var aRecs = new Object();
    // console.log(rows);
    for (key in rows) {
        //rescount++;
        rec = rows[key];
        BID = rec.BID;
        VERGUID = rec.VERGUID;
        SSID = rec.SSID;
        CDT = rec.CREATE;
        PNID = rec.PNID;
        if (typeof (VERGUID) == 'undefined') {
            VERGUID = 0;
        }
        if (typeof (SSID) == 'undefined') {
            SSID = 0;
        }
        if (typeof (CREATE) == 'undefined') {
            CREATE = 0;
        }
        if (typeof (PNID) == 'undefined') {
            PNID = 0;
        }
        VERGUID = encodeURIComponent(VERGUID);
        SSID = encodeURIComponent(SSID);
        CREATE = encodeURIComponent(CREATE);
        BID = encodeURIComponent(BID);
        PNID = encodeURIComponent(PNID);
        outRec = ({ BID: BID, VERGUID: VERGUID, SSID: SSID, CREATE: CDT, PNID: PNID });
    }
    rChain = JSON.stringify(outRec);
    return (rChain);
}
function getBatchBodyRO(req, res, connection, batchID, batchHeader) {
    var q2 = 'SELECT * FROM s_v_dat_batch_det WHERE BID = ? ORDER by RID';
    connection.query(q2, [batchID], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            //console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        //console.log('Result set returned for batch body unique HeaderID, parsing it');
        batchBody = procRetrBodyRO(rows);
        //console.log('Body Processing Returned: ' + batchBody);
        res.json({ status: 0, batchHeader: { batchHeader: batchHeader }, batchBody: { batchBody: batchBody } });
        return;
    });
}
function procRetrBodyRO(rows) {
    //retr rows for open batches function
    var rescount = 0;
    var rChain = '';
    var aRecs = new Object();
    //console.log(rows);
    for (key in rows) {
        rescount++;
        rec = rows[key];
        RID = rec.RID;
        BID = rec.BID;
        SSID = rec.SSID;
        PNID = rec.PNID;
        PID = rec.PID;
        SCANID = rec.SCANID;
        CDT = rec.CREATED;
        PNAME = rec.PNAME;
        SCODE = rec.SCODE;
        //console.log('Retrieved Body line: ' + RID + ' ' + BID + ' ' + SCANID);
        if (typeof (PNID) == 'undefined') {
            PNID = 0;
        }
        if (typeof (SSID) == 'undefined') {
            SSID = 0;
        }
        if (typeof (PID) == 'undefined') {
            PID = 0;
        }
        if (typeof (CREATED) == 'undefined') {
            CREATED = 0;
        }
        if (typeof (PNAME) == 'undefined') {
            PNAME = 'NoName';
        }
        if (typeof (SCODE) == 'undefined') {
            SCODE = 'NoCode';
        }
        RID = encodeURIComponent(RID);
        BID = encodeURIComponent(BID);
        SSID = encodeURIComponent(SSID);
        PNID = encodeURIComponent(PNID);
        CREATE = encodeURIComponent(CREATE);
        PID = encodeURIComponent(PID);
        SCANID = encodeURIComponent(SCANID);
        PNAME = encodeURIComponent(PNAME);
        SCODE = encodeURIComponent(SCODE);
        aRecs[rescount] = ({ RID: RID, BID: BID, SSID: SSID, SCANID: SCANID, PNID: PNID, CREATED: CDT, PID: PID, PNAME: PNAME, SCODE: SCODE });
    }
    //console.log(aRecs);
    rChain = JSON.stringify(aRecs);
    return (rChain);
}
//	
function getProductName(req, res, connection) {
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var CLID = req.body.CCLN;
    var SCANID = req.body.SCANID;
    var q2 = 'SELECT * FROM p_dat_prod WHERE barcode = ?';
    connection.query(q2, [SCANID], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        procRetrName(rows, res, CLID, SCANID);
        return;
    });
}
function procRetrName(rows, res, CLID, SCANID) {
    prodName = '';
    pid = '';
    var retStr = JSON.stringify(rows);
    //let item=retStr[0];
    var aRecs = new Object();
    aRecs = JSON.parse(retStr);
    for (keys in aRecs) {
        tRig = aRecs[keys];
        nowRec = tRig;
        for (realKey in nowRec) {
            if (realKey == 'NAME') {
                prodName = nowRec[realKey];
            }
            if (realKey == 'PID') {
                pid = nowRec[realKey];
            }
        }
    }
    if (typeof prodName == 'undefined') {
        res.json({ status: 6, CCLN: CLID, PRODNAME: prodName });
        return;
    }
    if (prodName.length < 1) {
        res.json({ status: 6, CCLN: CLID, PRODNAME: prodName });
        return;
    }
    SCANID = encodeURIComponent(SCANID);
    prodName = encodeURIComponent(prodName);
    CLID = encodeURIComponent(CLID);
    res.json({ status: 0, SCANID: SCANID, CCLN: CLID, PRODNAME: prodName });
    return;
}
function failService(req, res) {
    // sorry friend, no can do for token reasons
    // imply refresh token
    console.log('bombing out a service request - sending status -1 token failure');
    res.json({ status: -1, data: { key: 0 } });
    return;
}
// write individual batch lines	
function writeBatchLine(req, res, connection, batchID, SCANID, CLID, PID, prodName) {
    //console.log('Preparing to write batch line - bid, scanid, clid, pid: ' + batchID + ' : '+ SCANID +' : '+ CLID +' : '+ PID);
    //console.log('Preparing to write batch line - prodname: ' + prodName);
    var q2 = 'INSERT INTO s_v_dat_batch_det (BID, SCANID, PID, PNAME) values (?, ?, ?, ?)';
    connection.query(q2, [batchID, SCANID, PID, prodName], function (error, result) {
        if (error)
            throw error;
        //check success
        affRows = 0;
        var retStr = JSON.stringify(result);
        var aRecs = new Object();
        aRecs = JSON.parse(retStr);
        for (keys in aRecs) {
            if (keys == 'affectedRows') {
                affRows = aRecs[keys];
            }
        }
        //console.log('Are we here?');
        //console.log('Prodname: ' + prodName);
        if (affRows == 1) {
            res.json({ status: 0, SCANID: SCANID, CCLN: CLID, PRODNAME: prodName });
            return;
        }
        else {
            res.json({ status: 3, SCANID: SCANID, CCLN: CLID, PRODNAME: prodName });
            return;
        }
    });
    return;
}
function closeABatch(req, res, connection) {
    /*   */
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var batchID = req.body.batchID;
    console.log('Trying to Close A Batch: ' + batchID);
    var q2 = 'UPDATE s_v_dat_batch_hdr set STATUS=\'CLOSED\' where BID=?';
    connection.query(q2, [batchID], function (error, result) {
        if (error)
            throw error;
        //check success
        console.log('Apparently completed closing a batch: ' + batchID);
        affRows = 0;
        var retStr = JSON.stringify(result);
        var aRecs = new Object();
        aRecs = JSON.parse(retStr);
        for (keys in aRecs) {
            if (keys == 'affectedRows') {
                affRows = aRecs[keys];
            }
        }
        if (affRows == 1) {
            res.json({ status: 0, batchID: batchID });
            return;
        }
        else {
            res.json({ status: 1, batchID: batchID });
            return;
        }
    });
    console.log('');
    return;
}
// ###############################	
// open an existing batch
function openBatch(req, res, connection) {
    /* see if a batch is open for a packing list, open if exists */
    /* fail if not exists */
    /* basically change the status from closed to open */
    /* can only be done for those marked as closed not FINISHED */
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var userID = tokenObj.guid;
    var batchID = req.body.batchID;
    console.log('Want to open batch: ' + batchID);
    if (typeof batchID == 'undefined') {
        res.json({ status: 6 });
        return;
    }
    var q2 = 'UPDATE s_v_dat_batch_hdr SET status=\'OPEN\' where BID=?';
    connection.query(q2, [batchID], function (error, result) {
        if (error)
            throw error;
        //check success
        console.log(result);
        //if 1 record affected then done
        insertId = 0;
        var retStr = JSON.stringify(result);
        var aRecs = new Object();
        aRecs = JSON.parse(retStr);
        var affRows = 0;
        for (keys in aRecs) {
            if (keys == 'affectedRows') {
                affRows = aRecs[keys];
            }
        }
        if (affRows == 1) {
            res.json({ status: 0, batchID: batchID });
            return;
        }
        else {
            res.json({ status: 1, batchID: 0 });
            return;
        }
    });
}
// end of opening an existing batch
// ###############################	
// ###############################	
// request a new batch
function requestNewBatch(req, res, connection) {
    console.log('New Batch Create Requested');
    //first we see if the user already has an open batch
    showOpenBatchesNew(req, res, connection);
    return;
}
function showOpenBatchesNew(req, res, connection) {
    /* just trying to understand if any open before create */
    //console.log('Will attempt to display batches for the current user');
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var userid = tokenObj.guid;
    var packerName = req.body.packername;
    var custName = req.body.custname;
    var q2 = 'SELECT * FROM s_v_dat_batch_hdr WHERE STATUS= ? and VERGUID = ?';
    connection.query(q2, ['OPEN', userid], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
            return;
        }
        //convert from the rowDataPacketFormat to real JSON
        var count = retrRecsOBUserNew(rows, req, res, connection);
        //res.json({status: 0, results: { batches } });	 
        //   console.log('Count returned in show function is: ' + count);
        //	console.log(batches);
        return;
    });
}
function retrRecsOBUserNew(rows, req, res, connection) {
    //retr rows callback for showOpenBatchesUser function
    console.log('Check if there were open batches already for the user');
    var rescount = 0;
    var BID = '';
    var packerName = req.body.packername;
    //console.log(rows);
    for (key in rows) {
        rescount++;
        rec = rows[key];
        BID = encodeURIComponent(rec.BID);
    }
    if (rescount > 0) {
        res.json({ status: 6, BID: BID, PACKERNAME: packerName });
        return;
    }
    else {
        console.log('Going to try and create a new batch after finding no opened batches.');
        openANewBatch(req, res, connection);
        return;
    }
}
function openANewBatch(req, res, connection) {
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var userID = tokenObj.guid;
    var PNID = req.body.PNID;
    var packerName = req.body.packername;
    var oNum = req.body.onum;
    var cName = req.body.custname;
    console.log('Right into query creation for batch create');
    var q2 = 'INSERT INTO s_v_dat_batch_hdr (STATUS, VERGUID, PNID, PACKERNAME) values (?, ?, ?, ?)';
    connection.query(q2, ['OPEN', userID, PNID, packerName], function (error, result) {
        if (error)
            throw error;
        //check success
        //console.log(result);
        //return the ID ultimately
        insertId = 0;
        var retStr = JSON.stringify(result);
        var aRecs = new Object();
        aRecs = JSON.parse(retStr);
        for (keys in aRecs) {
            if (keys == 'insertId') {
                insertId = aRecs[keys];
            }
        }
        if (insertId > 0) {
            res.json({ status: 0, batchID: insertId, PNAME: packerName, CNAME: cName, ONUM: oNum });
            return;
        }
        else {
            res.json({ status: 1, batchID: 0, PNAME: '' });
            return;
        }
    });
}
// END OF NEW BATCH REQUEST	
// ###############################	
// ###############################	
// finish a batch
function finishBatch1(req, res, connection) {
    /* basically the COMPLETE batch will come here */
    /* checks against the packing note and highlights */
    /* correct / not */
    //try get the query right to balance the batch
    /* clear out the summary lines in the batch summary */
    /* create the original packing note summary*/
    /* self join to get the quantities for both */
    /* on the same lines */
    /* create lines where on pack but not scan */
    /* clean up pack source */
    /* create the scan batch summary */
    /* compare the two */
    /* create a summary batch */
    //	console.log('Trying to Finish and Recon a Batch. Delete any existing lines');
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var userID = tokenObj.guid;
    var batchID = req.body.batchID;
    var PNID = req.body.PNID;
    /* clear out the summary lines in the batch summary */
    q = 'delete from s_v_dat_batch_sum where PNID=?';
    //	console.log(q);
    //	console.log('PNID: ' + PNID);
    connection.query(q, [PNID], function (error, result) {
        if (error)
            throw error;
        //check success
        finishBatch2(req, res, connection);
    });
    return;
}
function finishBatch2(req, res, connection) {
    return __awaiter(this, void 0, void 0, function () {
        var token, tokenObj, user, userID, batchID, PNID;
        return __generator(this, function (_a) {
            token = req.body.token;
            tokenObj = lauth.testToken(token);
            if (typeof tokenObj == 'undefined') {
                res.sendStatus(403);
                return [2 /*return*/];
            }
            user = tokenObj.user;
            userID = tokenObj.guid;
            batchID = req.body.batchID;
            PNID = req.body.PNID;
            /* create the original packing note summary*/
            q = 'INSERT into s_v_dat_batch_sum (PNID, BID, PID, LINETYPE, PQTY) ';
            q = q + 'select ?, ?, pid, \'PACK\', sum(QTYSUP) from s_sup_dat_d where DOCID=? and LINETYPE=\'SUPPLYITEM\' and ';
            q = q + 'DOCTYPE like\'SPLIT%PACK\' group by PID order by PID		';
            //	console.log(q);
            //	console.log('PNID: ' + PNID);
            connection.query(q, [PNID, batchID, PNID], function (error, result) {
                if (error)
                    throw error;
                //check success
                //		console.log(result);
                finishBatch3(req, res, connection);
            });
            return [2 /*return*/];
        });
    });
}
function finishBatch3(req, res, connection) {
    return __awaiter(this, void 0, void 0, function () {
        var token, tokenObj, user, userID, batchID, PNID;
        return __generator(this, function (_a) {
            token = req.body.token;
            tokenObj = lauth.testToken(token);
            if (typeof tokenObj == 'undefined') {
                res.sendStatus(403);
                return [2 /*return*/];
            }
            user = tokenObj.user;
            userID = tokenObj.guid;
            batchID = req.body.batchID;
            PNID = req.body.PNID;
            /* create the scan batch summary */
            q = 'INSERT into s_v_dat_batch_sum (PNID, BID, PID, LINETYPE, SQTY) ';
            q = q + 'select ?, ?, pid, \'SCAN\', count(*) from s_v_dat_batch_det where BID=? ';
            q = q + 'group by PID order by PID		';
            //	console.log(q);
            //	console.log('PNID: ' + PNID + ' BID: ' + batchID);
            connection.query(q, [PNID, batchID, batchID], function (error, result) {
                if (error)
                    throw error;
                //check success
                //		console.log(result);
                finishBatch4(req, res, connection);
            });
            return [2 /*return*/];
        });
    });
}
function finishBatch4(req, res, connection) {
    return __awaiter(this, void 0, void 0, function () {
        var token, tokenObj, user, userID, batchID, PNID;
        return __generator(this, function (_a) {
            token = req.body.token;
            tokenObj = lauth.testToken(token);
            if (typeof tokenObj == 'undefined') {
                res.sendStatus(403);
                return [2 /*return*/];
            }
            user = tokenObj.user;
            userID = tokenObj.guid;
            batchID = req.body.batchID;
            PNID = req.body.PNID;
            /* create the scan batch summary */
            q = 'UPDATE s_v_dat_batch_sum AS a1, s_v_dat_batch_sum AS a2  SET a1.SQTY = a2.SQTY ';
            q = q + 'where a2.PID = a1.PID AND a1.PNID=? AND a2.BID=? and a1.LINETYPE=\'PACK\' and a2.LINETYPE=\'SCAN\'';
            //	console.log(q);
            //	console.log('PNID: ' + PNID + ' BID: ' + batchID);	
            connection.query(q, [PNID, batchID], function (error, result) {
                if (error)
                    throw error;
                //check success
                //console.log(result);
                finishBatch5(req, res, connection);
            });
            return [2 /*return*/];
        });
    });
}
function finishBatch5(req, res, connection) {
    return __awaiter(this, void 0, void 0, function () {
        var token, tokenObj, user, userID, BID, pnid;
        return __generator(this, function (_a) {
            token = req.body.token;
            tokenObj = lauth.testToken(token);
            if (typeof tokenObj == 'undefined') {
                res.sendStatus(403);
                return [2 /*return*/];
            }
            user = tokenObj.user;
            userID = tokenObj.guid;
            BID = req.body.batchID;
            pnid = req.body.PNID;
            /* clean the redundant scan lines after transferring quantities to  */
            /* the pack lines */
            q = 'delete from s_v_dat_batch_sum where ID IN ( select ID AS kkey FROM ';
            q = q + '(SELECT a2.ID,COUNT(*) AS flip,a2.PID from  s_v_dat_batch_sum as a1, ';
            q = q + 's_v_dat_batch_sum as a2 WHERE a1.PNID=' + PNID + ' and a1.PID=a2.PID and ';
            q = q + 'a2.BID=' + BID + ' and a2.LINETYPE=\'SCAN\' GROUP BY a1.PID HAVING flip>1) c )';
            //console.log(q);
            connection.query(q, ['OPEN', userID, PNID], function (error, result) {
                if (error)
                    throw error;
                //check success
                //	console.log(result);
                finishBatch6(req, res, connection);
            });
            return [2 /*return*/];
        });
    });
}
function finishBatch6(req, res, connection) {
    return __awaiter(this, void 0, void 0, function () {
        var token, tokenObj, user, userID, BID, PNID, rChain;
        return __generator(this, function (_a) {
            token = req.body.token;
            tokenObj = lauth.testToken(token);
            if (typeof tokenObj == 'undefined') {
                res.sendStatus(403);
                return [2 /*return*/];
            }
            user = tokenObj.user;
            userID = tokenObj.guid;
            BID = req.body.batchID;
            PNID = req.body.PNID;
            rChain = '';
            /* create the scan batch summary */
            q = 'select * from s_v_dat_batch_sum where PNID= ? and BID= ? order by LINETYPE, PID';
            //	console.log(q);
            connection.query(q, [PNID, BID], function (error, result) {
                if (error)
                    throw error;
                //check success
                //	console.log(result);
                var aRecs = new Object();
                var rescount = 0;
                //console.log(rows);
                for (key in result) {
                    rescount++;
                    rec = result[key];
                    ID = rec.ID;
                    BID = rec.BID;
                    PNID = rec.PNID;
                    PID = rec.PID;
                    LINETYPE = rec.LINETYPE;
                    SQTY = rec.SQTY;
                    PQTY = rec.PQTY;
                    //		console.log('Retrieved BID, PID, etc: ' + BID + ' ' + PID);
                    if (typeof (SQTY) == 'undefined') {
                        SQTY = 0;
                    }
                    if (typeof (PQTY) == 'undefined') {
                        PQTY = 0;
                    }
                    ID = encodeURIComponent(ID);
                    BID = encodeURIComponent(BID);
                    CREATE = encodeURIComponent(CREATE);
                    PNID = encodeURIComponent(PNID);
                    PID = encodeURIComponent(PID);
                    SQTY = encodeURIComponent(SQTY);
                    PQTY = encodeURIComponent(PQTY);
                    aRecs[rescount] = ({ REC: rescount, ID: ID, BID: BID, PNID: PNID, PID: PID, LINETYPE: LINETYPE, SQTY: SQTY, PQTY: PQTY });
                }
                //console.log(aRecs);
                rChain = JSON.stringify(aRecs);
                console.log('Scope? Rchain set to: ' + rChain);
                res.json({ STATUS: 0, results: rChain });
                q = 'update s_v_dat_batch_hdr set status=\'RECONCILING\' where BID= ?';
                connection.query(q, [BID], function (error, result) {
                    if (error)
                        throw error;
                    //should do something client side but what?
                });
                console.log('Should have bloody closed here: ' + BID);
            });
            return [2 /*return*/];
        });
    });
}
// END OF FINISH BATCH
// ###############################	
// ###############################	
// get packing note details
// tedious - join to get all the bits?
function getPackingNoteDetails(req, res, connection) {
    //console.log('Will attempt to retrieve details for a packing note');
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var PNID = req.body.PNID;
    //console.log('CLID in prodname return is : ' + CLID);
    //console.log('SCANID in prodname return is : ' + SCANID);
    var q2 = 'select docs.SSID as ossid, slsord.id , custdat.guid as cguid, custdat.givenname as cgiven, custdat.surname as csur from s_sup_dat_h as docs, s_dat_sls_h as slsord, c_dat_cust as custdat where (docs.SP1PACK=? or docs.SP2PACK=?) and (slsord.id = docs.SSID) and custdat.guid=slsord.uid';
    //   console.log('running: : ' + q2);
    //	console.log('for: ' + PNID);
    connection.query(q2, [PNID, PNID], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the pndet query: ' + q2);
            throw error;
        }
        //console.log('Result set returned for batch header unique ID, parsing it');
        pndetRetrRows(rows, res, PNID);
        return;
        //console.log('Header Processing Returned: ' + batchHeader);
    });
}
function pndetRetrRows(rows, res, PNID) {
    SSID = '';
    GUID = '';
    GIVEN = '';
    SURNAME = '';
    var retStr = JSON.stringify(rows);
    //	console.log('Retrieve callback');
    //	console.log(rows);
    //let item=retStr[0];
    var aRecs = new Object();
    aRecs = JSON.parse(retStr);
    for (keys in aRecs) {
        tRig = aRecs[keys];
        nowRec = tRig;
        for (realKey in nowRec) {
            if (realKey == 'ossid') {
                SSID = nowRec[realKey];
            }
            if (realKey == 'cguid') {
                GUID = nowRec[realKey];
            }
            if (realKey == 'cgiven') {
                GIVEN = nowRec[realKey];
            }
            if (realKey == 'csur') {
                SURNAME = nowRec[realKey];
            }
        }
    }
    if (typeof SSID == 'undefined') {
        res.json({ status: 5, PNID: PNID, SSID: '', GUID: '', GIVEN: '', SURNAME: '' });
        return;
    }
    //in general we are hapy to return null. just check to see if undefined comes up
    //	console.log('Sending: SSID ' + SSID);
    GUID = encodeURIComponent(GUID);
    SSID = encodeURIComponent(SSID);
    GIVEN = encodeURIComponent(GIVEN);
    SURNAME = encodeURIComponent(SURNAME);
    res.json({ status: 0, PNID: PNID, SSID: SSID, GUID: GUID, GIVEN: GIVEN, SURNAME: SURNAME });
    return;
}
// END OF Packing Note Details Retrieve
// ###############################	
// ###############################	
// get list of packers names
// tedious - 
function getPackersNames(req, res, connection) {
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var q2 = 'SELECT * FROM c_dat_cust where PACKROLE>0';
    connection.query(q2, [], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        procRetrPackerName(rows, res);
        return;
    });
}
function procRetrPackerName(rows, res, CLID, SCANID) {
    USERNAME = '';
    DisplayName = '';
    var retStr = JSON.stringify(rows);
    //let item=retStr[0];
    var aRecs = new Object();
    var bRecs = new Object();
    aRecs = JSON.parse(retStr);
    var reccount = 0;
    for (keys in aRecs) {
        tRig = aRecs[keys];
        nowRec = tRig;
        reccount++;
        for (realKey in nowRec) {
            if (realKey == 'GIVENNAME') {
                USERNAME = nowRec[realKey];
            }
            if (realKey == 'SURNAME') {
                DisplayName = nowRec[realKey];
            }
            if (realKey == 'GUID') {
                GUID = nowRec[realKey];
            }
        }
        USERNAME = encodeURIComponent(USERNAME);
        DisplayName = encodeURIComponent(DisplayName);
        outRec = JSON.stringify({ USERNAME: USERNAME, DISPLAYNAME: DisplayName, PGUID: GUID });
        bRecs[reccount] = outRec;
    }
    res.json({ status: 0, results: bRecs });
    return;
}
// END OF get packers names
// ###############################	
// ###############################	
// delete a scanline
// tedious - 
function deleteScanLine(req, res, connection) {
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    BID = req.body.BID;
    SCANID = req.body.SCANID;
    var q2 = 'DELETE FROM s_v_dat_batch_det where BID=? and SCANID=? order by RID desc limit 1';
    //now we use a mysql specific query here because it's so convenient	
    connection.query(q2, [BID, SCANID], function (error, result) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        procDeleteScanLine(result, res, req);
        return;
    });
}
function procDeleteScanLine(result, res, req) {
    //this will return only a RESULT type packet
    aR = result.affecedRows;
    BID = req.body.BID;
    SCANID = req.body.SCANID;
    CCLN = req.body.CCLN;
    res.json({ status: 0, deletedQ: aR, SCANID: SCANID, CCLN: CCLN });
    console.log('Returning some stuff');
    return;
}
// END OF line delete
// ###############################	
// ###############################	
// delete a scanline
// tedious - 
function archiveSumBatch(req, res, connection) {
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    BID = req.body.BID;
    SCANID = req.body.SCANID;
    var q2 = 'UPDATE s_v_dat_batch_hdr SET STATUS=\'COMPLETE\' where BID=?';
    //now we use a mysql specific query here because it's so convenient	
    connection.query(q2, [BID], function (error, result) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            return;
            //throw error;
        }
        procArchiveScanBatch(result, res, req);
        return;
    });
}
function procArchiveScanBatch(result, res, req) {
    //this will return only a RESULT type packet
    aR = result.affecedRows;
    BID = req.body.BID;
    SCANID = req.body.SCANID;
    CCLN = req.body.CCLN;
    res.json({ status: 0, deletedQ: aR, SCANID: SCANID, CCLN: CCLN });
    console.log('Returning some stuff');
    return;
}
// END OF line delete
// ###############################		
/* exports*/
module.exports =
    {
        processService: processService
    };
/* END */ 
//# sourceMappingURL=Messages2.js.map