import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import TransportTracker from '../TransportTracker'

const mockTransportData = {
  operations: [
    {
      id: 'transport-1',
      animalId: 'animal-1',
      animalName: 'Buddy',
      fromLocation: {
        name: 'Downtown Shelter',
        address: '123 Main St, City, State 12345',
        coordinates: { lat: 40.7128, lng: -74.0060 },
      },
      toLocation: {
        name: 'Veterinary Clinic',
        address: '456 Oak Ave, City, State 12345',
        coordinates: { lat: 40.7589, lng: -73.9851 },
      },
      transportType: 'medical',
      priority: 'high',
      status: 'in_transit',
      scheduledDepartureTime: new Date('2024-01-15T09:00:00Z'),
      actualDepartureTime: new Date('2024-01-15T09:15:00Z'),
      estimatedArrivalTime: new Date('2024-01-15T10:30:00Z'),
      currentLocation: { lat: 40.7356, lng: -73.9942 },
      progress: 65,
      driver: {
        id: 'driver-1',
        name: 'John Smith',
        phone: '555-0123',
        licenseNumber: 'DL123456',
        rating: 4.8,
      },
      vehicle: {
        id: 'vehicle-1',
        make: 'Ford',
        model: 'Transit',
        year: 2022,
        licensePlate: 'ABC-123',
        capacity: 8,
        currentOccupancy: 2,
      },
      route: {
        distance: 15.2,
        estimatedDuration: 90,
        waypoints: [
          { lat: 40.7128, lng: -74.0060, timestamp: new Date('2024-01-15T09:15:00Z') },
          { lat: 40.7356, lng: -73.9942, timestamp: new Date('2024-01-15T10:00:00Z') },
        ],
      },
    },
    {
      id: 'transport-2',
      animalId: 'animal-2',
      animalName: 'Whiskers',
      fromLocation: {
        name: 'Foster Home',
        address: '789 Pine St, City, State 12345',
        coordinates: { lat: 40.7831, lng: -73.9712 },
      },
      toLocation: {
        name: 'Adoption Center',
        address: '321 Elm St, City, State 12345',
        coordinates: { lat: 40.7505, lng: -73.9934 },
      },
      transportType: 'adoption',
      priority: 'medium',
      status: 'scheduled',
      scheduledDepartureTime: new Date('2024-01-15T14:00:00Z'),
      estimatedArrivalTime: new Date('2024-01-15T15:15:00Z'),
      driver: {
        id: 'driver-2',
        name: 'Sarah Johnson',
        phone: '555-0456',
        licenseNumber: 'DL789012',
        rating: 4.9,
      },
      vehicle: {
        id: 'vehicle-2',
        make: 'Honda',
        model: 'Pilot',
        year: 2021,
        licensePlate: 'XYZ-789',
        capacity: 6,
        currentOccupancy: 0,
      },
    },
  ],
  analytics: {
    totalTransports: 125,
    completedTransports: 118,
    activeTransports: 3,
    averageDeliveryTime: 85,
    onTimeDeliveryRate: 94.2,
    monthlyStats: [
      { month: 'Jan', completed: 35, onTime: 33 },
      { month: 'Feb', completed: 42, onTime: 40 },
      { month: 'Mar', completed: 38, onTime: 36 },
    ],
  },
  fleet: [
    {
      id: 'vehicle-1',
      make: 'Ford',
      model: 'Transit',
      year: 2022,
      licensePlate: 'ABC-123',
      capacity: 8,
      currentOccupancy: 2,
      status: 'in_use',
      lastMaintenance: new Date('2024-01-01'),
      nextMaintenanceDue: new Date('2024-04-01'),
      fuelLevel: 75,
      location: { lat: 40.7356, lng: -73.9942 },
    },
    {
      id: 'vehicle-2',
      make: 'Honda',
      model: 'Pilot',
      year: 2021,
      licensePlate: 'XYZ-789',
      capacity: 6,
      currentOccupancy: 0,
      status: 'available',
      lastMaintenance: new Date('2024-01-10'),
      nextMaintenanceDue: new Date('2024-04-10'),
      fuelLevel: 90,
      location: { lat: 40.7505, lng: -73.9934 },
    },
  ],
}

