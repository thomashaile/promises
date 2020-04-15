// .finally takes no arguments and also returns a promise
//  it is called whether the promise is resolved or rejected


let finallyCount = 0;
const finallyCB = () => finallyCount++;

const rando = Math.random();

const promise = new Promise(
  (res, rej) => {
    setTimeout(() => {
      if (rando > 0.6) {
        res('greater than 0.6');
      } else if (rando < 0.4) {
        rej('less than 0.4');
      } else {
        throw new Error('0.6 > rando > 0.4');
      };
    }, 0);
  })
  .finally(finallyCB);


setTimeout(() => {
  const studyBreak = "inspect the script's final state";
}, 0);

// .finally is not important for these exercises
