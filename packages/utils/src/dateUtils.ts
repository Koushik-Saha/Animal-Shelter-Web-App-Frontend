import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns'

export const formatDate = (date: Date | string | null): string => {
  if (!date) return ''
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (!isValid(dateObj)) return ''
  
  return format(dateObj, 'MMM dd, yyyy')
}

export const formatDateTime = (date: Date | string | null): string => {
  if (!date) return ''
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (!isValid(dateObj)) return ''
  
  return format(dateObj, 'MMM dd, yyyy HH:mm')
}

export const formatTimeAgo = (date: Date | string | null): string => {
  if (!date) return ''
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (!isValid(dateObj)) return ''
  
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

export const calculateAge = (birthDate: Date | string): number => {
  if (!birthDate) return 0
  
  const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate
  const today = new Date()
  
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}