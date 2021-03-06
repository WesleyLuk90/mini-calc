import { right } from "fp-ts/lib/Either";
import { Factory } from "./parse/Factory";
import { Parser } from "./Parser";

describe("Parser", () => {
    const parser = new Parser();
    it("parse arithmetic operators", () => {
        expect(parser.parse(`10 + 2 * 3 / 4 - 5`)).toEqual(
            right(
                Factory.plus(
                    Factory.number(10),
                    Factory.minus(
                        Factory.multiply(
                            Factory.number(2),
                            Factory.divide(Factory.number(3), Factory.number(4))
                        ),
                        Factory.number(5)
                    )
                )
            )
        );
    });

    it("parse with same presidence", () => {
        expect(parser.parse(`1 + 2 - 3 + 4`)).toEqual(
            right(
                Factory.plus(
                    Factory.number(1),
                    Factory.plus(
                        Factory.minus(Factory.number(2), Factory.number(3)),
                        Factory.number(4)
                    )
                )
            )
        );
        expect(parser.parse(`1 * 2 / 3 * 4`)).toEqual(
            right(
                Factory.multiply(
                    Factory.number(1),
                    Factory.multiply(
                        Factory.divide(Factory.number(2), Factory.number(3)),
                        Factory.number(4)
                    )
                )
            )
        );
        expect(parser.parse(`1 - 2 - - 3`)).toEqual(
            right(
                Factory.minus(
                    Factory.minus(Factory.number(1), Factory.number(2)),
                    Factory.number(-3)
                )
            )
        );
        expect(parser.parse(`1 / 2 / 3`)).toEqual(
            right(
                Factory.divide(
                    Factory.divide(Factory.number(1), Factory.number(2)),
                    Factory.number(3)
                )
            )
        );
    });
});
