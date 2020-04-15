// consumers can also be added directly after the promise
//  this does not change how they work behind the scenes
//  but can make it easier to read and debug


const ifResolved = (resolvedValue) => `resolved: ${resolvedValue}`;
const ifRejected = (rejectedValue) => `rejected: ${rejectedValue}`;

const pendingAfterThen = new Promise(
  (res, rej) => {
    setTimeout(function pending() {
      console.log('always pending, never settled');
    }, 0);
  })
  .then(ifResolved, ifRejected);

const resolvedAfterThen = new Promise(
  (res, rej) => {
    setTimeout(function resolving() {
      res('value');
    }, 0);
  })
  .then(ifResolved, ifRejected);


const rejectedAfterThen = new Promise(
  (res, rej) => {
    setTimeout(function rejecting() {
      rej('value');
    }, 0);
  })
  .then(ifResolved, ifRejected);


const certainAfterThen = new Promise(
  (res, rej) => {
    setTimeout(function uncertain() {
      const rando = Math.random();
      if (rando > 0.5) {
        res('greater than 0.5');
      } else {
        rej('less than 0.5');
      };
    }, 0);
  })
  .then(ifResolved, ifRejected);


setTimeout(() => {
  const studyBreak = "inspect the script's final state";
}, 0);
