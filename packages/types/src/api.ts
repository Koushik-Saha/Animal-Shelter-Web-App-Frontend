// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
  VOLUNTEER = 'volunteer',
  ADOPTER = 'adopter',
  DONOR = 'donor',
  VETERINARIAN = 'veterinarian'
}

// Animal Types
export interface Animal {
  id: string;
  name: string;
  species: AnimalSpecies;
  breed: string;
  age: number;
  gender: AnimalGender;
  weight: number;
  color: string;
  description: string;
  status: AnimalStatus;
  intakeDate: string;
  intakeReason: string;
  microchipId?: string;
  isSpayedNeutered: boolean;
  isVaccinated: boolean;
  healthStatus: HealthStatus;
  behaviorNotes: string;
  photos: AnimalPhoto[];
  medicalRecords: MedicalRecord[];
  location: Location;
  adoptionFee: number;
  specialNeeds: string[];
  energyLevel: EnergyLevel;
  goodWithKids: boolean;
  goodWithAnimals: boolean;
  houseTrained: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum AnimalSpecies {
  DOG = 'dog',
  CAT = 'cat',
  RABBIT = 'rabbit',
  BIRD = 'bird',
  REPTILE = 'reptile',
  OTHER = 'other'
}

export enum AnimalGender {
  MALE = 'male',
  FEMALE = 'female',
  UNKNOWN = 'unknown'
}

export enum AnimalStatus {
  AVAILABLE = 'available',
  ADOPTED = 'adopted',
  PENDING = 'pending',
  HOLD = 'hold',
  MEDICAL = 'medical',
  FOSTER = 'foster',
  LOST = 'lost',
  DECEASED = 'deceased'
}

export enum HealthStatus {
  HEALTHY = 'healthy',
  SICK = 'sick',
  INJURED = 'injured',
  RECOVERING = 'recovering',
  CRITICAL = 'critical'
}

export enum EnergyLevel {
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export interface AnimalPhoto {
  id: string;
  url: string;
  caption?: string;
  isPrimary: boolean;
  uploadedAt: string;
}

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  capacity: number;
  currentOccupancy: number;
}

export enum LocationType {
  KENNEL = 'kennel',
  CAGE = 'cage',
  ROOM = 'room',
  FOSTER = 'foster',
  MEDICAL = 'medical'
}

// Medical Types
export interface MedicalRecord {
  id: string;
  animalId: string;
  veterinarianId: string;
  visitDate: string;
  visitType: VisitType;
  symptoms: string[];
  diagnosis: string;
  treatment: string;
  medications: Medication[];
  followUpDate?: string;
  notes: string;
  cost: number;
  attachments: MedicalAttachment[];
  createdAt: string;
  updatedAt: string;
}

export enum VisitType {
  CHECKUP = 'checkup',
  VACCINATION = 'vaccination',
  SURGERY = 'surgery',
  EMERGENCY = 'emergency',
  FOLLOWUP = 'followup',
  SPAY_NEUTER = 'spay_neuter'
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  instructions: string;
}

export interface MedicalAttachment {
  id: string;
  filename: string;
  url: string;
  type: string;
  uploadedAt: string;
}

// Adoption Types
export interface AdoptionApplication {
  id: string;
  animalId: string;
  applicantId: string;
  status: ApplicationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  adoptionDate?: string;
  applicationData: AdoptionApplicationData;
  notes: string;
  homeVisitScheduled?: string;
  homeVisitCompleted?: boolean;
  references: Reference[];
  documents: ApplicationDocument[];
  createdAt: string;
  updatedAt: string;
}

export enum ApplicationStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
  COMPLETED = 'completed'
}

export interface AdoptionApplicationData {
  personalInfo: PersonalInfo;
  livingConditions: LivingConditions;
  petExperience: PetExperience;
  preferences: AdoptionPreferences;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  dateOfBirth: string;
  occupation: string;
  employer: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface LivingConditions {
  housingType: HousingType;
  ownOrRent: OwnershipType;
  hasYard: boolean;
  yardFenced: boolean;
  householdSize: number;
  hasChildren: boolean;
  childrenAges: number[];
  hasOtherPets: boolean;
  otherPets: PetInfo[];
}

export enum HousingType {
  HOUSE = 'house',
  APARTMENT = 'apartment',
  CONDO = 'condo',
  TOWNHOUSE = 'townhouse',
  OTHER = 'other'
}

export enum OwnershipType {
  OWN = 'own',
  RENT = 'rent'
}

export interface PetInfo {
  species: string;
  breed: string;
  age: number;
  spayedNeutered: boolean;
  vaccinated: boolean;
}

export interface PetExperience {
  hadPetsBefore: boolean;
  currentPets: number;
  experienceLevel: ExperienceLevel;
  preferredTrainingMethods: string[];
  veterinarian?: VeterinarianInfo;
}

export enum ExperienceLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  EXPERIENCED = 'experienced',
  EXPERT = 'expert'
}

export interface VeterinarianInfo {
  name: string;
  clinicName: string;
  phone: string;
  address: Address;
}

