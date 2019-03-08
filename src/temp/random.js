const items = [];

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (+max - +min)) + +min;
}

function getRandomRGB() {
  return "rgb(" + getRandomInRange(0,250) + "," + getRandomInRange(0,250) + "," + getRandomInRange(0,250) + ")";
}

for (var i=0; i < 26; i++) {
  items.push({
    width: 300,
    height: getRandomInRange(100,300),
    color: getRandomRGB(),
  });
}

export default items;
