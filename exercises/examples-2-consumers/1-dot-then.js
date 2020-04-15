// consumers can use the values that were resolved or rejected
//  the most basic consumer is .then
// .then happens after the executor is executed, it takes 2 arguments:
//  a function to execute if the promise was resolved
//  a function to execute if the promise was rejected
// consumers can return a value
//  their return value is always a promise


const ifResolved = (resolvedValue) => `resolved: ${resolvedValue}`;
const ifRejected = (rejectedValue) => `rejected: ${rejectedValue}`;

const pendingPromise = new Promise((res, rej) => {
  setTimeout(function pending() {
    console.log('always pending, never settled');
  }, 0);
});
const pendingAfterThen = pendingPromise
  .then(ifResolved, ifRejected);

const resolvingPromise = new Promise((res, rej) => {
  setTimeout(function resolving() {
    res('value');
  }, 0);
});
const resolvedAfterThen = resolvingPromise
  .then(ifResolved, ifRejected);


const rejectingPromise = new Promise((res, rej) => {
  setTimeout(function rejecting() {
    rej('value');
  }, 0);
});
const rejectedAfterThen = rejectingPromise
  .then(ifResolved, ifRejected);


const uncertainPromise = new Promise((res, rej) => {
  setTimeout(function uncertain() {
    const rando = Math.random();
    if (rando > 0.5) {
      res('greater than 0.5');
    } else {
      rej('less than 0.5');
    };
  }, 0);
});
const certainAfterThen = uncertainPromise
  .then(ifResolved, ifRejected);


setTimeout(() => {
  const studyBreak = "inspect the script's final state";
}, 0);
