
import CryptoJS from 'crypto-js';

let hex2byte = {};

let byte2hex = [];

for (let i = 0; i < 256; i++) {
    let hex = (i + 0x100).toString(16).substring(1)
    hex2byte[hex] = i;
    byte2hex[i] = hex;
}

const uuid4_custom = () => {


    // var buffer = Array.from(CryptoJS.lib.WordArray.random(16).toString());
    const ww =  (CryptoJS.lib.WordArray.random(16));
    let buffer =  Array.from(ww.words[0].toString()+ww.words[1].toString()+ww.words[2].toString()+ww.words[3].toString())

    // console.log('=== t_Database buffer ',typeof buffer, buffer,byte2hex)

    buffer[6] = (buffer[6] & 0x0f) | 0x40;
    buffer[8] = (buffer[8] & 0x3f) | 0x80;

    let result;
       result = byte2hex[buffer[0]] + byte2hex[buffer[1]] +
                byte2hex[buffer[2]] + byte2hex[buffer[3]] + "-" +
                byte2hex[buffer[4]] + byte2hex[buffer[5]] + "-" +
                byte2hex[(buffer[6] & 0x0f) | 0x40] +
                byte2hex[buffer[7]] + "-" +
                byte2hex[(buffer[8] & 0x3f) | 0x80] +
                byte2hex[buffer[9]] + "-" +
                byte2hex[buffer[10]] + byte2hex[buffer[11]] +
                byte2hex[buffer[12]] + byte2hex[buffer[13]] +
                byte2hex[buffer[14]] + byte2hex[buffer[15]];

    // console.log('=== t_Database result',result)
    return result;

}

export default uuid4_custom
