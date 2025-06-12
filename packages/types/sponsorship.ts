export interface AnimalSponsorship {
  id: string;
  animalId: string;
  sponsorId: string;
  
  // Sponsorship Details
  packageType: 'basic' | 'premium' | 'complete' | 'medical' | 'custom';
  monthlyAmount: number;
  totalCommitment: number;
  duration: number; // months
  
  // Timeline
  startDate: Date;
  endDate: Date;
  renewalDate?: Date;
  autoRenew: boolean;
  
  // Status
  status: 'active' | 'pending' | 'paused' | 'completed' | 'cancelled' | 'expired';
  pauseReason?: string;
  pauseStartDate?: Date;
  pauseEndDate?: Date;
  
  // Payment
  paymentMethod: 'credit-card' | 'bank-transfer' | 'crypto' | 'paypal';
  paymentSchedule: 'monthly' | 'quarterly' | 'annual';
  nextPaymentDate: Date;
  totalPaid: number;
  paymentsRemaining: number;
  
  // Communication Preferences
  updateFrequency: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
  preferredContactMethod: 'email' | 'sms' | 'mail' | 'app';
  languagePreference: string;
  
  // Virtual Adoption Features
  virtualVisitsAllowed: number;
  virtualVisitsUsed: number;
  lastVirtualVisit?: Date;
  nextScheduledVisit?: Date;
  
  // Personalization
  personalMessage?: string;
  sponsorshipName?: string; // Custom name for the sponsorship
  dedicatedTo?: string; // "In memory of..." or "In honor of..."
  
  // Engagement
  progressReports: SponsorshipReport[];
  customRequests: CustomRequest[];
  
  // Administrative
  createdBy: string;
  createdDate: Date;
  lastModified: Date;
  modifiedBy: string;
  notes?: string;
}

export interface SponsorshipPackage {
  id: string;
  name: string;
  description: string;
  monthlyAmount: number;
  
  // Coverage
  includedServices: SponsorshipService[];
  
  // Benefits
  virtualVisitsPerMonth: number;
  updateFrequency: 'weekly' | 'bi-weekly' | 'monthly';
  photoUpdatesPerMonth: number;
  videoUpdatesPerMonth: number;
  personalizedContent: boolean;
  
  // Perks
  physicalMail: boolean;
  certificateOfAppreciation: boolean;
  eventInvitations: boolean;
  meetAndGreetOpportunity: boolean;
  adoptionPriority: boolean;
  
  // Customization
  customizationOptions: PackageCustomization[];
  
  // Availability
  isActive: boolean;
  maxSponsors?: number;
  currentSponsors: number;
  
  // Requirements
  minimumDuration: number; // months
  speciesRestrictions?: string[];
  ageRestrictions?: { min?: number; max?: number };
  specialNeedsOnly?: boolean;
}

export interface SponsorshipService {
  service: 'food' | 'medical-care' | 'grooming' | 'training' | 'exercise' | 'socialization' | 'enrichment' | 'housing';
  coverage: 'full' | 'partial' | 'emergency-only';
  monthlyValue: number;
  description: string;
}

export interface PackageCustomization {
  option: string;
  additionalCost: number;
  description: string;
  isPopular: boolean;
}

export interface SponsorshipReport {
  id: string;
  sponsorshipId: string;
  reportDate: Date;
  reportType: 'monthly' | 'milestone' | 'medical' | 'behavioral' | 'adoption' | 'emergency';
  
  // Content
  title: string;
  summary: string;
  detailedUpdate: string;
  
  // Media
  photos: SponsorshipPhoto[];
  videos: SponsorshipVideo[];
  
  // Metrics
  healthStatus: 'excellent' | 'good' | 'fair' | 'concerning' | 'critical';
  behaviorProgress: number; // 1-10 scale
  adoptionReadiness: number; // 1-10 scale
  happinessLevel: number; // 1-10 scale
  
  // Achievements
  milestones: SponsorshipMilestone[];
  trainingProgress: TrainingProgress[];
  
