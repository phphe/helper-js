const hp = require('../dist/helper-js.cjs')

const obj = {
  a: {
    b: {
      c: [
        {d: 1,},
        {
          e: {
            f: 123
          },
        }
      ]
    },
    b2: {},
  }
}
const obj2 = hp.mapObjectTree(obj, (value, key, parent) => {
  if (key === 'b') {
    return {skipChildren: true}
  }
})
console.log(obj2);
