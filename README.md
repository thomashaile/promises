# Promises


## Index

* [How to Study](#how-to-study)
  * [index.html](#indexhtml)
  * [server.js](#serverjs)
  * [npm run start](#npm-run-start)
* [What to Study](#what-to-study)
* [Helpful Links](#helpful-links)

---

## How to Study

All of the exercises & examples in this repository are plain JS files that will run anywhere ES6 JavaScript will run.  The simplest way to study the code in this repository is to run the files in node, using the terminal and debugger built into VSC. Or ...

### `index.html`

There is an `index.html` at the top level of this repository.  To step through the code in your browser's debugger or JS Tutor, `index.html` with `liveServer`.  The live page will have a button for each javascript file in this repository.  There will be 3 buttons per file:

1. The first button will simply run your code in the browser, logging any results to the console.
1. The second button will inject a `debugger` statement so you can step through your code in your browser's debugger
1. The third button opens your code in JS Tutor

### `server.js`

It's also possible to open `index.html` in the browser by running the node server in this directory:

* `$ node server.js`

Once you see `Server running at http://localhost:3000/` logged to your console, you can open [https://localhost:3000](https://localhost:3000) in your browser to study your exercises.  This server will also keep a log of every exercise you study in the browser and how you studied it in `./server-logs`.

### `npm run start`

Running the server with `$ npm run start` is _almost_ the same as running `$ node server.js`.  Can you figure out the difference?

Happy studying!

[TOP](#promises)

---

## What to Study

This repository contains 2 folders of examples, and 1 folder of exercises. You can [check them out right here](./exercises).

[TOP](#promises)
