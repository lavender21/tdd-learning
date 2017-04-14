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