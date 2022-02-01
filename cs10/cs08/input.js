function input(line) {
  return ([consumer, ...orders] = line.split(","));
}

module.exports = { input };
