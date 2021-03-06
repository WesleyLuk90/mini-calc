import { right } from "fp-ts/lib/Either";
import { none, Option, some } from "fp-ts/lib/Option";
import { Expr } from "../parse/Expression";
import { ExpressionType } from "../parse/ExpressionType";
import { Evaluator } from "./Evaluator";
import { ExpressionEvaluator } from "./ExpressionEvaluator";
import { NumberResult, Result } from "./Result";

export class LiteralEvaluator extends ExpressionEvaluator {
    evaluate(expression: Expr, _: Evaluator): Option<Result> {
        switch (expression.type) {
            case ExpressionType.number:
                return some(right(new NumberResult(expression.value)));
            default:
                return none;
        }
    }
}
