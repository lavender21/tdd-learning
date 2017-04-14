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

describe("A suit for generateStudentInfo function", function () {
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

});