export interface Web3Wallet {
  address: string;
  isConnected: boolean;
  balance: WalletBalance[];
  network: BlockchainNetwork;
  provider: 'metamask' | 'walletconnect' | 'coinbase' | 'phantom' | 'other';
  lastConnected: Date;
}

export interface WalletBalance {
  currency: 'ETH' | 'MATIC' | 'BNB' | 'SOL' | 'USDC' | 'USDT';
  amount: number;
  usdValue: number;
  contractAddress?: string;
}

export interface BlockchainNetwork {
  chainId: number;
  name: string;
  rpcUrl: string;
  currency: string;
  blockExplorer: string;
}

export interface CryptoDonation {
  id: string;
  donorWallet: string;
  donorInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  
  // Transaction Details
  amount: number;
  currency: 'ETH' | 'MATIC' | 'BNB' | 'SOL' | 'USDC' | 'USDT';
  usdValueAtTime: number;
  transactionHash: string;
  blockNumber: number;
  gasUsed: number;
  gasFee: number;
  
  // Donation Details
  donationType: 'one-time' | 'recurring' | 'sponsorship';
  animalId?: string; // for specific animal sponsorship
  campaignId?: string; // for campaign donations
  projectId?: string; // for specific project funding
  
  // Blockchain Info
  network: BlockchainNetwork;
  confirmations: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed' | 'cancelled';
  
  // NFT Rewards
  nftRewards: NFTReward[];
  qualifiesForNFT: boolean;
  
  // Additional Info
  message?: string;
  isAnonymous: boolean;
  taxReceiptRequested: boolean;
  
  // Processing
  processedDate?: Date;
  processedBy?: string;
  notes?: string;
}

export interface NFTReward {
  id: string;
  donationId: string;
  tokenId: string;
  contractAddress: string;
  
  // NFT Details
  name: string;
  description: string;
  imageUrl: string;
  animationUrl?: string;
  externalUrl?: string;
  
  // Tier and Rarity
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  
  // Requirements
  donationThreshold: number; // USD value required
  totalSupply: number;
  currentSupply: number;
  
  // Attributes
  attributes: NFTAttribute[];
  
  // Utility and Benefits
  utilities: NFTUtility[];
  perks: string[];
  
  // Minting Info
  mintDate?: Date;
  mintTransactionHash?: string;
  mintedTo?: string;
  
  // Ownership
  currentOwner?: string;
  transferHistory: NFTTransfer[];
  
  // Metadata
  tokenUri: string;
  metadataHash: string;
  
  // Status
  status: 'pending' | 'minted' | 'transferred' | 'burned';
  isActive: boolean;
  expirationDate?: Date;
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: 'number' | 'date' | 'boost_number' | 'boost_percentage';
  max_value?: number;
}

export interface NFTUtility {
  id: string;
  type: 'access' | 'discount' | 'governance' | 'experience' | 'digital' | 'physical';
  name: string;
  description: string;
  
  // Access Control
  requiredTiers: string[];
  requiredRarity?: string[];
  
  // Usage
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
  expirationDate?: Date;
  
  // Implementation
  redemptionMethod: 'automatic' | 'manual' | 'code' | 'verification';
  instructionsUrl?: string;
  contactInfo?: string;
}

export interface NFTTransfer {
  from: string;
  to: string;
  transactionHash: string;
  transferDate: Date;
  transferType: 'mint' | 'sale' | 'gift' | 'burn';
  price?: number;
  currency?: string;
}

export interface CryptoFundraisingCampaign {
  id: string;
  title: string;
  description: string;
  
  // Financial Goals
  targetAmount: number;
  targetCurrency: 'USD' | 'ETH' | 'MATIC';
  currentAmount: number;
  donorCount: number;
  
  // Timeline
  startDate: Date;
  endDate: Date;
  
  // Blockchain Integration
  smartContractAddress: string;
  acceptedCurrencies: string[];
  
  // NFT Rewards
  nftRewards: NFTReward[];
  exclusiveNFTs: boolean;
  
  // Campaign Details
  beneficiaryAnimals?: string[];
  projectType: 'medical' | 'facility' | 'rescue' | 'general' | 'emergency';
  
  // Transparency
  walletAddress: string;
  fundUsageBreakdown: FundUsage[];
  progressReports: ProgressReport[];
  
  // Social
  socialMediaLinks: SocialLink[];
  updates: CampaignUpdate[];
  
  status: 'draft' | 'active' | 'completed' | 'cancelled' | 'extended';
  createdBy: string;
  createdDate: Date;
}

export interface FundUsage {
  category: string;
  allocatedPercentage: number;
  allocatedAmount: number;
  spentAmount: number;
  description: string;
  receipts: string[];
}

