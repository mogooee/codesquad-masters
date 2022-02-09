class MyCalendar {
  constructor(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }
  getTodayDate() {
    const date = new Date();
    return (today = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    });
  }
  getStrInputedDate() {
    return new Date(`${this.year}-${this.month}-${this.day}`);
  }
  getNumInputedDate() {
    if (this.month < 10) this.month = "0" + this.month;
    if (this.day < 10) this.day = "0" + this.day;
    return new Date(`${this.year}-${this.month}-${this.day}`);
  }
  getKoreaDate(str) {
    const date = new Date(str);
    return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`;
  }
  getOneday() {
    const day = ["sun", "mon", "tue", "wen", "thu", "fri", "sat"];
    const date = new Date(`${this.year}-${this.month}-01`);
    return day[date.getDay()];
  }
}

const myCalendar = new MyCalendar("2022", "01");
const test = myCalendar.getTodayDate();
const test2 = myCalendar.getStrInputedDate();
const test3 = myCalendar.getNumInputedDate();
const test4 = myCalendar.getKoreaDate("December 17, 1995 03:24:00");
const test5 = myCalendar.getOneday();
