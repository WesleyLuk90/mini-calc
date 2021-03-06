import { chain, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { Parser } from "../Parser";
import { Evaluator } from "./Evaluator";
import { NumberResult } from "./Result";

describe("Evalulator", () => {
    const parser = new Parser();
    it("evaluates", () => {
        const evaluator = new Evaluator();
        expect(
            pipe(
                parser.parse(`1 + 2 - 3 + 4`),
                chain((e) => evaluator.evaluate(e))
            )
        ).toEqual(right(new NumberResult(1 + 2 - 3 + 4)));
        expect(
            pipe(
                parser.parse(`1/2/3/4`),
                chain((e) => evaluator.evaluate(e))
            )
        ).toEqual(right(new NumberResult(1 / 2 / 3 / 4)));
        expect(
            pipe(
                parser.parse(`1-2-3-4`),
                chain((e) => evaluator.evaluate(e))
            )
        ).toEqual(right(new NumberResult(1 - 2 - 3 - 4)));
        expect(
            pipe(
                parser.parse(`1*2*3/4/5/6*7*8*9`),
                chain((e) => evaluator.evaluate(e))
            )
        ).toEqual(
            right(new NumberResult(((1 * 2 * 3) / 4 / 5 / 6) * 7 * 8 * 9))
        );
    });
});
