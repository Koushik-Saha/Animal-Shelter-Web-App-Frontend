export interface AdoptionEvent {
  id: string;
  title: string;
  description: string;
  type: 'adoption-fair' | 'meet-and-greet' | 'fundraiser' | 'education' | 'spay-neuter' | 'vaccination' | 'training' | 'community-outreach';
  
  // Scheduling
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  timezone: string;
  
  // Location
  location: EventLocation;
  
  // Capacity and Registration
  maxAttendees?: number;
  currentRegistrations: number;
  allowWalkIns: boolean;
  requiresRegistration: boolean;
  registrationDeadline?: Date;
  registrationFee?: number;
  
  // Animals
  participatingAnimals: string[]; // animal IDs
  featuredAnimals: string[]; // highlighted animals
  animalRequirements?: AnimalRequirement[];
  
  // Staff and Volunteers
  organizer: string; // staff member ID
  volunteers: EventVolunteer[];
  requiredVolunteers: number;
  staffAssigned: string[];
  
  // Status
  status: 'draft' | 'published' | 'registration-open' | 'registration-closed' | 'in-progress' | 'completed' | 'cancelled';
  publishDate?: Date;
  
  // Marketing and Promotion
  marketingCampaign?: MarketingCampaign;
  promotionalImages: string[];
  socialMediaPosts: SocialMediaPost[];
  pressRelease?: string;
  
  // Resources and Setup
  supplies: EventSupply[];
  setup: EventSetup;
  equipment: Equipment[];
  
  // Registration and Attendees
  registrations: EventRegistration[];
  walkInAttendees: WalkInAttendee[];
  
  // Outcomes and Follow-up
  adoptions: EventAdoption[];
  leads: AdoptionLead[];
  feedback: EventFeedback[];
  
  // Financial
  budget: EventBudget;
  expenses: EventExpense[];
  revenue: EventRevenue[];
  
  // Analytics
  metrics: EventMetrics;
  
  // Post-Event
  followUpRequired: boolean;
  followUpTasks: FollowUpTask[];
  nextEventSuggested?: Date;
  
  // Administrative
  createdBy: string;
  createdDate: Date;
  lastModified: Date;
  modifiedBy: string;
  notes?: string;
}

export interface EventLocation {
  type: 'shelter' | 'offsite' | 'virtual' | 'mobile';
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  
  // Venue Details
  capacity?: number;
  hasParking: boolean;
  isAccessible: boolean;
  indoorSpace: boolean;
  outdoorSpace: boolean;
  
  // Facilities
  hasElectricity: boolean;
  hasWater: boolean;
  hasRestrooms: boolean;
  hasWifi: boolean;
  
  // Contact
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  
  // Permissions
  permitsRequired: string[];
  insuranceRequired: boolean;
  securityDeposit?: number;
  
  // Setup Details
  setupTime: string;
  teardownTime: string;
  earlyAccess?: string;
  loadingArea?: string;
  
  directions?: string;
  specialInstructions?: string;
}

export interface AnimalRequirement {
  criteria: 'age' | 'size' | 'temperament' | 'training-level' | 'special-needs' | 'vaccination-status';
  value: string;
  required: boolean;
}

export interface EventVolunteer {
  volunteerId: string;
  role: 'setup' | 'registration' | 'animal-handler' | 'adoption-counselor' | 'cleanup' | 'photographer' | 'coordinator';
  shift: {
    startTime: string;
    endTime: string;
  };
  status: 'confirmed' | 'pending' | 'declined' | 'no-show' | 'attended';
  checkedIn?: Date;
  checkedOut?: Date;
  notes?: string;
}

export interface MarketingCampaign {
  id: string;
  budget: number;
  channels: MarketingChannel[];
  targetAudience: TargetAudience;
  startDate: Date;
  endDate: Date;
  
  // Performance
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  roi: number;
}

export interface MarketingChannel {
  type: 'social-media' | 'email' | 'website' | 'print' | 'radio' | 'tv' | 'outdoor';
  platform?: string; // Facebook, Instagram, etc.
  budget: number;
  content: string;
  scheduledPosts: ScheduledPost[];
  performance: ChannelMetrics;
}

export interface ScheduledPost {
  id: string;
  platform: string;
  content: string;
  mediaFiles: string[];
  scheduledDate: Date;
  status: 'scheduled' | 'published' | 'failed';
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
  };
}

export interface TargetAudience {
  demographics: {
    ageRange: [number, number];
    income?: [number, number];
    location: {
      radius: number;
      zipCodes?: string[];
    };
  };
  interests: string[];
  behaviors: string[];
  customAudiences?: string[];
}

