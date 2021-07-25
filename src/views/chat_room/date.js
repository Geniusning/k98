function generateDate () {
  let result = []
  let  NowMonthlen = getNowMonthDays()
  let { nextMonthDays, nextMonth} = getNextMonthDays()
  let month = new Date().getMonth()+1
  let start = new Date().getDate()
  for (let i = start; i <= NowMonthlen; i++) {
    let temp = {
      text: `${month}月${i}号${new Date().getDate() === i ? "(今天)" : ""}`,
      value: `${month}月${i}号`
    }
    result.push(temp)
  }
  for (let i = 1; i <= nextMonthDays; i++) {
    let temp = {
      text: `${nextMonth}月${i}号`,
      value: `${nextMonth}月${i}号`
    }
    result.push(temp)
  }
  return result
}

// getNowMonthDays 获取当月多少天
function getNowMonthDays(){
  var date = new Date()
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var lastDay = new Date(year, month, 0).getDate()
  return lastDay
}
// getNextMonthDays 获取下个月多少天
function getNextMonthDays(){
  var date = new Date()
  var year = date.getFullYear();
  var month = date.getMonth() + 2;
  var lastDay = new Date(year, month, 0).getDate()
  var month = new Date(year, month, 0).getMonth() +1
  return { nextMonthDays: lastDay, nextMonth: month}
}
var date = generateDate()

export default date

