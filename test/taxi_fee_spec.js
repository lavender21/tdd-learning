/**
 * Created by lavender on 17-4-13.
 */
describe("A suit for taxi fee function", function () {
    it("return expect result when distance less than 2km and 0 waiting time", function () {
        const distance = 1;
        const waitingTime = 0;
        const result = calculateTaxiFee(distance, waitingTime);
        expect(result).toBe(6);
    });
});