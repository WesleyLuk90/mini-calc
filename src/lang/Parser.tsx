import peg from "pegjs";
import { Expr } from "./Expression";
import { language } from "./Language";

export class Parser {
    private parser = peg.generate(language);
    parse(code: string): Expr {
        return this.parser.parse(code);
    }
}
