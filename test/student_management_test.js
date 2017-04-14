/**
 * Created by lavender on 17-4-14.
 */
describe("A suit for printMenu function", function () {
   it("console menu list when called printMenu", function () {
        const result = `1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`;
        spyOn(console,'log');
        printMenu();
        expect(console.log).toHaveBeenCalledWith(result);

   });
});

describe("suits for generateStudentInfo function", function () {
    describe("A suit for isStudentExist function", function () {
        beforeAll(function () {
            allStudentInfo = {'123':{name:'aa',id:'123'}};
        });
        afterAll(function () {
            allStudentInfo = {};
        });
        it("shoud return true when input student is exist", function () {
            const input = "123";
            const result = isStudentExist(input);
            expect(result).toBe(true);
        });
        it("shoud return false when input student is not exist", function () {
            const input = "111";
            const result = isStudentExist(input);
            expect(result).toBe(false);
        });
    });

    describe("A suit for addStudentInfo function", function () {
       it("return true when input studentObj is added success", function () {
            const input = {
                name: '宁润婷', id: '111', nation: '汉', class: '物网131',
                score: [{'语文': 80},{'数学': 90},{'英语': 85},{'计算机': 90}]
            };

            const result = addStudentInfo(input);

            expect(result).toBe(true);
       });
        it("return false when input studentObj is added success", function () {
            const input = {
                name: '宁润婷', nation: '汉', class: '物网131',
                score: [{'语文': 80},{'数学': 90},{'英语': 85},{'计算机': 90}]
            };

            const result = addStudentInfo(input);

            expect(result).toBe(false);
        });
    });

    describe("A suit for generateStudentInfo functino", function () {
        beforeAll(function () {
           allStudentInfo = {'111':{}};
        });
        afterAll(function () {
            allStudentInfo = {};
        });
        it("console log 学生XXX添加成功 when input a student info", function () {
            const input = "宁润婷,113,汉,物网131,语文:80,数学:90,英语:85,计算机:90";
            spyOn(console,'log');

            generateStudentInfo(input);

            expect(console.log).toHaveBeenCalledWith('学生宁润婷的成绩被添加');
        });
        it("console log 该学生信息已存在 when input a exist student info", function () {
            const input = "宁润婷,111,汉,物网131,语文:80,数学:90,英语:85,计算机:90";
            spyOn(console,'log');

            generateStudentInfo(input);

            expect(console.log).toHaveBeenCalledWith('改学生信息已经存在');
        });
    });
});

describe("A suit for date type convert functions", function () {
    describe("A suit for convertToStudentObject function", function () {
        it("return studentObject data type when input valid student info", function () {
            const input = "宁润婷,111,汉,物网131,语文:80,数学:90,英语:85,计算机:90";
            const result = convertToStudentObject(input);
            const output = {
                name: '宁润婷', id: '111', nation: '汉', class: '物网131',
                score: [{'语文': 80},{'数学': 90},{'英语': 85},{'计算机': 90}]
            };
            expect(result).toEqual(output);
        });
        it("return invalid input when input invalid student info", function () {
            const input = "宁润婷 111 han ddddd";
            spyOn(console,'error');
            convertToStudentObject(input);
            expect(console.error).toHaveBeenCalledWith('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：');
        });
        it("return invalid input when input invalid student info", function () {
            const input = "宁润婷,111,汉,物网131,语文-80,数学-90,英语-85,计算机-90";
            spyOn(console,'error');
            convertToStudentObject(input);
            expect(console.error).toHaveBeenCalledWith('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：');
        });
    });
    describe("A suit for convertToStudentIdList", function () {
        beforeAll(function () {
           allStudentInfo = {'111':{},'123':{},'135':{}};
        });
        afterAll(function () {
           allStudentInfo = {};
        });
       it("return string arr when input is student id string", function () {
            const input = "111,123,135";
            const output = ['111','123','135'];
            const result = convertToStudentIdList(input);
            expect(result).toEqual(output);
       });
       it("console.error invalid input when input is invalid", function () {
           const input = "1112321312 sdfsfs233";
           spyOn(console,'error');
           convertToStudentIdList(input);
           expect(console.error).toHaveBeenCalledWith('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
       });
       it("return string arr and console.error some student not exist when allStudentInfo not contains input student", function () {
            const input = "111,222,135";
            const output = ['111','135'];

            spyOn(console,'error');
            const result = convertToStudentIdList(input);

            expect(console.error).toHaveBeenCalledWith('222 不存在该学生信息');
            expect(result).toEqual(output);
       });
    });
});