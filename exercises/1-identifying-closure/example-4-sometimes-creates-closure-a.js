const doesItClose = (func, arg) => {
  const returnVal = func(arg);
  const returnedAFunction = typeof returnVal === 'function';
  const returnedArgument = arg === returnVal;

  const createsAClosure = returnedAFunction && !returnedArgument;
  return createsAClosure;
}

const sometimes1 = (x) => {
  if (typeof x === "function") {
    return x;
  } else {
    return function () {
      console.log(x)
    };
  }
}

const whenPassed4 = doesItClose(sometimes1, 4);
const resultFrom4 = sometimes1(4);
resultFrom4();

const whenPassedItself = doesItClose(sometimes1, sometimes1);
const resultFromItself = sometimes1(sometimes1);
resultFromItself();

const bye = () => console.log(x);
const whenPassedAFunction = doesItClose(sometimes1, bye);
const hi = () => console.log(x);
const resultFromFunction = sometimes1(hi);
resultFromFunction();
