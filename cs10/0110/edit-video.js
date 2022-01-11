const { VideoData, printData } = require("./videodata");

const videoData = new VideoData();
const data = videoData.makeData();
printData(data);

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let head;
rl.setPrompt("> ");
rl.prompt();
rl.on("line", function (line) {
  let [command, id, index] = line.split(" ");
  let inputData = findInputData(id);
  if (
    searchLinkedList("id", id) &&
    (command === "insert" || command === "add")
  ) {
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
  console.log(`영상클립: ${searchLinkedList("depth")}개`);
  console.log(`전체길이: ${searchLinkedList("playTime")}sec\n`);
}

function searchLinkedList(type, inputId) {
  let totalPlayTime = 0;
  let depth = 0;

  function recursive(linkedList) {
    totalPlayTime += linkedList.playTime;
    depth++;

    if (!linkedList.next)
      return type === "id" ? 0 : type === "playTime" ? totalPlayTime : depth;

    return linkedList.id === inputId
      ? type === "id"
        ? 1
        : type === "playTime"
        ? totalPlayTime
        : depth
      : recursive(linkedList.next);
  }
  if (!head) return 0;
  else return recursive(head);
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
        else return;
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

function remove(inputId) {
  let index = searchLinkedList("depth", inputId);
  let temp;

  if (index === 1) {
    temp = head;
    head = head.next;
    temp.next = undefined;
  } else {
    let frontNode = head;
    while (--index != 1) {
      frontNode = frontNode.next;
    }
    temp = frontNode.next;
    const backNode = frontNode.next.next;
    frontNode.next = backNode;
    temp.next = undefined;
  }
}

function insert(inputData, index) {
  if (index === 0) {
    inputData.next = head;
    head = inputData;
  } else {
    const depth = searchLinkedList("depth");
    if (index >= depth) index = depth;

    let frontNode = head;
    while (--index != 0) {
      frontNode = frontNode.next;
    }
    let backNode = frontNode.next;
    frontNode.next = inputData;
    inputData.next = backNode;
  }
}

function add(inputData) {
  if (!head) {
    head = inputData;
  } else {
    recursive(head);
    function recursive(linkedList) {
      return !linkedList.next
        ? (linkedList.next = inputData)
        : recursive(linkedList.next);
    }
  }
}
