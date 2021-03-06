import { Either } from "fp-ts/lib/Either";

export enum ResultType {
    number,
}

export type RegularResult = NumberResult;

export interface NumberResult {
    type: ResultType.number;
    value: number;
}

export class ErrorResult {
    constructor(readonly message: string) {}
}

export type Result = Either<ErrorResult, RegularResult>;
