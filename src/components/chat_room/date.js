 function generateDate () {
  let result = []
  for (let i = 1;i<32;i++){
    let temp = {
      text: `${i}号${new Date().getDate()===i?"(今天)":""}`,
      value:i
    }
    result.push(temp)
  }
  return result
} 
var date = generateDate()

export default date

