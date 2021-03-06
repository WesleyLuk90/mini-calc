import { isSome } from "fp-ts/lib/Option";
import { Expr } from "../parse/Expression";
import { ExpressionType } from "../parse/ExpressionType";
import { BinaryEvaluator } from "./BinaryEvaluator";
import { ExpressionEvaluator } from "./ExpressionEvaluator";
import { LiteralEvaluator } from "./LiteralEvaluator";
import { Result } from "./Result";

export class Evaluator {
    evaluators: ExpressionEvaluator[] = [
        new BinaryEvaluator(ExpressionType.plus, (l, r) => l + r),
        new BinaryEvaluator(ExpressionType.minus, (l, r) => l - r),
        new BinaryEvaluator(ExpressionType.divide, (l, r) => l / r),
        new BinaryEvaluator(ExpressionType.multiply, (l, r) => l * r),
        new LiteralEvaluator(),
    ];

    evaluate(expression: Expr): Result {
        const value = this.evaluators
            .map((e) => e.evaluate(expression, this))
            .filter(isSome)[0];
        if (value == null) {
            throw new Error(
                `No evaluator for expression type ${expression.type}`
            );
        }
        return value.value;
    }
}
