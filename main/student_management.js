const dll = require('./dllModule');
const printer = require('./printModule');
const parser = require('./parseModule');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let flag = 'menu';
printer.printMenu();
rl.on('line', (input) => {
    switch (flag) {
        case 'menu':
            switch (input) {
                case '1':
                    flag = 'add';
                    printer.printStudentPrompt();
                    break;
                case '2':
                    flag = 'search';
                    printer.printStudentIdPrompt();
                    break;
                case '3':
                    rl.close();
                    break;
                default:
                    printer.printMenu();
                    break;
            }
            break;
        case 'add':
            const result1 = generateStudentInfo(input);
            if (input === '*' || result1) {
                flag = 'menu';
                printer.printMenu();
            }
            break;
        case 'search':
            const result2 = generateStudentScore(input);
            if (input === '*' || result2) {
                flag = 'menu';
                printer.printMenu();
            }
            break;
    }
});

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