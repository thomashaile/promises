// you can also define the executor in the new Promise call
//  this can be more readable and avoids extra variables


const rando = Math.random();


const notAlwaysPending = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (rando > 0.5) {
      resolve('greater than 0.5');
    } else {
      reject('less than 0.5');
    };
  }, 0);
});

const alwaysPending = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (rando > 0.5) {
      // resolve('greater than 0.5');
    } else {
      // reject('less than 0.5');
    };
  }, 0);
});



setTimeout(() => {
  const studyBreak = "inspect the script's final state";
}, 0);
