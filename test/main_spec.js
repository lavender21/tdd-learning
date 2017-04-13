/**
 * Created by lavender on 17-4-12.
 */
describe("A suit for generateStringType", function () {
    it("return is even when input string is an even number", function () {
        const input = "10";
        const result = generateStringType(input);
        expect(result).toBe("is even");
    });
    it("return is odd when input string is an odd number", function () {
        const input = "9";
        const result = generateStringType(input);
        expect(result).toBe("is odd");
    });
    it("return is not number when input string is float number", function () {
        const input = "1.5";
        const result = generateStringType(input);
        expect(result).toBe("is number");
    });
    it("return is not number when input string is not number", function () {
        const input = "aaa";
        const result = generateStringType(input);
        expect(result).toBe("is not number");
    });
    it("return is not number when input string is 0", function () {
        const input = "0";
        const result = generateStringType(input);
        expect(result).toBe("is even");
    });
});