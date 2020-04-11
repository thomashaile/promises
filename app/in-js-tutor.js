import Exercise from './exercise.js';

export default class InJsTutor extends Exercise {
  async inJsTutor() {
    try {
      const res = await fetch('.' + this.path.abs, {
        headers: {
          study: 'in Js Tutor'
        }
      });
      if (res.status != 200) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      const code = await res.text();
      const encodedJST = encodeURIComponent(code);
      const sanitizedJST = encodedJST
        .replace(/\(/g, '%28').replace(/\)/g, '%29')
        .replace(/%09/g, '%20%20');
      const jsTutorURL = "http://www.pythontutor.com/live.html#code=" + sanitizedJST + "&cumulative=false&curInstr=2&heapPrimitives=false&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false";
      `http://www.pythontutor.com/live.html#code=function%20reverse%28str%29%20%7B%0A%20%20return%20str.split%28''%29.reverse%28%29.join%28''%29%3B%0A%7D%0A%0Aconst%20esrever%20%3D%20reverse%28%22reverse%22%29%3B%20%0Aconsole.assert%28esrever%20%3D%3D%3D%20%22esrever%22,%20%22fdsa%22%29%3B%20%0Aconsole.assert%28esrever%20%3D%3D%3D%20%22esrever%22,%20%22dsaf%22%29%3B%20%0Aconsole.error%28new%20Error%283%29%29%20%0Aconsole.log%28%7B%20e%3A%203,%20x%3A%20null,%20y%3A%20undefined,%20f%3A%20%5Bnull,%20undefined,%203%5D%20%7D%29%20%0Aconsole.log%282,%20%22%602%60%22,%20true%29%20%0Aconsole.log%28undefined,%20null%29%3B%20%0Aconsole.log%28reverse%29%3B%20%0Aconsole.log%28%5B1,%202,%203,%204,%205,%203,%206,%205,%204,%203%5D%29%20%0A4%3B&cumulative=false&curInstr=2&heapPrimitives=false&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false`;
      console.log('\n--- in JS Tutor: ' + this.path.rel + ' ----');
      window.open(jsTutorURL, '_blank');
    } catch (err) {
      console.error(err);
    };
  }

  render() {
    const container = super.render();

    const inJsTutorButton = document.createElement('button');
    inJsTutorButton.innerHTML = 'in JS Tutor';
    inJsTutorButton.onclick = this.inJsTutor.bind(this);

    container.appendChild(inJsTutorButton);

    return container;
  }
}
