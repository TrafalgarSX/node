import wasmModule from './openssl_func.js'
const wasmInstance = wasmModule({});

function hexToUint8Array(hexString) {
  const length = hexString.length / 2;
  const uint8Array = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    const byteValue = parseInt(hexString.substr(i * 2, 2), 16);
    uint8Array[i] = byteValue;
  }

  return uint8Array;
}

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

function sm3HmacWasm(text){
    const openssl_hmac = wasmInstance.cwrap('openssl_hmac', 'number', ['number', 'array', 'number', 'array', 'number', 'array', 'number']);

    const type = 7;
    let key = hexToUint8Array("CCA785EAF8F1CD24ECEA8FCF6717F13C8290A2E83BCA75605BAF2EA8102E8EECECD0CF5B435AE4B844B3611333AECDF2BB096DC48CB182348A5F7B4BEA76BD03");
    const key_len = key.length;
    const inBuffer = mallocByteBuffer(text.byteLength)
    // Hello, World!  to unint8Array
    const encoder = new TextEncoder();
    const ctx = encoder.encode(text);
    inBuffer.set(ctx)
    const outBuffer = mallocByteBuffer(32)
    const hmac_len = new Uint32Array([32]);

    const result = openssl_hmac(type, key, key_len, inBuffer.byteOffset, inBuffer.byteLength, outBuffer.byteOffset, hmac_len);
    console.log("sm3 hmac值= ",Array.from(outBuffer).map(v => String.fromCharCode(v)).join(''))
    console.log(result);

    // 调用openssl_hmac函数
    wasmInstance._free(inBuffer);
    wasmInstance._free(outBuffer);

    // const data = new Uint8Array([0x04, 0x05, 0x06]);
    // const data_len = data.length;
    // const hmac = new Uint8Array(32); // 假设hmac长度为32字节
}

sm3HmacWasm("Hello, World!");

