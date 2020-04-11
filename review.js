const fs = require("fs");

const REPO_NAME = 'event-loop';
const DIR = './exercises'
  + (process.argv[2]
    ? process.argv[2]
    : '');
const DIRNAME_REPLACER = ' [ ... ] ';


console.log('\n--- loading ' + DIR + '/index.json ---\n');

// INDEX will be modified by reference
const INDEX = require(DIR + '/index.json');
INDEX.unsortedLogs = [];

console.log('\n--- generating empty reports ---\n');

// by side effect
const addReports = (virDir) => {
  virDir.report = { status: -1 };

  if (virDir.dirs) {
    virDir.dirs.forEach(dir => {
      addReports(dir);
    });
  };

  if (virDir.files) {
    // virDir.report.files = {};
    virDir.report.files = [];
    virDir.files.forEach(file => {
      // virDir.report.files[file] = { log: [], evaluated: false };
      const fileReport = {
        status: -1,
        logs: [],
        evaluated: false,
        isExample: file.isExample,
        path: file.path
      };
      virDir.report.files.push(fileReport);
    });
  };

  return virDir;
};

addReports(INDEX);
// console.log(JSON.stringify(INDEX, null, '  '));

console.log('\n--- generating report map ---\n');

const generateReportMap = (virDir) => {
  const relativeDirMap = {};

  if (virDir.dirs) {
    virDir.dirs.forEach(subDir => {
      Object.assign(relativeDirMap, generateReportMap(subDir));
    });
  };

  if (virDir.files) {
    // Object.assign(relativeDirMap, virDir.report.files);
    virDir.report.files.forEach(fileReport => {
      relativeDirMap[fileReport.path] = fileReport;
    });
  };

  const absoluteDirMap = {};

  Object.keys(relativeDirMap).forEach(key => {
    const newKey = virDir.path + key;
    const mappedReport = relativeDirMap[key];
    absoluteDirMap[newKey] = mappedReport;
  });

  return absoluteDirMap;
};

const reportMap = generateReportMap(INDEX);
// console.log(JSON.stringify(reportMap, null, '  '));

// // mini test
// reportMap[Object.keys(reportMap)[0]].push('hi');
// console.log(JSON.stringify(reportMap, null, '  '));
// console.log(JSON.stringify(INDEX, null, '  '));



console.log('\n--- evaluating .js files ---\n');
// access reportMap by global scope
// todo: infinite loop & interval guard
// todo: report thrown primitives

INDEX.lastEvaluation = (new Date()).toJSON();

