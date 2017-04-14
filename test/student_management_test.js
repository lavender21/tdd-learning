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