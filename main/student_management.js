const dll = require('./dllModule');
const printer = require('./printModule');
const parser = require('./parseModule');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function exit() {
    process.exit();
}
const routerList = {
    '1': {status: 'add', prompt: printer.printStudentPrompt},
    '2': {status: 'search', prompt: printer.printStudentIdPrompt},
    '3': {status: 'exit',prompt: exit},
    '*': {status: 'menu', prompt: printer.printMenu}
};
const routerStatusList = {
    'menu': {action: printer.printMenu},
    'add': {action: generateStudentInfo},
    'search': {action: generateStudentScore},
};
let routeStatus = 'menu';
printer.printMenu();
rl.on('line', mainMenu);

function mainMenu(input) {
     if (routerList.hasOwnProperty(input)) {
         routeStatus = routerList[input].status;
         routerList[input].prompt();
     } else {
         routerStatusList[routeStatus].action(input);
     }
}

function generateStudentInfo(input) {
    if (!parser.isValidStudentInput(input)) {
        printer.printStudentError();
        return false;
    }
    let student = parser.convertToStudentObject(input);
    if (dll.isStudentExist(student.id)) {
        printer.printStudentWarning();
        return false;
    }
    dll.getAllStudentInfo()[student.id] = dll.calculateStudentScore(student);
    printer.printStudentSuccess(student);
    return true;
}

function generateStudentScore(input) {
    if (!parser.isValidStudentIdInput(input)) {
        printer.printStudentIdError();
        return false;
    }
    let studentIdArr = parser.convertToStudentIdList(input);
    let classScore = dll.calculateClassScore();
    let studentList = dll.getStudentInfo(studentIdArr);
    if (!classScore || studentList.length === 0) {
        return false;
    }
    let scoreObj = Object.assign({}, classScore, {studentList: studentList});
    printer.printStudentScore(scoreObj);
    return true;
}