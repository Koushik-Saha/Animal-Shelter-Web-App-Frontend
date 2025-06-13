import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import PWASettings from '../PWASettings'

const mockPWAData = {
  installationStatus: {
    isInstallable: true,
    isInstalled: false,
    platform: 'web',
    canPromptInstall: true,
  },
  cacheStatus: {
    totalCacheSize: 15.7, // MB
    availableStorage: 120.5, // MB
    lastCacheUpdate: new Date('2024-01-15T10:30:00Z'),
    cacheHitRate: 94.2,
    cachedResources: [
      { type: 'pages', count: 25, size: 2.1 },
      { type: 'images', count: 150, size: 8.3 },
      { type: 'scripts', count: 45, size: 3.8 },
      { type: 'styles', count: 20, size: 1.5 },
    ],
  },
  serviceWorkerStatus: {
    isActive: true,
    version: '1.0.5',
    lastUpdate: new Date('2024-01-14T16:20:00Z'),
    updateAvailable: true,
    scope: '/',
    state: 'activated',
  },
  notificationSettings: {
    permission: 'granted',
    enabled: true,
    categories: {
      adoptions: true,
      events: true,
      emergencies: true,
      reminders: false,
      newsletters: false,
    },
    frequency: 'daily',
  },
  offlineCapabilities: {
    enabledFeatures: [
      'animal_browsing',
      'adoption_applications',
      'event_viewing',
      'volunteer_scheduling',
    ],
    unavailableFeatures: [
      'payment_processing',
      'real_time_chat',
      'live_streaming',
    ],
    lastSync: new Date('2024-01-15T09:45:00Z'),
    pendingActions: 3,
  },
  performance: {
    loadTime: 1.2,
    cacheHitRate: 94.2,
    offlineUsageHours: 8.5,
    dataUsageSaved: 45.7, // MB
  },
}

const theme = createTheme()

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

// Mock PWA APIs
const mockServiceWorker = {
  register: jest.fn(() => Promise.resolve()),
  update: jest.fn(() => Promise.resolve()),
  unregister: jest.fn(() => Promise.resolve()),
}

