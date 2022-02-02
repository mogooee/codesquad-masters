module.exports.point = {
  getXY(point) {
    const regex = /[0-9]+/g;
    const [x, y] = point.match(regex);
    return [+x, +y];
  },
  checkRange(point) {
    return point.filter((e) => e < 0 || e > 24).length > 0 ? 0 : 1;
  },
};
