export interface LostPetReport {
  id: string;
  reportType: 'lost' | 'found';
  status: 'active' | 'reunited' | 'closed' | 'expired';
  
  // Reporter Information
  reporterName: string;
  reporterEmail: string;
  reporterPhone: string;
  reporterAddress?: string;
  isOwner: boolean; // true for lost reports, false for found reports
  
  // Animal Information
  animalName?: string; // may not be known for found animals
  species: 'dog' | 'cat' | 'rabbit' | 'bird' | 'other';
  breed?: string;
  primaryBreed?: string;
  secondaryBreed?: string;
  
  // Physical Description
  size: 'tiny' | 'small' | 'medium' | 'large' | 'giant';
  weight?: number;
  weightUnit: 'lbs' | 'kg';
  color: string;
  markings?: string;
  distinguishingFeatures?: string[];
  
  // Age and Gender
  estimatedAge?: number;
  ageUnit: 'weeks' | 'months' | 'years';
  gender?: 'male' | 'female' | 'unknown';
  isSpayedNeutered?: boolean;
  
  // Location Information
  location: LocationInfo;
  
  // Date and Time
  dateTimeLostFound: Date;
  reportDate: Date;
  
  // Media
  photos: string[];
  videos?: string[];
  
  // Additional Details
  description: string;
  circumstances?: string; // how the animal was lost/found
  temperament?: string;
  medicalConditions?: string[];
  collar?: CollarInfo;
  microchip?: MicrochipInfo;
  
  // Behavioral Information
  respondsToCalls?: boolean;
  isTimid?: boolean;
  isAggressive?: boolean;
  behaviorNotes?: string;
  
  // Contact Preferences
  preferredContactMethod: 'phone' | 'email' | 'text';
  contactTimePreference?: string;
  
  // Reward Information (for lost pets)
  rewardOffered?: boolean;
  rewardAmount?: number;
  
  // Matching and Follow-up
  matches: PotentialMatch[];
  followUps: FollowUpRecord[];
  views: number;
  
  // Administrative
  isVerified: boolean;
  verifiedBy?: string;
  verificationDate?: Date;
  featuredUntil?: Date; // for promoted listings
  autoRenewalEnabled: boolean;
  
  // Integration
  shelterNotified: boolean;
  crossPostedTo?: string[]; // other platforms
  socialMediaShared: boolean;
  
  // Closure Information
  closedDate?: Date;
  closureReason?: 'reunited' | 'found-deceased' | 'gave-up-search' | 'false-report' | 'expired';
  reunionDetails?: ReunionInfo;
  
  notes?: string;
}

export interface LocationInfo {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  locationDetails?: string; // specific area, landmarks, etc.
  searchRadius?: number; // miles from location
}

export interface CollarInfo {
  hasCollar: boolean;
  collarColor?: string;
  collarType?: string; // leather, nylon, chain, etc.
  hasTags: boolean;
  tagInfo?: string;
  hasLicense?: boolean;
  licenseNumber?: string;
}

export interface MicrochipInfo {
  hasMicrochip: boolean;
  chipNumber?: string;
  chipCompany?: string;
  isRegistered?: boolean;
  registeredOwnerContacted?: boolean;
}

export interface PotentialMatch {
  id: string;
  matchedReportId: string;
  matchScore: number; // 0-100
  matchedDate: Date;
  status: 'pending' | 'reviewed' | 'confirmed' | 'dismissed';
  
  // Matching criteria
  matchingFactors: MatchingFactor[];
  
  // Review information
  reviewedBy?: string;
  reviewedDate?: Date;
  reviewNotes?: string;
  
  // Contact attempts
  contactAttempts: ContactAttempt[];
}

export interface MatchingFactor {
  factor: 'species' | 'breed' | 'size' | 'color' | 'location' | 'date' | 'markings' | 'microchip';
  weight: number; // importance weight
  confidence: number; // 0-100
  details?: string;
}

export interface ContactAttempt {
  id: string;
  date: Date;
  method: 'phone' | 'email' | 'text' | 'in-person';
  contactedBy: string;
  outcome: 'successful' | 'no-response' | 'wrong-number' | 'not-a-match';
  notes?: string;
}

export interface FollowUpRecord {
  id: string;
  date: Date;
  type: 'status-check' | 'tip-received' | 'sighting-reported' | 'update-provided';
  details: string;
  contactedBy?: string;
  actionRequired?: boolean;
  nextFollowUpDate?: Date;
}

