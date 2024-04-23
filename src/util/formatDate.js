export default function formatDate(val) {
  const date1 = new Date(val)
  const date2 = new Date()
  const diffTime = Math.abs(date1 - date2)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  let minutes = Math.ceil(diffTime / 60000)
  let hours = Math.ceil(diffTime / (1000 * 60 * 60))
  if (minutes < 1) {
    return 'Just a moment ago'
  } else if (minutes < 60) {
    if (minutes === 1) {
      return `${minutes} minute ago`
    }
    return `${minutes} minutes ago`
  } else if (minutes < 1200) {
    if (minutes === 60) {
      return `${hours} hour ago`
    }
    return `${hours} hours ago`
  } else if (minutes < 8040) {
    if (minutes === 1200) {
      return `${diffDays} day ago`
    }
    return `${diffDays} days ago`
  } else {
    return `${convertDigit(date1.getMonth() + 1)}/${convertDigit(
      date1.getDate()
    )}/${date1.getFullYear()}`
  }
}

function convertDigit(val) {
  return val > 9 ? val : '0' + val
}
