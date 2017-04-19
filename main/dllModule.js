let allStudentInfo = {};

function isStudentExist(studentId) {
    return allStudentInfo.hasOwnProperty(studentId);
}

module.exports = {

    isStudentExist: isStudentExist,

    getAllStudentInfo() {
        return allStudentInfo;
    },

    calculateStudentScore(student) {
        let sumScore = 0;
        student.score.forEach(item => {
            sumScore += item[Object.keys(item)];
        });
        let average = Number((sumScore / student.score.length).toFixed(2));
        return Object.assign({}, student, {average: average, sumScore: sumScore});
    },

    getStudentInfo(studentIdArr) {
        return studentIdArr.filter(item => {
            return isStudentExist(item);
        }).map(item => {
            return allStudentInfo[item];
        });
    },

    calculateClassScore() {
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
};