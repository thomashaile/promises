const name = 'f.i.t.b: challenge 1';

const challenge1 = (value) => new Promise(
        (res, rej) => {
            setTimeout(() => {
                if (value < 30) {
                    res(value);
                } else {
                    rej(value);
                };
            }, 0)
        })
    .then(
        (resolvedVal) => resolvedVal < 30,
        (rejectedVal) => rejectedVal > 29
    )
    .then(assertion => {
        return { value, pass: assertion };
    })
    .catch(error => ({ value, error }));


// debug your solution with specific values

const debug1 = challenge1(29);
const debug2 = challenge1(30);
const debug3 = challenge1(31);


// run all tests, delayed until after debug scripts have finished

setTimeout(() => {
    let nextValue = 0;
    const challenge1Tests = Array.from(new Array(50), () => challenge1(nextValue++));

    Promise.all(challenge1Tests)
        .then(results => results.reduce((all, next) => {
            if (next.error) {
                all.status = 'error';
                all.error.push(next);
                return all;
            };
            all.status = all.status === 'error' ? 'error' :
                !next.pass ? 'failing' : all.status;
            next.pass ? all.passing.push(next) : all.failing.push(next);
            return all;
        }, { name, status: 'passing', failing: [], passing: [], error: [] }))
        .then(summary => console.log(summary));

}, 500);