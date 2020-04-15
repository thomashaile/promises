// you can chain as many consumers as you like

const rando = Math.random();

const chainedConsumers = new Promise(
  (res, rej) => {
    setTimeout(() => {
      const randomInteger = Math.floor(rando * 100);
      if (randomInteger > 50) {
        res(randomInteger);
      } else {
        rej(randomInteger);
      };
    }, 0)
  })
  .then(
    (resolved) => 'resolved: ' + resolved,
    (rejected) => 'rejected: ' + rejected
  )
  .then((message) => {
    if (message.includes('3')) {
      throw new Error('3 is a bad number');
    } else {
      return message;
    };
  })
  .catch((err) => console.error(err))
  .finally(() => console.log('all done!'));


setTimeout(() => {
  const studyBreak = "inspect the script's final state";
}, 0);
