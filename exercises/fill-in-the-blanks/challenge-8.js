const name = 'f.i.t.b: challenge 8';

const hasVowel = (str) => !Array.from(str)
  .every(char => !/^[aeiou]$/.test(char.toLowerCase()));
const hasNumber = (str) => !Array.from(str)
  .every(char => !/^[0123456789]$/.test(char.toLowerCase()));

const challenge8 = (str) => new Promise(
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
    if (response._ !== _) {
      throw new Error('wrong status');
    };
    return _._;
  })
  .then(val => ({
    pass: val === str
      && !hasNumber(val)
      && !hasVowel(val),
    val
  }))
  .catch((err) => ({
    pass: (hasVowel(str) || hasNumber(str))
      && err.message === _,
    value: _,
    err
  }));

// debug your solution with specific values

const debug0 = challenge8('');
const debug1 = challenge8('12345');
const debug2 = challenge8('qwtryp');
const debug3 = challenge8('aeoiu');
const debug4 = challenge8('prtoie743');


// run all tests, delayed until after debug scripts have finished

setTimeout(() => {
  const randomString = () => Math.random().toString(36).substring(8);

  const challenge8Tests = Array.from(new Array(50), () => challenge8(randomString()));

  Promise.all(challenge8Tests)
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

