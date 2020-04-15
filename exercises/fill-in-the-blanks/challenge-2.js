const name = 'f.i.t.b: challenge 2';

const challenge2 = (array) => {
  const allEven = array.reduce(
    (previousAre, item) => ((item % 2 === 0) && previousAre),
    true);
  return new Promise(
    (res, rej) => {
      setTimeout(() => {
        if (_) {
          _(array);
        } else {
          _(array);
        }
      }, 0)
    })
    .then(
      (resolvedVal) => resolvedVal._(entry => entry % 2 === 0),
      (rejectedVal) => !rejectedVal._(entry => entry % 2 === 0)
    )
    .then(assertion => {
      return { array, allEven, pass: assertion };
    })
    .catch(error => ({ array, allEven, error }));
};

// debug your solution with specific values

const debug0 = challenge2([1, 3, 5]);
const debug1 = challenge2([2, 4, 6]);
const debug2 = challenge2([]);
const debug3 = challenge2([1, 2, 3, 4]);


// run all tests, delayed until after debug scripts have finished

setTimeout(() => {
  const randomArray = () => Array.from(
    new Array(Math.floor(Math.random() * 5)),
    () => Math.floor(Math.random() * 10));
  const challenge2Tests = Array.from(new Array(50), () => challenge2(randomArray()));

  Promise.all(challenge2Tests)
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

