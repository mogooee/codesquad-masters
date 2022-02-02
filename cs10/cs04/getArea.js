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
  rectangle.printArea("👉 직사각형 넓이");
};

const classifierFigure = (coordinate, restLength) => {
  switch (restLength) {
    case 1:
      const line = new Line(coordinate);
      line.calcLine();
      line.getLine();
      line.printArea("👉 두 점사이의 거리");
      return;
    case 2:
      const triangle = new Triangle(coordinate);
      triangle.calcLine();
      triangle.calcTriangle();
      triangle.printArea("👉 삼각형 넓이");
      return;
    case 3:
      const rectangle = new Rectangle(coordinate);
      rectangle.calcLine();
      if (!rectangle.checkRectangle())
        return console.log("\n⚠ 직사각형이 아닙니다.\n");
      rectangle.calcRectangle();
      rectangle.printArea("👉 직사각형 넓이");
      return;
  }
};

rl.setPrompt("좌표 > ");
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
    console.log("\n⚠ 좌표의 범위는 0~24입니다. 다시 입력해주세요.\n");
    return;
  }
  const figure = new Figure(coordinate);
  figure.drawGraph();

  classifierFigure(coordinate, [...rest].length);
});
rl.on("close", function () {
  process.exit();
});
