import { chain, isLeft, right } from "fp-ts/lib/Either";
import { isSome, none, Option, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { validateNumber } from "./evaluator/TypeValidator";
import {
    DivideExpression,
    Expr,
    MinusExpression,
    MultiplyExpression,
    PlusExpression,
} from "./Expression";
import { ExpressionType } from "./ExpressionType";
import { NumberResult, Result } from "./Result";

abstract class ExpressionEvaluator {
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

    private evaluateSome(
        expression: BinaryOperator,
        evaluator: Evalutaor
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

    evaluate(expression: Expr, evaluator: Evalutaor): Option<Result> {
        if (expression.type !== this.type) {
            return none;
        }
        const binaryExpression = (expression as any) as BinaryOperator;
        return some(this.evaluateSome(binaryExpression, evaluator));
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
