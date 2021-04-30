function threeSum(nums) {
  let n = nums.length
  let result = []
  let sum
  nums.sort((a, b) => a - b)
  if (n <= 3) {
    return result
  }
  for (let i = 0; i < n; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue
    let L = i + 1
    let R = n - 1
    while (L < R) {
      sum = nums[i] + nums[L] + nums[R]
      if (sum === 0) {
        result.push([nums[i], nums[L], nums[R]])
        while (L < R && nums[L] === nums[L + 1]) L++
        while (L < R && nums[R] === nums[R - 1]) R--
        L++
        R--
      } else if (sum < 0) {
        L++
      } else if (sum > 0) {
        R--
      }
    }
  }
  return result
}

// var threeSum = function (nums) {
//   let n = nums.length
//   nums.sort((a, b) => a - b)
//   let result = []
//   let sum
//   if (nums.length <= 3) result
//   for (let i = 0; i < n; i++) {
//     if (i > 0 && nums[i] === nums[i - 1]) continue
//     var L = i + 1
//     var R = n - 1
//     while (L < R) {
//       sum = nums[i] + nums[L] + nums[R]
//       if (sum === 0) {
//         result.push([nums[i], nums[L], nums[R]])
//         while (L < R && nums[L] === nums[L + 1]) L++
//         while (L < R && nums[R] === nums[R - 1]) R--
//         L++
//         R--
//       } else if (sum > 0) {
//         R--
//       } else if (sum < 0) {
//         L++
//       }
//     }
//   }
//   return result
// };
console.log(threeSum([-1, 0, 1, 2, -1, -4]))

let a = {
  name: 'lily'
}
let {
  ...c
} = Object.create(a)
console.log(c) // {}
console.log(c.__proto__) // {name: 'lily'}
console.log(c.name) // lily
// c.name = 'lucy'
// console.log(c) // {name: 'lucy'}
// console.log(c.__proto__) // {name: 'lily'}
// console.log(c.name) // lucy

function ten2two(n) {
  if (parseInt(n / 2) === 0) {
    return 1
  }
  let y = n % 2
  return ten2two(parseInt(n / 2)) + "" + y
}

let str = ten2two(111111)

function countOneNums(str) {
  let count = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "1") {
      count++
    }
  }
  console.log('1的个数=', count)
}

countOneNums(str)

// function command(str) {
//   let commandMap = new Map()
//   commandMap.set("reset", "reset what")
//   commandMap.set("reset board", "board fault")
//   commandMap.set("board add", "where to add")
//   commandMap.set("board delete", "no board at all")
//   commandMap.set("reboot backplane", "impossible")
//   commandMap.set("backplane abort", "install first")

//   let strArr = str.split(" ")
//   let count = 0
//   let matchKey = ""
//   if (strArr.length === 1) {
//     for (let [key, value] of commandMap) {
//       if (key.split(" ").length > 1) {
//         continue
//       }
//       if (key.indexOf(strArr[0]) > -1 && key.indexOf(strArr[0]) === 0) {
//         console.log(value)
//       } else {
//         console.log("unknown command")
//       }
//     }
//   } else {
//     for (let [key, value] of commandMap) {
//       if (key.split(" ").length === 1) {
//         continue
//       }
//       let keysArr = key.split(" ")
//       if (keysArr[0].indexOf(strArr[0]) > -1 && keysArr[0].indexOf(strArr[0]) === 0 &&
//         keysArr[1].indexOf(strArr[1]) > -1 && keysArr[1].indexOf(strArr[1]) === 0
//       ) {
//         count++
//         matchKey = key
//       }
//     }

//     if (count === 0) {
//       console.log('unknown command')
//     } else if (count > 1) {
//       console.log('unknown command')
//     } else if (count === 1) {
//       console.log(commandMap.get(matchKey))
//     }
//   }
// }

function fenjie(val) {
  let res = []
  let tmp = val
  for (let j = 2; j < val; j++) {
    if (tmp % j === 0) {
      tmp /= j
      res.push(j)
      j = 1
    }

    if (tmp === 1) {
      break
    }
  }
  return res.join("*") + "=" + val
}

console.log(fenjie(8))
