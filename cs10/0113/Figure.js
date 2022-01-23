const graph = require("./graph");

class Figure {
  constructor(coordinate) {
    this.coordinate = coordinate;
    this.lineArr = [];
    this.area;
  }
  drawGraph() {
    return console.log(`\n${graph.drawGraph(this.coordinate)}`);
  }
  calcLine() {
    for (let i = 0; i < this.coordinate.length; i++) {
      for (let j = i + 1; j < this.coordinate.length; j++) {
        let distanceX = this.coordinate[i][0] - this.coordinate[j][0];
        let distanceY = this.coordinate[i][1] - this.coordinate[j][1];
        this.lineArr.push(Math.sqrt(distanceX ** 2 + distanceY ** 2));
      }
    }
    return this.lineArr;
  }
  printArea(figure) {
    return console.log(`\n${figure}: ${this.area.toFixed(2)}\n`);
  }
}

class Line extends Figure {
  constructor(coordinate) {
    super(coordinate);
  }
  getLine() {
    return (super.area = this.lineArr[0]);
  }
}

class Triangle extends Figure {
  constructor(coordinate) {
    super(coordinate);
  }
  calcTriangle() {
    const s = (this.lineArr[0] + this.lineArr[1] + this.lineArr[2]) / 2;
    return (super.area = Math.sqrt(
      s * (s - this.lineArr[0]) * (s - this.lineArr[1]) * (s - this.lineArr[2])
    ));
  }
}

class Rectangle extends Figure {
  constructor(coordinate, width, height) {
    super(coordinate);
    this.width = width;
    this.height = height;
  }
  checkRectangle() {
    if (this.lineArr.map((e) => this.lineArr.indexOf(e)).indexOf(-1) > 0)
      return 0;
    return this.lineArr.filter((e) => e === Math.max(...this.lineArr)).length >
      1
      ? 1
      : 0;
  }
  calcRectangle() {
    if (this.width) {
      return (super.area = this.width * this.height);
    }
    const triangle = new Triangle(this.coordinate);
    triangle.calcLine();
    return (super.area = 2 * triangle.calcTriangle());
  }
}

module.exports = {
  Figure,
  Line,
  Triangle,
  Rectangle,
};
