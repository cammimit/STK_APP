/* This is the config reader for RAPI */
/* read the file and vlaidate that it's json */
/* call the init functions to push the */
/* settings into the init counters */
/* cammi 2019 */
var fs = require('fs');
//counters = require('../RAPI/SERVER/RAPIPROC/ConfigCounters'); 
function rcReadConfigFile(cfo) {
    /* usual buffer create */
    /* usual async read */
    fs.open('./apiconf.json', 'r', function openedFile(err, fd) {
        if (err) {
            throw err;
            /* this is a fatal condition. shutdown without going down */
            /* dangerously unpredictable route. Hope the sysadmin */
            /* is trapping 2>&1 ....... so they know what happened.... */
            /* 2 is standard error code for bad argument - that's what */
            /* this is effectively */
            process.exit(2);
        }
        /*reasonable size. it's a config file not a masters thesis */
        var readBuffer = new Buffer.alloc(4096, 0, "utf8"), bufferOffset = 0, bufferLength = readBuffer.length, filePosition = 0;
        fs.read(fd, readBuffer, bufferOffset, bufferLength, filePosition, function read(err, readBytes) {
            if (err) {
                throw err;
                /* this is also a fatal condition. shutdown without going */
                /* down dangerously unpredictable route. Hope the sysadmin */
                /* is trapping 2>&1 ....... so they know what happened.... */
                /* 2 is standard error code for bad argument - that's what */
                /* this is effectively */
                process.exit(2);
            }
            //             console.log('just read ' + readBytes + ' bytes');
            if (readBytes > 0) {
                readConfigJSON(readBuffer, readBytes, cfo);
                //            console.log(readBuffer.slice(0, readBytes));
            }
        });
    });
}
function readConfigJSON(bufferObj, readBytes, cfo) {
    /* nbnbnb synchronous try/catch */
    /* convert the buffer to JSON object */
    /* error out if damaged. Don't run */
    /* unstable. TODO - perhaps allow the */
    /* programme to run with the arguments */
    /* that are legitimate??? */
    try {
        var ourConfigString = bufferObj.toString('utf8', 0, readBytes);
    }
    catch (err) {
        /* this is also a fatal condition. shutdown without going */
        /* down dangerously unpredictable route. Hope the sysadmin */
        /* is trapping 2>&1 ....... so they know what happened.... */
        /* 2 is standard error code for bad argument - that's what */
        /* this is effectively */
        process.exit(2);
    }
    ;
    try {
        var ourConfigObj = JSON.parse(ourConfigString);
    }
    catch (err) {
        /* this is also a fatal condition. shutdown without going */
        /* down dangerously unpredictable route. Hope the sysadmin */
        /* is trapping 2>&1 ....... so they know what happened.... */
        /* 2 is standard error code for bad argument - that's what */
        /* this is effectively */
        process.exit(2);
    }
    procConfigJSON(cfo, ourConfigObj);
}
function procConfigJSON(cfo, ourConfigObj) {
    /* flip through the keys and call the */
    /* value init for each setting */
    var value = '';
    var key = '';
    for (key in ourConfigObj) {
        value = ourConfigObj[key];
        console.log(' KEY: ' + key + ' VALUE: ' + value);
        if (key.match(/\_comment$/)) { } //just skip the comment keys
        else {
            Object.defineProperty(cfo, key, { value: value });
        }
    }
    //console.log('Returning processed config object');
    console.log('Testing Config: ' + cfo.LOCALDBPWD);
    cfo["initdone"] = 1;
}
/* exports*/
exports.rcReadConfigFile = rcReadConfigFile;
//these don't strictly need to be public??
//useful ??
//module.exports.readConfigJSON = readConfigJSON;
//module.exports.reProcConfigJSON = reProcConfigJSON;
/* END */ 
//# sourceMappingURL=ReadConfig.js.map