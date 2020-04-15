const name = 'f.i.t.b: challenge 9';

const hasVowel = (str) => !Array.from(str)
  .every(char => !/^[aeiou]$/.test(char.toLowerCase()));
const hasNumber = (str) => !Array.from(str)
  .every(char => !/^[0123456789]$/.test(char.toLowerCase()));

const challenge9 = (str) => new Promise(
  (res) => {
    setTimeout(() => {
      if (hasVowel(str)) {
        res({ status: 10, value: str });
      } else if (hasNumber(str)) {
        res({ status: 20, value: str });
      } else {
        res({ status: 30, value: str });
      };
    }, 0)
  })
  .then((response) => {
    if (response._ === _) {
      throw new Error(_);
    } else if (response._ === _) {
      throw new Error(_)
    } else {
      return __;
    };
  })
  .then(val => ({
    pass: val === str
      && !hasNumber(val)
      && !hasVowel(val),
    val
  }))
  .catch((err) => ({
    pass: (hasVowel(str) && err.message === 'too many vowels')
      || (hasNumber(str) && err.message === 'too many numbers'),
    value: str,
    err
  }));

// debug your solution with specific values

const debug0 = challenge9('');
const debug1 = challenge9('12345');
const debug2 = challenge9('qwtryp');
const debug3 = challenge9('aeoiu');
const debug4 = challenge9('prtoie743');


// run all tests, delayed until after debug scripts have finished

setTimeout(() => {
  const randomString = () => Math.random().toString(36).substring(8);

  const challenge9Tests = Array.from(new Array(50), () => challenge9(randomString()));

  Promise.all(challenge9Tests)
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

