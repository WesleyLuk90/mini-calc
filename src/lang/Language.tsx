export const language = `
start = addition

addition
    = multiplication sp "+" sp addition
    / multiplication

multiplication = simple_expr sp "*" sp multiplication
    / simple_expr sp "/" sp multiplication
    / simple_expr

simple_expr
    = identifier
    / integer
identifier = identifier:[a-zA-Z][a-zA-Z0-9]*
integer = integer:[0-9]+

sp = " "*
`;
