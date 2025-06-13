export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export const formatNumber = (num: number, decimals = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

export const formatPercentage = (value: number, decimals = 1): string => {
  return `${formatNumber(value, decimals)}%`
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export const formatWeight = (weightInPounds: number): string => {
  if (weightInPounds < 1) {
    const ounces = Math.round(weightInPounds * 16)
    return `${ounces} oz`
  }
  
  if (weightInPounds >= 1000) {
    return `${formatNumber(weightInPounds)} lbs`
  }
  
  return `${formatNumber(weightInPounds, 1)} lbs`
}

export const formatDistance = (distanceInMiles: number): string => {
  if (distanceInMiles < 0.1) {
    const feet = Math.round(distanceInMiles * 5280)
    return `${feet} ft`
  }
  
  if (distanceInMiles < 1) {
    return `${formatNumber(distanceInMiles, 1)} mi`
  }
  
  return `${formatNumber(distanceInMiles, 0)} mi`
}

export const formatTemperature = (tempInFahrenheit: number): string => {
  return `${formatNumber(tempInFahrenheit, 1)}°F`
}