import peg from "pegjs";
import { language } from "./Language";

export class Parser {
    private parser = peg.generate(language);
    parse(code: string) {
        return this.parser.parse(code);
    }
}
