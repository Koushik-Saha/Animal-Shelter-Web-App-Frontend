import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Web3DonationPlatform from '../Web3DonationPlatform'

const mockWeb3Data = {
  donations: [
    {
      id: 'donation-1',
      donorId: 'donor-1',
      donorName: 'Alice Smith',
      donorWallet: '0x1234...5678',
      amount: 0.5,
      currency: 'ETH',
      usdValue: 1250.00,
      timestamp: new Date('2024-01-15T10:30:00Z'),
      transactionHash: '0xabcd...efgh',
      purpose: 'general',
      status: 'confirmed',
      blockNumber: 18950000,
      gasUsed: 21000,
      nftReward: {
        tokenId: 'nft-001',
        tier: 'gold',
        rarity: 'rare',
        metadata: {
          name: 'Golden Paw Supporter',
          description: 'Thank you for your generous donation!',
          image: '/nft-gold-paw.png',
        },
      },
    },
    {
      id: 'donation-2',
      donorId: 'donor-2',
      donorName: 'Bob Johnson',
      donorWallet: '0x9876...5432',
      amount: 1.2,
      currency: 'ETH',
      usdValue: 3000.00,
      timestamp: new Date('2024-01-20T14:15:00Z'),
      transactionHash: '0xijkl...mnop',
      purpose: 'medical',
      status: 'confirmed',
      blockNumber: 18955000,
      gasUsed: 23000,
      nftReward: {
        tokenId: 'nft-002',
        tier: 'platinum',
        rarity: 'legendary',
        metadata: {
          name: 'Platinum Guardian Angel',
          description: 'Your donation saves lives!',
          image: '/nft-platinum-angel.png',
        },
      },
    },
  ],
  analytics: {
    totalDonations: 25,
    totalAmount: 15.75,
    totalUsdValue: 39375.00,
    averageDonation: 0.63,
    topDonor: {
      wallet: '0x1111...2222',
      name: 'Crypto Philanthropist',
      totalDonated: 5.0,
    },
    monthlyTrends: [
      { month: 'Jan', donations: 8, amount: 4.2 },
      { month: 'Feb', donations: 12, amount: 7.8 },
      { month: 'Mar', donations: 5, amount: 3.75 },
    ],
  },
  nftCollection: [
    {
      tokenId: 'nft-001',
      owner: '0x1234...5678',
      tier: 'gold',
      rarity: 'rare',
      mintDate: new Date('2024-01-15'),
      metadata: {
        name: 'Golden Paw Supporter',
        description: 'Thank you for your generous donation!',
        image: '/nft-gold-paw.png',
        attributes: [
          { trait_type: 'Tier', value: 'Gold' },
          { trait_type: 'Rarity', value: 'Rare' },
        ],
      },
      utilities: ['governance_voting', 'exclusive_events'],
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

// Mock Web3 functionality
const mockWeb3 = {
  connect: jest.fn(() => Promise.resolve('0x1234567890abcdef')),
  disconnect: jest.fn(),
  donate: jest.fn(() => Promise.resolve('0xabcdef123456')),
  getBalance: jest.fn(() => Promise.resolve('2.5')),
  isConnected: jest.fn(() => true),
}

beforeEach(() => {
  global.fetch = jest.fn()
  ;(window as any).ethereum = {
    request: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn(),
  }
})

afterEach(() => {
  jest.resetAllMocks()
  delete (window as any).ethereum
})

describe('Web3DonationPlatform', () => {
  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockWeb3Data,
    })
  })

  it('renders the Web3 donation platform with all tabs', async () => {
    renderWithTheme(<Web3DonationPlatform />)

    expect(screen.getByText('Web3 Donation Platform')).toBeInTheDocument()
    expect(screen.getByText('Blockchain-powered donations with NFT rewards and DeFi integration')).toBeInTheDocument()

    // Check all tabs are present
    expect(screen.getByText('NFT Collection')).toBeInTheDocument()
    expect(screen.getByText('Donation History')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Utility Programs')).toBeInTheDocument()
  })

  it('displays NFT collection correctly', async () => {
    renderWithTheme(<Web3DonationPlatform />)

    await waitFor(() => {
      expect(screen.getByText('Golden Paw Supporter')).toBeInTheDocument()
    })

    expect(screen.getByText('Token ID: nft-001')).toBeInTheDocument()
    expect(screen.getByText('Gold Tier')).toBeInTheDocument()
    expect(screen.getByText('Rare')).toBeInTheDocument()
    expect(screen.getByText('Thank you for your generous donation!')).toBeInTheDocument()
  })

  it('shows donation history with transaction details', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Web3DonationPlatform />)

    await waitFor(() => {
      expect(screen.getByText('Golden Paw Supporter')).toBeInTheDocument()
    })

    // Switch to Donation History tab
    const historyTab = screen.getByText('Donation History')
    await user.click(historyTab)

    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument()
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
      expect(screen.getByText('0.5 ETH')).toBeInTheDocument()
      expect(screen.getByText('1.2 ETH')).toBeInTheDocument()
      expect(screen.getByText('$1,250.00')).toBeInTheDocument()
      expect(screen.getByText('$3,000.00')).toBeInTheDocument()
    })
  })

  it('displays analytics with charts and metrics', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Web3DonationPlatform />)

    await waitFor(() => {
      expect(screen.getByText('Golden Paw Supporter')).toBeInTheDocument()
    })

    // Switch to Analytics tab
    const analyticsTab = screen.getByText('Analytics')
    await user.click(analyticsTab)

    await waitFor(() => {
      expect(screen.getByText('Donation Analytics')).toBeInTheDocument()
      expect(screen.getByText('Total Donations: 25')).toBeInTheDocument()
      expect(screen.getByText('Total Amount: 15.75 ETH')).toBeInTheDocument()
      expect(screen.getByText('USD Value: $39,375.00')).toBeInTheDocument()
      expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    })
  })

  it('shows utility programs and benefits', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Web3DonationPlatform />)

    await waitFor(() => {
      expect(screen.getByText('Golden Paw Supporter')).toBeInTheDocument()
    })

    // Switch to Utility Programs tab
    const utilityTab = screen.getByText('Utility Programs')
    await user.click(utilityTab)

    await waitFor(() => {
      expect(screen.getByText('NFT Utility Programs')).toBeInTheDocument()
      expect(screen.getByText('Governance Voting')).toBeInTheDocument()
      expect(screen.getByText('Exclusive Events')).toBeInTheDocument()
    })
  })

  it('connects to Web3 wallet', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Web3DonationPlatform />)

    const connectButton = screen.getByText('Connect Wallet')
    await user.click(connectButton)

    // Should show wallet connection dialog
    await waitFor(() => {
      expect(screen.getByText('Connect Your Wallet')).toBeInTheDocument()
      expect(screen.getByText('MetaMask')).toBeInTheDocument()
      expect(screen.getByText('WalletConnect')).toBeInTheDocument()
    })
  })

  it('initiates donation process', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Web3DonationPlatform />)

    const donateButton = screen.getByText('Donate Now')
    await user.click(donateButton)

    // Should show donation form
    await waitFor(() => {
      expect(screen.getByText('Make a Donation')).toBeInTheDocument()
      expect(screen.getByLabelText('Amount (ETH)')).toBeInTheDocument()
      expect(screen.getByLabelText('Purpose')).toBeInTheDocument()
    })
  })

  it('filters donations by purpose', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Web3DonationPlatform />)

    await waitFor(() => {
      expect(screen.getByText('Golden Paw Supporter')).toBeInTheDocument()
    })

    // Switch to Donation History tab
    const historyTab = screen.getByText('Donation History')
    await user.click(historyTab)

    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument()
    })

    // Filter by medical donations
    const medicalFilter = screen.getByText('Medical')
    await user.click(medicalFilter)

    await waitFor(() => {
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
      expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument()
    })
  })

  it('shows NFT tier colors correctly', async () => {
    renderWithTheme(<Web3DonationPlatform />)

    await waitFor(() => {
      expect(screen.getByText('Golden Paw Supporter')).toBeInTheDocument()
    })

    // Gold tier should have gold styling
    const goldBadge = screen.getByText('Gold Tier')
    expect(goldBadge).toBeInTheDocument()
  })

  it('handles Web3 connection error', async () => {
    const user = userEvent.setup()
    
    // Mock wallet connection error
    ;(window as any).ethereum.request.mockRejectedValueOnce(new Error('User rejected request'))

    renderWithTheme(<Web3DonationPlatform />)

    const connectButton = screen.getByText('Connect Wallet')
    await user.click(connectButton)

    await waitFor(() => {
      expect(screen.getByText('Connect Your Wallet')).toBeInTheDocument()
    })

    const metamaskButton = screen.getByText('MetaMask')
    await user.click(metamaskButton)

    await waitFor(() => {
      expect(screen.getByText('Failed to connect wallet')).toBeInTheDocument()
    })
  })

  it('validates donation form', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Web3DonationPlatform />)

    const donateButton = screen.getByText('Donate Now')
    await user.click(donateButton)

    await waitFor(() => {
      expect(screen.getByText('Make a Donation')).toBeInTheDocument()
    })

    // Try to submit without amount
    const submitButton = screen.getByText('Confirm Donation')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/amount is required/i)).toBeInTheDocument()
    })
  })

  it('shows transaction status updates', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Web3DonationPlatform />)

    const donateButton = screen.getByText('Donate Now')
    await user.click(donateButton)

    await waitFor(() => {
      expect(screen.getByText('Make a Donation')).toBeInTheDocument()
    })

    // Fill donation form
    await user.type(screen.getByLabelText('Amount (ETH)'), '1.0')
    
    const submitButton = screen.getByText('Confirm Donation')
    await user.click(submitButton)

    // Should show transaction pending state
    await waitFor(() => {
      expect(screen.getByText('Transaction Pending')).toBeInTheDocument()
    })
  })

  it('handles API error gracefully', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    renderWithTheme(<Web3DonationPlatform />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load Web3 data')).toBeInTheDocument()
    })
  })

  it('shows loading state initially', () => {
    ;(global.fetch as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    )

    renderWithTheme(<Web3DonationPlatform />)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})

describe('Web3DonationPlatform Accessibility', () => {
  it('has proper ARIA labels and roles', async () => {
    renderWithTheme(<Web3DonationPlatform />)

    await waitFor(() => {
      expect(screen.getByText('Golden Paw Supporter')).toBeInTheDocument()
    })

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(4)
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Web3DonationPlatform />)

    await waitFor(() => {
      expect(screen.getByText('Golden Paw Supporter')).toBeInTheDocument()
    })

    await user.tab()
    expect(screen.getByText('Connect Wallet')).toHaveFocus()

    await user.tab()
    expect(screen.getByText('Donate Now')).toHaveFocus()
  })
})