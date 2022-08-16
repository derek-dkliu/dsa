export default class EvalArithmetic {
  static infix(expression) {
    const vals = [];
    const ops = [];
    for (const ch of expression.split(/\s+/)) {
      switch (ch) {
        case "(":
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          ops.push(ch);
          break;
        case ")":
          const op = ops.pop();
          const v2 = vals.pop();
          const v1 = vals.pop();
          if (op === "+") {
            vals.push(v1 + v2);
          } else if (op === "-") {
            vals.push(v1 - v2);
          } else if (op === "*") {
            vals.push(v1 * v2);
          } else if (op === "/") {
            vals.push(v1 / v2);
          } else {
            throw new Error(`No supports for "${op}" operator`);
          }
          break;
        default:
          vals.push(Number(ch));
      }
    }
    return vals.pop();
  }
}
