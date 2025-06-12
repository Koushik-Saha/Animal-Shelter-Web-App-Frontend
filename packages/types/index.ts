export interface Animal {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'rabbit' | 'bird' | 'other';
  breed: string;
  age: number;
  gender: 'male' | 'female';
  weight: number;
  color: string;
  description: string;
  status: 'available' | 'adopted' | 'foster' | 'medical' | 'quarantine';
  intakeDate: Date;
  photos: string[];
  videos?: string[];
  healthRecords: HealthRecord[];
  behaviorProfile: BehaviorProfile;
  adoptionRequirements?: string[];
  isSponsored?: boolean;
  sponsorshipGoal?: number;
  currentSponsorship?: number;
}

export interface HealthRecord {
  id: string;
  animalId: string;
  date: Date;
  type: 'vaccination' | 'medication' | 'surgery' | 'checkup' | 'treatment';
  title: string;
  description: string;
  veterinarian: string;
  nextDueDate?: Date;
  documents?: string[];
  cost?: number;
}

export interface BehaviorProfile {
  temperament: string[];
  energyLevel: 1 | 2 | 3 | 4 | 5;
  socialWithDogs: boolean;
  socialWithCats: boolean;
  socialWithKids: boolean;
  trainingLevel: 'none' | 'basic' | 'intermediate' | 'advanced';
  specialNeeds?: string[];
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: Address;
  role: 'admin' | 'staff' | 'volunteer' | 'adopter' | 'foster';
  preferences?: AdoptionPreferences;
  applications: AdoptionApplication[];
  donations: Donation[];
  volunteerHours?: number;
  badges?: Badge[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AdoptionPreferences {
  species: string[];
  ageRange: [number, number];
  sizePreference: 'small' | 'medium' | 'large' | 'any';
  energyLevel: number[];
  livingArrangement: 'apartment' | 'house' | 'farm';
  hasYard: boolean;
  hasOtherPets: boolean;
  hasChildren: boolean;
  childrenAges?: number[];
  experience: 'first-time' | 'some' | 'experienced';
}

export interface AdoptionApplication {
  id: string;
  animalId: string;
  applicantId: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  submittedDate: Date;
  responses: Record<string, any>;
  compatibilityScore?: number;
  notes?: string;
  homeVisitScheduled?: Date;
  homeVisitCompleted?: boolean;
  references: Reference[];
}

export interface Reference {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  contacted: boolean;
  notes?: string;
}

export interface Donation {
  id: string;
  donorId?: string;
  amount: number;
  currency: 'USD' | 'ETH' | 'MATIC';
  type: 'one-time' | 'recurring' | 'sponsorship';
  animalId?: string;
  transactionHash?: string;
  date: Date;
  isAnonymous: boolean;
  message?: string;
  nftReward?: NFTReward;
}

export interface NFTReward {
  tokenId: string;
  contractAddress: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  imageUrl: string;
  attributes: Record<string, any>;
}

export interface Volunteer {
  id: string;
  userId: string;
  skills: string[];
  availability: AvailabilitySlot[];
  totalHours: number;
  currentLevel: number;
  badges: Badge[];
  tasks: VolunteerTask[];
}

export interface AvailabilitySlot {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  startTime: string;
  endTime: string;
}

export interface VolunteerTask {
  id: string;
  title: string;
  description: string;
  type: 'dog-walking' | 'cleaning' | 'socializing' | 'training' | 'transport' | 'event';
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedHours: number;
  status: 'assigned' | 'in-progress' | 'completed';
  scheduledDate?: Date;
  completedDate?: Date;
  animalIds?: string[];
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedDate: Date;
  progress?: number;
  maxProgress?: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'adoption' | 'fundraising' | 'volunteer' | 'education';
  date: Date;
  location: string;
  participatingAnimals: string[];
  volunteers: string[];
  attendees: EventAttendee[];
  maxCapacity?: number;
}

export interface EventAttendee {
  userId: string;
  status: 'registered' | 'attended' | 'no-show';
  registrationDate: Date;
  checkedInAt?: Date;
}

export interface FosterFamily {
  id: string;
  userId: string;
  capacity: number;
  currentAnimals: string[];
  experience: string[];
  preferences: FosterPreferences;
  homeApproved: boolean;
  approvalDate?: Date;
}

export interface FosterPreferences {
  species: string[];
  specialNeeds: boolean;
  maxAge?: number;
  maxWeight?: number;
  medicalCare: boolean;
}

export interface Report {
  id: string;
  type: 'lost' | 'found' | 'abuse' | 'stray';
  reporterId?: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  description: string;
  photos: string[];
  date: Date;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  assignedTo?: string;
  animalId?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'food' | 'medicine' | 'supplies' | 'toys' | 'bedding';
  currentStock: number;
  minimumStock: number;
  unit: 'pieces' | 'lbs' | 'bottles' | 'boxes';
  lastRestocked: Date;
  supplier?: string;
  cost?: number;
}

export interface Analytics {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  metrics: {
    intakes: number;
    adoptions: number;
    donations: number;
    volunteerHours: number;
    averageStayDuration: number;
    adoptionRate: number;
    returnRate: number;
  };
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es' | 'fr';

export interface UserPreferences {
  theme: Theme;
  language: Language;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    shareData: boolean;
    publicProfile: boolean;
  };
}

// Re-export all types from separate modules
export * from './animals';
export * from './users';
export * from './medical';
export * from './adoption';
export * from './volunteer';
export * from './inventory';
export * from './foster';
export * from './analytics';
export * from './events';
export * from './lostfound';
export * from './behavior';
export * from './web3';
export * from './sponsorship';
export * from './transport';
export * from './reporting';
export * from './legal';