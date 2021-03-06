export const language = `
start = expr 

expr = addition

addition
    = left:minus sp "+" sp right:addition { return { type: "+", left: left, right: right } }
    / expr:minus { return expr }

minus
    = left:multiply right:( sp "-" sp multiply )+ { let last = left; right.forEach(e => { last = { type: "-", left: last, right: e[3] }}); return last; }
    / expr:multiply { return expr }

multiply
    = left:divide sp "*" sp right:multiply { return { type: "*", left: left, right: right } }
    / expr:divide { return expr }

divide
    = left:unit_expr right:( sp "/" sp unit_expr )+ { let last = left; right.forEach(e => { last = { type: "/", left: last, right: e[3] }}); return last; }
    / expr:unit_expr { return expr }

unit_expr
    = expr:function_call { return expr }
    / expr:identifier { return expr }
    / expr:integer { return expr }

identifier = identifier:[a-zA-Z][a-zA-Z0-9]*

integer = integer:[0-9]+ { return { type: "number", value: parseInt(integer, 10) } }

function_call
    = identifier sp "(" sp ")"
    / identifier sp "(" sp args sp ")"

args
    = unit_expr sp "," args
    / unit_expr

parenthesis_expr
    = "(" sp expr sp ")"

sp = " "*
`;
