# event-loop 

## /3-closed-variables

> uncaught error: 4/11/2020, 4:31:30 PM 

[../REVIEW.md](../REVIEW.md)

* [/example-1-a-free-variable.js](#example-1-a-free-variablejs) - example - no status
* [/example-2-not-from-closure.js](#example-2-not-from-closurejs) - example - no status
* [/example-3-from-closure.js](#example-3-from-closurejs) - example - no status
* [/exercise-1.js](#exercise-1js) - uncaught error
* [/exercise-2.js](#exercise-2js) - uncaught error

---

## /example-1-a-free-variable.js

* example - no status
* [review source](./example-1-a-free-variable.js)

```js
const freeOrNot = (parameter) => {
  const localVariable = "declared in function";
  freeVariable; // not declared locally or passed as a parameter
}

const freeVariable = 'declared in parent scope';
freeOrNot("parameter value");

/*
Free Variables

  "Free variables are simply the variables
    that are neither locally declared
    nor passed as parameter."
    --> Denys Séguret: https://stackoverflow.com/questions/12934929/what-are-free-variables

This may sound like an abstract, mathy definition.
But really it's not so bad.
You can identify free variables just by reading the source code,
without even running it!
*/

```

[TOP](#event-loop)

---

## /example-2-not-from-closure.js

* example - no status
* [review source](./example-2-not-from-closure.js)

```js
const freeOrNot = (parameter) => {
  var localVariable = "declared in function";
  valueFromGlobalScope = "global side-effect";
}

let valueFromGlobalScope = "declared in global scope";
freeOrNot("first call");

valueFromGlobalScope = "reassigned in global scope";
freeOrNot("second call");

```

[TOP](#event-loop)

---

## /example-3-from-closure.js

* example - no status
* [review source](./example-3-from-closure.js)

```js
const closeIt = (parentParam) => {
  let valueFromClosure = "declared in parent frame : " + parentParam;
  return function (ownParam) {
    var ownLocal = "declared in body : " + ownParam[ownParam.length - 1];
    valueFromClosure = "closed side-effect : " + ownParam;
  }
}

const closure1 = closeIt("1");
closure1("first call to closure1");

const closure2 = closeIt("2");
closure2("first call to closure2");
closure2("second call to closure2");

closure1("second call to closure1");

```

[TOP](#event-loop)

---

## /exercise-1.js

* uncaught error
* [review source](./exercise-1.js)

```txt
- FAIL : assert 1
- FAIL : assert 2
ReferenceError: _ is not defined
    at Object.<anonymous> ( [ ... ] /exercises/3-closed-variables/exercise-1.js:14:40)
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
const usesParentVariable = (param) => {
  // write me!
};

let parentScopeVariable = "parentScope";

const result1 = usesParentVariable("arg");
console.assert(result1 === "argparentScopelocal", "assert 1");

const result2 = usesParentVariable(undefined);
console.assert(result2 === "undefinedparentScopelocal", "assert 2");

parentScopeVariable = usesParentVariable("spoon");
console.assert(parentScopeVariable === _, "assert 3");

const result3 = usesParentVariable(_);
console.assert(result3 === "spoonparentScopelocallocal", "assert 4");

parentScopeVariable = usesParentVariable("spoon");
console.assert(parentScopeVariable === _, "assert 5");

```

[TOP](#event-loop)

---

## /exercise-2.js

* uncaught error
* [review source](./exercise-2.js)

```txt
TypeError: closure1 is not a function
    at Object.<anonymous> ( [ ... ] /exercises/3-closed-variables/exercise-2.js:8:17)
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
const closesParentParamter = (parentParam) => {
  // write me!
};

const closure1 = closesParentParamter("|");
const closure2 = closesParentParamter("~");

const result1 = closure1("+(=)+");
console.assert(result1 === "+|(|=|)|+", "assert 1");

const result2 = closure2("+(=)+");
console.assert(result2 === "+~(~=~)~+", "assert 2");

const result3 = closure1("abc");
console.assert(result3 === _, "assert 3");

const result4 = closure2("xyz");
console.assert(result4 === _, "assert 4");


const closure3 = closesParentParamter(_);
const result5 = closure3(_);
console.assert(result5 === "--0--1--", "assert 5");

const closure4 = closesParentParamter(_);
const result6 = closure4(_);
console.assert(result6 === "--1--0--", "assert 6");

```

[TOP](#event-loop)

