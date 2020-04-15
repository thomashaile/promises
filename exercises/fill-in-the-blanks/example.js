const name = 'f.i.t.b: example';

const example = (value) => new Promise(
  (res, rej) => {
    setTimeout(() => {
      if (value > 50) {
        rej(value);
      } else {
        res(value);
      };
    }, 0)
  })
  .then(
    (resolvedVal) => resolvedVal < 50,
    (rejectedVal) => rejectedVal > 50
  )
  .then(assertion => {
    // just for example, throw an error
    if (value === 51) throw new Error(value + ' is a bad number');
    return { value, pass: assertion };
  })
  .catch(error => ({ value, error }));


// debug your solution with specific values

const debug1 = example(49);
const debug2 = example(50);
const debug3 = example(51);


// run all tests, delayed until after debug scripts have finished

setTimeout(() => {
  let nextValue = 0;
  const exampleTests = Array.from(new Array(100), () => example(nextValue++));

  Promise.all(exampleTests)
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

