export interface AnimalIntake {
  id: string;
  intakeDate: Date;
  intakeTime: string;
  intakeStaff: string;
  
  // Basic Information
  name?: string;
  species: 'dog' | 'cat' | 'rabbit' | 'bird' | 'other';
  breed: string;
  primaryBreed?: string;
  secondaryBreed?: string;
  age: number;
  ageUnit: 'days' | 'weeks' | 'months' | 'years';
  gender: 'male' | 'female' | 'unknown';
  weight: number;
  weightUnit: 'lbs' | 'kg';
  color: string;
  markings?: string;
  
  // Intake Details
  intakeReason: 'stray' | 'owner-surrender' | 'abuse-case' | 'transfer' | 'birth-in-shelter' | 'other';
  intakeReasonDetails?: string;
  intakeSource: IntakeSource;
  locationFound?: string;
  
  // Health Assessment
  healthStatus: HealthAssessment;
  
  // Behavior Assessment
  behaviorAssessment: BehaviorAssessment;
  
  // Documentation
  photos: string[];
  videos?: string[];
  documents?: string[];
  microchipNumber?: string;
  microchipScanned: boolean;
  
  // Status
  status: 'pending-review' | 'approved' | 'rejected' | 'quarantine' | 'medical-hold';
  approvedBy?: string;
  approvedDate?: Date;
  notes?: string;
  
  // Surrender Information (if applicable)
  surrenderInfo?: SurrenderInfo;
  
  // Transfer Information (if applicable)
  transferInfo?: TransferInfo;
}

export interface IntakeSource {
  type: 'found-by-public' | 'animal-control' | 'other-shelter' | 'veterinarian' | 'good-samaritan' | 'staff' | 'other';
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  organizationName?: string;
  address?: string;
  reportNumber?: string;
}

export interface HealthAssessment {
  overallCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  bodyConditionScore: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // 1 = emaciated, 5 = ideal, 9 = obese
  temperature?: number;
  heartRate?: number;
  respiratoryRate?: number;
  
  // Vaccinations
  vaccinationStatus: 'unknown' | 'up-to-date' | 'partial' | 'none';
  vaccinations: Vaccination[];
  
  // Medical Conditions
  isSpayedNeutered: boolean | null;
  isPregnant?: boolean;
  medicalConditions: string[];
  currentMedications: string[];
  injuries: Injury[];
  parasites: ParasiteCheck[];
  
  // Tests
  fivFelvTest?: 'positive' | 'negative' | 'pending' | 'not-tested';
  heartwormTest?: 'positive' | 'negative' | 'pending' | 'not-tested';
  
  // Veterinarian
  examiningVet: string;
  vetNotes?: string;
  recommendedTreatment?: string[];
  quarantineRequired: boolean;
  quarantineDays?: number;
}

export interface Vaccination {
  type: string;
  date: Date;
  dueDate?: Date;
  veterinarian: string;
  lotNumber?: string;
  manufacturer?: string;
}

export interface Injury {
  type: string;
  location: string;
  severity: 'minor' | 'moderate' | 'severe';
  description: string;
  treatmentRequired: boolean;
  photos?: string[];
}

export interface ParasiteCheck {
  type: 'fleas' | 'ticks' | 'worms' | 'mites' | 'other';
  result: 'positive' | 'negative' | 'pending';
  treatment?: string;
  notes?: string;
}

export interface BehaviorAssessment {
  overallTemperament: 'very-friendly' | 'friendly' | 'shy' | 'fearful' | 'aggressive' | 'unknown';
  
  // Socialization
  socialWithPeople: 'excellent' | 'good' | 'cautious' | 'fearful' | 'aggressive' | 'unknown';
  socialWithDogs: 'excellent' | 'good' | 'cautious' | 'fearful' | 'aggressive' | 'unknown' | 'not-tested';
  socialWithCats: 'excellent' | 'good' | 'cautious' | 'fearful' | 'aggressive' | 'unknown' | 'not-tested';
  socialWithChildren: 'excellent' | 'good' | 'cautious' | 'fearful' | 'aggressive' | 'unknown' | 'not-tested';
  
  // Energy and Activity
  energyLevel: 1 | 2 | 3 | 4 | 5; // 1 = very low, 5 = very high
  playfulness: 1 | 2 | 3 | 4 | 5;
  exerciseNeeds: 'low' | 'moderate' | 'high';
  
  // Training and Behavior
  housebroken: boolean | null;
  leashTrained: boolean | null;
  crateComfortable: boolean | null;
  basicCommands: string[];
  behaviorIssues: BehaviorIssue[];
  
  // Special Needs
  specialNeeds: string[];
  medications: string[];
  dietaryRestrictions: string[];
  
  // Assessment Details
  assessedBy: string;
  assessmentDate: Date;
  assessmentNotes?: string;
  followUpNeeded: boolean;
  followUpDate?: Date;
}

export interface BehaviorIssue {
  type: 'separation-anxiety' | 'resource-guarding' | 'excessive-barking' | 'destructive' | 'jumping' | 'pulling' | 'fear-based' | 'other';
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  triggers?: string[];
  managementPlan?: string;
}

export interface SurrenderInfo {
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  ownerAddress: string;
  ownershipProof?: string[];
  
  reasonForSurrender: string;
  timeOwned: string;
  livingArrangement: string;
  veterinarianInfo?: string;
  
  // Animal History
  animalHistory: {
    previousNames?: string[];
    medicalHistory?: string;
    behaviorHistory?: string;
    favoriteActivities?: string[];
    dislikes?: string[];
    specialInstructions?: string;
  };
  
  // Surrender Agreement
  agreementSigned: boolean;
  signatureDate?: Date;
  surrenderFee?: number;
  surrenderFeePaid: boolean;
}

export interface TransferInfo {
  fromShelter: string;
  fromShelterContact: string;
  transferReason: string;
  transferDate: Date;
  transportMethod: string;
  
  // Documentation
  medicalRecords: string[];
  behaviorRecords: string[];
  transferAgreement?: string;
  
  // Health Certificate
  healthCertificate?: {
    issuedBy: string;
    issueDate: Date;
    expirationDate: Date;
    certificateNumber: string;
  };
}

export interface IntakeApproval {
  id: string;
  intakeId: string;
  reviewedBy: string;
  reviewDate: Date;
  decision: 'approved' | 'rejected' | 'needs-more-info';
  reason?: string;
  conditions?: string[];
  assignedToKennel?: string;
  assignedCarePlan?: string[];
  followUpRequired: boolean;
  followUpDate?: Date;
  notes?: string;
}