const VideoData = require("./videodata");
const videoData = new VideoData();
const data = videoData.makeData();

function print(data) {
  console.log("---영상클립---");
  for (let i = 0; i < 13; i++) {
    console.log(`${data[i].header}(${data[i].id}):${data[i].playTime}`);
  }
  console.log("\n");
}

print(data);

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let head;
let tail;

rl.on("line", function (line) {
  let [command, id, index] = line.split(" ");
  let inputData = findInputData(id);
  if (checkInputData(id)) {
    console.log("기존에 있는 영상데이터입니다.\n");
    return;
  }

  switch (command) {
    case "add":
      add(inputData);
      break;
    case "insert":
      insert(inputData, Number(index));
      break;
    case "delete":
      remove(id);
      break;
    case "render":
      render();
      return;
    default:
      if (!inputData) console.log("잘못 입력했습니다. 다시 입력하세요.\n");
      else console.log("명령어를 잘못 입력했습니다. 다시 입력하세요.\n");
      return;
  }

  if (!inputData) {
    console.log("id를 잘못 입력했습니다. 다시 입력하세요.\n");
    return;
  }

  process.stdout.write(`|`);
  printLinkedList(head);
  process.stdout.write(`---[end]`);
  console.log("\n");
});
rl.on("close", function () {
  process.exit();
});

function render() {
  console.log(`영상클립: ${checkDepth(tail.id)}개`);
  console.log(`전체길이: ${checkTotalPlayTime()}sec\n`);
}

function checkInputData(input) {
  function findInputData(linkedList) {
    if (!linkedList) return 0;
    return linkedList.id === input ? 1 : findInputData(linkedList.next);
  }

  return findInputData(head);
}

function checkTotalPlayTime() {
  let totalPlayTime = 0;
  function findTotalPlayTime(linkedList) {
    totalPlayTime += linkedList.playTime;
    return !linkedList.next
      ? totalPlayTime
      : findTotalPlayTime(linkedList.next);
  }
  return findTotalPlayTime(head);
}

function checkDepth(input) {
  let depth = 0;
  function findObjDepth(linkedList) {
    depth++;
    return linkedList.id === input ? depth : findObjDepth(linkedList.next);
  }
  return findObjDepth(head);
}

function remove(input) {
  let depth = checkDepth(input);

  if (depth === 1) {
    head = head.next;
  } else {
    let frontNode = head;
    while (--depth != 1) {
      frontNode = frontNode.next;
    }
    let backNode = frontNode.next.next;
    frontNode.next = backNode;
    if (!backNode) tail = frontNode;
  }

  if (!head) tail = "";
}

function insert(inputData, index) {
  if (index === 0) {
    inputData.next = head;
    head = inputData;
  } else {
    const Depth = checkDepth(tail.id);
    if (index >= Depth) index = Depth;
    let frontNode = head;
    while (--index != 0) {
      frontNode = frontNode.next;
    }
    let backNode = frontNode.next;
    frontNode.next = inputData;
    inputData.next = backNode;
    if (!inputData.next) tail = inputData;
  }
}

function add(inputData) {
  if (!head) {
    head = inputData;
    tail = head;
  } else {
    if (!tail) {
      head.next = inputData;
      tail = inputData;
    } else {
      tail.next = inputData;
      tail = inputData;
    }
  }
}

function findInputData(id) {
  let inputData;
  for (obj of data) {
    for (key in obj) {
      if (obj[key] == id) inputData = obj;
    }
  }
  return inputData;
}

function printLinkedList(linkedList) {
  let id, playTime;
  for (key in linkedList) {
    switch (key) {
      case "id":
        id = linkedList[key];
        break;
      case "playTime":
        playTime = linkedList[key];
        break;
      case "next":
        process.stdout.write(`---[${id}, ${playTime}sec]`);
        if (linkedList[key]) printLinkedList(linkedList[key]);
    }
  }
}
