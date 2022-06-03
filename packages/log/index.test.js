const log = require("./index.js");

(async function () {
  //log.openLogDir()

  log.info(123, {}, null, false);
  log.warn(123, {}, null, false);
  log.warn(123, {}, { q: "s" }, false, undefined);

  log.openLogDir();

  setTimeout(() => {
    log.cleanLogDir();
  }, 4000);
})();
