const { ProcessScheduling } = require("./processScheduling");

const main = () => {
  const processScheduling = new ProcessScheduling();
  processScheduling.makeJobQueue();
  processScheduling.addReadyQueue();
  processScheduling.print();
  processScheduling.emitEvent();

  const run = setInterval(() => {
    processScheduling.dispatch();
    processScheduling.print();
    processScheduling.timeout(run);
  }, 1000);
};

main();
