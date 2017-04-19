/**
 * Created by lavender on 17-4-14.
 */
let allStudentInfo = {};


const printer = require('./printModule');

function isStudentExist(studentId) {
    return allStudentInfo.hasOwnProperty(studentId);
}

function isValidStudentInput(studentInfoStr) {
    let reg = /^([\u4e00-\u9fa5_a-zA-Z0-9]+[,]){4}(([\u4e00-\u9fa5_a-zA-Z0-9]+):[\d]+[,])*(([\u4e00-\u9fa5_a-zA-Z0-9]+):[\d]+)$/;
    if (!reg.test(studentInfoStr)) {
        return false;
    }
    return true;
}

function convertToStudentObject(studentStr) {
    let arr = studentStr.split(',');
    const name = arr[0];
    const id = arr[1];
    const nation = arr[2];
    const klass = arr[3];
    const scoreArr = arr.slice(4, arr.length).map(item => {
        let obj = {};
        let arr = item.split(':');
        obj[arr[0]] = Number(arr[1]);
        return obj;
    });
    return {name:name, id:id, nation: nation, klass:klass, score: scoreArr};
}

function isValidStudentIdInput(studentIdStr) {
    let reg = /^(\d+[,])*(\d+)$/;
    return reg.test(studentIdStr);
}

function convertToStudentIdList(studentIdStr) {
    return studentIdStr.split(',');
}

function calculateStudentScore(student) {
    let sumScore = 0;
    student.score.forEach(item => {
       sumScore += item[Object.keys(item)];
    });
    let average = Number((sumScore/student.score.length).toFixed(2));
    return Object.assign({},student,{average:average,sumScore:sumScore});
}

function generateStudentInfo(input) {
    if (!isValidStudentInput(input)){
        printer.printStudentError();
        return false;
    }
    let student = convertToStudentObject(input);
    if (isStudentExist(student.id)){
        printer.printStudentWarning();
        return false;
    }
    allStudentInfo[student.id] = calculateStudentScore(student);
    printer.printStudentSuccess(student);
    return true;
}

function getStudentInfo(studentIdArr) {
    return studentIdArr.filter(item => {
        return isStudentExist(item);
    }).map(item => {
        return allStudentInfo[item];
    });
}

function calculateClassScore() {
    if (allStudentInfo.length === 0){
        return false;
    }
    let classAverage = 0;
    let sumScoreList = [];
    for(let item in allStudentInfo){
        classAverage += allStudentInfo[item].sumScore;
        sumScoreList.push(allStudentInfo[item].sumScore);
    }
    sumScoreList = sumScoreList.sort();
    let middleScore = 0;
    if (sumScoreList.length % 2 === 0){
        let left = sumScoreList[sumScoreList.length/2-1];
        let right = sumScoreList[sumScoreList.length/2];
        middleScore = (left + right)/2;
    }else {
        middleScore = sumScoreList[Math.floor(sumScoreList.length/2)];
    }
    return {average:classAverage/Object.keys(allStudentInfo).length,
        middleScore:middleScore};
}

function generateStudentScore(input) {
    if (!isValidStudentIdInput(input)){
        printer.printStudentIdError();
        return false;
    }
    let studentIdArr = convertToStudentIdList(input);
    let classScore = calculateClassScore();
    let studentList = getStudentInfo(studentIdArr);
    if (!classScore || studentList.length === 0){
        return false;
    }
    let scoreObj = Object.assign({},classScore,{studentList:studentList});
    printer.printStudentScore(scoreObj);
    return true;
}

const readline = require('readline');

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
let flag = 'menu';
printer.printMenu();
rl.on('line', (input) => {
    switch (flag){
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
            if ( input === '*' || generateStudentInfo(input)){
                flag = 'menu';
                printer.printMenu();
            }
            break;
        case 'search':
            if ( input === '*' || generateStudentScore(input)){
                flag = 'menu';
                printer.printMenu();
            }
            break;
    }
    rl.prompt();
});

