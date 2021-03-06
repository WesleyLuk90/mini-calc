import { pipe } from "fp-ts/lib/function";
import { isSome, none, Option, some } from "fp-ts/lib/Option";
import { chain } from "fp-ts/lib/ReadonlySet";
import { right } from "fp-ts/lib/These";
import {
    DivideExpression,
    Expr,
    MinusExpression,
    MultiplyExpression,
    PlusExpression
} from "./Expression";
import { ExpressionType } from "./ExpressionType";
import { Result } from "./Result";

abstract class ExpressionEvaluator {
    validateType<T: RegularResult>(result: Result, expected: T["type"]): T {}

    abstract evaluate(expression: Expr, evaluator: Evalutaor): Option<Result>;
}

type BinaryOperator =
    | PlusExpression
    | MinusExpression
    | DivideExpression
    | MultiplyExpression;

class BinaryEvaluator extends ExpressionEvaluator {
    constructor(
        readonly type: ExpressionType,
        readonly apply: (left: number, right: number) => number
    ) {
        super();
    }

    evaluate(expression: Expr, evaluator: Evalutaor): Option<Result> {
        if (expression.type !== this.type) {
            return none;
        }
        const binaryExpression = (expression as any) as BinaryOperator;
        return some(
            pipe(
                evaluator.evaluate(binaryExpression.left),
                chain((lhs) =>
                    pipe(
                        evaluator.evaluate(binaryExpression.right),
                        chain((rhs) => right(rhs))
                    )
                )
            )
        );
    }
}

export class Evalutaor {
    evaluators: ExpressionEvaluator[] = [
        new BinaryEvaluator(ExpressionType.plus, (l, r) => l + r),
        new BinaryEvaluator(ExpressionType.minus, (l, r) => l - r),
        new BinaryEvaluator(ExpressionType.divide, (l, r) => l / r),
        new BinaryEvaluator(ExpressionType.multiply, (l, r) => l * r),
    ];
    evaluate(expression: Expr): Result {
        const value = this.evaluators
            .map((e) => e.evaluate(expression, this))
            .filter(isSome)[0];
        if (value === null) {
            throw new Error(
                `No evaluator for expression type ${expression.type}`
            );
        }
        return value.value;
    }
}
