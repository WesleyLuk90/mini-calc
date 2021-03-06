import { Evalutaor } from "./Evaluator";
import { Parser } from "./Parser";

describe("Evalulator", () => {
    const parser = new Parser();
    it("evalutes", () => {
        const evaluator = new Evalutaor();
        expect(evaluator.evaluate(parser.parse(`1 + 2 - 3 + 4`))).toEqual(
            1 + 2 - 3 + 4
        );
        expect(evaluator.evaluate(parser.parse(`1/2/3/4`))).toEqual(
            1 / 2 / 3 / 4
        );
        expect(evaluator.evaluate(parser.parse(`1-2-3-4`))).toEqual(
            1 - 2 - 3 - 4
        );
        expect(evaluator.evaluate(parser.parse(`1*2*3/4/5/6*7*8*9`))).toEqual(
            ((1 * 2 * 3) / 4 / 5 / 6) * 7 * 8 * 9
        );
    });
});
