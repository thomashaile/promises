# Closure

Learn how to identify and debug closure.  Once that's under control, learn a how closure can be used to share state between functions

## Index

* [How to Study](#how-to-study)
  * [index.html](#indexhtml)
  * [server.js](#serverjs)
  * [npm run start](#npm-run-start)
* [What to Study](#what-to-study)
* [Reviewing Your Work](#reviewing-your-work)
  * [review.js](#reviewjs)
  * [REVIEW.md](#reviewmd)
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

[TOP](#closure)

---

## What to Study

This repository contains 4 folders of exercises. You can [check them out right here](./exercises/REVIEW.md).

[TOP](#closure)

---

## Reviewing your Work

It's not enough to pass the tests once and move on!

You will need to come back to review your exercises (all of them, not just these `:)`) over the coming months and year if you want to stay sharp and remember everything you've learned.

### `review.js`

To help you and your coaches review your exercises there is a file in this repository named `review.js`.  When you run it node from the top level of this folder (`$ node review.js`), it will evaluate each .js file in this repo and report the results for easy reviewing.

You should run this script before pushing your code so you and your coaches can more easily review your work directly from GitHub.  But you may also find it helpful to run the script at the end of each study session to help you pick up where you left off.

### `REVIEW.md`

> [REVIEW.md]](./exercises/REVIEW.md)

In each folder, the `review.js` script will create a new `REVIEW.md` file.  This file will contain:

* The name of the directory
* The status of the directory (pass, fail, error, ...)
* The date and time of the last evaluation
* Links to all files & sub-directories in the folder (including their status)
* A section for each .js file including
  * the name of the file
  * the status of the file (pass, fail, error, ...)
  * any assertions and/or errors
  * a copy of the code that was evaluated
  * a link to the most recent source code

[TOP](#closure)

---

## Helpful Links

<ul>
  <li>
    <a href='https://www.youtube.com/watch?v=CQqwU2Ixu-U' target='_blank'>Fun Fun Function: intro</a>
  </li>
  <li>
    <a href='https://www.youtube.com/watch?v=F3EsDDp4VXg' target='_blank'>Fun Fun Function: long code-along</a>
  </li>
  <li>
    <a href='https://www.youtube.com/watch?v=71AtaJpJHw0' target='_blank'>Techsith</a>
  </li>
  <li>
    <a href='https://www.youtube.com/watch?v=1JsJx1x35c0' target='_blank'>Beau from FCC</a>
  </li>
  <li>
    <a href='https://www.youtube.com/watch?v=-jysK0nlz7A' target='_blank'>Coding Train</a>
  </li>
  <li>
    <a href='https://javascript.info/closure' target='_blank'>javascript.info</a>
  </li>
</ul>


[TOP](#closure)
