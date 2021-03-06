import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./App.css";
import { ExpressionSection } from "./ExpressionSection";
export function App() {
    const [sections, setSections] = useState<number[]>([]);

    function addSection() {
        return setSections([...sections, 1]);
    }

    return (
        <Container>
            {sections.map((s, i) => (
                <ExpressionSection key={i}></ExpressionSection>
            ))}
            <Button
                variant="outline-primary"
                size="sm"
                block
                onClick={addSection}
            >
                <FontAwesomeIcon icon={faPlus} />
            </Button>
        </Container>
    );
}
