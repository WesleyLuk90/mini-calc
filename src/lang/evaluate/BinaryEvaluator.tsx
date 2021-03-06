import { chain, isLeft, right } from "fp-ts/lib/Either";
import { none, Option, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import {
    DivideExpression,
    Expr,
    MinusExpression,
    MultiplyExpression,
    PlusExpression,
} from "../parse/Expression";
import { ExpressionType } from "../parse/ExpressionType";
import { Evaluator } from "./Evaluator";
import { ExpressionEvaluator } from "./ExpressionEvaluator";
import { NumberResult, Result } from "./Result";
import { validateNumber } from "./TypeValidator";

type BinaryOperator =
    | PlusExpression
    | MinusExpression
    | DivideExpression
    | MultiplyExpression;

export class BinaryEvaluator extends ExpressionEvaluator {
    constructor(
        readonly type: ExpressionType,
        readonly apply: (left: number, right: number) => number
    ) {
        super();
    }

    private evaluateSome(
        expression: BinaryOperator,
        evaluator: Evaluator
    ): Result {
        const lhs = pipe(
            evaluator.evaluate(expression.left),
            chain(validateNumber)
        );
        const rhs = pipe(
            evaluator.evaluate(expression.right),
            chain(validateNumber)
        );
        if (isLeft(lhs)) {
            return lhs;
        }
        if (isLeft(rhs)) {
            return rhs;
        }
        return right(
            new NumberResult(this.apply(lhs.right.value, rhs.right.value))
        );
    }

    evaluate(expression: Expr, evaluator: Evaluator): Option<Result> {
        if (expression.type !== this.type) {
            return none;
        }
        const binaryExpression = (expression as any) as BinaryOperator;
        return some(this.evaluateSome(binaryExpression, evaluator));
    }
}
