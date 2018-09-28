export function
changeDateFormat (cellval, formatStr) {
  var dateVal = cellval + ''
  if (cellval != null) {
    var date = new Date(parseInt(dateVal.replace('/Date(', '').replace(')/', ''), 10))
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    if (formatStr === 'yyyy-MM-dd HH:mm:ss') {
      return date.getFullYear() + '-' + month + '-' + currentDate + ' ' + hours + ':' + minutes + ':' + seconds
    } else if (formatStr === 'yyyy-MM-dd') {
      return date.getFullYear() + '-' + month + '-' + currentDate
    } else if (formatStr === 'yyyy-MM') {
      return date.getFullYear() + '-' + month
    } else if (formatStr === 'dd') {
      return currentDate
    } else if (formatStr === 'yyyy年MM月dd日') {
      return date.getFullYear() + '年' + month + '月' + currentDate + '日'
    }
  }
}
