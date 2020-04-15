const name = 'f.i.t.b: challenge 5';

const hasVowel = (str) => !Array.from(str)
  .every(char => !/^[aeiou]$/.test(char.toLowerCase()));

const challenge5 = (str) => new Promise(
  (res, rej) => {
    setTimeout(() => {
      if (_) {
        _({ status: _, value: str });
      } else {
        _({ status: _, value: str });
      }
    }, 0)
  })
  // assertions, these are correct
  .then((resolvedVal) => {
    resolvedVal.pass = resolvedVal.status === 10
      && hasVowel(resolvedVal.value);
    return resolvedVal;
  })
  .catch((rejectedVal) => {
    rejectedVal.pass = rejectedVal.status === 20
      && !hasVowel(rejectedVal.value);
    return rejectedVal;
  });

// debug your solution with specific values

const debug0 = challenge5('');
const debug1 = challenge5('12345');
const debug2 = challenge5('qwtryp');
const debug3 = challenge5('aeoiu');
const debug4 = challenge5('prtoie743');


// run all tests, delayed until after debug scripts have finished

setTimeout(() => {
  const randomString = () => Math.random().toString(36).substring(8);

  const challenge5Tests = Array.from(new Array(50), () => challenge5(randomString()));

  Promise.all(challenge5Tests)
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

