import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AdoptionPortal from '../AdoptionPortal'

// Mock data
const mockAnimals = [
  {
    id: 'animal-1',
    name: 'Buddy',
    species: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'male',
    weight: 65,
    color: 'golden',
    description: 'Friendly and energetic dog looking for a loving home',
    status: 'available',
    intakeDate: new Date('2024-01-15'),
    photos: ['/buddy1.jpg', '/buddy2.jpg'],
    healthRecords: [],
    behaviorProfile: {
      temperament: ['friendly', 'energetic', 'loyal'],
      energyLevel: 4,
      socialWithDogs: true,
      socialWithCats: false,
      socialWithKids: true,
      trainingLevel: 'basic',
      specialNeeds: [],
    },
    adoptionRequirements: ['fenced yard', 'dog experience'],
    isSponsored: false,
  },
  {
    id: 'animal-2',
    name: 'Whiskers',
    species: 'cat',
    breed: 'Domestic Shorthair',
    age: 2,
    gender: 'female',
    weight: 10,
    color: 'black and white',
    description: 'Calm and affectionate cat who loves to cuddle',
    status: 'available',
    intakeDate: new Date('2024-02-01'),
    photos: ['/whiskers1.jpg'],
    healthRecords: [],
    behaviorProfile: {
      temperament: ['calm', 'affectionate'],
      energyLevel: 2,
      socialWithDogs: false,
      socialWithCats: true,
      socialWithKids: true,
      trainingLevel: 'none',
      specialNeeds: [],
    },
    adoptionRequirements: ['indoor only'],
    isSponsored: false,
  },
  {
    id: 'animal-3',
    name: 'Max',
    species: 'dog',
    breed: 'German Shepherd',
    age: 5,
    gender: 'male',
    weight: 80,
    color: 'brown and black',
    description: 'Protective and intelligent dog, needs experienced owner',
    status: 'available',
    intakeDate: new Date('2024-01-20'),
    photos: ['/max1.jpg'],
    healthRecords: [],
    behaviorProfile: {
      temperament: ['protective', 'intelligent', 'loyal'],
      energyLevel: 3,
      socialWithDogs: true,
      socialWithCats: false,
      socialWithKids: false,
      trainingLevel: 'advanced',
      specialNeeds: ['experienced owner required'],
    },
    adoptionRequirements: ['large yard', 'dog experience', 'no small children'],
    isSponsored: true,
  },
]

const theme = createTheme()

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

