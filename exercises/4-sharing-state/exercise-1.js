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
