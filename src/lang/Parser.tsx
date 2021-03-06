import { Either, tryCatch } from "fp-ts/lib/Either";
import peg from "pegjs";
import { Expr } from "./parse/Expression";
import { language } from "./parse/Language";

export class Parser {
    private parser = peg.generate(language);
    parse(code: string): Either<Error, Expr> {
        return tryCatch(
            () => this.parser.parse(code),
            (e) => e as Error
        );
    }
}
