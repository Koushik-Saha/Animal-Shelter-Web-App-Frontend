import { capitalize, kebabCase, camelCase } from 'lodash'

export const capitalizeFirst = (str: string): string => {
  return capitalize(str)
}

export const capitalizeWords = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

export const generateSlug = (text: string): string => {
  return kebabCase(text.toLowerCase())
}

export const toCamelCase = (str: string): string => {
  return camelCase(str)
}

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  
  return phone
}

export const maskEmail = (email: string): string => {
  const [name, domain] = email.split('@')
  if (name.length <= 2) return email
  
  const maskedName = name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1)
  return `${maskedName}@${domain}`
}

export const generateInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
}