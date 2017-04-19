describe("A suit for generateStudentInfo function", function () {
    beforeAll(function () {
        allStudentInfo = {'111': {}};
    });
    afterAll(function () {
        allStudentInfo = {};
    });
    it("console log 学生XXX添加成功 when input a student info", function () {
        const input = "宁润婷,113,汉,物网131,语文:80,数学:90,英语:85,计算机:90";
        spyOn(console, 'log');

        generateStudentInfo(input);

        expect(console.log).toHaveBeenCalledWith('学生宁润婷的成绩被添加');
    });
    it("console log 该学生信息已存在 when input a exist student info", function () {
        const input = "宁润婷,111,汉,物网131,语文:80,数学:90,英语:85,计算机:90";
        spyOn(console, 'log');

        generateStudentInfo(input);

        expect(console.log).toHaveBeenCalledWith('改学生信息已经存在');
    });
});

describe("A suit for generateStudentScore function", function () {
    beforeAll(function () {
        allStudentInfo = {
            '111': {
                name: 'aaa',
                id: '111',
                nation: 'han',
                class: '131',
                score: [{'语文': 90}, {'数学': 90.5}],
                average: 90.25,
                sumScore: 180.5
            },
            '123': {
                name: 'bbb',
                id: '123',
                nation: 'han',
                class: '131',
                score: [{'语文': 70}, {'数学': 60}],
                average: 65,
                sumScore: 130
            },
            '135': {
                name: 'ccc',
                id: '135',
                nation: 'han',
                class: '131',
                score: [{'语文': 80}, {'数学': 100}],
                average: 90,
                sumScore: 180
            }
        }
    });
    afterAll(function () {
        allStudentInfo = {};
    });
    it("console log student score info when input student id list", function () {
        const input = "111,123,135";
        const result = '成绩单\n' +
            '姓名|语文|数学|平均分|总分\n' +
            '========================\n' +
            'aaa|90|90.5|90.25|180.5\n' +
            'bbb|70|60|65|130\n' +
            'ccc|80|100|90|180\n' +
            '========================\n' +
            '全班总分平均数：163.5\n' +
            '全班总分中位数：180\n';

        spyOn(console, 'log');
        const returnVal = generateStudentScore(input);

        expect(console.log).toHaveBeenCalledWith(result);
        expect(returnVal).toBe(true);
    });

    it("return false when input student id list is not exist", function () {
        const input = "333,345";

        const result = generateStudentScore(input);

        expect(result).toBe(false);
    });
});

