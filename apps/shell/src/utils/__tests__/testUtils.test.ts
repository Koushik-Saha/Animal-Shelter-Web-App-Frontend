// Basic utility functions for testing
const { formatDisplayName, getStatusColor, calculateCompletionPercentage } = require('../testUtils.js')

describe('Test Utilities', () => {
  describe('formatDisplayName', () => {
    it('should format animal display name correctly', () => {
      expect(formatDisplayName('buddy', 'dog')).toBe('Buddy (Dog)')
      expect(formatDisplayName('whiskers', 'cat')).toBe('Whiskers (Cat)')
      expect(formatDisplayName('', 'dog')).toBe('Unknown (Dog)')
    })

    it('should handle empty inputs gracefully', () => {
      expect(formatDisplayName('', '')).toBe('Unknown (Unknown)')
      expect(formatDisplayName('buddy', '')).toBe('Buddy (Unknown)')
    })
  })

  describe('getStatusColor', () => {
    it('should return correct colors for status', () => {
      expect(getStatusColor('available')).toBe('success')
      expect(getStatusColor('adopted')).toBe('info')
      expect(getStatusColor('medical_hold')).toBe('warning')
      expect(getStatusColor('quarantine')).toBe('error')
      expect(getStatusColor('unknown_status')).toBe('default')
    })
  })

  describe('calculateCompletionPercentage', () => {
    it('should calculate completion percentage correctly', () => {
      expect(calculateCompletionPercentage(5, 10)).toBe(50)
      expect(calculateCompletionPercentage(0, 10)).toBe(0)
      expect(calculateCompletionPercentage(10, 10)).toBe(100)
    })

    it('should handle edge cases', () => {
      expect(calculateCompletionPercentage(5, 0)).toBe(0)
      expect(calculateCompletionPercentage(-1, 10)).toBe(0)
      expect(calculateCompletionPercentage(15, 10)).toBe(100)
    })
  })
})