// Mock fetch for API calls
beforeEach(() => {
  global.fetch = jest.fn()
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('AdoptionPortal', () => {
  beforeEach(() => {
    // Mock successful API response
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ animals: mockAnimals }),
    })
  })

  it('renders the adoption portal with header and search', async () => {
    renderWithTheme(<AdoptionPortal />)

    expect(screen.getByText('Find Your Perfect Companion')).toBeInTheDocument()
    expect(screen.getByText('Discover loving animals waiting for their forever homes')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search by name, breed, or characteristics...')).toBeInTheDocument()
  })

  it('displays animals in grid layout', async () => {
    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
      expect(screen.getByText('Whiskers')).toBeInTheDocument()
      expect(screen.getByText('Max')).toBeInTheDocument()
    })

    // Check animal details are displayed
    expect(screen.getByText('Golden Retriever')).toBeInTheDocument()
    expect(screen.getByText('Domestic Shorthair')).toBeInTheDocument()
    expect(screen.getByText('German Shepherd')).toBeInTheDocument()
  })

  it('filters animals by species', async () => {
    const user = userEvent.setup()
    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Click on "Dogs" filter
    const dogsChip = screen.getByText('Dogs')
    await user.click(dogsChip)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
      expect(screen.getByText('Max')).toBeInTheDocument()
      expect(screen.queryByText('Whiskers')).not.toBeInTheDocument()
    })
  })

  it('filters animals by age group', async () => {
    const user = userEvent.setup()
    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Click on "Young" filter (1-3 years)
    const youngChip = screen.getByText('Young (1-3 years)')
    await user.click(youngChip)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument() // 3 years old
      expect(screen.getByText('Whiskers')).toBeInTheDocument() // 2 years old
      expect(screen.queryByText('Max')).not.toBeInTheDocument() // 5 years old
    })
  })

  it('searches animals by name', async () => {
    const user = userEvent.setup()
    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search by name, breed, or characteristics...')
    await user.type(searchInput, 'Buddy')

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
      expect(screen.queryByText('Whiskers')).not.toBeInTheDocument()
      expect(screen.queryByText('Max')).not.toBeInTheDocument()
    })
  })

  it('searches animals by breed', async () => {
    const user = userEvent.setup()
    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search by name, breed, or characteristics...')
    await user.type(searchInput, 'Golden')

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
      expect(screen.queryByText('Whiskers')).not.toBeInTheDocument()
      expect(screen.queryByText('Max')).not.toBeInTheDocument()
    })
  })

  it('shows animal details in dialog when View Details is clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Find and click the "View Details" button for Buddy
    const buddyCard = screen.getByText('Buddy').closest('.MuiCard-root')
    const viewDetailsButton = within(buddyCard!).getByText('View Details')
    await user.click(viewDetailsButton)

    // Check if dialog opens with animal details
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('Buddy - Golden Retriever')).toBeInTheDocument()
      expect(screen.getByText('Friendly and energetic dog looking for a loving home')).toBeInTheDocument()
    })
  })

  it('shows adoption application dialog when Apply to Adopt is clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Find and click the "Apply to Adopt" button for Buddy
    const buddyCard = screen.getByText('Buddy').closest('.MuiCard-root')
    const applyButton = within(buddyCard!).getByText('Apply to Adopt')
    await user.click(applyButton)

    // Check if adoption application dialog opens
    await waitFor(() => {
      expect(screen.getByText('Adoption Application')).toBeInTheDocument()
      expect(screen.getByText('Personal Information')).toBeInTheDocument()
    })
  })

  it('displays compatibility score', async () => {
    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Check for compatibility scores (should be displayed as percentages)
    const compatibilityElements = screen.getAllByText(/\d+% Match/)
    expect(compatibilityElements.length).toBeGreaterThan(0)
  })

  it('shows sponsored animals with special indicator', async () => {
    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Max')).toBeInTheDocument()
    })

    // Max is sponsored, should have a sponsor indicator
    const maxCard = screen.getByText('Max').closest('.MuiCard-root')
    expect(within(maxCard!).getByText('Sponsored')).toBeInTheDocument()
  })

  it('handles API error gracefully', async () => {
    // Mock API error
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load animals')).toBeInTheDocument()
    })
  })

  it('shows loading state initially', () => {
    // Mock delayed API response
    ;(global.fetch as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    )

    renderWithTheme(<AdoptionPortal />)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('filters out unavailable animals', async () => {
    const animalsWithUnavailable = [
      ...mockAnimals,
      {
        ...mockAnimals[0],
        id: 'animal-4',
        name: 'Adopted Dog',
        status: 'adopted',
      },
    ]

    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ animals: animalsWithUnavailable }),
    })

    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
      expect(screen.queryByText('Adopted Dog')).not.toBeInTheDocument()
    })
  })

  it('sorts animals correctly', async () => {
    const user = userEvent.setup()
    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Click sort by age
    const sortSelect = screen.getByRole('combobox', { name: /sort by/i })
    await user.click(sortSelect)

    const ageOption = screen.getByRole('option', { name: /age/i })
    await user.click(ageOption)

    // Animals should now be sorted by age
    // Whiskers (2), Buddy (3), Max (5)
    const animalCards = screen.getAllByTestId('animal-card')
    expect(within(animalCards[0]).getByText('Whiskers')).toBeInTheDocument()
    expect(within(animalCards[1]).getByText('Buddy')).toBeInTheDocument()
    expect(within(animalCards[2]).getByText('Max')).toBeInTheDocument()
  })

  it('validates adoption application form', async () => {
    const user = userEvent.setup()
    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Open adoption application
    const buddyCard = screen.getByText('Buddy').closest('.MuiCard-root')
    const applyButton = within(buddyCard!).getByText('Apply to Adopt')
    await user.click(applyButton)

    await waitFor(() => {
      expect(screen.getByText('Adoption Application')).toBeInTheDocument()
    })

    // Try to submit without filling required fields
    const submitButton = screen.getByText('Submit Application')
    await user.click(submitButton)

    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument()
    })
  })

  it('submits adoption application successfully', async () => {
    const user = userEvent.setup()

    // Mock successful application submission
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ animals: mockAnimals }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, applicationId: 'app-123' }),
      })

    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Open adoption application
    const buddyCard = screen.getByText('Buddy').closest('.MuiCard-root')
    const applyButton = within(buddyCard!).getByText('Apply to Adopt')
    await user.click(applyButton)

    await waitFor(() => {
      expect(screen.getByText('Adoption Application')).toBeInTheDocument()
    })

    // Fill out required fields
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/phone/i), '555-0123')

    // Submit application
    const submitButton = screen.getByText('Submit Application')
    await user.click(submitButton)

    // Should show success message
    await waitFor(() => {
      expect(screen.getByText(/application submitted successfully/i)).toBeInTheDocument()
    })
  })
})

describe('AdoptionPortal Accessibility', () => {
  it('has proper ARIA labels and roles', async () => {
    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Check for proper ARIA labels
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('search')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(6) // Various buttons in the interface

    // Check animal cards have proper structure
    const animalCards = screen.getAllByRole('article')
    expect(animalCards.length).toBe(3)
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    renderWithTheme(<AdoptionPortal />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Tab through the interface
    await user.tab()
    expect(screen.getByPlaceholderText('Search by name, breed, or characteristics...')).toHaveFocus()

    await user.tab()
    expect(screen.getByText('All')).toHaveFocus()
  })
})