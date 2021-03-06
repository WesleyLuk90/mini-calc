import { right } from "fp-ts/lib/Either";
import { Parser } from "../Parser";
import { Evaluator } from "./Evaluator";
import { NumberResult } from "./Result";

describe("Evalulator", () => {
    const parser = new Parser();
    it("evaluates", () => {
        const evaluator = new Evaluator();
        expect(evaluator.evaluate(parser.parse(`1 + 2 - 3 + 4`))).toEqual(
            right(new NumberResult(1 + 2 - 3 + 4))
        );
        expect(evaluator.evaluate(parser.parse(`1/2/3/4`))).toEqual(
            right(new NumberResult(1 / 2 / 3 / 4))
        );
        expect(evaluator.evaluate(parser.parse(`1-2-3-4`))).toEqual(
            right(new NumberResult(1 - 2 - 3 - 4))
        );
        expect(evaluator.evaluate(parser.parse(`1*2*3/4/5/6*7*8*9`))).toEqual(
            right(new NumberResult(((1 * 2 * 3) / 4 / 5 / 6) * 7 * 8 * 9))
        );
    });
});
