// Utility functions for testing and general app use

const formatDisplayName = (name, species) => {
  const displayName = name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Unknown'
  const displaySpecies = species ? species.charAt(0).toUpperCase() + species.slice(1) : 'Unknown'
  return `${displayName} (${displaySpecies})`
}

const getStatusColor = (status) => {
  switch (status) {
    case 'available':
      return 'success'
    case 'adopted':
      return 'info'
    case 'medical_hold':
    case 'pending':
      return 'warning'
    case 'quarantine':
    case 'unavailable':
      return 'error'
    default:
      return 'default'
  }
}

const calculateCompletionPercentage = (completed, total) => {
  if (total <= 0) return 0
  if (completed < 0) return 0
  if (completed > total) return 100
  
  return Math.round((completed / total) * 100)
}

const generateTestId = (component, id) => {
  return id ? `${component}-${id}` : component
}

const mockAnimalData = {
  id: 'test-animal-1',
  name: 'Test Dog',
  species: 'dog',
  breed: 'Labrador',
  age: 2,
  gender: 'male',
  weight: 25,
  color: 'brown',
  description: 'Friendly test dog',
  status: 'available',
  intakeDate: new Date('2024-01-01'),
  photos: ['/test-photo.jpg'],
  healthRecords: [],
  behaviorProfile: {
    temperament: ['friendly'],
    energyLevel: 3,
    socialWithDogs: true,
    socialWithCats: true,
    socialWithKids: true,
    trainingLevel: 'basic',
  },
}

const mockUserData = {
  id: 'test-user-1',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  phone: '555-0123',
  address: {
    street: '123 Test St',
    city: 'Test City',
    state: 'TS',
    zipCode: '12345',
    country: 'USA',
  },
  role: 'adopter',
  applications: [],
  donations: [],
}

module.exports = {
  formatDisplayName,
  getStatusColor,
  calculateCompletionPercentage,
  generateTestId,
  mockAnimalData,
  mockUserData,
}