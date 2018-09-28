// 截取字符串，如若超过maxLength长度则截取，否则直接返回
export function lengthInterception (obj, maxLength) {
  if (obj == null || obj === '') {
    return ''
  } else {
    var len = obj.length
    if (len > maxLength) {
      return obj.substring(0, maxLength) + '...'
    } else {
      return obj
    }
  }
}
