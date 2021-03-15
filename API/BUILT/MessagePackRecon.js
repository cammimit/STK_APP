/* RAPI Messages Module */
/* module for the Recon Message */
/* we put all of the tests and functions */
/* into here and as we do them we move them */
/* out to the other modules */
/* cammi 2019 */
//reConfigFile  = require('../READCONFIG/ReadConfig');	
//counters      = require ('../FCSTKPROC/ConfigCounters');
var lauth = require('../AUTH/Auth.js');
var MSQL = require('mysql');
/* ##################################### */
/* #database has
    
    lineID
    PNID
    BID
    PID
    SCANCODE
    TYPE = type of sum line - sum from the source or sum of the sum itself
    QTY
    type = packing ITEM summary
  

*/
function reconBatch(req, res, connection) {
    /* create the original packing note summary*/
    /* create the verufy batch summary */
    /* compare the two */
    /* create a summary batch */
    console.log('in the batch to process recon');
}
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
        console.log('Retrieved BID & VERGUID & SSID: ' + BID + ' ' + VERGUID + ' ' + SSID);
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
    console.log(aRecs);
    rChain = JSON.stringify(aRecs);
    return (rChain);
}
function showOpenBatchesUser(req, res, connection) {
    /* send a one by one list of the open batches for a user */
    //console.log('Will attempt to display batches for the current user');
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var userid = tokenObj.guid;
    var q2 = 'SELECT * FROM s_v_dat_batch_hdr WHERE STATUS= ? and VERGUID = ?';
    connection.query(q2, ['OPEN', userid], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        //convert from the rowDataPacketFormat to real JSON
        batchesStr = retrRecsOBUser(rows);
        res.json({ status: 0, results: { batchesStr: batchesStr } });
        console.log('Returning results:');
        console.log(batchesStr);
        return;
    });
}
function retrRecsOBUser(rows) {
    //retr rows callback for showOpenBatchesUser function
    var rescount = 0;
    var rChain = '';
    var aRecs = new Object();
    //console.log(rows);
    for (key in rows) {
        rescount++;
        rec = rows[key];
        BID = encodeURIComponent(rec.BID);
        VERGUID = encodeURIComponent(rec.VERGUID);
        SSID = encodeURIComponent(rec.SSID);
        CREATE = encodeURIComponent(rec.CREATE);
        PNID = encodeURIComponent(rec.PNID);
        CUSTNAME = encodeURIComponent(rec.CUSTNAME);
        aRecs[rescount] = ({ REC: rescount, BID: BID, VERGUID: VERGUID, SSID: SSID, CREATE: CREATE, PNID: PNID, CUSTNAME: CUSTNAME });
    }
    console.log(aRecs);
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
    //console.log('user returned as: ' + user);
    //console.log('userID returned as: ' + userid);
    var q2 = 'SELECT * FROM s_v_dat_batch_hdr WHERE STATUS= ? and VERGUID = ?';
    connection.query(q2, ['CLOSED', userid], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        //convet from the rowDataPacketFormat to real JSON
        batchesStr = retrRecsCBUser(rows);
        res.json({ status: 0, results: { batchesStr: batchesStr } });
        //			console.log('Returning results:');
        //			console.log(batchesStr);
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
        console.log('USER: Retrieved BID & VERGUID & SSID: ' + BID + ' ' + VERGUID + ' ' + SSID);
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
    console.log(aRecs);
    rChain = JSON.stringify(aRecs);
    return (rChain);
}
//
function commitProductLookup(req, res, connection) {
    console.log('Will attempt to commit a count line');
    console.log('First Retrieve Product Name');
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
        var pns = prodNameStr.split('|');
        prodName = pns[0];
        PID = pns[1];
        console.log('ProdName/PID for Commit Returned: ' + prodName + ' ' + pid);
        console.log('Now attempting to commit line');
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
    }
    if (prodName.length < 1) {
        res.json({ status: 6, CCLN: CLID });
    }
    if (typeof pid == 'undefined') {
        res.json({ status: 7, CCLN: CLID });
    }
    if (pid.length < 1) {
        res.json({ status: 7, CCLN: CLID });
    }
    return prodName + '|' + pid;
}
function retrieveABatch(req, res, connection) {
    var batchID = req.body.batid;
    if (typeof batchID == 'undefined') {
        res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
        return;
    }
    console.log('Attempting to retrieve batch: ' + batchID);
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
    //console.log('Running ' + q2);
    //console.log('ID is: ' + batchID);
    connection.query(q2, [batchID], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        console.log('Result set returned for batch header unique ID :  RO, parsing it');
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
    console.log(rows);
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
            console.error('An error occurred while executing the query: ' + q2);
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
    //console.log('Will attempt to retrieve a product name only');
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var CLID = req.body.CCLN;
    var SCANID = req.body.SCANID;
    //console.log('CLID in prodname return is : ' + CLID);
    //console.log('SCANID in prodname return is : ' + SCANID);
    var q2 = 'SELECT * FROM p_dat_prod WHERE barcode = ?';
    connection.query(q2, [SCANID], function (error, rows) {
        if (error) {
            res.json({ status: 3, token: '', batch: '', guid: 0, uLvl: -1 });
            console.error('An error occurred while executing the query: ' + q2);
            throw error;
        }
        //console.log('Result set returned for batch header unique ID, parsing it');
        procRetrName(rows, res, CLID, SCANID);
        return;
        //console.log('Header Processing Returned: ' + batchHeader);
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
        //res.json({status: 0, results: { batchesStr } });	 
        //   console.log('Count returned in show function is: ' + count);
        //	console.log(batchesStr);
        return;
    });
}
function retrRecsOBUserNew(rows, req, res, connection) {
    //retr rows callback for showOpenBatchesUser function
    var rescount = 0;
    var BID = '';
    //console.log(rows);
    for (key in rows) {
        rescount++;
        rec = rows[key];
        BID = encodeURIComponent(rec.BID);
    }
    if (rescount > 0) {
        res.json({ status: 6, BID: BID });
        return;
    }
    else {
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
    var q2 = 'INSERT INTO s_v_dat_batch_hdr (STATUS, VERGUID,PNID) values (?, ?, ?)';
    connection.query(q2, ['OPEN', userID, PNID], function (error, result) {
        if (error)
            throw error;
        //check success
        console.log(result);
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
            res.json({ status: 0, batchID: insertId });
            return;
        }
        else {
            res.json({ status: 1, batchID: 0 });
            return;
        }
    });
}
// END OF NEW BATCH REQUEST	
// ###############################	
// ###############################	
// finish a batch
function finishBatch(req, res, connection) {
    /* basically the COMPLETE batch will come here */
    /* checks against the packing note and highlights */
    /* correct / not */
    console.log('Trying to Finish and Recon a Batch');
    var token = req.body.token;
    var tokenObj = lauth.testToken(token);
    if (typeof tokenObj == 'undefined') {
        res.sendStatus(403);
        return;
    }
    var user = tokenObj.user;
    var userID = tokenObj.guid;
    var batchID = req.body.batchID;
    var pnid = req.body.PNID;
    //try get the query right to balance the batch
    q = 'select sum(QTYSUP) from s_sup_dat_d where DOCID=? and LINETYPE=\'SUPPLYITEM\' and DOCTYPE=\'SPLIT%PACK\'		';
    return;
}
// END OF FINISH BATCH
// ###############################	
/* exports*/
module.exports =
    {
        reconBatch: reconBatch
    };
/* END */ 
//# sourceMappingURL=MessagePackRecon.js.map