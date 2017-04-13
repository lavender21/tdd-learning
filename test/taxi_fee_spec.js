/**
 * Created by lavender on 17-4-13.
 */
describe("A suit for taxi fee function", function () {
    it("return expect result when distance less than 2km and no waiting time", function () {
        const distance = 1;
        const waitingTime = 0;
        const result = calculateTaxiFee(distance, waitingTime);
        expect(result).toBe(6);
    });
    it("return expect result when distance great than 2km less than 8km and no waiting time",function () {
        const distance = 5;
        const waitingTime = 0;
        const result = calculateTaxiFee(distance, waitingTime);
        expect(result).toBe(8);
    });
    it("return expect result when distance great than 8km and no waiting time", function () {
        const distance = 10;
        const waitingTime = 0;
        const result = calculateTaxiFee(distance, waitingTime);
        expect(result).toBe(13);
    });
    it("return expect result when have 30mins waiting time", function () {
        const distance = 1;
        const waitingTime = 30;
        const result = calculateTaxiFee(distance, waitingTime);
        expect(result).toBe(14);
    });
});