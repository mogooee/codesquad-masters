//const { ProcessScheduling } = require("./processScheduling");
const { ProcessScheduling } = require("./multiThread");

const main = () => {
  const processScheduling = new ProcessScheduling();

  processScheduling.makeJobQueue();
  processScheduling.addReadyQueue();
  processScheduling.print();
  processScheduling.emitEvent();

  const run = setInterval(() => {
    return new Promise((resolve, reject) => {
      processScheduling.dispatch();
      resolve();
    }).then(() => {
      processScheduling.print();
      processScheduling.timeout(run);
    });
  }, 1000);
};

main();
