// executors can be synchronous or asynchronous
// after this file, the rest of the examples will be async
//  promises are only useful with asynchronous programming

const rando = Math.random();


const executor1 = (resolve, reject) => {
  setTimeout(() => {
    if (rando > 0.5) {
      resolve('greater than 0.5');
    } else {
      reject('less than 0.5');
    };
  }, 0);
}
const promiseSettledAsync = new Promise(executor1);

const executor2 = (resolve, reject) => {
  setTimeout(() => {
    if (rando > 0.5) {
      // resolve('greater than 0.5');
    } else {
      // reject('less than 0.5');
    };
  }, 0);
}
const promisePendingAsync = new Promise(executor2);


const executor3 = (resolve, reject) => {
  if (rando > 0.5) {
    resolve('greater than 0.5');
  } else {
    reject('less than 0.5');
  };
}
const promiseSettledSync = new Promise(executor3);

const executor4 = (resolve, reject) => {
  if (rando > 0.5) {
    // resolve('greater than 0.5');
  } else {
    // reject('less than 0.5');
  };
}
const promisePendingSync = new Promise(executor4);




setTimeout(() => {
  const studyBreak = "inspect the script's final state";
}, 0);