const theme = createTheme()

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
}

beforeEach(() => {
  global.fetch = jest.fn()
  Object.defineProperty(global.navigator, 'geolocation', {
    value: mockGeolocation,
    writable: true,
  })
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('TransportTracker', () => {
  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockTransportData,
    })
  })

  it('renders the transport tracker with all tabs', async () => {
    renderWithTheme(<TransportTracker />)

    expect(screen.getByText('Transport & Relocation Tracker')).toBeInTheDocument()
    expect(screen.getByText('Real-time GPS tracking and fleet management for animal transport operations')).toBeInTheDocument()

    // Check all tabs are present
    expect(screen.getByText('Active Transports')).toBeInTheDocument()
    expect(screen.getByText('Fleet Management')).toBeInTheDocument()
    expect(screen.getByText('Driver Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('displays active transport operations', async () => {
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    expect(screen.getByText('Downtown Shelter → Veterinary Clinic')).toBeInTheDocument()
    expect(screen.getByText('Medical Transport')).toBeInTheDocument()
    expect(screen.getByText('High Priority')).toBeInTheDocument()
    expect(screen.getByText('In Transit')).toBeInTheDocument()
    expect(screen.getByText('65% Complete')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
  })

  it('shows real-time progress tracking', async () => {
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Check progress indicator
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '65')
  })

  it('displays fleet management information', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Switch to Fleet Management tab
    const fleetTab = screen.getByText('Fleet Management')
    await user.click(fleetTab)

    await waitFor(() => {
      expect(screen.getByText('Fleet Overview')).toBeInTheDocument()
      expect(screen.getByText('Ford Transit 2022')).toBeInTheDocument()
      expect(screen.getByText('Honda Pilot 2021')).toBeInTheDocument()
      expect(screen.getByText('ABC-123')).toBeInTheDocument()
      expect(screen.getByText('XYZ-789')).toBeInTheDocument()
    })
  })

  it('shows vehicle status and capacity', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Switch to Fleet Management tab
    const fleetTab = screen.getByText('Fleet Management')
    await user.click(fleetTab)

    await waitFor(() => {
      expect(screen.getByText('In Use')).toBeInTheDocument()
      expect(screen.getByText('Available')).toBeInTheDocument()
      expect(screen.getByText('2/8 capacity')).toBeInTheDocument()
      expect(screen.getByText('0/6 capacity')).toBeInTheDocument()
      expect(screen.getByText('Fuel: 75%')).toBeInTheDocument()
      expect(screen.getByText('Fuel: 90%')).toBeInTheDocument()
    })
  })

  it('displays driver dashboard', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Switch to Driver Dashboard tab
    const driverTab = screen.getByText('Driver Dashboard')
    await user.click(driverTab)

    await waitFor(() => {
      expect(screen.getByText('Driver Performance Dashboard')).toBeInTheDocument()
      expect(screen.getByText('John Smith')).toBeInTheDocument()
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      expect(screen.getByText('Rating: 4.8/5')).toBeInTheDocument()
      expect(screen.getByText('Rating: 4.9/5')).toBeInTheDocument()
    })
  })

  it('shows transport analytics', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Switch to Analytics tab
    const analyticsTab = screen.getByText('Analytics')
    await user.click(analyticsTab)

    await waitFor(() => {
      expect(screen.getByText('Transport Analytics')).toBeInTheDocument()
      expect(screen.getByText('Total Transports: 125')).toBeInTheDocument()
      expect(screen.getByText('Completed: 118')).toBeInTheDocument()
      expect(screen.getByText('Active: 3')).toBeInTheDocument()
      expect(screen.getByText('On-Time Rate: 94.2%')).toBeInTheDocument()
      expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    })
  })

  it('filters transports by status', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Filter by in_transit status
    const inTransitFilter = screen.getByText('In Transit')
    await user.click(inTransitFilter)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
      expect(screen.queryByText('Whiskers')).not.toBeInTheDocument()
    })
  })

  it('filters transports by priority', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Filter by high priority
    const highPriorityFilter = screen.getByText('High Priority')
    await user.click(highPriorityFilter)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
      expect(screen.queryByText('Whiskers')).not.toBeInTheDocument()
    })
  })

  it('shows transport route on map', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Click on transport to view details
    const transportCard = screen.getByText('Buddy').closest('.MuiCard-root')
    const viewRouteButton = within(transportCard!).getByText('View Route')
    await user.click(viewRouteButton)

    // Should show map dialog
    await waitFor(() => {
      expect(screen.getByText('Transport Route')).toBeInTheDocument()
      expect(screen.getByTestId('transport-map')).toBeInTheDocument()
    })
  })

  it('creates new transport operation', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Click create transport button
    const createButton = screen.getByText('Schedule Transport')
    await user.click(createButton)

    // Should show transport form
    await waitFor(() => {
      expect(screen.getByText('Schedule New Transport')).toBeInTheDocument()
      expect(screen.getByLabelText('Animal')).toBeInTheDocument()
      expect(screen.getByLabelText('From Location')).toBeInTheDocument()
      expect(screen.getByLabelText('To Location')).toBeInTheDocument()
    })
  })

  it('validates transport form', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    const createButton = screen.getByText('Schedule Transport')
    await user.click(createButton)

    await waitFor(() => {
      expect(screen.getByText('Schedule New Transport')).toBeInTheDocument()
    })

    // Try to submit without required fields
    const submitButton = screen.getByText('Schedule Transport')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument()
    })
  })

  it('shows emergency protocols', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Click emergency button
    const emergencyButton = screen.getByText('Emergency Protocol')
    await user.click(emergencyButton)

    await waitFor(() => {
      expect(screen.getByText('Emergency Response Protocol')).toBeInTheDocument()
      expect(screen.getByText('Contact Emergency Services')).toBeInTheDocument()
      expect(screen.getByText('Notify Shelter Management')).toBeInTheDocument()
    })
  })

  it('tracks vehicle maintenance schedules', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Switch to Fleet Management tab
    const fleetTab = screen.getByText('Fleet Management')
    await user.click(fleetTab)

    await waitFor(() => {
      expect(screen.getByText('Next Maintenance: Apr 1, 2024')).toBeInTheDocument()
      expect(screen.getByText('Next Maintenance: Apr 10, 2024')).toBeInTheDocument()
    })
  })

  it('updates transport status', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Click on transport card
    const transportCard = screen.getByText('Buddy').closest('.MuiCard-root')
    const updateStatusButton = within(transportCard!).getByText('Update Status')
    await user.click(updateStatusButton)

    await waitFor(() => {
      expect(screen.getByText('Update Transport Status')).toBeInTheDocument()
    })
  })

  it('handles geolocation error gracefully', async () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success, error) => {
      error({ code: 1, message: 'Permission denied' })
    })

    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    // Should still render without location
    expect(screen.getByText('Downtown Shelter → Veterinary Clinic')).toBeInTheDocument()
  })

  it('handles API error gracefully', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load transport data')).toBeInTheDocument()
    })
  })

  it('shows loading state initially', () => {
    ;(global.fetch as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    )

    renderWithTheme(<TransportTracker />)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})

describe('TransportTracker Accessibility', () => {
  it('has proper ARIA labels and roles', async () => {
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(4)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TransportTracker />)

    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument()
    })

    await user.tab()
    expect(screen.getByText('All')).toHaveFocus()

    await user.tab()
    expect(screen.getByText('Schedule Transport')).toHaveFocus()
  })
})