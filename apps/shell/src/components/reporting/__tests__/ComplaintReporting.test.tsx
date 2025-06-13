import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import ComplaintReporting from '../ComplaintReporting'

const mockComplaintData = {
  complaints: [
    {
      id: 'complaint-1',
      reporterName: 'Jane Doe',
      reporterEmail: 'jane@example.com',
      reporterPhone: '555-0123',
      incidentType: 'neglect',
      severity: 'high',
      status: 'under_investigation',
      reportDate: new Date('2024-01-15T10:30:00Z'),
      incidentDate: new Date('2024-01-14T15:00:00Z'),
      location: {
        address: '123 Oak Street, City, State 12345',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        description: 'Residential property with backyard',
      },
      animalDetails: {
        species: 'dog',
        breed: 'Mixed',
        estimatedAge: 3,
        condition: 'malnourished',
        description: 'Medium-sized dog, appears underweight, visible ribs',
      },
      description: 'Dog appears to be severely underweight and is kept outside without adequate shelter.',
      evidence: [
        {
          id: 'evidence-1',
          type: 'photo',
          filename: 'dog_condition.jpg',
          description: 'Photo showing the dog\'s malnourished condition',
          uploadDate: new Date('2024-01-15T10:35:00Z'),
        },
        {
          id: 'evidence-2',
          type: 'photo',
          filename: 'shelter_conditions.jpg',
          description: 'Photo of inadequate shelter conditions',
          uploadDate: new Date('2024-01-15T10:37:00Z'),
        },
      ],
      assignedInvestigator: {
        id: 'investigator-1',
        name: 'Officer Smith',
        badge: 'AC001',
        phone: '555-0456',
        email: 'smith@animalcontrol.gov',
      },
      timeline: [
        {
          id: 'timeline-1',
          date: new Date('2024-01-15T10:30:00Z'),
          action: 'complaint_received',
          description: 'Initial complaint received and logged',
          performedBy: 'System',
        },
        {
          id: 'timeline-2',
          date: new Date('2024-01-15T11:00:00Z'),
          action: 'assigned_investigator',
          description: 'Case assigned to Officer Smith for investigation',
          performedBy: 'Supervisor Johnson',
        },
      ],
      priority: 'high',
      followUpRequired: true,
      nextFollowUpDate: new Date('2024-01-18T09:00:00Z'),
    },
    {
      id: 'complaint-2',
      reporterName: 'Anonymous',
      reporterEmail: 'anonymous@system.local',
      reporterPhone: null,
      incidentType: 'abandonment',
      severity: 'medium',
      status: 'resolved',
      reportDate: new Date('2024-01-10T14:20:00Z'),
      incidentDate: new Date('2024-01-10T12:00:00Z'),
      location: {
        address: 'City Park, Main Street entrance',
        coordinates: { lat: 40.7505, lng: -73.9934 },
        description: 'Public park near playground area',
      },
      animalDetails: {
        species: 'cat',
        breed: 'Domestic Shorthair',
        estimatedAge: 1,
        condition: 'healthy',
        description: 'Young cat, appears well-fed, friendly demeanor',
      },
      description: 'Cat found abandoned in park with note saying owner could no longer care for it.',
      resolution: 'Cat was rescued and placed in foster care. Successfully adopted after 2 weeks.',
      resolvedDate: new Date('2024-01-25T16:00:00Z'),
      priority: 'medium',
      followUpRequired: false,
    },
  ],
  analytics: {
    totalComplaints: 48,
    openCases: 12,
    resolvedCases: 36,
    averageResolutionTime: 14.5,
    complaintTypes: [
      { type: 'neglect', count: 18, percentage: 37.5 },
      { type: 'abandonment', count: 12, percentage: 25.0 },
      { type: 'abuse', count: 10, percentage: 20.8 },
      { type: 'hoarding', count: 8, percentage: 16.7 },
    ],
    monthlyTrends: [
      { month: 'Jan', received: 15, resolved: 12 },
      { month: 'Feb', received: 18, resolved: 16 },
      { month: 'Mar', received: 15, resolved: 8 },
    ],
  },
  emergencyProtocols: [
    {
      id: 'protocol-1',
      name: 'Immediate Danger Assessment',
      description: 'Protocol for cases involving immediate threat to animal life',
      steps: [
        'Contact law enforcement immediately',
        'Dispatch emergency response team',
        'Document scene thoroughly',
        'Secure animal if safe to do so',
        'Provide immediate medical attention',
      ],
      contactNumbers: ['911', '555-EMERGENCY'],
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

beforeEach(() => {
  global.fetch = jest.fn()
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('ComplaintReporting', () => {
  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockComplaintData,
    })
  })

  it('renders the complaint reporting system with all tabs', async () => {
    renderWithTheme(<ComplaintReporting />)

    expect(screen.getByText('Animal Welfare Complaint & Rescue Reporting')).toBeInTheDocument()
    expect(screen.getByText('Comprehensive system for reporting and tracking animal welfare concerns')).toBeInTheDocument()

    // Check all tabs are present
    expect(screen.getByText('Active Cases')).toBeInTheDocument()
    expect(screen.getByText('Emergency Protocols')).toBeInTheDocument()
    expect(screen.getByText('Legal Actions')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('displays active complaint cases', async () => {
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    expect(screen.getByText('Neglect Case')).toBeInTheDocument()
    expect(screen.getByText('High Severity')).toBeInTheDocument()
    expect(screen.getByText('Under Investigation')).toBeInTheDocument()
    expect(screen.getByText('Officer Smith')).toBeInTheDocument()
    expect(screen.getByText('123 Oak Street, City, State 12345')).toBeInTheDocument()
  })

  it('shows complaint details and evidence', async () => {
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    expect(screen.getByText('Dog appears to be severely underweight and is kept outside without adequate shelter.')).toBeInTheDocument()
    expect(screen.getByText('2 pieces of evidence')).toBeInTheDocument()
    expect(screen.getByText('dog_condition.jpg')).toBeInTheDocument()
    expect(screen.getByText('shelter_conditions.jpg')).toBeInTheDocument()
  })

  it('displays case timeline and actions', async () => {
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    expect(screen.getByText('Initial complaint received and logged')).toBeInTheDocument()
    expect(screen.getByText('Case assigned to Officer Smith for investigation')).toBeInTheDocument()
    expect(screen.getByText('Supervisor Johnson')).toBeInTheDocument()
  })

  it('filters complaints by status', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    // Filter by under_investigation status
    const investigationFilter = screen.getByText('Under Investigation')
    await user.click(investigationFilter)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
      expect(screen.queryByText('Anonymous')).not.toBeInTheDocument()
    })
  })

  it('filters complaints by severity', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    // Filter by high severity
    const highSeverityFilter = screen.getByText('High Severity')
    await user.click(highSeverityFilter)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
      expect(screen.queryByText('Anonymous')).not.toBeInTheDocument()
    })
  })

  it('shows emergency protocols', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    // Switch to Emergency Protocols tab
    const protocolsTab = screen.getByText('Emergency Protocols')
    await user.click(protocolsTab)

    await waitFor(() => {
      expect(screen.getByText('Emergency Response Protocols')).toBeInTheDocument()
      expect(screen.getByText('Immediate Danger Assessment')).toBeInTheDocument()
      expect(screen.getByText('Contact law enforcement immediately')).toBeInTheDocument()
      expect(screen.getByText('911')).toBeInTheDocument()
    })
  })

  it('displays analytics and metrics', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    // Switch to Analytics tab
    const analyticsTab = screen.getByText('Analytics')
    await user.click(analyticsTab)

    await waitFor(() => {
      expect(screen.getByText('Complaint Analytics')).toBeInTheDocument()
      expect(screen.getByText('Total Complaints: 48')).toBeInTheDocument()
      expect(screen.getByText('Open Cases: 12')).toBeInTheDocument()
      expect(screen.getByText('Resolved: 36')).toBeInTheDocument()
      expect(screen.getByText('Avg Resolution: 14.5 days')).toBeInTheDocument()
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument()
    })
  })

  it('creates new complaint report', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    // Click create complaint button
    const createButton = screen.getByText('File Complaint')
    await user.click(createButton)

    // Should show complaint form
    await waitFor(() => {
      expect(screen.getByText('File Animal Welfare Complaint')).toBeInTheDocument()
      expect(screen.getByLabelText('Reporter Name')).toBeInTheDocument()
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
      expect(screen.getByLabelText('Incident Type')).toBeInTheDocument()
    })
  })

  it('validates complaint form', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    const createButton = screen.getByText('File Complaint')
    await user.click(createButton)

    await waitFor(() => {
      expect(screen.getByText('File Animal Welfare Complaint')).toBeInTheDocument()
    })

    // Try to submit without required fields
    const submitButton = screen.getByText('Submit Complaint')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument()
    })
  })

  it('uploads evidence files', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    const createButton = screen.getByText('File Complaint')
    await user.click(createButton)

    await waitFor(() => {
      expect(screen.getByText('File Animal Welfare Complaint')).toBeInTheDocument()
    })

    // Check evidence upload section
    expect(screen.getByText('Upload Evidence')).toBeInTheDocument()
    expect(screen.getByText('Photos, videos, or documents')).toBeInTheDocument()
  })

  it('assigns investigator to case', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    // Click on case to view details
    const caseCard = screen.getByText('Jane Doe').closest('.MuiCard-root')
    const assignButton = within(caseCard!).getByText('Assign Investigator')
    await user.click(assignButton)

    await waitFor(() => {
      expect(screen.getByText('Assign Investigator')).toBeInTheDocument()
    })
  })

  it('updates case status', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    // Click on case to update status
    const caseCard = screen.getByText('Jane Doe').closest('.MuiCard-root')
    const updateButton = within(caseCard!).getByText('Update Status')
    await user.click(updateButton)

    await waitFor(() => {
      expect(screen.getByText('Update Case Status')).toBeInTheDocument()
    })
  })

  it('shows legal actions tab', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    // Switch to Legal Actions tab
    const legalTab = screen.getByText('Legal Actions')
    await user.click(legalTab)

    await waitFor(() => {
      expect(screen.getByText('Legal Actions & Prosecutions')).toBeInTheDocument()
    })
  })

  it('searches complaints by reporter name', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search complaints...')
    await user.type(searchInput, 'Jane')

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
      expect(screen.queryByText('Anonymous')).not.toBeInTheDocument()
    })
  })

  it('shows follow-up reminders', async () => {
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    expect(screen.getByText('Follow-up Required')).toBeInTheDocument()
    expect(screen.getByText('Next Follow-up: Jan 18, 2024')).toBeInTheDocument()
  })

  it('handles anonymous reporting', async () => {
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Anonymous')).toBeInTheDocument()
    })

    expect(screen.getByText('Abandonment Case')).toBeInTheDocument()
    expect(screen.getByText('Resolved')).toBeInTheDocument()
  })

  it('displays complaint resolution details', async () => {
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Anonymous')).toBeInTheDocument()
    })

    expect(screen.getByText('Cat was rescued and placed in foster care. Successfully adopted after 2 weeks.')).toBeInTheDocument()
  })

  it('handles API error gracefully', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load complaint data')).toBeInTheDocument()
    })
  })

  it('shows loading state initially', () => {
    ;(global.fetch as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    )

    renderWithTheme(<ComplaintReporting />)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})

describe('ComplaintReporting Accessibility', () => {
  it('has proper ARIA labels and roles', async () => {
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(4)
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ComplaintReporting />)

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })

    await user.tab()
    expect(screen.getByPlaceholderText('Search complaints...')).toHaveFocus()

    await user.tab()
    expect(screen.getByText('All')).toHaveFocus()
  })
})