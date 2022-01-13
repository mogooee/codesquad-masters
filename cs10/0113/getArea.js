const fs = require("fs");
const graph = fs.readFileSync("graph.txt").toString();

class Figure {
  constructor(result) {
    this.result = result;
  }
  printArea() {
    console.log(`넓이: ${this.result}\n`);
  }
  printDistance() {
    console.log(`두 점사이의 거리: ${this.result}\n`);
  }
}

class Line {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  calcLine() {
    let distanceX = this.a[0] - this.b[0];
    let distanceY = this.a[1] - this.b[1];
    return Math.sqrt(distanceX ** 2 + distanceY ** 2);
  }
}

class Triangle extends Figure {
  calcDistance(a, b) {
    const line = new Line(a, b);
    return line.calcLine();
  }
  calcTriangle(ab, ac, bc) {
    const s = (ab + ac + bc) / 2;
    super.result = Math.sqrt(s * (s - ab) * (s - ac) * (s - bc));
  }
}

class Distance extends Figure {
  calcDistance(a, b) {
    const line = new Line(a, b);
    super.result = line.calcLine();
  }
}

class Input {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.init();
  }
  init() {
    this.splitXY();
  }
  splitXY() {
    const regex = /[0-9]+/g;
    let [x, y] = this.a.match(regex);
    this.a = [x, y];
    [x, y] = this.b.match(regex);
    this.b = [x, y];
    if (this.c) {
      [x, y] = this.c.match(regex);
      this.c = [x, y];
    }
  }
  checkRange() {
    const num = this.a.concat(this.b).concat(this.c);
    for (let i = 0; i < num.length; i++) {
      if (num[i] < 0 || num[i] > 24) {
        console.log("⚠ 좌표의 범위는 0~24입니다. 다시 입력해주세요.\n");
        return 0;
      }
    }
    return 1;
  }
}

class Graph {
  constructor() {
    this.drawGraph();
  }
  drawGraph() {
    console.log(graph);
  }
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("> ");
rl.prompt();
rl.on("line", function (line) {
  let [a, b, c] = line.split("-");
  const input = new Input(a, b, c);
  if (!input.checkRange()) return;
  else graph = new Graph();

  if (!c) {
    const distance = new Distance();
    distance.calcDistance(input.a, input.b);
    distance.printDistance();
  }

  if (c) {
    const triangle = new Triangle(input.a, input.b, input.c);
    const ab = triangle.calcDistance(input.a, input.b);
    const ac = triangle.calcDistance(input.a, input.c);
    const bc = triangle.calcDistance(input.b, input.c);
    triangle.calcTriangle(ab, ac, bc);
    triangle.printArea();
  }
});
rl.on("close", function () {
  process.exit();
});
