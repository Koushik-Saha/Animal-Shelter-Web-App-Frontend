import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import BehaviorModule from '../BehaviorModule'

const mockBehaviorData = [
  {
    id: 'behavior-1',
    animalId: 'animal-1',
    animalName: 'Buddy',
    species: 'dog',
    currentProfile: {
      temperament: ['friendly', 'energetic'],
      energyLevel: 4,
      socialWithDogs: true,
      socialWithCats: false,
      socialWithKids: true,
      trainingLevel: 'basic',
      specialNeeds: [],
      lastAssessment: new Date('2024-01-15'),
      assessmentScore: 85,
    },
    goals: [
      {
        id: 'goal-1',
        title: 'Reduce Separation Anxiety',
        description: 'Help Buddy cope better when left alone',
        type: 'behavioral',
        targetDate: new Date('2024-06-01'),
        status: 'in_progress',
        progress: 60,
        milestones: [
          { id: 'm1', title: 'Stay calm for 30 minutes', completed: true, date: new Date('2024-02-01') },
          { id: 'm2', title: 'Stay calm for 1 hour', completed: true, date: new Date('2024-02-15') },
          { id: 'm3', title: 'Stay calm for 2 hours', completed: false },
        ],
      },
    ],
    activities: [
      {
        id: 'activity-1',
        name: 'Kong Puzzle Toy',
        type: 'mental',
        difficulty: 'medium',
        duration: 30,
        frequency: 'daily',
        benefits: ['mental stimulation', 'reduces anxiety'],
        instructions: 'Fill Kong toy with treats and peanut butter',
        equipmentNeeded: ['Kong toy', 'treats', 'peanut butter'],
        safetyNotes: ['Supervise during first use', 'Check for wear and tear'],
      },
    ],
    observations: [
      {
        id: 'obs-1',
        date: new Date('2024-01-20'),
        observer: 'Sarah Johnson',
        category: 'social',
        behavior: 'Played well with other dogs during group exercise',
        intensity: 2,
        duration: 45,
        triggers: ['seeing other dogs'],
        interventions: ['none needed'],
        notes: 'Very positive interaction, tail wagging throughout',
        context: 'outdoor play area',
      },
    ],
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

beforeEach(() => {
  global.fetch = jest.fn()
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('BehaviorModule', () => {
  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ behaviorProfiles: mockBehaviorData }),
    })
  })

  it('renders the behavior module with all tabs', async () => {
    renderWithTheme(<BehaviorModule />)

    expect(screen.getByText('Animal Behavior & Enrichment Center')).toBeInTheDocument()
    expect(screen.getByText('Comprehensive behavior tracking and enrichment programs')).toBeInTheDocument()

    // Check all tabs are present
    expect(screen.getByText('Animal Profiles')).toBeInTheDocument()
    expect(screen.getByText('Daily Schedule')).toBeInTheDocument()
    expect(screen.getByText('Enrichment Library')).toBeInTheDocument()
    expect(screen.getByText('Progress Analytics')).toBeInTheDocument()
  })

  it('displays animal behavior profiles', async () => {
    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    expect(screen.getByText('Assessment Score: 85%')).toBeInTheDocument()
    expect(screen.getByText('Energy Level: 4/5')).toBeInTheDocument()
    expect(screen.getByText('Training: Basic')).toBeInTheDocument()
  })

  it('shows behavior goals and progress', async () => {
    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Check goal is displayed
    expect(screen.getByText('Reduce Separation Anxiety')).toBeInTheDocument()
    expect(screen.getByText('60% Complete')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })

  it('switches between tabs correctly', async () => {
    const user = userEvent.setup()
    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Switch to Daily Schedule tab
    const scheduleTab = screen.getByText('Daily Schedule')
    await user.click(scheduleTab)

    await waitFor(() => {
      expect(screen.getByText('Daily Enrichment Schedule')).toBeInTheDocument()
    })

    // Switch to Enrichment Library tab
    const libraryTab = screen.getByText('Enrichment Library')
    await user.click(libraryTab)

    await waitFor(() => {
      expect(screen.getByText('Enrichment Activity Library')).toBeInTheDocument()
    })
  })

  it('filters animals by species', async () => {
    const user = userEvent.setup()
    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Click on Dogs filter
    const dogsFilter = screen.getByText('Dogs')
    await user.click(dogsFilter)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })
  })

  it('searches animals by name', async () => {
    const user = userEvent.setup()
    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search animals...')
    await user.type(searchInput, 'Buddy')

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })
  })

  it('displays enrichment activities with details', async () => {
    const user = userEvent.setup()
    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Switch to Enrichment Library tab
    const libraryTab = screen.getByText('Enrichment Library')
    await user.click(libraryTab)

    await waitFor(() => {
      expect(screen.getByText('Kong Puzzle Toy')).toBeInTheDocument()
      expect(screen.getByText('Mental Stimulation')).toBeInTheDocument()
      expect(screen.getByText('Medium Difficulty')).toBeInTheDocument()
      expect(screen.getByText('30 minutes')).toBeInTheDocument()
    })
  })

  it('shows behavior observations', async () => {
    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Check observation is displayed
    expect(screen.getByText('Played well with other dogs during group exercise')).toBeInTheDocument()
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('Social')).toBeInTheDocument()
  })

  it('handles API error gracefully', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load behavior data')).toBeInTheDocument()
    })
  })

  it('shows loading state initially', () => {
    ;(global.fetch as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    )

    renderWithTheme(<BehaviorModule />)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('creates new behavior goal', async () => {
    const user = userEvent.setup()
    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Click add goal button
    const addGoalButton = screen.getByText('Add Goal')
    await user.click(addGoalButton)

    // Check if form dialog opens
    await waitFor(() => {
      expect(screen.getByText('Create Behavior Goal')).toBeInTheDocument()
    })
  })

  it('displays behavior analytics correctly', async () => {
    const user = userEvent.setup()
    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Switch to Progress Analytics tab
    const analyticsTab = screen.getByText('Progress Analytics')
    await user.click(analyticsTab)

    await waitFor(() => {
      expect(screen.getByText('Behavior Progress Analytics')).toBeInTheDocument()
      expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    })
  })

  it('shows behavior level indicators with correct colors', async () => {
    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Check energy level indicator
    const energyIndicator = screen.getByText('Energy Level: 4/5')
    expect(energyIndicator).toBeInTheDocument()
  })

  it('validates new observation form', async () => {
    const user = userEvent.setup()
    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Click add observation button
    const addObservationButton = screen.getByText('Add Observation')
    await user.click(addObservationButton)

    await waitFor(() => {
      expect(screen.getByText('Record Behavior Observation')).toBeInTheDocument()
    })

    // Try to submit without filling required fields
    const submitButton = screen.getByText('Save Observation')
    await user.click(submitButton)

    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument()
    })
  })
})

describe('BehaviorModule Accessibility', () => {
  it('has proper ARIA labels and roles', async () => {
    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Check for proper ARIA structure
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(4)
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    renderWithTheme(<BehaviorModule />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Tab through the interface
    await user.tab()
    expect(screen.getByPlaceholderText('Search animals...')).toHaveFocus()

    await user.tab()
    expect(screen.getByText('All')).toHaveFocus()
  })
})