export interface ProgressReport {
  id: string;
  date: Date;
  amountRaised: number;
  accomplishments: string[];
  nextSteps: string[];
  mediaFiles: string[];
  reportedBy: string;
}

export interface SocialLink {
  platform: 'twitter' | 'facebook' | 'instagram' | 'discord' | 'telegram';
  url: string;
  handle?: string;
}

export interface CampaignUpdate {
  id: string;
  title: string;
  content: string;
  mediaFiles: string[];
  publishDate: Date;
  publishedBy: string;
  isPublic: boolean;
}

export interface DeFiIntegration {
  id: string;
  protocol: 'compound' | 'aave' | 'yearn' | 'curve' | 'uniswap' | 'sushiswap';
  
  // Yield Farming
  stakingPools: StakingPool[];
  totalValueLocked: number;
  averageAPY: number;
  
  // Governance
  governanceTokens: GovernanceToken[];
  votingPower: number;
  proposalsVoted: number;
  
  // Automated Strategies
  strategies: YieldStrategy[];
  compoundingEnabled: boolean;
  reinvestmentThreshold: number;
  
  // Risk Management
  riskLevel: 'low' | 'medium' | 'high';
  insuranceCoverage: boolean;
  slippageTolerance: number;
  
  status: 'active' | 'paused' | 'deprecated';
}

export interface StakingPool {
  id: string;
  name: string;
  protocol: string;
  
  // Pool Details
  stakingToken: string;
  rewardToken: string;
  poolAddress: string;
  
  // Performance
  apy: number;
  tvl: number;
  stakingPeriod?: number; // days
  
  // User Position
  stakedAmount: number;
  earnedRewards: number;
  lastClaimDate?: Date;
  
  // Status
  isActive: boolean;
  lockupPeriod?: number;
  emergencyWithdraw: boolean;
}

export interface GovernanceToken {
  symbol: string;
  name: string;
  contractAddress: string;
  balance: number;
  votingPower: number;
  delegatedTo?: string;
  proposals: GovernanceProposal[];
}

export interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  proposalType: 'parameter' | 'upgrade' | 'treasury' | 'grant';
  
  // Voting
  votingStart: Date;
  votingEnd: Date;
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  
  // User Participation
  userVote?: 'for' | 'against' | 'abstain';
  userVotingPower?: number;
  
  status: 'pending' | 'active' | 'succeeded' | 'defeated' | 'executed';
}

export interface YieldStrategy {
  id: string;
  name: string;
  description: string;
  
  // Strategy Details
  protocols: string[];
  estimatedAPY: number;
  riskLevel: 'low' | 'medium' | 'high';
  
  // Allocation
  allocatedAmount: number;
  allocatedPercentage: number;
  
  // Performance
  currentValue: number;
  totalEarned: number;
  performanceHistory: PerformanceSnapshot[];
  
  // Automation
  autoCompound: boolean;
  rebalanceFrequency: 'daily' | 'weekly' | 'monthly';
  minRebalanceThreshold: number;
  
  isActive: boolean;
  lastRebalance?: Date;
}

export interface PerformanceSnapshot {
  date: Date;
  value: number;
  apy: number;
  earnings: number;
}

export interface DAOGovernance {
  id: string;
  name: string;
  description: string;
  
  // DAO Structure
  governanceToken: string;
  votingMechanism: 'token-weighted' | 'one-person-one-vote' | 'quadratic';
  quorumThreshold: number;
  proposalThreshold: number;
  
  // Membership
  totalMembers: number;
  activeMembers: number;
  memberTiers: DAOMemberTier[];
  
  // Treasury
  treasuryAddress: string;
  treasuryValue: number;
  treasuryAllocations: TreasuryAllocation[];
  
  // Proposals
  activeProposals: GovernanceProposal[];
  totalProposalsSubmitted: number;
  totalProposalsPassed: number;
  
  // User Participation
  userMembership?: DAOMembership;
  userProposals: GovernanceProposal[];
  userVotingHistory: VotingRecord[];
  
  // Integration
  shelterIntegration: ShelterDAOIntegration;
  
  status: 'active' | 'paused' | 'migrating';
  createdDate: Date;
}

export interface DAOMemberTier {
  tier: string;
  requiredTokens: number;
  votingMultiplier: number;
  benefits: string[];
  memberCount: number;
}

export interface DAOMembership {
  userId: string;
  walletAddress: string;
  tier: string;
  tokenBalance: number;
  votingPower: number;
  joinDate: Date;
  
  // Participation
  proposalsSubmitted: number;
  proposalsVoted: number;
  participationRate: number;
  
  // Delegation
  delegatedVotingPower: number;
  delegatedTo?: string;
  delegatedFrom: string[];
  
  status: 'active' | 'inactive' | 'suspended';
}