export interface SocialMediaPost {
  id: string;
  platform: 'facebook' | 'instagram' | 'twitter' | 'tiktok' | 'linkedin';
  content: string;
  mediaFiles: string[];
  hashtags: string[];
  postDate: Date;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    saves: number;
  };
  reachMetrics: {
    impressions: number;
    reach: number;
    clicks: number;
  };
}

export interface EventSupply {
  item: string;
  category: 'setup' | 'animals' | 'registration' | 'marketing' | 'cleanup' | 'safety';
  quantityNeeded: number;
  quantityAvailable: number;
  source: 'inventory' | 'purchase' | 'rental' | 'donation';
  cost?: number;
  supplier?: string;
  status: 'ordered' | 'confirmed' | 'delivered' | 'missing';
  notes?: string;
}

export interface EventSetup {
  areas: SetupArea[];
  timeline: SetupTask[];
  floorPlan?: string; // URL to floor plan image
  specialRequirements: string[];
}

export interface SetupArea {
  name: string;
  purpose: 'registration' | 'adoption-area' | 'animal-display' | 'information' | 'food-water' | 'play-area' | 'quiet-zone';
  dimensions?: string;
  equipment: string[];
  volunteers: number;
  setupTime: number; // minutes
  notes?: string;
}

export interface SetupTask {
  id: string;
  task: string;
  assignedTo: string[];
  startTime: string;
  estimatedDuration: number; // minutes
  dependencies: string[]; // other task IDs
  status: 'pending' | 'in-progress' | 'completed';
  actualStartTime?: string;
  actualDuration?: number;
  notes?: string;
}

export interface Equipment {
  name: string;
  type: 'tables' | 'chairs' | 'tents' | 'barriers' | 'signage' | 'av-equipment' | 'crates' | 'leashes';
  quantity: number;
  source: 'owned' | 'rental' | 'borrowed';
  cost?: number;
  supplier?: string;
  deliveryDate?: Date;
  pickupDate?: Date;
  status: 'reserved' | 'delivered' | 'setup' | 'returned';
}

export interface EventRegistration {
  id: string;
  attendeeInfo: AttendeeInfo;
  registrationDate: Date;
  status: 'registered' | 'confirmed' | 'waitlisted' | 'cancelled' | 'attended' | 'no-show';
  
  // Registration Details
  numberOfAttendees: number;
  accompaniedBy?: string[]; // names of additional attendees
  specialRequests?: string;
  accessibilityNeeds?: string;
  
  // Interests
  interestedInAdoption: boolean;
  preferredAnimals?: string[]; // animal IDs
  animalPreferences?: {
    species: string[];
    size: string[];
    age: string[];
  };
  
  // Communication
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    phone: boolean;
  };
  
  // Follow-up
  followUpConsent: boolean;
  marketingConsent: boolean;
  
  // Check-in
  checkInTime?: Date;
  checkInMethod?: 'qr-code' | 'manual' | 'mobile';
  
  // Payment
  feesPaid: boolean;
  paymentDate?: Date;
  paymentMethod?: string;
  
  notes?: string;
}

export interface AttendeeInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  age?: number;
  hasExperience: boolean;
  currentPets?: string;
  housingType: 'house' | 'apartment' | 'condo' | 'other';
  hasYard?: boolean;
}

export interface WalkInAttendee {
  id: string;
  checkInTime: Date;
  basicInfo?: {
    firstName?: string;
    email?: string;
    phone?: string;
  };
  interestedInAdoption: boolean;
  animalInterest?: string[]; // animal IDs they showed interest in
  followUpRequested: boolean;
  notes?: string;
}

export interface EventAdoption {
  id: string;
  animalId: string;
  adopterId: string; // could be registered attendee or walk-in
  adoptionDate: Date;
  applicationSubmitted: boolean;
  applicationApproved?: boolean;
  adoptionFeeCollected: boolean;
  adoptionFeeAmount: number;
  
  // Process
  processedBy: string; // staff member
  timeSpent: number; // minutes from initial interest to completion
  documentsCompleted: string[];
  
  // Follow-up
  followUpScheduled: boolean;
  followUpDate?: Date;
  
  notes?: string;
}

export interface AdoptionLead {
  id: string;
  attendeeId: string;
  animalId?: string;
  interestLevel: 'low' | 'medium' | 'high';
  
