// new Promise creates ... a new promise
// the constructor takes one argument:
//  a function, called the executor
// the executor is called immediately


const executor1 = () => {
  const hello = 'from executor 1';
  console.log(hello);
  return 'executor return values are ignored';
}
const promise1 = new Promise(executor1);


const executor2 = () => {
  const hello = 'from executor 2';
  console.log(hello);
  return 'executor return values are ignored';
}
const promise2 = new Promise(executor2);
