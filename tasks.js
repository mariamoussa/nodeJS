
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}

const fs = require("fs");

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  var t = text.replace("\n", "");
  t = t.trim();
  t = t.split(" ");
  if (t[0] === 'quit' || t[0] === 'exit') {
    quit();
  } else if (t[0] === 'hello') {
    hello(t[1]);
  } else if (t[0].trim() === 'help') {
    help();
  } else if (t[0].trim() === 'list') {
    displaytask(tasks);
  } else if (t[0] === "add") {
    t.shift();
    add(t.join(" "));
  } else if (t[0] === "remove") {
    remove(t[1]);
  } else if (t[0] === "edit") {
    edit(t.slice(1, 2).join(' '), t.slice(2).join(' '));
  } else if (t[0] === "check" && t[1]===null) {
    console.log("error please enter a number to check");
  } else if (t[0] === "check" && t[1] != null) {
    check(tasks, t[1]);
    displaytask(tasks);
  } else if (t[0] === "uncheck" && t[1]===null) {
    console.log("error please enter a number to check");
  } else if (t[0] === "uncheck" && t[1] != null) {
    uncheck(tasks, t[1]);
    displaytask(tasks);
  }else if (t[0] === "node" && t[1] === "tasks.js" && t[2] === null) {
    save();
    load();
  }else {
    unknownCommand(text);
  }
}
//text.trim() === 'quit'


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(x) {
  if (x) {
    console.log('hello ' + x + '!');
  } else {
    console.log('hello!');
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}

/**
 * Returns all the possible commands
 *
 * @returns {void}
 */
function help() {
  console.log('1- hello: You can add a person name after hello so you greet them');
  console.log('2- quit');
  console.log('3- exit');
  console.log('4- list: It list all the available commands');
  console.log('5- add: It adds a task');
  console.log('6- remove: It removes a task');
  console.log('7- check N: Check a task by adding its number(ex: check 1, checks the task 1)');
  console.log('8- uncheck N: uncheck a task by adding its number(ex: uncheck 1, unchecks the task 1)');
}

var tasks = [
  { name: "t1", done: true },
  { name: "t2", done: false }
];

// function list() {
//   for (var i = 0; i < tasks.length; i++) {
//     console.log(i + 1 + " - " + tasks[i]);
//   }
// }

function add(task) {
  if (task === '') {
    console.log("Task undefined");
  } else {
    tasks.push(task);
    for (var i = 0; i < tasks.length; i++) {
      console.log(i + 1 + " - " + tasks[i]);
    }
  }
}

function remove(text) {
  if (text < 1 || text > tasks.length) {
    console.log("Task not found, the task number you entered doesn't exist!")
  }

  if (text) {
    tasks.splice(text - 1, 1)
  }
  else {
    tasks.splice(tasks.length - 1, 1)
  }

  for (var j = 0; j < tasks.length; j++) {
    console.log(j + 1 + " - " + tasks[j]);
  }
}

function edit(text, editText) {
  if (text === '' && editText === '') {
    console.log("please enter a task number:")
  } else if (isNaN(text)) {
    tasks[tasks.length - 1] = text + ' ' + editText
  } else {
    tasks[text - 1] = editText;
  }

  for (var k = 0; k < tasks.length; k++) {
    console.log(k + 1 + " - " + tasks[k]);
  }
}

function check(tasks, i) {
    tasks[i - 1].done = true;
}

function uncheck(tasks, i) {
  tasks[i - 1].done = false;
}

function displaytask(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done === true) {
      console.log("[???] " + tasks[i].name);
    } else {
      console.log("[ ] " + tasks[i].name);
    }
  }
}

function save() {
  var jsondata = JSON.stringify(tasks);
  try {
    fs.writeFileSync("database.json", jsondata);
    console.log("JSON data is saved.");
  } catch (error) {
    console.error(err);
  }
}

function load() {
  fs.readFile("database.json", "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    tasks = JSON.parse(data.toString());
  });
}

// The following line starts the application
startApp("Maria Moussa")
