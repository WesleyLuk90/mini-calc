import { chain, fold, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./ExpressionSection.css";
import { Evaluator } from "./lang/evaluate/Evaluator";
import { NumberResult, Result } from "./lang/evaluate/Result";
import { ParserInstance } from "./ParserInstance";

export function ExpressionSection() {
    const [result, setResult] = useState<Result>(right(new NumberResult(0)));
    const [editExpr, setEditExpr] = useState("");

    return (
        <div className="expression-section">
            <Form.Group>
                <Form.Control placeholder="Name" />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    placeholder="Expression"
                    value={editExpr}
                    onChange={(e) => setEditExpr(e.target.value)}
                    onBlur={() =>
                        setResult(
                            pipe(
                                ParserInstance.parse(editExpr),
                                chain((e) => new Evaluator().evaluate(e))
                            )
                        )
                    }
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    placeholder="Value"
                    value={pipe(
                        result,
                        fold(
                            (e) => `Error: ${e.message}`,
                            (v) => `${v.value}`
                        )
                    )}
                />
            </Form.Group>
        </div>
    );
}
