const {TreeData} = require('../dist/helper-js.cjs')

treeData = [
  {text: 'node 1', children: [
    {text: 'node 1-0'},
    {text: 'node 1-1'},
    {text: 'node 1-2'},
    {text: 'node 1-3'},
    {text: 'node 1-4'},
    {text: 'node 1-5'},
    {text: 'node 1-6'},
    {text: 'node 1-7'},
    {text: 'node 1-8'},
    {text: 'node 1-9'},
  ]},
]

td = new TreeData(treeData)
console.log(td.clone());
//
newData = [];
td = new TreeData(newData)
td.setPathNode([0], {children: []})
td.setPathNode([0, 0], {text: '0-0'})
console.log(JSON.stringify(newData, null, 2));
//
treeData = {text: 'node 0', children: [
  {text: 'node 0-0'},
]}
td = new TreeData(treeData)
td.walk(() => {})
//
treeData = {text: 'node 0', children: [
  {text: 'node 0-0'},
]}
td = new TreeData(treeData)
console.log(td.clone());