beforeEach(() => {
  global.fetch = jest.fn()
  
  // Mock navigator.serviceWorker
  Object.defineProperty(navigator, 'serviceWorker', {
    value: mockServiceWorker,
    writable: true,
  })

  // Mock Notification API
  global.Notification = {
    permission: 'granted',
    requestPermission: jest.fn(() => Promise.resolve('granted')),
  } as any

  // Mock beforeinstallprompt event
  ;(window as any).deferredPrompt = {
    prompt: jest.fn(() => Promise.resolve()),
    userChoice: Promise.resolve({ outcome: 'accepted' }),
  }
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('PWASettings', () => {
  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockPWAData,
    })
  })

  it('renders PWA settings with all sections', async () => {
    renderWithTheme(<PWASettings />)

    expect(screen.getByText('Progressive Web App Settings')).toBeInTheDocument()
    expect(screen.getByText('Manage app installation, notifications, and offline capabilities')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('App Installation')).toBeInTheDocument()
      expect(screen.getByText('Cache Management')).toBeInTheDocument()
      expect(screen.getByText('Notifications')).toBeInTheDocument()
      expect(screen.getByText('Offline Features')).toBeInTheDocument()
    })
  })

  it('displays installation status and controls', async () => {
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Install App')).toBeInTheDocument()
      expect(screen.getByText('App can be installed for better performance')).toBeInTheDocument()
      expect(screen.getByText('Not Installed')).toBeInTheDocument()
    })
  })

  it('shows cache management information', async () => {
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Cache Size: 15.7 MB')).toBeInTheDocument()
      expect(screen.getByText('Available: 120.5 MB')).toBeInTheDocument()
      expect(screen.getByText('Hit Rate: 94.2%')).toBeInTheDocument()
      expect(screen.getByText('Pages: 25 (2.1 MB)')).toBeInTheDocument()
      expect(screen.getByText('Images: 150 (8.3 MB)')).toBeInTheDocument()
    })
  })

  it('displays service worker status', async () => {
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Service Worker: Active')).toBeInTheDocument()
      expect(screen.getByText('Version: 1.0.5')).toBeInTheDocument()
      expect(screen.getByText('Update Available')).toBeInTheDocument()
    })
  })

  it('shows notification settings', async () => {
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Notifications Enabled')).toBeInTheDocument()
      expect(screen.getByText('Permission: Granted')).toBeInTheDocument()
    })

    // Check notification categories
    expect(screen.getByLabelText('Adoption Updates')).toBeChecked()
    expect(screen.getByLabelText('Event Notifications')).toBeChecked()
    expect(screen.getByLabelText('Emergency Alerts')).toBeChecked()
    expect(screen.getByLabelText('Reminders')).not.toBeChecked()
    expect(screen.getByLabelText('Newsletters')).not.toBeChecked()
  })

  it('displays offline capabilities', async () => {
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Offline Features')).toBeInTheDocument()
      expect(screen.getByText('Animal Browsing')).toBeInTheDocument()
      expect(screen.getByText('Adoption Applications')).toBeInTheDocument()
      expect(screen.getByText('Event Viewing')).toBeInTheDocument()
      expect(screen.getByText('Volunteer Scheduling')).toBeInTheDocument()
    })

    expect(screen.getByText('3 pending actions')).toBeInTheDocument()
  })

  it('installs the PWA when install button is clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Install App')).toBeInTheDocument()
    })

    const installButton = screen.getByText('Install App')
    await user.click(installButton)

    await waitFor(() => {
      expect((window as any).deferredPrompt.prompt).toHaveBeenCalled()
    })
  })

  it('clears cache when clear button is clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Clear Cache')).toBeInTheDocument()
    })

    const clearButton = screen.getByText('Clear Cache')
    await user.click(clearButton)

    // Should show confirmation dialog
    await waitFor(() => {
      expect(screen.getByText('Clear App Cache')).toBeInTheDocument()
      expect(screen.getByText('This will remove all cached data and may affect offline functionality.')).toBeInTheDocument()
    })

    const confirmButton = screen.getByText('Clear All Cache')
    await user.click(confirmButton)

    await waitFor(() => {
      expect(screen.getByText('Cache cleared successfully')).toBeInTheDocument()
    })
  })

  it('updates service worker when update button is clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Update Available')).toBeInTheDocument()
    })

    const updateButton = screen.getByText('Update App')
    await user.click(updateButton)

    expect(mockServiceWorker.update).toHaveBeenCalled()
  })

  it('toggles notification categories', async () => {
    const user = userEvent.setup()
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByLabelText('Reminders')).not.toBeChecked()
    })

    const remindersToggle = screen.getByLabelText('Reminders')
    await user.click(remindersToggle)

    await waitFor(() => {
      expect(remindersToggle).toBeChecked()
    })
  })

  it('requests notification permission when needed', async () => {
    // Mock denied permission
    global.Notification.permission = 'default'
    
    const user = userEvent.setup()
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Enable Notifications')).toBeInTheDocument()
    })

    const enableButton = screen.getByText('Enable Notifications')
    await user.click(enableButton)

    expect(global.Notification.requestPermission).toHaveBeenCalled()
  })

  it('shows performance metrics', async () => {
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Performance')).toBeInTheDocument()
      expect(screen.getByText('Load Time: 1.2s')).toBeInTheDocument()
      expect(screen.getByText('Data Saved: 45.7 MB')).toBeInTheDocument()
      expect(screen.getByText('Offline Usage: 8.5 hours')).toBeInTheDocument()
    })
  })

  it('syncs offline data when sync button is clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Sync Offline Data')).toBeInTheDocument()
    })

    const syncButton = screen.getByText('Sync Offline Data')
    await user.click(syncButton)

    await waitFor(() => {
      expect(screen.getByText('Syncing data...')).toBeInTheDocument()
    })
  })

  it('shows storage usage breakdown', async () => {
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Storage Usage')).toBeInTheDocument()
    })

    // Check storage breakdown chart
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument()
  })

  it('handles storage quota exceeded', async () => {
    // Mock storage quota exceeded scenario
    const limitedStorageData = {
      ...mockPWAData,
      cacheStatus: {
        ...mockPWAData.cacheStatus,
        totalCacheSize: 95.2,
        availableStorage: 2.1,
      }
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => limitedStorageData,
    })

    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Storage Warning')).toBeInTheDocument()
      expect(screen.getByText('Low storage space available')).toBeInTheDocument()
    })
  })

  it('displays offline feature availability', async () => {
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Available Offline')).toBeInTheDocument()
      expect(screen.getByText('Unavailable Offline')).toBeInTheDocument()
    })

    expect(screen.getByText('Payment Processing')).toBeInTheDocument()
    expect(screen.getByText('Real-time Chat')).toBeInTheDocument()
    expect(screen.getByText('Live Streaming')).toBeInTheDocument()
  })

  it('shows app update notification', async () => {
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Update Available')).toBeInTheDocument()
    })

    expect(screen.getByText('A new version of the app is available')).toBeInTheDocument()
  })

  it('handles API error gracefully', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load PWA settings')).toBeInTheDocument()
    })
  })

  it('shows loading state initially', () => {
    ;(global.fetch as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    )

    renderWithTheme(<PWASettings />)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('configures notification frequency', async () => {
    const user = userEvent.setup()
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Frequency: Daily')).toBeInTheDocument()
    })

    const frequencySelect = screen.getByLabelText('Notification Frequency')
    await user.click(frequencySelect)

    await waitFor(() => {
      expect(screen.getByText('Immediate')).toBeInTheDocument()
      expect(screen.getByText('Weekly')).toBeInTheDocument()
    })
  })

  it('shows beta features section', async () => {
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Beta Features')).toBeInTheDocument()
      expect(screen.getByText('Background Sync')).toBeInTheDocument()
      expect(screen.getByText('Push Notifications')).toBeInTheDocument()
    })
  })
})

describe('PWASettings Accessibility', () => {
  it('has proper ARIA labels and roles', async () => {
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('App Installation')).toBeInTheDocument()
    })

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getAllByRole('switch')).toHaveLength(5) // Notification toggles
    expect(screen.getAllByRole('button')).toHaveLength(4) // Various action buttons
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByText('Install App')).toBeInTheDocument()
    })

    await user.tab()
    expect(screen.getByText('Install App')).toHaveFocus()

    await user.tab()
    expect(screen.getByText('Clear Cache')).toHaveFocus()
  })

  it('has proper form labels', async () => {
    renderWithTheme(<PWASettings />)

    await waitFor(() => {
      expect(screen.getByLabelText('Adoption Updates')).toBeInTheDocument()
    })

    expect(screen.getByLabelText('Event Notifications')).toBeInTheDocument()
    expect(screen.getByLabelText('Emergency Alerts')).toBeInTheDocument()
    expect(screen.getByLabelText('Reminders')).toBeInTheDocument()
    expect(screen.getByLabelText('Newsletters')).toBeInTheDocument()
  })
})