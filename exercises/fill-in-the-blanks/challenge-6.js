const name = 'f.i.t.b: challenge 6';

const hasVowel = (str) => !Array.from(str)
  .every(char => !/^[aeiou]$/.test(char.toLowerCase()));

const challenge6 = (str) => new Promise(
  (res) => {
    setTimeout(() => {
      res({
        status: hasVowel(str)
          ? 10 : 20,
        value: str
      })
    }, 0)
  })
  .then((response) => {
    if (response.status === _) {
      throw new _(_);
    };
    response.pass = response.status === _
      && hasVowel(response.value);
    return response;
  })
  .catch((err) => {
    return {
      pass: _.name === 'Error'
        && _.message === 'no vowels',
      value: str,
      err,
    }
  });

// debug your solution with specific values

const debug0 = challenge6('');
const debug1 = challenge6('12345');
const debug2 = challenge6('qwtryp');
const debug3 = challenge6('aeoiu');
const debug4 = challenge6('prtoie743');


// run all tests, delayed until after debug scripts have finished

setTimeout(() => {
  const randomString = () => Math.random().toString(36).substring(8);

  const challenge6Tests = Array.from(new Array(50), () => challenge6(randomString()));

  Promise.all(challenge6Tests)
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