  // Upcoming
  upcomingEvents: string[];
  nextGoals: string[];
  
  // Staff Notes
  caregiverNotes: string;
  veterinaryNotes?: string;
  behaviorNotes?: string;
  
  // Sponsor Engagement
  viewedBy: string[];
  sponsorFeedback?: SponsorFeedback;
  
  createdBy: string;
  approvedBy?: string;
  approvalDate?: Date;
}

export interface SponsorshipPhoto {
  id: string;
  url: string;
  caption: string;
  takenDate: Date;
  takenBy: string;
  category: 'daily-life' | 'training' | 'medical' | 'play' | 'feeding' | 'social' | 'milestone';
  isPublic: boolean;
  downloadCount: number;
}

export interface SponsorshipVideo {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  duration: number; // seconds
  takenDate: Date;
  takenBy: string;
  category: 'daily-routine' | 'training-session' | 'play-time' | 'special-moment' | 'progress-update';
  isPublic: boolean;
  viewCount: number;
}

export interface SponsorshipMilestone {
  id: string;
  title: string;
  description: string;
  achievedDate: Date;
  category: 'health' | 'behavior' | 'training' | 'social' | 'adoption-ready';
  significance: 'minor' | 'major' | 'critical';
  celebrationPlan?: string;
}

export interface TrainingProgress {
  skill: string;
  previousLevel: number; // 1-10
  currentLevel: number; // 1-10
  improvement: number;
  notes: string;
}

export interface SponsorFeedback {
  rating: number; // 1-5 stars
  comments?: string;
  suggestedImprovements?: string[];
  requestedContent?: string[];
  satisfactionLevel: 'very-satisfied' | 'satisfied' | 'neutral' | 'unsatisfied' | 'very-unsatisfied';
  wouldRecommend: boolean;
  submissionDate: Date;
}

export interface CustomRequest {
  id: string;
  sponsorshipId: string;
  requestType: 'photo' | 'video' | 'activity' | 'information' | 'visit' | 'communication' | 'other';
  
  // Request Details
  title: string;
  description: string;
  requestDate: Date;
  requestedBy: string;
  
  // Fulfillment
  status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'declined' | 'cancelled';
  assignedTo?: string;
  estimatedCompletionDate?: Date;
  actualCompletionDate?: Date;
  
  // Content
  deliverables: RequestDeliverable[];
  
  // Communication
  staffNotes?: string;
  sponsorFeedback?: string;
  declineReason?: string;
  
  // Approval
  requiresApproval: boolean;
  approvedBy?: string;
  approvalDate?: Date;
  
  // Recurring
  isRecurring: boolean;
  recurringFrequency?: 'weekly' | 'monthly' | 'quarterly';
  nextOccurrence?: Date;
}

export interface RequestDeliverable {
  type: 'photo' | 'video' | 'document' | 'message';
  url?: string;
  content?: string;
  description: string;
  deliveryDate: Date;
  deliveredBy: string;
}

export interface VirtualVisit {
  id: string;
  sponsorshipId: string;
  
  // Scheduling
  scheduledDate: Date;
  scheduledTime: string;
  duration: number; // minutes
  timezone: string;
  
  // Participants
  sponsor: VirtualVisitParticipant;
  caregivers: VirtualVisitParticipant[];
  animalPresent: boolean;
  
  // Platform
  platform: 'zoom' | 'teams' | 'meet' | 'custom' | 'phone';
  meetingLink?: string;
  meetingId?: string;
  dialInNumber?: string;
  
  // Content
  agenda: VisitAgenda[];
  specialRequests: string[];
  
  // Execution
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled';
  actualStartTime?: Date;
  actualEndTime?: Date;
  actualDuration?: number;
  
  // Recording
  recordingAllowed: boolean;
  recordingUrl?: string;
  recordingAvailable: boolean;
  
  // Follow-up
  sessionNotes: string;
  actionItems: VisitActionItem[];
  sponsorSatisfaction?: number; // 1-5 rating
  sponsorFeedback?: string;
  
