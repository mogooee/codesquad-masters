const url = "www.disney.co.kr";
const dns = require("dns");
const net = require("net");

class HttpRequest {
  constructor(url, method = "GET") {
    this.url = url;
    this.method = method;
    this.requestMsg = "";
    this.socket = new net.Socket();
    this.ip;
    this.port = 80;
    this.init();
  }
  init() {
    this.makeRequestLine();
    this.makeHeader();
  }
  makeRequestLine() {
    return `${this.method} / HTTP/1.1\n`;
  }
  makeHeader() {
    return `Host: ${this.url}`; //필수헤더?
  }
  returnRequestMessage() {
    return (this.requestMsg =
      this.makeRequestLine() + this.makeHeader() + "\r\n\r\n");
  }
  searchDNS() {
    return new Promise((resolve, reject) => {
      dns.lookup(url, (err, addresses, family) => {
        this.ip = addresses;
        resolve();
      });
    });
  }
  sendRequestMsg2TCP() {
    return this.socket.connect(this.port, this.ip, () => {
      this.socket.write(this.requestMsg);
    });
    return this.printConnMsg();
  }
  responseTCP() {
    return this.socket.on("data", (serverData) => {
      this.printServeData(serverData);
      this.socket.destroy();
    });
  }
  closeSocket() {
    return this.socket.on("close", () => {
      this.printCloseMsg();
    });
  }
  request2Server() {
    return this.searchDNS()
      .then(() => {
        this.sendRequestMsg2TCP();
      })
      .then(() => {
        this.responseTCP();
      })
      .then(() => {
        this.closeSocket();
      });
  }
  printConnMsg() {
    return console.log(`TCP Connection: ${this.ip}, ${this.port}`);
  }
  printServeData(data) {
    return console.log(`[client] received data from server: ${data}`);
  }
  printCloseMsg() {
    return console.log(`[client] connection closed`);
  }
}

const httpRequest = new HttpRequest(url);
httpRequest.returnRequestMessage();
httpRequest.searchDNS();
httpRequest.request2Server();
