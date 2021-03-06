import { ExpressionType } from "./ExpressionType";

export type Expr =
    | PlusExpression
    | MinusExpression
    | MultiplyExpression
    | DivideExpression
    | NumberExpression;

export interface PlusExpression {
    type: ExpressionType.plus;
    left: Expr;
    right: Expr;
}
export interface MinusExpression {
    type: ExpressionType.minus;
    left: Expr;
    right: Expr;
}
export interface MultiplyExpression {
    type: ExpressionType.multiply;
    left: Expr;
    right: Expr;
}
export interface DivideExpression {
    type: ExpressionType.divide;
    left: Expr;
    right: Expr;
}
export interface NumberExpression {
    type: ExpressionType.number;
    value: number;
}
