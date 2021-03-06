const { Figure, Line, Triangle, Rectangle } = require("./figure");
const { point } = require("./point");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const calcRectangle = (line) => {
  const [width, height] = line.split(",");
  const rectangle = new Rectangle("_", width, height);
  rectangle.calcRectangle();
  rectangle.printArea("π μ§μ¬κ°ν λμ΄");
};

const classifierFigure = (coordinate, restLength) => {
  switch (restLength) {
    case 1:
      const line = new Line(coordinate);
      line.calcLine();
      line.getLine();
      line.printArea("π λ μ μ¬μ΄μ κ±°λ¦¬");
      return;
    case 2:
      const triangle = new Triangle(coordinate);
      triangle.calcLine();
      triangle.calcTriangle();
      triangle.printArea("π μΌκ°ν λμ΄");
      return;
    case 3:
      const rectangle = new Rectangle(coordinate);
      rectangle.calcLine();
      if (!rectangle.checkRectangle())
        return console.log("\nβ  μ§μ¬κ°νμ΄ μλλλ€.\n");
      rectangle.calcRectangle();
      rectangle.printArea("π μ§μ¬κ°ν λμ΄");
      return;
  }
};

rl.setPrompt("μ’ν > ");
rl.prompt();
rl.on("line", function (line) {
  const isWH = line.indexOf("-") === -1 && line.indexOf("(") === -1;
  if (isWH) {
    calcRectangle(line);
    return;
  }
  const [a, ...rest] = line.split("-");
  const coordinate = [a, ...rest].map((e) => point.getXY(e));
  if (coordinate.map((e) => point.checkRange(e)).filter((e) => !e).length > 0) {
    console.log("\nβ  μ’νμ λ²μλ 0~24μλλ€. λ€μ μλ ₯ν΄μ£ΌμΈμ.\n");
    return;
  }
  const figure = new Figure(coordinate);
  figure.drawGraph();

  classifierFigure(coordinate, [...rest].length);
});
rl.on("close", function () {
  process.exit();
});
