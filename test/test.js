let expect = require('chai').expect;
const add = require('../functions');

describe("String Calculator", () => {
    it("should check if string is empty and return 0", () => {
        const numbers = "";
        expect(add(numbers)).to.be.equals(0);
    });

    it('should add two numbers', () => {
        const numbers = "1,2";
        expect(add(numbers)).to.be.equals(3);
    });

    it('should handle new line', () => {
        const numbers = "1\n2,3";
        expect(add(numbers)).to.be.equals(6);
    });

    it('should handle different delimiters', () => {
        const numbers = "//;\n1;2";
        expect(add(numbers)).to.be.equals(3);
    });

    xit('should throw an exception with negative numbers', () => {
        const numbers = "//;\n-1;2;-30";
        let error = () => {
            throw new Error("negatives not allowed: " + JSON.stringify([-1, -30]));
        };

        expect(add(numbers)).to.throw(error());
    });

    it('should ignored number bigger than 1000', () => {
        const numbers = "//[*]\n*1001,2";
        expect(add(numbers)).to.be.equals(2);
    });
});
