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
