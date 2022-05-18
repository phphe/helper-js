const hp = require("../dist/index.cjs.js");
const {
  TreeData,
  arrayDistinct,
  arrayDiff,
  pathJoin,
  promiseContinuous,
  waitTime,
  walkTreeData,
} = hp;

treeData = [
  {
    text: "node 1",
    children: [
      { text: "node 1-0" },
      { text: "node 1-1" },
      { text: "node 1-2" },
      { text: "node 1-3" },
      { text: "node 1-4" },
      { text: "node 1-5" },
      { text: "node 1-6" },
      { text: "node 1-7" },
      { text: "node 1-8" },
      { text: "node 1-9" },
    ],
  },
  {
    text: "node 2",
    children: [
      { text: "node 2-0" },
      { text: "node 2-1", children: [{ text: "3" }] },
    ],
  },
];

td = new TreeData(treeData);
console.log(td.clone());
//
newData = [];
td = new TreeData(newData);
td.set([0], { children: [] });
td.set([0, 0], { text: "0-0" });
console.log(JSON.stringify(newData, null, 2));
//
treeData = { text: "node 0", children: [{ text: "node 0-0" }] };
td = new TreeData(treeData);
td.walk(() => {});
//
treeData = { text: "node 0", children: [{ text: "node 0-0" }] };
td = new TreeData(treeData);
console.log(td.clone());

// date
const { getCalendar } = hp;
console.log(getCalendar(2020, 4));

//
console.log(
  arrayDistinct([1, 1, 2, 3, 3, 4]).toString() === [1, 2, 3, 4].toString()
);

// arrayDiff
let arr1 = [1, 1, 2, 3, 3, 4];
let arr2 = [2, 3, 4, 5, 5, 5];
console.log("arrayDiff", arr1, arr2);
console.log("arrayDiff", arrayDiff(arr1, arr2));

// pathJoin
console.log("pathJoin");
console.log(pathJoin("http://xx.cc", "/hello"));
console.log(pathJoin("http://xx.cc", "http://xx2.cc/hello"));
console.log(pathJoin("http://xx.cc", ""));

// promiseContinuous
t = promiseContinuous(
  async function (info) {
    await waitTime(100);
    return info.count;
  },
  { strategy: "every" }
);
t2 = promiseContinuous(
  async function (info) {
    await waitTime(100);
    return info.count;
  },
  { strategy: "last" }
);
test_promiseContinuous = async () => {
  console.time(1);
  console.log(await Promise.all([t(), t()]));
  console.log(await Promise.all([t(), t()]));
  console.log("should be about 0.4s");
  console.timeEnd(1);
  console.time(1);
  console.log(await Promise.all([t2(), t2(), t2()]));
  console.log(await Promise.all([t2(), t2(), t2()]));
  console.log("should also be about 0.4s");
  console.timeEnd(1);
};
test_promiseContinuous();
