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
