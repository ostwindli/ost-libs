const dl = require("./index.js");

const testUrl = "https://dl.nwjs.io/v0.64.0/nw.lib";
const testUrl1 = 'http://dl.nwjs.io/v0.57.1/nwjs-sdk-v0.57.1-win-x64.zip';
(async function () {
  //await dl.downloadAsync(testUrl);

  dl.download([testUrl], {
    dir: __dirname, 
    target: 'demo.zip',
  }, (error) => {
    error && console.error(error);
  });
})();
