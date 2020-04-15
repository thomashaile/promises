// promises will automatically reject if there is an error
// .catch is a consumer that takes only one argument
// it is the same as using the "reject" cb in .then
//  the difference is readability


const ifResolved = (resolvedValue) => `resolved: ${resolvedValue}`;
const ifRejected = (rejectedValue) => `rejected: ${rejectedValue}`;

const rando = Math.random();

const handledWithThen = new Promise(
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
  .then(ifResolved, ifRejected);

const handledWithCatch = new Promise(
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
  .then(ifResolved)
  .catch(ifRejected);


setTimeout(() => {
  const studyBreak = "inspect the script's final state";
}, 0);
