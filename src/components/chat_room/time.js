 function generateTime(){
  let result = []
  for (let i = 0; i < 24; i++) {
    let tempObj1 = {
      text: (i >= 10 ? i + "" : "0" + i) + ":00",
      value: (i >= 10 ? i + "" : "0" + i) + ":00"
    }
    let tempObj2 = {
      text: (i >= 10 ? i + "" : "0" + i) + ":30",
      value: (i >= 10 ? i + "" : "0" + i) + ":30"
    }
    result.push(tempObj1, tempObj2)
  }
  return result
}
var time = generateTime()
export default time