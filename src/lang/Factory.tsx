import {
    NumberExpression,
    PlusExpression,
    Expr,
    MinusExpression,
    MultiplyExpression,
    DivideExpression,
} from "./Expression";
import { ExpressionType } from "./ExpressionType";

export class Factory {
    static number(value: number): NumberExpression {
        return {
            type: ExpressionType.number,
            value: value,
        };
    }
    static plus(left: Expr, right: Expr): PlusExpression {
        return {
            type: ExpressionType.plus,
            left,
            right,
        };
    }
    static minus(left: Expr, right: Expr): MinusExpression {
        return {
            type: ExpressionType.minus,
            left,
            right,
        };
    }
    static multiply(left: Expr, right: Expr): MultiplyExpression {
        return {
            type: ExpressionType.multiply,
            left,
            right,
        };
    }
    static divide(left: Expr, right: Expr): DivideExpression {
        return {
            type: ExpressionType.divide,
            left,
            right,
        };
    }
}
