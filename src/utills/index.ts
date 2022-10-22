export const isWhatTime = () => {
  const timeStamp = new Date()

  const hour = timeStamp.getHours()

  return hour >= 0 && hour < 6 ? '凌晨' : hour >= 6 && hour < 12 ? '早上' : hour >= 12 && hour < 18 ? '下午' : '晚上'
}