export interface TreasuryAllocation {
  category: string;
  allocatedAmount: number;
  allocatedPercentage: number;
  spentAmount: number;
  approvedBy: string[];
  approvalDate: Date;
  description: string;
}

export interface VotingRecord {
  proposalId: string;
  vote: 'for' | 'against' | 'abstain';
  votingPower: number;
  voteDate: Date;
  reason?: string;
}

export interface ShelterDAOIntegration {
  // Decision Making
  shelterOperationsVoting: boolean;
  animalAdoptionVoting: boolean;
  budgetApprovalVoting: boolean;
  
  // Transparency
  realTimeMetrics: boolean;
  financialReporting: boolean;
  animalOutcomeReporting: boolean;
  
  // Incentives
  volunteerRewards: boolean;
  donorBenefits: boolean;
  communityEngagement: boolean;
  
  // Integration Points
  connectedSystems: string[];
  dataFeeds: string[];
  automatedActions: string[];
}

export interface Web3Analytics {
  // Donation Metrics
  totalDonationsUSD: number;
  totalDonationsCrypto: { [currency: string]: number };
  donorCount: number;
  averageDonationSize: number;
  donationFrequency: DonationFrequencyData[];
  
  // NFT Metrics
  totalNFTsMinted: number;
  nftHolders: number;
  nftTierDistribution: { [tier: string]: number };
  nftUtilityUsage: UtilityUsageData[];
  
  // DeFi Performance
  totalYieldEarned: number;
  averageAPY: number;
  protocolDistribution: ProtocolAllocation[];
  
  // DAO Engagement
  daoParticipationRate: number;
  proposalSuccessRate: number;
  voterTurnout: number;
  
  // Geographic Distribution
  donorsByCountry: { [country: string]: number };
  networkUsage: { [network: string]: number };
  
  // Time Series Data
  donationTrends: TimeSeries[];
  priceImpactData: PriceImpactData[];
  
  // Conversion Metrics
  walletConnections: number;
  conversionRate: number;
  retentionRate: number;
  
  reportingPeriod: {
    startDate: Date;
    endDate: Date;
  };
  lastUpdated: Date;
}

export interface DonationFrequencyData {
  period: 'daily' | 'weekly' | 'monthly';
  amount: number;
  count: number;
  averageSize: number;
}

export interface UtilityUsageData {
  utilityType: string;
  usageCount: number;
  uniqueUsers: number;
  popularityScore: number;
}

export interface ProtocolAllocation {
  protocol: string;
  allocatedAmount: number;
  percentage: number;
  apy: number;
  risk: string;
}

export interface TimeSeries {
  date: Date;
  value: number;
  currency?: string;
}

export interface PriceImpactData {
  timestamp: Date;
  currency: string;
  price: number;
  volume: number;
  marketCap: number;
}

export interface SmartContract {
  address: string;
  name: string;
  type: 'donation' | 'nft' | 'staking' | 'governance' | 'yield';
  
  // Contract Details
  network: BlockchainNetwork;
  deploymentDate: Date;
  deployedBy: string;
  version: string;
  
  // Security
  isVerified: boolean;
  auditReports: AuditReport[];
  securityScore: number;
  
  // Functionality
  functions: ContractFunction[];
  events: ContractEvent[];
  
  // Performance
  transactionCount: number;
  gasUsage: GasUsageData;
  
  // Monitoring
  isActive: boolean;
  lastInteraction: Date;
  errorCount: number;
  
  // Upgrades
  isUpgradeable: boolean;
  upgradeHistory: ContractUpgrade[];
  
  status: 'active' | 'deprecated' | 'paused' | 'emergency';
}

export interface AuditReport {
  auditor: string;
  auditDate: Date;
  reportUrl: string;
  findings: SecurityFinding[];
  overallScore: number;
  recommendation: 'approved' | 'conditional' | 'rejected';
}

export interface SecurityFinding {
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  recommendation: string;
  status: 'open' | 'resolved' | 'acknowledged' | 'false-positive';
}

export interface ContractFunction {
  name: string;
  type: 'read' | 'write' | 'payable';
  inputs: FunctionParameter[];
  outputs: FunctionParameter[];
  gasEstimate: number;
  description: string;
}

export interface FunctionParameter {
  name: string;
  type: string;
  description: string;
}

export interface ContractEvent {
  name: string;
  parameters: EventParameter[];
  description: string;
  emissionCount: number;
}

export interface EventParameter {
  name: string;
  type: string;
  indexed: boolean;
  description: string;
}

export interface GasUsageData {
  averageGasPrice: number;
  totalGasUsed: number;
  gasOptimizationScore: number;
  gasTrends: TimeSeries[];
}

export interface ContractUpgrade {
  version: string;
  upgradeDate: Date;
  upgradedBy: string;
  changes: string[];
  migrationRequired: boolean;
  rollbackPlan: string;
}