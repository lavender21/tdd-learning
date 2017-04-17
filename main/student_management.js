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

function convertToStudentObject(studentInfoStr) {
    let arr = studentInfoStr.split(',');
    let arrScore = arr.slice(4,arr.length);
    let reg = /^([\u4e00-\u9fa5_a-zA-Z0-9]+[,]){4}(([\u4e00-\u9fa5_a-zA-Z0-9]+):[\d]+[,])*(([\u4e00-\u9fa5_a-zA-Z0-9]+):[\d]+)$/;
    if (!reg.test(studentInfoStr)){
        console.error('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：');
        return null;
    }
    let studentObj = {name:arr[0],id:arr[1],nation:arr[2],class:arr[3],score:[],average:0,middleScore:0};
    studentObj.score = arrScore.map(item => {
        let obj = {};
        obj[item.split(':')[0]] = Number(item.split(':')[1]);
        return obj;
    });
    return studentObj;
}

function convertToStudentIdList(studentIdStr) {
    let reg = /^(\d+[,])*(\d+)$/;
    if (!reg.test(studentIdStr)){
        console.error('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
        return false;
    }
    return studentIdStr.split(',');
}

function calculateStudentScore(studentObj) {
    studentObj.score.forEach(item => {
       studentObj.sumScore += item[Object.keys(item)];
    });
    studentObj.average = Number((studentObj.sumScore/studentObj.score.length).toFixed(2));
    return studentObj;
}

function generateStudentInfo(input) {
    let studentObj = convertToStudentObject(input);
    if (!studentObj){
        return false;
    }
    if (isStudentExist(studentObj.id)){
        console.log('改学生信息已经存在');
        return false;
    }
    allStudentInfo[studentObj.id] = calculateStudentScore(studentObj);
    console.log(`学生${studentObj.name}的成绩被添加`);
    return true;
}

function filterStudentId(studentIdArr) {
    return studentIdArr.filter(item => {
        if (!isStudentExist(item)){
            console.error(`不存${item}的信息`);
        }
        return isStudentExist(item);
    });
}

function getClassInfoList(klassId) {
    let klassList = {};
    for (let id in allStudentInfo) {
        if (!klassList.hasOwnProperty(allStudentInfo[id].class)) {
            klassList[allStudentInfo[id].class] = [];
        }
        klassList[allStudentInfo[id].class].push(allStudentInfo[id]);
    }
    for(let classId in klassList){
        let average = 0;
        let middleScore = [];
        let klassScore = klassList[classId].map(item => {
            let sumScore = 0;
            item.score.forEach(val => {
                sumScore += val[Object.keys(val)];
            });
            item.average = sumScore / item.score.length;
            item.sumScore = sumScore;
            average += sumScore;
            middleScore.push(Number(sumScore));
            return item;
        });
        let middleItem = middleScore.sort()[parseInt(middleScore.length/2)];
        klassList[classId] = Object.assign({},{studentList:klassScore},{average:average/klassScore.length,middleScore:middleItem})
    }
    return klassList.hasOwnProperty(klassId)?klassList[klassId]:null;
}

function calculateScore(studentList) {
    let klassId = allStudentInfo[studentList[0]].class;
    let klassInfo = getClassInfoList(klassId);
    let scoreList = klassInfo.studentList.filter(item => {
       return studentList.indexOf(item.id) > -1;
    });
    return Object.assign({}, {studentList:scoreList,
        average:klassInfo.average,middleScore:klassInfo.middleScore});
}

function printStudentScore(scoreObj) {
    let subjectStr = "";
    scoreObj.studentList[0].score.forEach(item => {
        subjectStr += Object.keys(item)+'|';
    });
    let scoreListStr = "";
    scoreObj.studentList.forEach(item => {
       scoreListStr += item.name + '|';
       item.score.forEach(val => {
          scoreListStr += val[Object.keys(val)]+'|';
       });
       scoreListStr += item.average + '|' + item.sumScore + '\n';
    });
    let result = `成绩单\n姓名|${subjectStr}平均分|总分\n`+
        `========================\n${scoreListStr}========================\n`+
        `全班总分平均数：${scoreObj.average}\n全班总分中位数：${scoreObj.middleScore}\n`;
    console.log(result);
}

function generateStudentScore(studentIdStr) {
    let studentIdArr = convertToStudentIdList(studentIdStr);
    if (!studentIdArr){
        return false;
    }
    let filterStudentIdArr = filterStudentId(studentIdArr);
    if (filterStudentIdArr.length === 0){
        return false;
    }
    let scoreObj = calculateScore(filterStudentIdArr);
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