  // Next Visit
  followUpScheduled: boolean;
  nextVisitDate?: Date;
  nextVisitNotes?: string;
  
  // Administrative
  scheduledBy: string;
  conductedBy: string;
  createdDate: Date;
  lastModified: Date;
}

export interface VirtualVisitParticipant {
  userId: string;
  name: string;
  role: 'sponsor' | 'caregiver' | 'veterinarian' | 'trainer' | 'volunteer' | 'staff';
  joinedAt?: Date;
  leftAt?: Date;
  connectionQuality?: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface VisitAgenda {
  item: string;
  estimatedDuration: number; // minutes
  responsible: string;
  completed: boolean;
  notes?: string;
}

export interface VisitActionItem {
  task: string;
  assignedTo: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  completionNotes?: string;
}

export interface SponsorProfile {
  id: string;
  userId: string;
  
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: Address;
  
  // Preferences
  animalPreferences: AnimalPreferences;
  communicationPreferences: CommunicationPreferences;
  
  // Sponsorship History
  activeSponsorships: string[]; // sponsorship IDs
  completedSponsorships: string[];
  totalSponsorships: number;
  totalContributed: number;
  longestSponsorship: number; // months
  
  // Engagement
  virtualVisitsAttended: number;
  reportsViewed: number;
  feedbackProvided: number;
  customRequestsMade: number;
  
  // Recognition
  sponsorLevel: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  badges: SponsorBadge[];
  certificates: SponsorCertificate[];
  
  // Social
  allowPublicRecognition: boolean;
  shareSuccessStories: boolean;
  referrals: SponsorReferral[];
  
  // Preferences
  receiveNewsletter: boolean;
  receiveEventInvitations: boolean;
  receiveFundraisingAppeals: boolean;
  
  // Administrative
  createdDate: Date;
  lastActive: Date;
  status: 'active' | 'inactive' | 'suspended' | 'pending-verification';
  verificationDate?: Date;
  notes?: string;
}

export interface AnimalPreferences {
  species: string[];
  ageRanges: string[];
  sizes: string[];
  specialNeedsWilling: boolean;
  behaviorTolerances: string[];
  
  // Specific Interests
  medicalCaseInterest: boolean;
  behaviorRehabInterest: boolean;
  seniorAnimalInterest: boolean;
  motherWithBabiesInterest: boolean;
  
  // Deal Breakers
  dealBreakers: string[];
  requiredTraits: string[];
}

export interface CommunicationPreferences {
  frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
  methods: ('email' | 'sms' | 'mail' | 'app' | 'phone')[];
  timeZone: string;
  languagePreference: string;
  
  // Content Preferences
  photoUpdates: boolean;
  videoUpdates: boolean;
  medicalUpdates: boolean;
  behaviorUpdates: boolean;
  trainingUpdates: boolean;
  milestoneAlerts: boolean;
  emergencyNotifications: boolean;
  
  // Timing
  preferredContactTimes: PreferredTime[];
  blackoutDates: DateRange[];
}

export interface PreferredTime {
  dayOfWeek: number; // 0-6
  startTime: string;
  endTime: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
  reason?: string;
}

export interface SponsorBadge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  earnedDate: Date;
  criteria: string;
  level: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface SponsorCertificate {
  id: string;
  type: 'completion' | 'milestone' | 'appreciation' | 'achievement';
  title: string;
  description: string;
  issuedDate: Date;
  certificateUrl: string;
  animalName?: string;
  sponsorshipDuration?: number;
  totalContribution?: number;
}

export interface SponsorReferral {
  id: string;
  referredUserId: string;
  referredDate: Date;
  referralStatus: 'pending' | 'signed-up' | 'sponsored' | 'completed';
  referralBonus?: number;
  completionDate?: Date;
}

export interface SponsorshipAnalytics {
  // Overview Metrics
  totalActiveSponsorships: number;
  totalMonthlyRevenue: number;
  averageSponsorshipValue: number;
  sponsorRetentionRate: number;
  
