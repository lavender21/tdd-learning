let allStudentInfo = {};
const printer = require('./printModule');
const parser = require('./parseModule');

function isStudentExist(studentId) {
    return allStudentInfo.hasOwnProperty(studentId);
}

function getAllStudentInfo() {
    return allStudentInfo;
}

function calculateStudentScore(student) {
    let sumScore = 0;
    student.score.forEach(item => {
        sumScore += item[Object.keys(item)];
    });
    let average = Number((sumScore / student.score.length).toFixed(2));
    return Object.assign({}, student, {average: average, sumScore: sumScore});
}

function getStudentInfo(studentIdArr) {
    return studentIdArr.filter(item => {
        return isStudentExist(item);
    }).map(item => {
        return allStudentInfo[item];
    });
}

function calculateClassScore() {
    if (allStudentInfo.length === 0) {
        return false;
    }
    let classAverage = 0;
    let sumScoreList = [];
    for (let item in allStudentInfo) {
        classAverage += allStudentInfo[item].sumScore;
        sumScoreList.push(allStudentInfo[item].sumScore);
    }
    sumScoreList = sumScoreList.sort();
    let middleScore = 0;
    if (sumScoreList.length % 2 === 0) {
        let left = sumScoreList[sumScoreList.length / 2 - 1];
        let right = sumScoreList[sumScoreList.length / 2];
        middleScore = (left + right) / 2;
    } else {
        middleScore = sumScoreList[Math.floor(sumScoreList.length / 2)];
    }
    return {
        average: classAverage / Object.keys(allStudentInfo).length,
        middleScore: middleScore
    };
}

function generateStudentInfo(input) {
    if (!parser.isValidStudentInput(input)) {
        printer.printStudentError();
        return false;
    }
    let student = parser.convertToStudentObject(input);
    if (isStudentExist(student.id)) {
        printer.printStudentWarning();
        return false;
    }
    getAllStudentInfo()[student.id] = calculateStudentScore(student);
    printer.printStudentSuccess(student);
    return true;
}

function generateStudentScore(input) {
    if (!parser.isValidStudentIdInput(input)) {
        printer.printStudentIdError();
        return false;
    }
    let studentIdArr = parser.convertToStudentIdList(input);
    let classScore = calculateClassScore();
    let studentList = getStudentInfo(studentIdArr);
    if (!classScore || studentList.length === 0) {
        return false;
    }
    let scoreObj = Object.assign({}, classScore, {studentList: studentList});
    printer.printStudentScore(scoreObj);
    return true;
}

module.exports = {
    generateStudentInfo:generateStudentInfo,

    generateStudentScore:generateStudentScore
};