import { Expr } from "./Expression";
import { ExpressionType } from "./ExpressionType";

export class Evalutaor {
    evaluate(expression: Expr): number {
        switch (expression.type) {
            case ExpressionType.plus:
                return (
                    this.evaluate(expression.left) +
                    this.evaluate(expression.right)
                );
            case ExpressionType.minus:
                return (
                    this.evaluate(expression.left) -
                    this.evaluate(expression.right)
                );
            case ExpressionType.multiply:
                return (
                    this.evaluate(expression.left) *
                    this.evaluate(expression.right)
                );
            case ExpressionType.divide:
                return (
                    this.evaluate(expression.left) /
                    this.evaluate(expression.right)
                );
            case ExpressionType.number:
                return expression.value;
        }
    }
}