  // Animal Metrics
  animalsSponsored: number;
  animalsFullyFunded: number;
  averageTimeToFullFunding: number; // days
  adoptionRateSponsored: number;
  
  // Sponsor Metrics
  totalSponsors: number;
  newSponsorsThisMonth: number;
  sponsorLifetimeValue: number;
  sponsorSatisfactionScore: number;
  
  // Engagement Metrics
  virtualVisitAttendanceRate: number;
  reportEngagementRate: number;
  customRequestFulfillmentRate: number;
  sponsorFeedbackScore: number;
  
  // Financial Metrics
  revenueGrowthRate: number;
  costPerAcquisition: number;
  returnOnInvestment: number;
  
  // Geographic Distribution
  sponsorsByRegion: RegionMetrics[];
  internationalSponsors: number;
  
  // Time Series Data
  sponsorshipTrends: TimeSeriesData[];
  revenueTrends: TimeSeriesData[];
  engagementTrends: TimeSeriesData[];
  
  // Performance Indicators
  topPerformingPackages: PackagePerformance[];
  mostPopularAnimals: AnimalPopularity[];
  
  reportingPeriod: {
    startDate: Date;
    endDate: Date;
  };
  lastUpdated: Date;
}

export interface RegionMetrics {
  region: string;
  country: string;
  sponsorCount: number;
  totalRevenue: number;
  averageContribution: number;
  retentionRate: number;
}

export interface TimeSeriesData {
  date: Date;
  value: number;
  metric: string;
}

export interface PackagePerformance {
  packageId: string;
  packageName: string;
  totalSubscriptions: number;
  monthlyRevenue: number;
  averageDuration: number;
  satisfactionScore: number;
  renewalRate: number;
}

export interface AnimalPopularity {
  animalId: string;
  animalName: string;
  species: string;
  sponsorCount: number;
  timeToFullFunding: number; // days
  engagementScore: number;
  adoptionStatus: string;
}

export interface SponsorshipEvent {
  id: string;
  type: 'sponsor-meetup' | 'virtual-tour' | 'adoption-celebration' | 'milestone-party' | 'training-demo' | 'fundraiser';
  
  // Event Details
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: EventLocation;
  isVirtual: boolean;
  virtualPlatform?: string;
  meetingLink?: string;
  
  // Participants
  maxAttendees?: number;
  currentAttendees: number;
  waitingList: number;
  eligibleSponsors: string[]; // sponsor IDs
  registeredSponsors: EventRegistration[];
  
  // Content
  agenda: EventAgenda[];
  featuredAnimals: string[]; // animal IDs
  speakers: EventSpeaker[];
  
  // Resources
  requiredStaff: string[];
  assignedStaff: string[];
  equipmentNeeded: string[];
  materials: EventMaterial[];
  
  // Follow-up
  recordingAvailable: boolean;
  recordingUrl?: string;
  photoGallery: string[];
  feedbackSurvey?: string;
  
  // Status and Management
  status: 'planning' | 'registration-open' | 'registration-closed' | 'in-progress' | 'completed' | 'cancelled';
  createdBy: string;
  createdDate: Date;
  lastModified: Date;
}

export interface EventLocation {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  directions?: string;
  parkingInfo?: string;
  accessibilityInfo?: string;
}

export interface EventRegistration {
  sponsorId: string;
  registrationDate: Date;
  attendeeCount: number;
  specialRequests?: string;
  dietaryRestrictions?: string;
  accessibilityNeeds?: string;
  status: 'registered' | 'confirmed' | 'attended' | 'no-show' | 'cancelled';
  checkInTime?: Date;
}

export interface EventAgenda {
  startTime: string;
  endTime: string;
  activity: string;
  description: string;
  location?: string;
  facilitator: string;
}

export interface EventSpeaker {
  name: string;
  title: string;
  organization?: string;
  bio: string;
  photoUrl?: string;
  topics: string[];
}

export interface EventMaterial {
  name: string;
  type: 'document' | 'video' | 'photo' | 'link' | 'other';
  url: string;
  description: string;
  isPublic: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}