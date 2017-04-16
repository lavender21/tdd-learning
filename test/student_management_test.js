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

    describe("A suit for generateStudentInfo function", function () {
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

describe("suits for generateStudentScore function", function () {
    describe("A suit for filterStudentId function", function () {
        beforeAll(function () {
           allStudentInfo = {
               '111':{},
               '123':{},
               '135':{},
           }
        });
        afterAll(function () {
            allStudentInfo = {};
        });
        it("return student id list when input student id list is exist", function () {
            const input = ['111','123','135'];
            const output = ['111','123','135'];

            const result = filterStudentId(input);

            expect(result).toEqual(output);
        });
        it("console log 不存333的信息 when input student id list contain not exist student id", function () {
            const input = ['111','123','333'];
            const output = ['111','123'];

            spyOn(console,'error');
            const result = filterStudentId(input);

            expect(console.error).toHaveBeenCalledWith('不存333的信息');
            expect(result).toEqual(output);
        });
    });

    describe("A suit for calculateScore function", function () {
        beforeAll(function () {
           allStudentInfo = {'111':{name:'aaa',id:'111',nation:'han',class:'131',score:[{'语文':90},{'数学':90.5}]},
            '123':{name:'bbb',id:'123',nation:'han',class:'131',score:[{'语文':70},{'数学':60}]},
            '135':{name:'ccc',id:'135',nation:'han',class:'131',score:[{'语文':80},{'数学':100}]},
            '222':{name:'ddd',id:'222',nation:'han',class:'132',score:[{'语文':50},{'数学':80},{'计算机':60}]},
            '223':{name:'eee',id:'223',nation:'han',class:'132',score:[{'语文':100},{'数学':70},{'计算机':90}]}
           }
        });
        afterAll(function () {
            allStudentInfo = {};
        });
        it("return score list when input student id list is whole class", function () {
            const input = ['111','123','135'];

            const output = {studentList:[{name:'aaa',id:'111',nation:'han',class:'131',score:[{'语文':90},{'数学':90.5}],average:90.25,sumScore:180.5},
            {name:'bbb',id:'123',nation:'han',class:'131',score:[{'语文':70},{'数学':60}],average:65,sumScore:130},
            {name:'ccc',id:'135',nation:'han',class:'131',score:[{'语文':80},{'数学':100}],average:90,sumScore:180}],
            average:163.5,
            middleScore:180
            };

            const result = calculateScore(input);

            expect(result).toEqual(output);
        });
        it("return score list when input student id list is the part of a class", function () {
            const input = ['111','123'];

            const output = {studentList:[{name:'aaa',id:'111',nation:'han',class:'131',score:[{'语文':90},{'数学':90.5}],average:90.25,sumScore:180.5},
                {name:'bbb',id:'123',nation:'han',class:'131',score:[{'语文':70},{'数学':60}],average:65,sumScore:130}],
                average:163.5,
                middleScore:180
            };

            const result = calculateScore(input);

            expect(result).toEqual(output);
        });
    });

    describe("A suit for printStudentScore function", function () {
        it("console log student score list when input student score object", function () {
            const input =  {studentList:[{name:'aaa',id:'111',nation:'han',class:'131',score:[{'语文':90},{'数学':90.5}],average:90.25,sumScore:180.5},
                {name:'bbb',id:'123',nation:'han',class:'131',score:[{'语文':70},{'数学':60}],average:65,sumScore:130},
                {name:'ccc',id:'135',nation:'han',class:'131',score:[{'语文':80},{'数学':100}],average:90,sumScore:180}],
                average:163.5,
                middleScore:180
            };
            const result = '成绩单\n'+
            '姓名|语文|数学|平均分|总分\n'+
            '========================\n'+
            'aaa|90|90.5|90.25|180.5\n'+
            'bbb|70|60|65|130\n'+
            'ccc|80|100|90|180\n'+
            '========================\n'+
            '全班总分平均数：163.5\n'+
            '全班总分中位数：180\n';

            spyOn(console,'log');
            printStudentScore(input);

            expect(console.log).toHaveBeenCalledWith(result);
        });
    });

    describe("A suit for generateStudentScore function", function () {
        beforeAll(function () {
            allStudentInfo = {'111':{name:'aaa',id:'111',nation:'han',class:'131',score:[{'语文':90},{'数学':90.5}]},
                '123':{name:'bbb',id:'123',nation:'han',class:'131',score:[{'语文':70},{'数学':60}]},
                '135':{name:'ccc',id:'135',nation:'han',class:'131',score:[{'语文':80},{'数学':100}]},
                '222':{name:'ddd',id:'222',nation:'han',class:'132',score:[{'语文':50},{'数学':80},{'计算机':60}]},
                '223':{name:'eee',id:'223',nation:'han',class:'132',score:[{'语文':100},{'数学':70},{'计算机':90}]}
            }
        });
        afterAll(function () {
            allStudentInfo = {};
        });
        it("console log student score info when input student id list", function () {
            const input = "111,123,135";
            const result = '成绩单\n'+
                '姓名|语文|数学|平均分|总分\n'+
                '========================\n'+
                'aaa|90|90.5|90.25|180.5\n'+
                'bbb|70|60|65|130\n'+
                'ccc|80|100|90|180\n'+
                '========================\n'+
                '全班总分平均数：163.5\n'+
                '全班总分中位数：180\n';

            spyOn(console,'log');
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
});

describe("A suit for date type convert functions", function () {
    describe("A suit for convertToStudentObject function", function () {
        it("return studentObject data type when input valid student info", function () {
            const input = "宁润婷,111,汉,物网131,语文:80,数学:90,英语:85,计算机:90";
            const output = {
                name: '宁润婷', id: '111', nation: '汉', class: '物网131',
                score: [{'语文': 80},{'数学': 90},{'英语': 85},{'计算机': 90}],
                average:0,middleScore:0
            };

            const result = convertToStudentObject(input);

            expect(result).toEqual(output);
        });
        it("return invalid input when input invalid student info", function () {
            const input = "宁润婷 111 han ddddd";

            spyOn(console,'error');
            const result = convertToStudentObject(input);

            expect(console.error).toHaveBeenCalledWith('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：');
            expect(result).toEqual(null);
        });
        it("return invalid input when input invalid student info", function () {
            const input = "宁润婷,111,汉,物网131,语文-80,数学-90,英语-85,计算机-90";

            spyOn(console,'error');
            const result = convertToStudentObject(input);

            expect(console.error).toHaveBeenCalledWith('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：');
            expect(result).toEqual(null);
        });
    });
    describe("A suit for convertToStudentIdList", function () {
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
    });
});