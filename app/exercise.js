export default class Exercise {

  static populate(data, path) {
    path = path || data.path;
    if (data.files) {
      data.exercises = data.files
        .map(relPath => new this(relPath, path));
    };
    if (data.dirs) {
      data.dirs.forEach(subDir => this.populate(subDir, path + subDir.path));
    };
    return data;
    // by side effect
  }

  path = {
    rel: null,
    abs: null
  };

  constructor(file, dirPath) {
    if (file && typeof file.path !== 'string') {
      throw new TypeError('file.path must be a string');
    };
    this.path.rel = file.path;
    if (dirPath) {
      this.path.abs = dirPath + file.path;
    };
    this.isExample = file.isExample;
  }

  load(loadingMsg) {
    // async/await so they log in the correct order
    if (loadingMsg) {
      console.log(loadingMsg);
    };
    return import('..' + this.path.abs);
  }

  async get(studyType) {
    // async/await so they log in the correct order
    try {
      const res = await fetch('.' + this.path.abs, {
        headers: {
          study: studyType
        }
      });
      const code = await res.text();
      return code;
    } catch (err) {
      throw err;
    }
  }

  async run(inDebugger) {
    const mode = inDebugger ? 'in debugger' : 'run code';
    let code = null;
    try {
      const res = await fetch('.' + this.path.abs, {
        headers: {
          study: mode
        }
      });
      if (res.status != 200) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      code = await res.text();
    } catch (err) {
      console.error(err);
    };

    if (code === null) return;

    if (inDebugger) {
      console.log('\n--- in debugger: ' + this.path.rel + ' ----');
      const stepThrough = eval;
      const debuggered = "debugger; // injected by inDebugger\n\n" + code;
      stepThrough(debuggered);
    } else {
      console.log('\n--- running: ' + this.path.rel + ' ----');
      eval(code);
    };
    // PS. eval errors are uncaught to create VM links in the console
  }

  render() {
    const nameEl = document.createElement('text');
    // nameEl.innerHTML = this.isExample
    //   ? '(example) ' + this.path.rel + ' :'
    //   : this.path.rel + ' :';
    nameEl.innerHTML = this.path.rel + ' :';

    const runCodeEl = document.createElement('button');
    runCodeEl.innerHTML = 'run code';
    runCodeEl.onclick = this.run.bind(this, false);

    const inDebuggerEl = document.createElement('button');
    inDebuggerEl.innerHTML = 'in debugger';
    inDebuggerEl.onclick = this.run.bind(this, true);

    const container = document.createElement('text');
    container.appendChild(nameEl);
    container.appendChild(runCodeEl);
    container.appendChild(inDebuggerEl);

    return container;
  }
}

