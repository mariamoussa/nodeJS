
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
  }
  else if (t[0] === 'hello') {
    hello(t[1]);
  }
  else if (t[0].trim() === 'help') {
    listCommands();
  }else if(t[0].trim() === 'list'){
    list();
  }else if (t[0] === "add") {
    t.shift();
    add(t.join(" "));
  }else if (t[0] === "remove") {
    remove(t[1]);
  }
  else {
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
    console.log('hello ' + x+ '!');
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
function listCommands() {
  console.log('1- hello: You can add a person name after hello so you greet them');
  console.log('2- quit');
  console.log('3- exit');
  console.log('4- list: It list all the available commands');
  console.log('5- add: It adds a task');
  console.log('6- remove: It removes a task');

}

var tasks = ["t1", "t2"];

function list() {
  for (var i = 0; i < tasks.length; i++) {
    console.log(i + 1 + " - " + tasks[i]);
  }
}

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
    console.log("Task not found, select a proper task number:")
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

// The following line starts the application
startApp("Maria Moussa")
