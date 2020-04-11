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
