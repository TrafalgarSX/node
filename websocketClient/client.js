var ws = require("ws");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/* 
// url ws://127.0.0.1:10000
// 创建了一个客户端的socket,然后让这个客户端去连接服务器的socket
var sock = new ws("ws://localhost:10000/sign");
sock.on("open", function () {
    console.log("connect success !!!!");
    json = "{\"certSn\":\"000102030405\", \"signValue\":\"value2\"}";
    sock.send(json);
});
 
sock.on("error", function(err) {
    console.log("error: ", err);
});
 
sock.on("close", function() {
    console.log("close");
});

var count = 1;
sock.on("message", async function(data) {
    // log data in text 
    console.log(data.toString());
    // sleep 10s
    await sleep(10000);
    if(data == 3){
        console.log("force close");
        sock.close();
    }else{
        console.log("count: ", count++)
        // count to string 
        var str = count.toString();
        json = "{\"certSn\":\""+ str +"\", \"signValue\":\"value2\"}";
        console.log("send: ", json);
        sock.send(json);
    }

});
*/

var verifySock = new ws("ws://localhost:10000/verifySign");
verifySock.on("open", function () {
    console.log("verifySign connect success !!!!");
    verifySock.send("verify sign request sended!!!");
    verifySock.ping("ping")
    verifySock.pong("ping")
});
 
verifySock.on("error", function(err) {
    console.log("error: ", err);
});
 
verifySock.on("close", function() {
    console.log("close");
});

verifySock.on("ping", function(data) {
    console.log("ping: ", data.toString());
});

verifySock.on("pong", function(data) {
    console.log("pong: ", data.toString());
});

verifySock.on("message", async function(data) {
    // log data in text 
    let ret = data.toString();
    console.log("verify result: ", ret);
    // sleep 10s
    if(ret === 'true'){
        console.log("verify result is true");
    }else{
        console.log("verify result is false");
    }
    await sleep(10000);
    verifySock.close();

});

