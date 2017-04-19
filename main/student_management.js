/**
 * Created by lavender on 17-4-14.
 */
let allStudentInfo = {};

function printMenu() {
    console.log(`1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`);
}

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
    let average = 0;
    student.score.forEach(item => {
       sumScore += item[Object.keys(item)];
    });
    average = Number((sumScore/student.score.length).toFixed(2));
    return Object.assign({},student,{average:average,sumScore:sumScore});
}

function generateStudentInfo(input) {
    if (!isValidStudentInput(input)){
        console.error('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：');
        return false;
    }
    let student = convertToStudentObject(input);
    if (isStudentExist(student.id)){
        console.log('改学生信息已经存在');
        return false;
    }
    allStudentInfo[student.id] = calculateStudentScore(student);
    console.log(`学生${student.name}的成绩被添加`);
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

function printStudentScore(scoreObj) {
    console.log(scoreObj);
    let subjectStr = scoreObj.studentList[0].score.map(item => {
        return Object.keys(item);
    }).join('|');
    let scoreListStr = "";
    scoreObj.studentList.forEach(item => {
       scoreListStr += item.name + '|';
       item.score.forEach(val => {
          scoreListStr += val[Object.keys(val)]+'|';
       });
       scoreListStr += item.average + '|' + item.sumScore + '\n';
    });
    let result = `成绩单\n姓名|${subjectStr}|平均分|总分\n`+
        `========================\n${scoreListStr}========================\n`+
        `全班总分平均数：${scoreObj.average}\n全班总分中位数：${scoreObj.middleScore}\n`;
    console.log(result);
}

function generateStudentScore(input) {
    if (!isValidStudentIdInput(input)){
        console.error('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
        return false;
    }
    let studentIdArr = convertToStudentIdList(input);
    let classScore = calculateClassScore();
    let studentList = getStudentInfo(studentIdArr);
    if (!classScore || studentList.length === 0){
        return false;
    }
    let scoreObj = Object.assign({},classScore,{studentList:studentList});
    printStudentScore(scoreObj);
    return true;
}

const readline = require('readline');

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
let flag = 'menu';
printMenu();
rl.on('line', (input) => {
    switch (flag){
        case 'menu':
            switch (input) {
                case '1':
                    flag = 'add';
                    console.log('\n请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交（按*返回上一级）：\n');
                    break;
                case '2':
                    flag = 'search';
                    console.log('\n请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交（按*返回上一级）：\n');
                    break;
                case '3':
                    rl.close();
                    break;
                default:
                    printMenu();
                    break;
            }
            break;
        case 'add':
            if ( input === '*' || generateStudentInfo(input)){
                flag = 'menu';
                printMenu();
            }
            break;
        case 'search':
            if ( input === '*' || generateStudentScore(input)){
                flag = 'menu';
                printMenu();
            }
            break;
    }
    rl.prompt();
});

