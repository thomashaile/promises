# event-loop 

## /4-sharing-state

> uncaught error: 4/11/2020, 4:31:30 PM 

[../REVIEW.md](../REVIEW.md)

* [/example-1-pure-functions.js](#example-1-pure-functionsjs) - example - fail
* [/example-2-pure-closures.js](#example-2-pure-closuresjs) - example - fail
* [/example-3-mutating-closures.js](#example-3-mutating-closuresjs) - example - fail
* [/exercise-1.js](#exercise-1js) - uncaught error
* [/exercise-2.js](#exercise-2js) - uncaught error
* [/exercise-3.js](#exercise-3js) - uncaught error

---

## /example-1-pure-functions.js

* example - fail
* [review source](./example-1-pure-functions.js)

```txt
- FAIL : assert 1
- FAIL : assert 2
- FAIL : assert 3
- FAIL : assert 4
- FAIL : assert 5
- FAIL : assert 6
- FAIL : assert 7
- FAIL : assert 8
```

```js
// closeIt creates pure closures
// because the returned functions never modify the closed variable
// calling the closed functions with the same args always returns the same result


const concatPigs = (str) => {
  return str + " pigs";
}
const concatParam = (str, param) => {
  return str + param;
}

const str1 = '-';

console.assert(concatPigs(str1) === null, 'assert 1');
console.assert(concatPigs(str1) === null, 'assert 2');
console.assert(concatParam(str1, " rock!") === null, 'assert 3');
console.assert(concatParam(str1, " rock!") === null, 'assert 4');


const str2 = "hoy";

console.assert(concatPigs(str2) === null, 'assert 5');
console.assert(concatPigs(str2) === null, 'assert 6');
console.assert(concatParam(str2, " cheese!") === null, 'assert 7');
console.assert(concatParam(str2, " cheese!") === null, 'assert 8');

```

[TOP](#event-loop)

---

## /example-2-pure-closures.js

* example - fail
* [review source](./example-2-pure-closures.js)

```txt
- FAIL : assert 1
- FAIL : assert 2
- FAIL : assert 3
- FAIL : assert 4
- FAIL : assert 5
- FAIL : assert 6
- FAIL : assert 7
- FAIL : assert 8
```

```js
// closeIt creates pure closures
// because the returned functions never modify the closed variable
// calling the closed functions with the same args always returns the same result

const closeNonMutatingFunctions = (str) => {
  return [
    function () {
      return str + " pigs";
    },
    function (param) {
      return str + param;
    }
  ]
}

let closedFunctions1 = closeNonMutatingFunctions("-");
const concatPigs1 = closedFunctions1[0], concatParam1 = closedFunctions1[1];
closedFunctions1 = null;

console.assert(concatPigs1() === null, 'assert 1');
console.assert(concatPigs1() === null, 'assert 2');
console.assert(concatParam1(" rock!") === null, 'assert 3');
console.assert(concatParam1(" rock!") === null, 'assert 4');


let closedFunctions2 = closeNonMutatingFunctions("hoy");
const concatPigs2 = closedFunctions2[0], concatParam2 = closedFunctions2[1];
closedFunctions2 = null;

console.assert(concatPigs2() === null, 'assert 5');
console.assert(concatPigs2() === null, 'assert 6');
console.assert(concatParam2(" cheese!") === null, 'assert 7');
console.assert(concatParam2(" cheese!") === null, 'assert 8');

```

[TOP](#event-loop)

---

## /example-3-mutating-closures.js

* example - fail
* [review source](./example-3-mutating-closures.js)

```txt
- FAIL : assert 1
- FAIL : assert 2
- FAIL : assert 3
- FAIL : assert 4
- FAIL : assert 5
- FAIL : assert 6
- FAIL : assert 7
- FAIL : assert 8
```

```js
// closeIt creates impure closures
// because the returned functions DO modify the closed variable
// calling the closed functions with the same args will not always return the same result

function closeMutatingFunctions(str) {
  return [
    function () {
      return str += " pigs";
    },
    function (param) {
      return str += param;
    }
  ]
}

let closedFunctions1 = closeMutatingFunctions("-");
const concatPigs1 = closedFunctions1[0], concatParam1 = closedFunctions1[1];
closedFunctions1 = null;

console.assert(concatPigs1() === null, 'assert 1');
console.assert(concatPigs1() === null, 'assert 2');
console.assert(concatParam1(" rock!") === null, 'assert 3');
console.assert(concatParam1(" rock!") === null, 'assert 4');


let closedFunctions2 = closeMutatingFunctions("hoy");
const concatPigs2 = closedFunctions2[0], concatParam2 = closedFunctions2[1];
closedFunctions2 = null;

console.assert(concatPigs2() === null, 'assert 5');
console.assert(concatPigs2() === null, 'assert 6');
console.assert(concatParam2(" cheese!") === null, 'assert 7');
console.assert(concatParam2(" cheese!") === null, 'assert 8');

```

[TOP](#event-loop)

---

## /exercise-1.js

* uncaught error
* [review source](./exercise-1.js)

```txt
ReferenceError: _ is not defined
    at Object.<anonymous> ( [ ... ] /exercises/4-sharing-state/exercise-1.js:18:25)
    at Module._compile (internal/modules/cjs/loader.js:777:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:788:10)
    at Module.load (internal/modules/cjs/loader.js:643:32)
    at Function.Module._load (internal/modules/cjs/loader.js:556:12)
    at Module.require (internal/modules/cjs/loader.js:683:19)
    at require (internal/modules/cjs/helpers.js:16:16)
    at evaluate ( [ ... ] /review.js:229:7)
    at Object.<anonymous> ( [ ... ] /review.js:244:1)
    at Module._compile (internal/modules/cjs/loader.js:777:30)
```

```js
const str0 = "";

function concatPigs(str) {
  return str + " pigs";
}
function concatParam(str, param) {
  return str + " " + param;
}

const str1 = concatPigs(str0);

const str2 = concatParam(str1, " rock!");

const str3 = concatPigs(str2);

const str4 = concatParam(str2, str3);

console.assert(str4 === _, 'assert str4');

```

[TOP](#event-loop)

---

## /exercise-2.js

* uncaught error
* [review source](./exercise-2.js)

```txt
ReferenceError: _ is not defined
    at Object.<anonymous> ( [ ... ] /exercises/4-sharing-state/exercise-2.js:14:1)
    at Module._compile (internal/modules/cjs/loader.js:777:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:788:10)
    at Module.load (internal/modules/cjs/loader.js:643:32)
    at Function.Module._load (internal/modules/cjs/loader.js:556:12)
    at Module.require (internal/modules/cjs/loader.js:683:19)
    at require (internal/modules/cjs/helpers.js:16:16)
    at evaluate ( [ ... ] /review.js:229:7)
    at Object.<anonymous> ( [ ... ] /review.js:244:1)
    at Module._compile (internal/modules/cjs/loader.js:777:30)
```

```js
const closeIt = (str) => {
  return [
    function () {
      return str + " pigs";
    },
    function (param) {
      return str + param;
    }
  ]
}

let closedFunctions = closeIt("-");
const concatPigs = closedFunctions[0], concatParam = closedFunctions[1];
closedFunctions = _;

const str1 = concatPigs();

const str2 = concatParam(" rock!");

const str3 = concatPigs();

const str4 = concatParam(str3);

console.assert(str4 === _, 'assert str4');

```

[TOP](#event-loop)

---

## /exercise-3.js

* uncaught error
* [review source](./exercise-3.js)

```txt
ReferenceError: _ is not defined
    at Object.<anonymous> ( [ ... ] /exercises/4-sharing-state/exercise-3.js:14:1)
    at Module._compile (internal/modules/cjs/loader.js:777:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:788:10)
    at Module.load (internal/modules/cjs/loader.js:643:32)
    at Function.Module._load (internal/modules/cjs/loader.js:556:12)
    at Module.require (internal/modules/cjs/loader.js:683:19)
    at require (internal/modules/cjs/helpers.js:16:16)
    at evaluate ( [ ... ] /review.js:229:7)
    at Object.<anonymous> ( [ ... ] /review.js:244:1)
    at Module._compile (internal/modules/cjs/loader.js:777:30)
```

```js
const closeIt = (str) => {
  return [
    function () {
      return str += " pigs";
    },
    function (param) {
      return str += param;
    }
  ]
}

let closedFunctions = closeIt("-");
const concatPigs = closedFunctions[0], concatParam = closedFunctions[1];
closedFunctions = _;

const str1 = concatPigs();

const str2 = concatParam(" rock!");

const str3 = concatPigs();

const str4 = concatParam(str3);

console.assert(str4 === _, 'assert str4');

```

[TOP](#event-loop)