  // Contact Information
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  
  // Interest Details
  interestType: 'specific-animal' | 'general-adoption' | 'fostering' | 'volunteering';
  timeline: 'immediate' | 'within-month' | 'within-3-months' | 'future';
  
  // Follow-up
  followUpMethod: 'email' | 'phone' | 'text';
  followUpDate: Date;
  status: 'new' | 'contacted' | 'in-process' | 'converted' | 'not-interested';
  
  // Notes
  staffNotes: string;
  createdBy: string;
  createdDate: Date;
}

export interface EventFeedback {
  id: string;
  respondentType: 'attendee' | 'volunteer' | 'staff';
  respondentId?: string;
  submissionDate: Date;
  
  // Ratings (1-5 scale)
  overallExperience: number;
  eventOrganization: number;
  staffHelpfulness: number;
  animalPresentation: number;
  facilityRating: number;
  
  // Specific Feedback
  mostEnjoyed?: string;
  suggestions?: string;
  improvements?: string;
  wouldRecommend: boolean;
  wouldAttendAgain: boolean;
  
  // Additional Info
  howHeardAboutEvent?: string;
  firstTimeAttendee: boolean;
  
  // Open Text
  additionalComments?: string;
  
  // Contact for Follow-up
  allowContact: boolean;
}

export interface EventBudget {
  totalBudget: number;
  categories: BudgetCategory[];
  contingency: number; // percentage
  approvedBy: string;
  approvedDate: Date;
}

export interface BudgetCategory {
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  items: BudgetItem[];
}

export interface BudgetItem {
  description: string;
  estimatedCost: number;
  actualCost?: number;
  status: 'planned' | 'approved' | 'purchased' | 'cancelled';
}

export interface EventExpense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: Date;
  vendor?: string;
  paymentMethod: string;
  receipt?: string;
  approvedBy: string;
  notes?: string;
}

export interface EventRevenue {
  id: string;
  source: 'registration-fees' | 'adoption-fees' | 'donations' | 'merchandise' | 'sponsorship';
  amount: number;
  date: Date;
  description?: string;
  notes?: string;
}

export interface EventMetrics {
  attendance: {
    registered: number;
    walkIns: number;
    total: number;
    noShows: number;
    noShowRate: number;
  };
  
  engagement: {
    averageTimeSpent: number; // minutes
    animalInteractions: number;
    informationRequests: number;
    businessCardsCollected: number;
  };
  
  adoptions: {
    total: number;
    bySpecies: { [key: string]: number };
    averageProcessingTime: number; // minutes
    totalFees: number;
  };
  
  leads: {
    total: number;
    byInterestLevel: { [key: string]: number };
    expectedConversions: number;
  };
  
  financial: {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    costPerAttendee: number;
    revenuePerAdoption: number;
  };
  
  marketing: {
    totalReach: number;
    totalImpressions: number;
    clickThroughRate: number;
    costPerClick: number;
    conversionRate: number;
  };
  
  satisfaction: {
    averageRating: number;
    recommendationRate: number;
    returnAttendeeRate: number;
  };
}

export interface FollowUpTask {
  id: string;
  type: 'thank-you-email' | 'adoption-follow-up' | 'lead-contact' | 'volunteer-feedback' | 'social-media-post';
  description: string;
  assignedTo: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
  completedDate?: Date;
  notes?: string;
}

export interface ChannelMetrics {
  impressions: number;
  reach: number;
  clicks: number;
  conversions: number;
  cost: number;
  cpm: number; // cost per mille (thousand impressions)
  cpc: number; // cost per click
  ctr: number; // click-through rate
  conversionRate: number;
}

export interface EventTemplate {
  id: string;
  name: string;
  description: string;
  type: AdoptionEvent['type'];
  
  // Default Values
  defaultDuration: number; // hours
  defaultSetup: EventSetup;
  defaultSupplies: EventSupply[];
  defaultBudget: EventBudget;
  
  // Recommendations
  recommendedVolunteers: number;
  recommendedAnimals: number;
  seasonalRecommendations: string[];
  
  // Checklist
  planningChecklist: ChecklistItem[];
  dayOfChecklist: ChecklistItem[];
  postEventChecklist: ChecklistItem[];
  
  createdBy: string;
  createdDate: Date;
  timesUsed: number;
  averageSuccess: number; // based on metrics from events using this template
}

export interface ChecklistItem {
  id: string;
  task: string;
  category: string;
  timeframe: string; // "2 weeks before", "day of", "1 week after", etc.
  isRequired: boolean;
  estimatedTime: number; // minutes
  assignedRole?: string;
  dependencies?: string[];
  notes?: string;
}