export interface AdoptionPreferences {
  species: AnimalSpecies[];
  ageRange: AgeRange;
  sizePreference: SizePreference[];
  energyLevel: EnergyLevel[];
  goodWithKids?: boolean;
  goodWithAnimals?: boolean;
  specialNeeds?: boolean;
}

export interface AgeRange {
  min: number;
  max: number;
}

export enum SizePreference {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra_large'
}

export interface Reference {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  contacted: boolean;
  contactedAt?: string;
  feedback?: string;
}

export interface ApplicationDocument {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
  uploadedAt: string;
}

export enum DocumentType {
  ID = 'id',
  PROOF_OF_INCOME = 'proof_of_income',
  LEASE_AGREEMENT = 'lease_agreement',
  VETERINARY_RECORDS = 'veterinary_records',
  OTHER = 'other'
}

// Volunteer Types
export interface Volunteer {
  id: string;
  userId: string;
  status: VolunteerStatus;
  skills: VolunteerSkill[];
  availability: Availability[];
  hoursLogged: number;
  startDate: string;
  backgroundCheckCompleted: boolean;
  emergencyContact: EmergencyContact;
  preferences: VolunteerPreferences;
  badges: Badge[];
  createdAt: string;
  updatedAt: string;
}

export enum VolunteerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended'
}

export interface VolunteerSkill {
  id: string;
  name: string;
  level: SkillLevel;
  certified: boolean;
  certificationDate?: string;
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface Availability {
  dayOfWeek: number; // 0-6, Sunday to Saturday
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface VolunteerPreferences {
  taskTypes: TaskType[];
  animalTypes: AnimalSpecies[];
  maxHoursPerWeek: number;
  canWorkWeekends: boolean;
  canWorkEvenings: boolean;
}

export enum TaskType {
  ANIMAL_CARE = 'animal_care',
  CLEANING = 'cleaning',
  ADMINISTRATIVE = 'administrative',
  EVENTS = 'events',
  TRANSPORT = 'transport',
  PHOTOGRAPHY = 'photography',
  TRAINING = 'training',
  FUNDRAISING = 'fundraising'
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  requirements: string[];
}

// Task Types
export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo?: string;
  assignedBy: string;
  dueDate?: string;
  estimatedDuration: number; // in minutes
  actualDuration?: number;
  animalId?: string;
  location?: string;
  instructions: string[];
  attachments: TaskAttachment[];
  completedAt?: string;
  completionNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  OVERDUE = 'overdue'
}

export interface TaskAttachment {
  id: string;
  filename: string;
  url: string;
  type: string;
  uploadedAt: string;
}

// Donation Types
export interface Donation {
  id: string;
  donorId?: string;
  amount: number;
  currency: string;
  type: DonationType;
  method: PaymentMethod;
  status: DonationStatus;
  isRecurring: boolean;
  recurringFrequency?: RecurringFrequency;
  dedicatedTo?: string;
  message?: string;
  isAnonymous: boolean;
  taxDeductible: boolean;
  receiptSent: boolean;
  receiptUrl?: string;
  campaignId?: string;
  transactionId: string;
  processedAt?: string;
  refundedAt?: string;
  refundReason?: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export enum DonationType {
  GENERAL = 'general',
  MEDICAL = 'medical',
  FOOD = 'food',
  SUPPLIES = 'supplies',
  BUILDING = 'building',
  EMERGENCY = 'emergency',
  MEMORIAL = 'memorial',
  HONOR = 'honor'
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
  PAYPAL = 'paypal',
  CRYPTO = 'crypto',
  CHECK = 'check',
  CASH = 'cash'
}

export enum DonationStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled'
}

export enum RecurringFrequency {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually'
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startDate: string;
  endDate: string;
  location: EventLocation;
  capacity?: number;
  registeredCount: number;
  status: EventStatus;
  isPublic: boolean;
  requiresRegistration: boolean;
  registrationDeadline?: string;
  cost?: number;
  organizer: string;
  volunteers: string[];
  animals: string[];
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export enum EventType {
  ADOPTION = 'adoption',
  FUNDRAISING = 'fundraising',
  EDUCATION = 'education',
  VOLUNTEER = 'volunteer',
  COMMUNITY = 'community',
  MEDICAL = 'medical'
}

export interface EventLocation {
  name: string;
  address: Address;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

// Search and Filter Types
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface AnimalSearchFilters {
  species?: AnimalSpecies[];
  breed?: string[];
  ageRange?: AgeRange;
  gender?: AnimalGender[];
  status?: AnimalStatus[];
  location?: string[];
  specialNeeds?: boolean;
  goodWithKids?: boolean;
  goodWithAnimals?: boolean;
  energyLevel?: EnergyLevel[];
  sizeRange?: SizePreference[];
}

// Statistics Types
export interface ShelterStats {
  totalAnimals: number;
  availableAnimals: number;
  adoptedThisMonth: number;
  adoptedThisYear: number;
  totalVolunteers: number;
  activeVolunteers: number;
  totalDonations: number;
  donationsThisMonth: number;
  upcomingEvents: number;
  pendingApplications: number;
  animalsBySpecies: Record<AnimalSpecies, number>;
  adoptionsByMonth: Array<{
    month: string;
    count: number;
  }>;
  donationsByMonth: Array<{
    month: string;
    amount: number;
  }>;
}