const relPathFromCallStackLine = (callStackLine) => {
  const lineChar = callStackLine.replace(/^[^(]*\(/, "")
    .replace(/\)[^(]*$/, "")
    .split(/\)[^(]*\(/).join('')
  const filePath = lineChar.split(':')[0];
  const relPath = filePath.replace(__dirname, '');
  // console.log(' = = ', relPath)
  return relPath;
};

const findMapKey = (err) => {
  if (err instanceof Error && err.stack.includes('SyntaxError:')) {
    return err.stack.split('\n')[0]
      .replace(__dirname, '')
      .split(':')[0];
  };

  const reversedStack = err.stack.split('\n').slice(1).reverse();

  const mapKey = reversedStack
    .map(line => relPathFromCallStackLine(line))
    .map(path => path.split(':')[0])
    .find(possibleKey => reportMap[possibleKey]);

  return mapKey;
};

const nativeConsoleAssert = console.assert;
console.assert = function () {
  const args = Array.from(arguments);
  nativeConsoleAssert(...args);

  const pseudoErr = {};
  Error.captureStackTrace(pseudoErr);
  const mapKey = findMapKey(pseudoErr);
  // crude, good enough
  const async = pseudoErr.stack.includes('at Timeout.');
  const assertionReport = {
    async,
    status: args[0] ? 2 : 3,
    assertion: args[0],
    messages: args.slice(1)
  };
  try {
    reportMap[mapKey].logs.push(assertionReport);
  } catch (err) {
    INDEX.unsortedLogs.push(assertionReport);
  }
};

// capture caught errors, but don't include them in interpretation
const nativeConsoleError = console.error;
console.error = function caughtError() {
  const args = Array.from(arguments);
  nativeConsoleError(...args);

  const caughtReport = {
    caught: true,
    status: 1,
    messages: [...args],
  };
  let stacked;
  if (args[0] instanceof Error || (args[0] && (typeof args[0].stack === 'string'))) {
    stacked = args[0];
    caughtReport.error = args[0].name + ': ' + args[0].message;
  } else {
    stacked = {};
    Error.captureStackTrace(stacked);
  };
  caughtReport.stack = stacked.stack.split(__dirname).join(DIRNAME_REPLACER);
  caughtReport.async = stacked.stack.includes('at Timeout.');
  const mapKey = findMapKey(stacked);
  try {
    reportMap[mapKey].logs.push(caughtReport);
  } catch (err) {
    INDEX.unsortedLogs.push(caughtReport);
  }
};

const reportThrown = (thrown, async) => {
  // console.log(thrown);

  const thrownReport = { async };
  if (thrown instanceof Error) {
    if (thrown.stack.includes('SyntaxError:')) {
      thrownReport.status = 6;
    } else {
      thrownReport.status = 5;
    };

    thrownReport.error = thrown.name + ': ' + thrown.message;
    thrownReport.stack = thrown.stack.split(__dirname).join(DIRNAME_REPLACER);
    const mapKey = findMapKey(thrown);
    // console.log('---------', thrownReport.stack)
    try {
      reportMap[mapKey].logs.push(thrownReport);
    } catch (err) {
      INDEX.unsortedLogs.push(thrownReport);
    }
    return;
  };

  // configured to work with excessive iteration & interval warnings
  thrownReport.status = 4;
  thrownReport.warning = (thrown && thrown.warning)
    ? thrown.warning
    : thrown;
  if (thrown && thrown.stack) {
    const pseudoErr = {};
    Error.captureStackTrace(pseudoErr);
    thrownReport.stack = pseudoErr.stack.split(__dirname).join(DIRNAME_REPLACER);

    const mapKey = findMapKey(pseudoErr);
    try {
      reportMap[mapKey].logs.push(thrownReport);
    } catch (err) {
      INDEX.unsortedLogs.push(thrownReport);
    }
  } else {
    INDEX.unsortedLogs.push(thrownReport);
  };
};

process.on('uncaughtException', err => {
  reportThrown(err, true);
});

const evaluate = (mapObj) => {
  for (let path in mapObj) {
    try {
      mapObj[path].source = fs.readFileSync(__dirname + path, 'utf-8');
      mapObj[path].evaluated = true;
      require(__dirname + path);
    } catch (err) {
      // if (typeof err !== 'object' || err === null) {
      //   const pseudoErr = {
      //     name: err,
      //     message: ''
      //   };
      //   Error.captureStackTrace(pseudoErr);
      //   reportThrown(pseudoErr, false);
      // };
      reportThrown(err, false);
    };
  };
};

evaluate(reportMap);


console.log('\n--- ... waiting for the event loop to clear ---\n');

process.on('exit', (exitCode) => {
  console.log('\n--- interpreting reports ---\n');
  summarizeReports(INDEX);

  // // nice for eventually gathering data on students' work
  // console.log('\n--- writing report.json ---\n');
  // fs.writeFileSync(DIR + '/report.json', JSON.stringify(INDEX, null, '  '));

  console.log('\n--- generating REVIEW.md\'s ---\n');

  generateReviews(INDEX);
  writeReviews(INDEX, __dirname);

  console.log(`exiting with code: ${exitCode}`);
});



const summarizeReports = (virDir) => {

  virDir.report.statusMinusExamples = 0;

  if (virDir.dirs) {
    virDir.dirs.forEach(subDirReport => {
      summarizeReports(subDirReport);
      if (subDirReport.report.status > virDir.report.status) {
        virDir.report.status = subDirReport.report.status
        if (!virDir.isExample) {
          virDir.report.statusMinusExamples = subDirReport.report.status;
        }
      };
    });
  };

  if (virDir.report.files) {
    virDir.report.files.forEach(fileReport => {
      fileReport.status = fileReport.logs
        .reduce((greatest, next) => next.status > greatest
          ? next.status : greatest, 0);
      if (fileReport.status > virDir.report.status) {
        virDir.report.status = fileReport.status;
        if (!fileReport.isExample) {
          virDir.report.statusMinusExamples = fileReport.status;
        }
      };
    });
  };

};

const interpret = (value) =>
  value === -1 ? 'not evaluated'
    : value === 0 ? 'no status'
      : value === 1 ? 'caught error'
        : value === 2 ? 'pass'
          : value === 3 ? 'fail'
            : value === 4 ? 'warning'
              : value === 5 ? 'uncaught error'
                : value === 6 ? 'syntaxError'
                  : 'unknown status';


const generateTableOfContents = (virDir, path, indent, isExampleDir) => {
  indent = indent || '';
  path = path || '';

  const fileList = virDir.report.files
    ? virDir.report.files
      .map(fileReport => {
        const anchor = fileReport.path
          .split('.').join('')
          .split('/').join('');
        const reviewPath = path
          ? '.' + path + '/REVIEW.md'
          : '';
        const exampleText = (fileReport.isExample || isExampleDir)
          ? ' example -' : '';
        return `${indent}* [${fileReport.path}](${reviewPath}#${anchor}) -${exampleText} ${interpret(fileReport.status)}\n`;
      })
      .reduce((list, li) => list + li, '')
    : '';


  const dirList = virDir.dirs
    ? virDir.dirs
      .map(subDir => {
        const subIndex = generateTableOfContents(subDir, path + subDir.path, indent + '  ', subDir.isExample);
        const reviewPath = path + subDir.path + '/REVIEW.md';
        const exampleText = (subDir.isExample || isExampleDir)
          ? ' example -' : '';
        return `${indent}* [${subDir.path}](.${reviewPath}) -${exampleText} ${interpret(subDir.report.statusMinusExamples)}`
          + (subIndex ? '\n' + subIndex : '');
      })
      .reduce((list, li) => list + li, '')
    : '';


  return fileList
    + dirList;
}

const generateFileSectionMd = (fileReport) => {

  const divider = '---';

  const exampleText = fileReport.isExample
    ? ' example -' : '';
  const header = `## ${fileReport.path}`;
  const status = `*${exampleText} ${interpret(fileReport.status)}`;
  const sourceLink = `* [review source](.${fileReport.path})`;

  const renderedReport = fileReport.logs
    .map(entry => {
      const isAsync = entry.async
        ? '(async) ' : '';
      if (entry.hasOwnProperty('error')) {
        const isCaught = entry.caught
          ? '(caught) ' : '';
        return `${isCaught}${isAsync}${entry.stack}`;
      };
      if (entry.hasOwnProperty('warning')) {
        return `warning ${isAsync}: ` + entry.warning;
      };
      if (entry.hasOwnProperty('assertion')) {
        const assertion = Boolean(entry.assertion)
          ? `+ PASS ${isAsync}: `
          : `- FAIL ${isAsync}: `;
        const message = entry.messages
          .join(', ');
        return assertion + message;
      };
      return '';
    })
    .reduce((all, next) => all + next + '\n', '');

  const report = renderedReport
    ? '```txt\n' + renderedReport + '```\n\n'
    : '';

  const source = fileReport.source
    ? '```js\n' + fileReport.source + '\n```\n\n'
    : '';

  const topLink = '[TOP](#' + REPO_NAME + ')';

  return divider + '\n\n'
    + header + '\n\n'
    + status + '\n'
    + sourceLink + '\n\n'
    + report
    + source
    + topLink + '\n';
};


const generateReviews = (virDir, isNested) => {

  if (virDir.dirs) {
    virDir.dirs
      .forEach(subDir => generateReviews(subDir, true));
  }

  const exampleText = virDir.isExample
    ? ' example -' : '';
  const top = `# ${REPO_NAME} \n\n`
    + `## ${virDir.path}\n\n`
    + `>${exampleText} ${interpret(virDir.report.status)}: ${(new Date(INDEX.lastEvaluation)).toLocaleString()} \n\n`;


  const tableOfContents = generateTableOfContents(virDir);

  const index = (isNested ? '[../REVIEW.md](../REVIEW.md)\n\n' : '')
    + tableOfContents;

  const fileSections = !virDir.report.files
    ? ''
    : virDir.report.files
      .map(fileReport => generateFileSectionMd(fileReport))
      .reduce((body, section) => body + section + '\n', '');

  const newREVIEW = top
    + index + '\n'
    + fileSections;

  virDir.review = newREVIEW;

};


const writeReviews = (virDir, basePath) => {
  fs.writeFileSync(basePath + virDir.path + '/REVIEW.md', virDir.review);
  if (virDir.dirs) {
    virDir.dirs.forEach(subDir => {
      writeReviews(subDir, basePath + virDir.path);
    });
  };
};



