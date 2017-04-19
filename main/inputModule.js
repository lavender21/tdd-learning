const readline = require('readline');
const printer = require('./printModule');
const dll = require('./dllModule');

const routerList = {
    '1': {status: 'add', prompt: printer.printStudentPrompt},
    '2': {status: 'search', prompt: printer.printStudentIdPrompt},
    '3': {status: 'exit',prompt: exit},
    '*': {status: 'menu', prompt: printer.printMenu}
};
const routerStatusList = {
    'menu': {action: printer.printMenu},
    'add': {action: dll.generateStudentInfo},
    'search': {action: dll.generateStudentScore},
};
let routeStatus = 'menu';

function mainMenu(input) {
    if (routerList.hasOwnProperty(input)) {
        routeStatus = routerList[input].status;
        routerList[input].prompt();
    } else {
        routerStatusList[routeStatus].action(input);
    }
}

function exit() {
    process.exit();
}

function runReadline() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    printer.printMenu();
    rl.on('line', mainMenu);
}

module.exports = runReadline;