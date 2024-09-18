

// const mac0='00B0D063C226'
// const mac0='00-B0-D0-63-C2-26'
// e4d09730-8f5d-11ae-0000-090909090909

import CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';

// clock values
var mac=''
var moreThan10000 =
    "can not generate more than 10000 UUIDs per second";

var hex2byte = {};

// lookup table byte to hex
var byte2hex = [];

// populate lookup tables
for (var i = 0; i < 256; i++) {
    var hex = (i + 0x100).toString(16).substring(1);
    hex2byte[hex] = i;
    byte2hex[i] = hex;
}


const  newBufferFromSize = (Buffer0,size) => {
    return Buffer0.allocUnsafe(size);
};
const uuid1_custom = (mac0, params) => {
// const uuid_custom = (crypto,nodeId, options, callback) => {
    if(mac0=='') {
        const ww = CryptoJS.lib.WordArray.random(16)
        mac = ww.words[0].toString()+ww.words[1].toString()+ww.words[2].toString()
    }

    var lastMTime = (params?.lastMTime)?params.lastMTime:0;
    var lastNTime = (params?.lastNTime)?params.lastNTime:0;

    const mac_array=mac.toString().replaceAll('-','')

    var mTime = Date.now();
    var nTime = lastNTime + 1;
    // console.log('=== nTime',nTime)
    var delta = (mTime - lastMTime) + (nTime - lastNTime) / 10000;
    // console.log('=== delta',delta)

    // randomize clockSeq initially, as per rfc4122#section-4.1.5
    // var seed = crypto.randomBytes(2);
    var seed = Array.from(CryptoJS.lib.WordArray.random(2).words[0].toString());
    // console.log('=== seed',seed)
    var clockSeq = (seed[0] | (seed[1] << 8)) & 0x3fff;

    if (delta < 0) {
        clockSeq = (clockSeq + 1) & 0x3fff;
        nTime = 0;
    } else if (mTime > lastMTime) {
        nTime = 0;
    } else if (nTime >= 10000) {
        return moreThan10000;
    }

    lastMTime = mTime;
    lastNTime = nTime;

    // unix timestamp to gregorian epoch as per rfc4122#section-4.5
    mTime += 12219292800000;

    var buffer = newBufferFromSize(Buffer, 16);
    var myClockSeq = clockSeq

    var timeLow = ((mTime & 0xfffffff) * 10000 + nTime) % 0x100000000;
    var timeHigh = (mTime / 0x100000000 * 10000) & 0xfffffff;

    buffer[0] = timeLow >>> 24 & 0xff;
    buffer[1] = timeLow >>> 16 & 0xff;
    buffer[2] = timeLow >>> 8 & 0xff;
    buffer[3] = timeLow & 0xff;

    buffer[4] = timeHigh >>> 8 & 0xff;
    buffer[5] = timeHigh & 0xff;

    buffer[6] = (timeHigh >>> 24 & 0x0f) | 0x10;
    buffer[7] = (timeHigh >>> 16 & 0x3f) | 0x80;

    buffer[8] = myClockSeq >>> 8;
    buffer[9] = myClockSeq & 0xff;

    var result;

            // console.log("=== t_Database uuid 0 ",byte2hex[buffer[0]])
            // console.log("=== t_Database uuid 1 ",byte2hex[buffer[1]])
            // console.log("=== t_Database uuid 2 ",byte2hex[buffer[2]])
            // console.log("=== t_Database uuid 3 ",byte2hex[buffer[3]])
            // console.log("=== t_Database uuid 4 ",byte2hex[buffer[4]])
            // console.log("=== t_Database uuid 5 ",byte2hex[buffer[5]])
            // console.log("=== t_Database uuid 6 ",byte2hex[buffer[6]])
            // console.log("=== t_Database uuid 7 ",byte2hex[buffer[7]])
            // console.log("=== t_Database uuid 8 ",byte2hex[buffer[8]])
            // console.log("=== t_Database uuid 9 ",byte2hex[buffer[9]])
            // console.log("=== t_Database uuid nodeId 0 ",nodeId[0])
            // console.log("=== t_Database uuid nodeId 1 ",nodeId[1])
            // console.log("=== t_Database uuid nodeId 2 ",nodeId[2])
            // console.log("=== t_Database uuid nodeId 3 ",nodeId[3])
            // console.log("=== t_Database uuid nodeId 4 ",nodeId[4])
            // console.log("=== t_Database uuid nodeId 5 ",nodeId[5])

            result =
                byte2hex[buffer[0]] + byte2hex[buffer[1]] +
                byte2hex[buffer[2]] + byte2hex[buffer[3]] + "-" +
                byte2hex[buffer[4]] + byte2hex[buffer[5]] + "-" +
                byte2hex[buffer[6]] + byte2hex[buffer[7]] + "-" +
                byte2hex[buffer[8]] + byte2hex[buffer[9]] + "-"
                +
                byte2hex[mac_array[0]] + byte2hex[mac_array[1]] +
                byte2hex[mac_array[2]] + byte2hex[mac_array[3]] +
                byte2hex[mac_array[4]] + byte2hex[mac_array[5]];


    // console.log('=== t_Database result',result)

    return {
        uuid: result,
        lastMTime:lastMTime,
        lastNTime:lastNTime,
        clockSeq:clockSeq,
    };

}

export default uuid1_custom
