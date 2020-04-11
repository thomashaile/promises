// functions can return functions that were passed as arguments

const argFunc = () => { };

const returnsOldFunction = (x) => { return x }; // does not create a closure

const sameFunctionAsArgument = returnsOldFunction(argFunc);
console.assert(sameFunctionAsArgument === argFunc,
  'no closure created, the returned function was declared outside of "returnsOldfunction"');;


const returnsNewFunction = (x) => {
  return function () { console.log(x) };
}
const newFunction = returnsNewFunction("hi!");
console.assert(newFunction !== argFunc,
  'a closure is created! the returned function was declared inside of "returnsNewFunction"');

// study this function call in JS Tutor to see closure in action:
newFunction();
