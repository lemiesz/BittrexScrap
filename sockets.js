const WebSocket = require('ws');
const _ = require("underscore");
const ws = new WebSocket('wss://socket.bittrex.com/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=11uLI%2FJl06CJrDSf2f3ky2WSLT7fw%2F6B3stYEgyQgn7S%2Fl5MNnYOL1D7gIPYsLUH3gyNHceqtJ5POoY2aJ6Hf5%2FTs5bg9Zo99qEY3%2F7jzw%2BIGydL&connectionData=%5B%7B%22name%22%3A%22corehub%22%7D%5D&tid=3');

ws.on('open', function open() {
  // ws.send('something');
});

ws.on('message', function incoming(data) {
  var pData = JSON.parse(data);
  if(pData.M) {
    if(pData.M[0]) {
      if(pData.M[0].A) {
        if(pData.M[0].A[0]) {
          var deltas = pData.M[0].A[0].Deltas;
          // console.log(pData.M[0].A[0].Deltas)
          _.map(deltas, (item) => {
            if(item.MarketName === "BTC-OMG") {
              console.log(item);
            }
          })
        }
      }
    }
  }
});
