import { Either } from "fp-ts/lib/Either";

export type RegularResult = NumberResult;

export class NumberResult {
    constructor(readonly value: number) {}
}

export class ErrorResult {
    constructor(readonly message: string) {}
}

export type Result = Either<ErrorResult, RegularResult>;
