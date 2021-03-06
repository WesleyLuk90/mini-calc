import { Either, left, right } from "fp-ts/lib/Either";
import { ErrorResult, NumberResult, RegularResult } from "../Result";

export function validateNumber(
    value: RegularResult
): Either<ErrorResult, NumberResult> {
    return value instanceof NumberResult
        ? right(value)
        : left(new ErrorResult("Error"));
}
