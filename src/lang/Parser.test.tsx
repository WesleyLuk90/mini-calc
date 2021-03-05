import { Language } from "./Language";
import { Parser } from "./Parser";

describe("Parser", () => {
    it("should bar", () => {
        const parser = new Parser();
        parser.parse(`1 + 2 * 3 / 4`);
    });
});
