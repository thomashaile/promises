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
