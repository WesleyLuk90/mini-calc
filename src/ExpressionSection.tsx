import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./ExpressionSection.css";

export function ExpressionSection() {
    const [expr, setExpr] = useState("");
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
                    onBlur={() => setExpr(editExpr)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control placeholder="Value" value={expr} />
            </Form.Group>
        </div>
    );
}
