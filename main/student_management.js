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
    let isValidArrScore = arrScore.every(item => {
        let arr = item.split(':');
        return arr.length === 2;
    });
    if (arr.length < 5){
        console.error('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：');
        return false;
    }
    if (!isValidArrScore){
        console.error('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：');
        return false;
    }
    let studentObj = {name:arr[0],id:arr[1],nation:arr[2],class:arr[3],score:[]};
    studentObj.score = arrScore.map(item => {
        let obj = {};
        obj[item.split(':')[0]] = Number(item.split(':')[1]);
        return obj;
    });
    return studentObj;
}

function convertToStudentIdList(studentIdStr) {
    if (studentIdStr.indexOf(',') === -1){
        console.error('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
        return false;
    }
    let idArr = studentIdStr.split(',');
    return idArr.filter(item => {
        if (!isStudentExist(item)){
            console.error(item+' 不存在该学生信息');
        }
       return isStudentExist(item);
    });
}

function addStudentInfo(studentObj) {
    if (!studentObj.hasOwnProperty('id')){
        return false;
    }
    allStudentInfo[studentObj.id] = studentObj;
    return true;
}

function generateStudentInfo(input) {
    let studentObj = convertToStudentObject(input);
    if (isStudentExist(studentObj.id)){
        console.log('改学生信息已经存在');
        return;
    }
    if (addStudentInfo(studentObj)){
        console.log(`学生${studentObj.name}的成绩被添加`);
        return;
    }
}

function getStudentInfo(studentIdArr) {
    return studentIdArr.filter(item => {
        if (!isStudentExist(item)){
            console.error(`不存${item}的信息`);
        }
        return isStudentExist(item);
    }).map(item => {
            return allStudentInfo[item];
        });

}

function calculateScore(studentList) {
    let klassList = {};
    for(let id in allStudentInfo){
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

    let klass = allStudentInfo[studentList[0]].class;
    let scoreList = klassList[klass].studentList.filter(item => {
       return studentList.indexOf(item.id) > -1;
    });
    return Object.assign({}, {studentList:scoreList,
        average:klassList[klass].average,middleScore:klassList[klass].middleScore});
}