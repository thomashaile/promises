const name = 'f.i.t.b: challenge 3';

const challenge3 = (value) => new Promise(
  (res, rej) => {
    setTimeout(() => {
      if (_) {
        _;
      } else {
        _;
      };
    }, 0)
  })
  // assertions, these are correct
  .then((resolvedVal) => ({
    pass: resolvedVal > 30,
    value: resolvedVal
  }))
  .catch((rejectedVal) => ({
    pass: rejectedVal <= 30,
    value: rejectedVal
  }));


// debug your solution with specific values

const debug1 = challenge3(29);
const debug2 = challenge3(30);
const debug3 = challenge3(31);


// run all tests, delayed until after debug scripts have finished

setTimeout(() => {
  let nextValue = 0;
  const challenge3Tests = Array.from(new Array(50), () => challenge3(nextValue++));

  Promise.all(challenge3Tests)
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

