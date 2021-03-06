import { Option } from "fp-ts/lib/Option";
import { Expr } from "../parse/Expression";
import { Evaluator } from "./Evaluator";
import { Result } from "./Result";

export abstract class ExpressionEvaluator {
    abstract evaluate(expression: Expr, evaluator: Evaluator): Option<Result>;
}