export interface ReunionInfo {
  reunionDate: Date;
  howFoundEachOther: string;
  distanceFromOriginalLocation: number; // miles
  animalCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'injured';
  veterinaryCheckNeeded: boolean;
  reunionStory?: string;
  photos?: string[];
  allowPublicSharing: boolean;
}

export interface TipReport {
  id: string;
  relatedReportId: string;
  tipperName?: string; // can be anonymous
  tipperPhone?: string;
  tipperEmail?: string;
  isAnonymous: boolean;
  
  // Sighting Information
  sightingDate: Date;
  sightingTime?: string;
  location: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  
  // Details
  description: string;
  animalCondition?: string;
  animalBehavior?: string;
  confidence: 1 | 2 | 3 | 4 | 5; // how sure they are it's the same animal
  
  // Media
  photos?: string[];
  videos?: string[];
  
  // Follow-up
  status: 'new' | 'investigating' | 'verified' | 'false-alarm' | 'helpful';
  investigatedBy?: string;
  investigatedDate?: Date;
  outcome?: string;
  
  // Verification
  isVerified: boolean;
  verificationNotes?: string;
  
  reportDate: Date;
}

export interface SearchFilter {
  species?: string[];
  size?: string[];
  color?: string[];
  reportType?: 'lost' | 'found' | 'both';
  location?: {
    center: {
      latitude: number;
      longitude: number;
    };
    radius: number; // miles
  };
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  hasReward?: boolean;
  hasMicrochip?: boolean;
  sortBy: 'date' | 'distance' | 'relevance';
  sortOrder: 'asc' | 'desc';
}

export interface LostFoundAlert {
  id: string;
  userId: string;
  alertName: string;
  isActive: boolean;
  
  // Alert Criteria
  species: string[];
  size?: string[];
  color?: string[];
  location: {
    latitude: number;
    longitude: number;
    radius: number; // miles
  };
  
  // Notification Preferences
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  immediateNotification: boolean;
  dailyDigest: boolean;
  weeklyDigest: boolean;
  
  // Alert History
  createdDate: Date;
  lastTriggered?: Date;
  totalMatches: number;
  
  // User can pause/resume alerts
  isPaused: boolean;
  pausedUntil?: Date;
}

export interface LostFoundStatistics {
  totalReports: number;
  lostReports: number;
  foundReports: number;
  
  // Success Metrics
  totalReunions: number;
  reunionRate: number; // percentage
  averageReunionTime: number; // days
  
  // Recent Activity
  reportsThisWeek: number;
  reunionsThisWeek: number;
  newTipsThisWeek: number;
  
  // Geographic Data
  mostCommonLostAreas: {
    area: string;
    count: number;
  }[];
  
  // Animal Data
  speciesBreakdown: {
    species: string;
    lostCount: number;
    foundCount: number;
    reunionRate: number;
  }[];
  
  // Temporal Patterns
  mostCommonLostTimes: {
    hour: number;
    count: number;
  }[];
  
  mostCommonLostDays: {
    dayOfWeek: number;
    count: number;
  }[];
}

export interface AutoMatchingCriteria {
  species: { weight: number; required: boolean };
  breed: { weight: number; required: boolean };
  size: { weight: number; required: boolean };
  color: { weight: number; required: boolean };
  location: { weight: number; maxDistance: number };
  dateRange: { weight: number; maxDays: number };
  markings: { weight: number; required: boolean };
  microchip: { weight: number; required: boolean };
  minimumMatchScore: number; // threshold for automatic notifications
}

export interface NotificationTemplate {
  id: string;
  type: 'new-match' | 'tip-received' | 'reunion-success' | 'report-expiring' | 'weekly-digest';
  subject: string;
  emailTemplate: string;
  smsTemplate: string;
  pushTemplate: string;
  isActive: boolean;
  variables: string[]; // placeholder variables like {{animalName}}, {{location}}
}

export interface LostFoundCampaign {
  id: string;
  reportId: string;
  type: 'social-media' | 'flyer' | 'poster' | 'press-release' | 'email-blast';
  
  // Campaign Details
  title: string;
  content: string;
  mediaFiles: string[];
  
  // Targeting
  targetAudience?: string;
  geographicTarget?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  
  // Scheduling
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  
  // Performance
  views: number;
  clicks: number;
  shares: number;
  tips: number;
  
  // Budget (for paid campaigns)
  budget?: number;
  spent?: number;
  
  createdBy: string;
  createdDate: Date;
}