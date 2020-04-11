# event-loop 

## /2-basic-closure

> uncaught error: 4/11/2020, 4:31:30 PM 

[../REVIEW.md](../REVIEW.md)

* [/example-parent-and-own-values.js](#example-parent-and-own-valuesjs) - example - no status
* [/exercise-1.js](#exercise-1js) - uncaught error
* [/exercise-2.js](#exercise-2js) - uncaught error
* [/exercise-3.js](#exercise-3js) - uncaught error
* [/exercise-4.js](#exercise-4js) - uncaught error

---

## /example-parent-and-own-values.js

* example - no status
* [review source](./example-parent-and-own-values.js)

```js
const closeIt = (parentParam) => {
  const parentLocal = "parent frame : " + parentParam;
  return function (ownParam) {
    const ownLocal = "own frame : " + ownParam;
    return { parentParam, parentLocal, ownParam, ownLocal };
  }
}
const closure1 = closeIt("a");
const result1 = closure1("b");

const closure2 = closeIt("c");
const result2 = closure2("d");

```

[TOP](#event-loop)

---

## /exercise-1.js

* uncaught error
* [review source](./exercise-1.js)

```txt
ReferenceError: _ is not defined
    at Object.<anonymous> ( [ ... ] /exercises/2-basic-closure/exercise-1.js:9:31)
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
const closeAValue = (val) => {
  return function () {
    return val;
  }
}

const one = closeAValue(1);
const oneReturns = one();
console.assert(oneReturns === _, "asserting one's return value");

const two = closeAValue(2);
const twoReturns = two();
console.assert(twoReturns === _, "asserting two's return value");

const three = _;
const threeReturns = _;
console.assert(threeReturns === 4, "asserting three's return value");


const sum = one + two + three; // fix this line to pass the assert
console.assert(sum === 7, "summing closed values");

const product = _; // fix this line to pass the assert
console.assert(product === 16, "create the value 16 using your closed functions");

```

[TOP](#event-loop)

---

## /exercise-2.js

* uncaught error
* [review source](./exercise-2.js)

```txt
ReferenceError: _ is not defined
    at Object.<anonymous> ( [ ... ] /exercises/2-basic-closure/exercise-2.js:12:28)
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
const closeIt = (parentParam) => {
  return function (ownParam) {
    return ownParam + parentParam;
  }
}

const closure1 = closeIt(3);
const closure2 = closeIt("3");

const result1 = closure1(8);
const result2 = closure2(8);
console.assert(result1 === _, "result 1")
console.assert(result2 === _, "result 2")

const result3 = closure1(true);
const result4 = closure2(true);
console.assert(result3 === _, "result 3")
console.assert(result4 === _, "result 4")

const result5 = closure1(_);
const result6 = closure2(_);
console.assert(result5 === result6, "results 5 & 6");

```

[TOP](#event-loop)

---

## /exercise-3.js

* uncaught error
* [review source](./exercise-3.js)

```txt
ReferenceError: _ is not defined
    at Object.<anonymous> ( [ ... ] /exercises/2-basic-closure/exercise-3.js:12:28)
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
const closeIt = (paramParent) => {
  const localParent = "b";
  return function (paramOwn) {
    const localOwn = "d";
    return paramParent + localParent + paramOwn + localOwn;
  }
}

const closure1 = closeIt("a");

const result1 = closure1("c");
console.assert(result1 === _, "result 1");

const result2 = closure1("x");
console.assert(result2 === _, "result 2");


const closure2 = closeIt("iii");

const result3 = closure2("2");
console.assert(result3 === _, "result 3");

const result4 = closure2("--");
console.assert(result4 === _, "result 4");


const result5 = closure1(8);
console.assert(result5 === _, "result 5");

const result6 = closure2(_)
console.assert(result6 === "iiib d", "result 6");

```

[TOP](#event-loop)

---

## /exercise-4.js

* uncaught error
* [review source](./exercise-4.js)

```txt
ReferenceError: _ is not defined
    at Object.<anonymous> ( [ ... ] /exercises/2-basic-closure/exercise-4.js:10:28)
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
const closeIt = (x, y) => {
  return function (x) {
    return x + y;
  }
}

const closure_4_5 = closeIt(4, 5);

const result1 = closure_4_5(200);
console.assert(result1 === _, "result 1");

const result2 = closure_4_5(-3);
console.assert(result2 === _, "result 2");


const closure_false_true = closeIt(false, true);

const result3 = closure_false_true(200);
console.assert(result3 === _, "result 3");

const result4 = closure_false_true(-3);
console.assert(result4 === _, "result 4");


const result5 = closure_4_5(1);
console.assert(result5 === _, "result 5");

const result6 = closure_4_5(_) + closure_false_true(_);
console.assert(result6 === 6, "result 6");

```

[TOP](#event-loop)

