import Module from './openssl_func.js'
import {hexToUint8Array, uint8ArrayToHex} from '../utils/hexUtil'

const wasmInstance = await Module

const mallocByteBuffer = len => {
    const ptr = wasmInstance._malloc(len)
    const heapBytes = new Uint8Array(wasmInstance.HEAPU8.buffer, ptr, len)
    return heapBytes
}

const mallocInt32Buffer = len => {
    const ptr = wasmInstance._malloc(len)
    const heapUInt32 = new Uint32Array(wasmInstance.HEAPU32.buffer, ptr, len)
    return heapUInt32
}

export async function WasmHmac(type, msgText, keyBytes){
    const openssl_hmac = wasmInstance.cwrap('openssl_hmac', 'number', ['number', 'array', 'number', 'array', 'number', 'number', 'number']);

    const key_len = keyBytes.length;
    // msgText  to unint8Array
    const encoder = new TextEncoder();
    const msgBytes = encoder.encode(msgText);
    const outBuffer = mallocByteBuffer(32)
    const hmac_len = mallocInt32Buffer(1);

    // 调用openssl_hmac函数
    const result = openssl_hmac(type, keyBytes, key_len, msgBytes, msgBytes.byteLength, outBuffer.byteOffset, hmac_len.byteOffset);
    console.log(`type ${type} hmac result is: ${uint8ArrayToHex(outBuffer)}`);
    console.log(`type ${type} hmac_len value is: ${hmac_len[0]}`);
    console.log(`type ${type} hmac excute result is: ${result}`);

    wasmInstance._free(outBuffer);
    wasmInstance._free(hmac_len)
}

export function test(){
    console.log("test wasm function")

    let hmacKey = hexToUint8Array("CCA785EAF8F1CD24ECEA8FCF6717F13C8290A2E83BCA75605BAF2EA8102E8EECECD0CF5B435AE4B844B3611333AECDF2BB096DC48CB182348A5F7B4BEA76BD03");
    WasmHmac(7, "Hello, World!", hmacKey) // sm3
    WasmHmac(1, "Hello, World!", hmacKey) // md5
    WasmHmac(2, "Hello, World!", hmacKey) // sha1
    WasmHmac(4, "Hello, World!", hmacKey) // sha256
    WasmHmac(6, "Hello, World!", hmacKey) // sha512
    WasmHmac(5, "Hello, World!", hmacKey) // sha384
    WasmHmac(3, "Hello, World!", hmacKey) // sha224
}