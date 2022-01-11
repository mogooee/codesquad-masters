class VideoData {
  constructor() {
    this.data = [];
    this.idArr = [];
    this.playTime = [];
    this.init();
  }

  init() {
    this.makeId();
    this.makePlayTime();
  }

  makeData() {
    for (let i = 0; i < 13; i++) {
      this.data.push({
        header: `제목${i + 1}`,
        id: this.idArr[i],
        playTime: this.playTime[i],
        next: undefined,
      });
    }
    return this.data;
  }

  makeId() {
    let id = "";
    const char = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 13; i++) {
      for (let j = 0; j < 4; j++) {
        id += char[Math.floor(Math.random() * (char.length - 1))];
      }
      this.idArr.push(id);
      id = "";
    }
    return this.idArr;
  }

  makePlayTime() {
    for (let i = 0; i < 13; i++) {
      this.playTime.push(Math.floor(Math.random() * 14) + 1);
    }
    return this.playTime;
  }
}

function printData(data) {
  console.log("---영상클립---");
  for (let i = 0; i < 13; i++) {
    console.log(`${data[i].header}(${data[i].id}):${data[i].playTime}sec`);
  }
  console.log("\n");
}

module.exports = { VideoData, printData };
