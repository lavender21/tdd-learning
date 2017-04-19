module.exports = {
    isValidStudentInput(studentInfoStr) {
        let reg = /^([\u4e00-\u9fa5_a-zA-Z0-9]+[,]){4}(([\u4e00-\u9fa5_a-zA-Z0-9]+):[\d]+[,])*(([\u4e00-\u9fa5_a-zA-Z0-9]+):[\d]+)$/;
        return reg.test(studentInfoStr);
    },

    convertToStudentObject(studentStr) {
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
        return {name: name, id: id, nation: nation, klass: klass, score: scoreArr};
    },

    isValidStudentIdInput(studentIdStr) {
        let reg = /^(\d+[,])*(\d+)$/;
        return reg.test(studentIdStr);
    },

    convertToStudentIdList(studentIdStr) {
        return studentIdStr.split(',');
    },
};
