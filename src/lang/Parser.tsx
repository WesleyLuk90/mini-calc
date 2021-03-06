import peg from "pegjs";
import { Expr } from "./parse/Expression";
import { language } from "./parse/Language";

export class Parser {
    private parser = peg.generate(language);
    parse(code: string): Expr {
        return this.parser.parse(code);
    }
}
