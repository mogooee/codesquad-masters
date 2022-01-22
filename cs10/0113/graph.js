const fs = require("fs");
const map = fs.readFileSync("graph.txt").toString();

module.exports.drawGraph = (coordinate) => {
  const mapLine = map.split("\r\n");
  const mapSplit = mapLine.map((line) => line.split(""));
  const x = 3 * coordinate[0] + 3;
  const y = 24 - coordinate[1];
  mapSplit[y][x] = "💀";
  const graph = mapSplit.map((split) => split.join("")).join("\n");
  return graph;
};
