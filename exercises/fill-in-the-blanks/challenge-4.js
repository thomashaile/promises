const name = 'f.i.t.b: challenge 4';

const challenge4 = (array) => {
  const allEven = array.reduce(
    (previousAre, item) => ((item % 2 === 0) && previousAre),
    true);
  return new Promise(
    (res, rej) => {
      setTimeout(() => {
        if (allEven) {
          _(_);
        } else {
          _(_);
        }
      }, 0)
    })
    // assertions, these are correct
    .then((resolvedVal) => ({
      array: resolvedVal,
      allEven,
      pass: !resolvedVal.every(entry => entry % 2 === 0),
    }))
    .catch((rejectedValue) => ({
      array: rejectedValue,
      allEven,
      pass: rejectedValue.every(entry => entry % 2 === 0),
    }))
};

// debug your solution with specific values

const debug0 = challenge4([1, 3, 5]);
const debug1 = challenge4([2, 4, 6]);
const debug2 = challenge4([]);
const debug3 = challenge4([1, 2, 3, 4]);


// run all tests, delayed until after debug scripts have finished

setTimeout(() => {
  const randomArray = () => Array.from(
    new Array(Math.floor(Math.random() * 5)),
    () => Math.floor(Math.random() * 10));
  const challenge4Tests = Array.from(new Array(50), () => challenge4(randomArray()));

  Promise.all(challenge4Tests)
    .then(results => results.reduce((all, next) => {
      if (next.error) {
        all.status = 'error';
        all.error.push(next);
        return all;
      };
      all.status = all.status === 'error' ? 'error'
        : !next.pass ? 'failing' : all.status;
      next.pass ? all.passing.push(next) : all.failing.push(next);
      return all;
    }, { name, status: 'passing', failing: [], passing: [], error: [] }))
    .then(summary => console.log(summary));

}, 500);

