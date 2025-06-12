export interface AnimalWelfareComplaint {
  id: string;
  type: 'animal-abuse' | 'animal-neglect' | 'abandonment' | 'animal-rescue' | 'hoarding' | 'illegal-breeding' | 'other';
  status: 'pending' | 'under-investigation' | 'resolved' | 'closed' | 'escalated' | 'emergency';
  priority: 'critical' | 'high' | 'medium' | 'low';
  
  // Basic Information
  title: string;
  description: string;
  reportedDate: Date;
  incidentDate?: Date;
  
  // Location Information
  location: ComplaintLocation;
  
  // Reporter Information
  reporter: ComplaintReporter;
  
  // Animals Involved
  animals: ComplaintAnimal[];
  totalAnimalsInvolved: number;
  
  // Evidence
  evidence: ComplaintEvidence;
  
  // Investigation
  assignedTo?: InvestigationOfficer;
  investigationPriority: 'immediate' | 'urgent' | 'routine' | 'low-priority';
  urgencyLevel: 'critical' | 'high' | 'moderate' | 'low';
  
  // Timeline and Progress
  timeline: ComplaintTimelineEvent[];
  estimatedResolutionDate?: Date;
  actualResolutionDate?: Date;
  
  // Legal Actions
  legalActions: LegalAction[];
  complianceViolations: ComplianceViolation[];
  
  // Follow-up and Monitoring
  followUpRequired: boolean;
  followUpSchedule: FollowUpActivity[];
  monitoringPeriod?: number; // days
  
  // Outcome and Resolution
  outcome?: ComplaintOutcome;
  resolutionSummary?: string;
  preventiveMeasures?: string[];
  
  // Administrative
  caseNumber: string;
  confidentialityLevel: 'public' | 'restricted' | 'confidential' | 'classified';
  relatedCases: string[]; // other complaint IDs
  crossReferences: CrossReference[];
  
  // Notifications and Communications
  notifications: ComplaintNotification[];
  communications: ComplaintCommunication[];
  
  // Quality Assurance
  reviewStatus: 'pending-review' | 'under-review' | 'reviewed' | 'approved';
  reviewedBy?: string;
  reviewDate?: Date;
  qualityScore?: number; // 1-10
  
  // Metadata
  createdBy: string;
  createdDate: Date;
  lastModified: Date;
  modifiedBy: string;
  tags: string[];
  notes?: string;
}

export interface ComplaintLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: GeoCoordinates;
  
  // Additional Location Details
  landmark?: string;
  propertyType: 'residential' | 'commercial' | 'agricultural' | 'industrial' | 'vacant' | 'public' | 'other';
  propertyDescription?: string;
  accessibilityNotes?: string;
  
  // Jurisdiction
  jurisdiction: 'local' | 'county' | 'state' | 'federal' | 'tribal' | 'military';
  responsibleAgency: string;
  districtOrZone?: string;
  
  // Environmental Context
  environmentalFactors: string[];
  weatherConditions?: string;
  seasonalConsiderations?: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number; // meters
}

export interface ComplaintReporter {
  // Identity (may be anonymous)
  name?: string;
  isAnonymous: boolean;
  reporterType: 'individual' | 'organization' | 'government-agency' | 'law-enforcement' | 'veterinarian' | 'shelter-staff';
  
  // Contact Information
  phone?: string;
  email?: string;
  address?: string;
  
  // Relationship and Context
  relationship: 'neighbor' | 'passerby' | 'concerned-citizen' | 'family-member' | 'employee' | 'official' | 'other';
  relationshipToAnimals?: string;
  relationshipToLocation?: string;
  
  // Credibility and History
  previousReports: number;
  credibilityRating?: number; // 1-5
  reportingHistory: ReportingHistoryEntry[];
  
  // Legal Status
  willingnessToTestify: boolean;
  contactPermissions: ContactPermission[];
  confidentialityRequested: boolean;
  
  // Verification
  identityVerified: boolean;
  verificationMethod?: 'photo-id' | 'phone-verification' | 'address-verification' | 'reference-check';
  verificationDate?: Date;
}

export interface ReportingHistoryEntry {
  date: Date;
  type: string;
  outcome: string;
  verified: boolean;
}

export interface ContactPermission {
  method: 'phone' | 'email' | 'text' | 'mail' | 'in-person';
  allowed: boolean;
  timeRestrictions?: string;
  purposes: string[]; // investigation, follow-up, court-proceedings, etc.
}

export interface ComplaintAnimal {
  // Identification
  temporaryId?: string; // assigned during investigation
  officialId?: string; // if animal is rescued/cataloged
  microchipId?: string;
  tagNumber?: string;
  
  // Basic Information
  species: string;
  breed?: string;
  name?: string;
  approximateAge?: string;
  gender?: 'male' | 'female' | 'unknown';
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  weight?: number;
  color: string;
  description: string;
  distinctiveMarks?: string[];
  
  // Health and Condition
  healthStatus: 'unknown' | 'apparently-healthy' | 'injured' | 'sick' | 'malnourished' | 'deceased' | 'critical';
  bodyConditionScore?: number; // 1-9 scale
  immediateRisk: 'none' | 'low' | 'moderate' | 'high' | 'critical' | 'life-threatening';
  medicalConcerns: string[];
  behavioralConcerns: string[];
  
  // Living Conditions
  livingConditions: LivingConditions;
  careQuality: CareQualityAssessment;
  
  // Legal Status
  ownershipStatus: 'owned' | 'stray' | 'feral' | 'abandoned' | 'seized' | 'unknown';
  ownershipEvidence?: string[];
  
  // Rescue Status
  rescueRequired: boolean;
  rescueUrgency?: 'immediate' | 'within-24h' | 'within-week' | 'routine';
  rescueCompleted?: boolean;
  rescueDate?: Date;
  rescueOutcome?: RescueOutcome;
  currentLocation?: string;
  
  // Documentation
  photos: string[];
  videos: string[];
  medicalRecords?: string[];
  
  // Follow-up
  followUpRequired: boolean;
  monitoringSchedule?: string[];
  veterinaryExamScheduled?: boolean;
}

export interface LivingConditions {
  housingType: 'indoor' | 'outdoor' | 'both' | 'no-shelter' | 'inadequate-shelter';
  housingDescription: string;
  spaceSufficiency: 'adequate' | 'cramped' | 'severely-limited' | 'no-space';
  cleanliness: 'clean' | 'dirty' | 'unsanitary' | 'hazardous';
  ventilation: 'adequate' | 'poor' | 'none';
  temperature: 'appropriate' | 'too-hot' | 'too-cold' | 'extreme';
  
  // Resources
  foodAvailability: 'adequate' | 'insufficient' | 'spoiled' | 'none';
  waterAvailability: 'adequate' | 'insufficient' | 'contaminated' | 'none';
  
  // Safety
  safetyHazards: string[];
  escapeRisks: 'none' | 'low' | 'moderate' | 'high';
  injuryRisks: string[];
  
  // Other Animals
  otherAnimalsPresent: boolean;
  totalAnimalsOnProperty?: number;
  overcrowding: boolean;
  aggressiveAnimalsPresent: boolean;
}

export interface CareQualityAssessment {
  overallCareLevel: 'excellent' | 'adequate' | 'below-standard' | 'neglectful' | 'abusive';
  
  // Medical Care
  veterinaryCarePrevious: 'regular' | 'emergency-only' | 'minimal' | 'none' | 'unknown';
  vaccinationStatus: 'current' | 'expired' | 'partial' | 'none' | 'unknown';
  parasitePrevention: 'current' | 'expired' | 'none' | 'unknown';
  
  // Daily Care
  feedingSchedule: 'regular' | 'irregular' | 'minimal' | 'none';
  groomingCondition: 'well-groomed' | 'poor-grooming' | 'matted' | 'severely-neglected';
  exerciseProvided: 'adequate' | 'insufficient' | 'none';
  socialization: 'adequate' | 'minimal' | 'none' | 'forced-isolation';
  
  // Behavioral Indicators
  behaviorTowardsHumans: 'friendly' | 'fearful' | 'aggressive' | 'withdrawn' | 'extremely-fearful';
  stressIndicators: string[];
  abnormalBehaviors: string[];
  
  // Environmental Enrichment
  enrichmentProvided: boolean;
  enrichmentTypes?: string[];
  mentalStimulation: 'adequate' | 'minimal' | 'none';
}

export interface RescueOutcome {
  status: 'successful' | 'partially-successful' | 'unsuccessful' | 'pending';
  animalsRescued: number;
  animalsDeceasedOnScene: number;
  animalsLeftOnProperty: number;
  
  // Placement
  placementDestinations: AnimalPlacement[];
  
  // Challenges
  challengesEncountered: string[];
  resourcesRequired: string[];
  timeOnScene: number; // minutes
  
  // Legal Actions
  seizureWarrantRequired: boolean;
  seizureWarrantObtained?: boolean;
  propertySecured: boolean;
  evidenceCollected: string[];
  
  // Follow-up
  followUpVisitsScheduled: boolean;
  monitoringRequired: boolean;
  ownerEducationProvided: boolean;
}

export interface AnimalPlacement {
  animalId: string;
  placement: 'emergency-shelter' | 'foster-care' | 'veterinary-hospital' | 'permanent-sanctuary' | 'returned-to-owner' | 'euthanized';
  placementDate: Date;
  facilityName: string;
  facilityContact: string;
  expectedDuration?: number; // days
  specialNeeds?: string[];
}

export interface ComplaintEvidence {
  // Visual Evidence
  photos: EvidencePhoto[];
  videos: EvidenceVideo[];
  
  // Audio Evidence
  audioRecordings: EvidenceAudio[];
  
  // Written Evidence
  documents: EvidenceDocument[];
  witnessStatements: WitnessStatement[];
  
  // Physical Evidence
  physicalEvidence: PhysicalEvidence[];
  
  // Digital Evidence
  digitalEvidence: DigitalEvidence[];
  
  // Chain of Custody
  chainOfCustody: ChainOfCustodyRecord[];
  
  // Evidence Quality
  evidenceQuality: EvidenceQualityAssessment;
  admissibilityAssessment?: string;
}

export interface EvidencePhoto {
  id: string;
  filename: string;
  url: string;
  thumbnail?: string;
  takenDate: Date;
  takenBy: string;
  location?: GeoCoordinates;
  description: string;
  subjects: string[]; // what/who is shown
  metadataPreserved: boolean;
  authenticated: boolean;
  admissible: boolean;
  resolution: string;
  fileSize: number;
  hash: string; // for integrity verification
}

export interface EvidenceVideo {
  id: string;
  filename: string;
  url: string;
  thumbnail?: string;
  duration: number; // seconds
  takenDate: Date;
  takenBy: string;
  location?: GeoCoordinates;
  description: string;
  subjects: string[];
  metadataPreserved: boolean;
  authenticated: boolean;
  admissible: boolean;
  resolution: string;
  fileSize: number;
  hash: string;
}

export interface EvidenceAudio {
  id: string;
  filename: string;
  url: string;
  duration: number; // seconds
  recordedDate: Date;
  recordedBy: string;
  description: string;
  transcription?: string;
  authenticated: boolean;
  admissible: boolean;
  fileSize: number;
  hash: string;
}

export interface EvidenceDocument {
  id: string;
  title: string;
  type: 'report' | 'medical-record' | 'receipt' | 'correspondence' | 'legal-document' | 'permit' | 'license' | 'other';
  filename: string;
  url: string;
  submittedDate: Date;
  submittedBy: string;
  description: string;
  relevance: string;
  authenticated: boolean;
  originalDocument: boolean;
  sourceVerified: boolean;
}

export interface WitnessStatement {
  id: string;
  witnessName: string;
  isAnonymous: boolean;
  contactInfo?: ContactInformation;
  relationship: string;
  
  // Statement Details
  statementDate: Date;
  statementMethod: 'written' | 'verbal' | 'sworn-affidavit' | 'recorded-interview';
  statementText: string;
  
  // Credibility
  credibilityAssessment?: number; // 1-5
  corroborationAvailable: boolean;
  corroboratingEvidence?: string[];
  
  // Legal Status
  willingnessToTestify: boolean;
  subpoenaRequired: boolean;
  competency: 'competent' | 'questionable' | 'incompetent';
  
  // Follow-up
  followUpRequired: boolean;
  contactAttempts: ContactAttempt[];
}

export interface ContactInformation {
  phone?: string;
  email?: string;
  address?: string;
  preferredContactMethod: 'phone' | 'email' | 'text' | 'mail';
  bestTimeToContact?: string;
}

export interface ContactAttempt {
  date: Date;
  method: 'phone' | 'email' | 'text' | 'mail' | 'in-person';
  successful: boolean;
  response?: string;
  nextAttemptScheduled?: Date;
}

export interface PhysicalEvidence {
  id: string;
  type: 'veterinary-samples' | 'food-samples' | 'water-samples' | 'fecal-samples' | 'environmental-samples' | 'other';
  description: string;
  collectedDate: Date;
  collectedBy: string;
  collectionMethod: string;
  
  // Storage and Analysis
  storageLocation: string;
  storageConditions: string;
  expirationDate?: Date;
  analysisRequired: boolean;
  analysisCompleted?: boolean;
  analysisResults?: string;
  
  // Chain of Custody
  custodyLog: CustodyLogEntry[];
  currentCustodian: string;
}

export interface DigitalEvidence {
  id: string;
  type: 'social-media' | 'website' | 'email' | 'text-message' | 'phone-record' | 'gps-data' | 'other';
  source: string;
  collectedDate: Date;
  collectedBy: string;
  
  // Content
  content: string;
  attachments?: string[];
  metadata: Record<string, any>;
  
  // Verification
  hashValue: string;
  digitalSignature?: string;
  timestampVerified: boolean;
  sourceAuthenticated: boolean;
  
  // Legal Considerations
  obtainedLegally: boolean;
  consentObtained: boolean;
  warrantRequired: boolean;
  privacyConsiderations: string[];
}

export interface ChainOfCustodyRecord {
  evidenceId: string;
  custodianName: string;
  custodianRole: string;
  transferDate: Date;
  transferReason: string;
  receivedBy: string;
  receivedDate: Date;
  condition: string;
  notes?: string;
  signature?: string;
}

export interface CustodyLogEntry {
  timestamp: Date;
  action: 'collected' | 'transferred' | 'analyzed' | 'stored' | 'disposed';
  performedBy: string;
  location: string;
  purpose: string;
  notes?: string;
}

export interface EvidenceQualityAssessment {
  overallQuality: 'excellent' | 'good' | 'fair' | 'poor' | 'unusable';
  completeness: number; // percentage
  reliability: number; // 1-10
  admissibilityLikelihood: 'high' | 'medium' | 'low' | 'unlikely';
  
  // Strengths and Weaknesses
  strengths: string[];
  weaknesses: string[];
  gaps: string[];
  
  // Recommendations
  additionalEvidenceNeeded: string[];
  expertWitnessRequired: boolean;
  enhancementPossible: boolean;
}

export interface InvestigationOfficer {
  id: string;
  name: string;
  title: string;
  department: string;
  badgeNumber?: string;
  
  // Contact Information
  phone: string;
  email: string;
  radio?: string;
  
  // Qualifications
  certifications: string[];
  specializations: string[];
  experienceLevel: 'trainee' | 'junior' | 'senior' | 'expert' | 'supervisor';
  yearsExperience: number;
  
  // Caseload
  currentCaseload: number;
  maxCaseload: number;
  availabilityStatus: 'available' | 'busy' | 'overloaded' | 'unavailable';
  
  // Performance
  casesCompleted: number;
  averageResolutionTime: number; // days
  successRate: number; // percentage
  
  // Assignment Details
  assignmentDate: Date;
  assignmentReason: string;
  supervisorApproval: boolean;
  priorityOverride?: boolean;
}

export interface ComplaintTimelineEvent {
  id: string;
  timestamp: Date;
  eventType: 'report-received' | 'investigation-started' | 'site-visit' | 'evidence-collected' | 'interview-conducted' | 'legal-action' | 'resolution' | 'follow-up' | 'case-closed';
  actor: string; // who performed the action
  actorRole: string;
  
  // Event Details
  title: string;
  description: string;
  location?: string;
  
  // Associated Items
  evidenceCollected?: string[];
  documentsGenerated?: string[];
  peopleContacted?: string[];
  animalsInvolved?: string[];
  
  // Outcomes
  outcomes: string[];
  nextSteps: string[];
  
  // Quality and Validation
  verified: boolean;
  verifiedBy?: string;
  verificationDate?: Date;
  
  // Visibility
  publiclyVisible: boolean;
  confidentialityLevel: 'public' | 'restricted' | 'confidential';
  
  attachments?: string[];
  notes?: string;
}

export interface LegalAction {
  id: string;
  actionType: 'notice-of-violation' | 'citation' | 'seizure-warrant' | 'criminal-charges' | 'civil-penalty' | 'court-order' | 'settlement' | 'appeal';
  status: 'planned' | 'initiated' | 'pending' | 'active' | 'completed' | 'appealed' | 'overturned';
  
  // Basic Information
  title: string;
  description: string;
  issuedDate: Date;
  issuedBy: string;
  issuingAuthority: string;
  
  // Legal Details
  legalBasis: string[];
  violationsCharged: string[];
  jurisdictionLevel: 'local' | 'county' | 'state' | 'federal';
  courtVenue?: string;
  docketNumber?: string;
  
  // Compliance and Deadlines
  complianceRequired: boolean;
  complianceDeadline?: Date;
  complianceRequirements: string[];
  complianceStatus?: 'pending' | 'partial' | 'complete' | 'failed' | 'extended';
  
  // Financial Aspects
  fineAmount?: number;
  feesAssessed?: number;
  finesPaid?: number;
  paymentDueDate?: Date;
  paymentPlan?: PaymentPlan;
  
  // Enforcement
  enforcementActions: EnforcementAction[];
  appealsProcess: AppealsProcess;
  
  // Outcomes
  outcome?: LegalActionOutcome;
  effectiveDate?: Date;
  expirationDate?: Date;
  
  // Documentation
  documentationRequired: string[];
  documentsSubmitted: string[];
  legalDocuments: string[];
  
  // Follow-up
  followUpRequired: boolean;
  followUpSchedule: FollowUpItem[];
  monitoringPeriod?: number; // days
  
  // Case Relationships
  relatedActions: string[]; // other legal action IDs
  precedingActions: string[];
  resultingActions: string[];
  
  notes?: string;
}

export interface PaymentPlan {
  totalAmount: number;
  installments: PaymentInstallment[];
  interestRate?: number;
  defaultPenalty?: number;
  setupFee?: number;
}

export interface PaymentInstallment {
  installmentNumber: number;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  paidAmount?: number;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
}

export interface EnforcementAction {
  actionType: 'property-search' | 'animal-seizure' | 'arrest' | 'asset-seizure' | 'facility-closure' | 'permit-revocation';
  plannedDate?: Date;
  executedDate?: Date;
  executedBy: string[];
  
  // Authorization
  warrantRequired: boolean;
  warrantObtained?: boolean;
  warrantNumber?: string;
  judicialApproval: boolean;
  
  // Execution Details
  location: string;
  duration: number; // minutes
  personnelInvolved: string[];
  challengesEncountered: string[];
  
  // Results
  animalsSeized?: number;
  evidenceCollected?: string[];
  arrestsMade?: number;
  resistanceEncountered: boolean;
  
  // Documentation
  reportRequired: boolean;
  reportCompleted?: boolean;
  reportUrl?: string;
  mediaDocumentation: string[];
  
  outcome: 'successful' | 'partially-successful' | 'unsuccessful' | 'aborted';
  notes?: string;
}

export interface AppealsProcess {
  appealsAllowed: boolean;
  appealDeadline?: Date;
  appealsFiled: Appeal[];
  currentAppealStatus?: 'none' | 'pending' | 'under-review' | 'decided';
}

export interface Appeal {
  appealId: string;
  filedDate: Date;
  filedBy: string;
  grounds: string[];
  status: 'filed' | 'under-review' | 'hearing-scheduled' | 'decided' | 'withdrawn';
  
  // Process
  reviewingAuthority: string;
  hearingDate?: Date;
  hearingLocation?: string;
  
  // Decision
  decisionDate?: Date;
  decisionOutcome?: 'upheld' | 'overturned' | 'modified' | 'remanded';
  decisionReasoning?: string;
  
  // Further Appeals
  furtherAppealsAllowed: boolean;
  furtherAppealDeadline?: Date;
  
  documents: string[];
}

export interface LegalActionOutcome {
  finalStatus: 'resolved' | 'ongoing' | 'suspended' | 'dismissed' | 'settled';
  resolutionDate: Date;
  resolutionMethod: 'compliance' | 'payment' | 'court-order' | 'settlement' | 'dismissal' | 'appeal';
  
  // Results
  complianceAchieved: boolean;
  finesCollected: number;
  animalsRescued: number;
  animalsReturned: number;
  
  // Ongoing Obligations
  ongoingMonitoring: boolean;
  probationPeriod?: number; // days
  conditions: string[];
  
  // Success Metrics
  effectivenessRating: number; // 1-10
  deterrentEffect: 'high' | 'medium' | 'low' | 'none';
  publicSafetyImpact: string;
  animalWelfareImpact: string;
  
  // Lessons Learned
  successFactors: string[];
  challengesFaced: string[];
  improvementsNeeded: string[];
  
  // Follow-up
  followUpRecommendations: string[];
  relatedCasesGenerated: string[];
  
  notes?: string;
}

export interface ComplianceViolation {
  violationId: string;
  violationType: string;
  regulationViolated: string;
  jurisdiction: 'local' | 'county' | 'state' | 'federal';
  
  // Severity and Classification
  severity: 'minor' | 'moderate' | 'major' | 'critical' | 'felony';
  classification: 'administrative' | 'civil' | 'criminal' | 'regulatory';
  
  // Details
  description: string;
  evidenceSupportingViolation: string[];
  discoveredDate: Date;
  reportedBy: string;
  
  // Legal Implications
  statuteViolated: string[];
  regulationSection: string;
  penaltyRange: PenaltyRange;
  
  // Status and Resolution
  status: 'alleged' | 'substantiated' | 'dismissed' | 'resolved' | 'under-appeal';
  resolutionDate?: Date;
  resolutionMethod?: string;
  
  // Repeat Offenses
  isRepeatOffense: boolean;
  previousViolations: string[];
  escalationFactors: string[];
  
  notes?: string;
}

export interface PenaltyRange {
  minimumFine: number;
  maximumFine: number;
  jailTimeMinimum?: number; // days
  jailTimeMaximum?: number; // days
  additionalPenalties: string[];
}

export interface FollowUpActivity {
  activityId: string;
  activityType: 'welfare-check' | 'compliance-verification' | 'educational-visit' | 'veterinary-followup' | 'court-appearance' | 'monitoring-visit';
  
  // Scheduling
  scheduledDate: Date;
  estimatedDuration: number; // minutes
  frequency?: string; // for recurring activities
  
  // Assignment
  assignedTo: string;
  assignedRole: string;
  approvedBy?: string;
  
  // Requirements
  requiredActions: string[];
  requiredDocuments: string[];
  requiredPersonnel: string[];
  
  // Execution
  completedDate?: Date;
  actualDuration?: number;
  completedBy?: string;
  
  // Results
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  findings: string[];
  recommendedActions: string[];
  issuesIdentified: string[];
  
  // Documentation
  reportRequired: boolean;
  reportCompleted?: boolean;
  reportUrl?: string;
  photosRequired: boolean;
  photosTaken?: string[];
  
  // Follow-up Generation
  additionalFollowUpRequired: boolean;
  additionalActivitiesGenerated: string[];
  
  notes?: string;
}

export interface FollowUpItem {
  date: Date;
  description: string;
  responsibleParty: string;
  completed: boolean;
  completionDate?: Date;
  outcome?: string;
}

export interface ComplaintOutcome {
  outcomeType: 'resolved-successfully' | 'resolved-with-conditions' | 'unfounded' | 'unable-to-substantiate' | 'referred-to-other-agency' | 'ongoing-monitoring';
  resolutionDate: Date;
  
  // Summary
  outcomeSummary: string;
  keyFindings: string[];
  actionsRequired: string[];
  actionsCompleted: string[];
  
  // Animal Outcomes
  animalOutcomes: AnimalOutcome[];
  totalAnimalsHelped: number;
  
  // Compliance and Enforcement
  violationsSubstantiated: string[];
  penaltiesImposed: string[];
  complianceAchieved: boolean;
  ongoingMonitoringRequired: boolean;
  
  // Satisfaction and Effectiveness
  reporterSatisfaction?: number; // 1-5
  publicSafetyImproved: boolean;
  animalWelfareImproved: boolean;
  preventionMeasuresImplemented: string[];
  
  // Cost and Resources
  investigationCosts: number;
  enforcementCosts: number;
  animalCareCosts: number;
  totalCosts: number;
  resourcesUtilized: string[];
  
  // Quality Metrics
  resolutionTime: number; // days from report to resolution
  investigationQuality: number; // 1-10
  documentationQuality: number; // 1-10
  stakeholderSatisfaction: number; // 1-10
  
  // Lessons and Improvements
  successFactors: string[];
  challengesFaced: string[];
  lessonsLearned: string[];
  processImprovements: string[];
  trainingNeeds: string[];
  
  // Future Considerations
  riskOfRecurrence: 'low' | 'medium' | 'high';
  preventionRecommendations: string[];
  monitoringRecommendations: string[];
  policyImplications: string[];
  
  notes?: string;
}

export interface AnimalOutcome {
  animalId: string;
  finalStatus: 'rescued' | 'improved-conditions' | 'returned-to-owner' | 'relocated' | 'euthanized' | 'deceased' | 'unknown';
  currentLocation?: string;
  healthImprovement: boolean;
  longTermPrognosis: 'excellent' | 'good' | 'fair' | 'poor' | 'unknown';
  specialNeeds: string[];
  adoptionEligible: boolean;
  followUpRequired: boolean;
}

export interface CrossReference {
  referenceType: 'related-case' | 'similar-location' | 'same-reporter' | 'same-animals' | 'legal-precedent' | 'policy-reference';
  referenceId: string;
  relationship: string;
  relevance: 'high' | 'medium' | 'low';
  notes?: string;
}

export interface ComplaintNotification {
  notificationId: string;
  recipientType: 'reporter' | 'authorities' | 'public' | 'media' | 'other-agencies' | 'legal-counsel';
  recipientName: string;
  recipientContact: string;
  
  // Content
  notificationType: 'status-update' | 'investigation-started' | 'case-closed' | 'legal-action' | 'emergency-alert' | 'court-notice';
  subject: string;
  message: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  
  // Delivery
  deliveryMethod: 'email' | 'phone' | 'text' | 'mail' | 'in-person' | 'public-notice';
  scheduledDelivery: Date;
  actualDelivery?: Date;
  deliveryStatus: 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | 'bounced';
  
  // Response
  responseRequired: boolean;
  responseDeadline?: Date;
  responseReceived?: boolean;
  responseDate?: Date;
  responseContent?: string;
  
  // Legal Considerations
  legalRequirement: boolean;
  confidentialityLevel: 'public' | 'restricted' | 'confidential';
  retentionPeriod: number; // days
  
  attachments?: string[];
  notes?: string;
}

export interface ComplaintCommunication {
  communicationId: string;
  timestamp: Date;
  direction: 'inbound' | 'outbound';
  method: 'phone' | 'email' | 'text' | 'mail' | 'in-person' | 'fax' | 'social-media';
  
  // Participants
  fromParty: CommunicationParty;
  toParty: CommunicationParty[];
  
  // Content
  subject?: string;
  content: string;
  purpose: 'information-gathering' | 'status-update' | 'scheduling' | 'legal-notice' | 'education' | 'follow-up' | 'emergency';
  
  // Documentation
  recorded: boolean;
  transcribed: boolean;
  transcription?: string;
  attachments: string[];
  
  // Quality and Effectiveness
  effectivenessRating?: number; // 1-5
  outcomeAchieved: boolean;
  followUpRequired: boolean;
  followUpScheduled?: Date;
  
  // Legal Considerations
  privileged: boolean;
  confidential: boolean;
  evidenceValue: 'high' | 'medium' | 'low' | 'none';
  
  // Metadata
  initiatedBy: string;
  handledBy: string;
  reviewedBy?: string;
  approved: boolean;
  
  notes?: string;
}

export interface CommunicationParty {
  partyType: 'reporter' | 'investigator' | 'attorney' | 'veterinarian' | 'judge' | 'defendant' | 'witness' | 'agency-representative' | 'other';
  name: string;
  organization?: string;
  role: string;
  contactMethod: string;
  verified: boolean;
}

// Emergency Response Types
export interface EmergencyResponse {
  responseId: string;
  triggerEvent: string;
  emergencyType: 'animal-in-immediate-danger' | 'public-safety-threat' | 'natural-disaster' | 'mass-casualty' | 'hazardous-situation';
  priority: 'critical' | 'high' | 'medium';
  
  // Response Details
  responseTime: number; // minutes
  personnelDeployed: string[];
  resourcesUtilized: string[];
  
  // Coordination
  agenciesInvolved: ResponseAgency[];
  commandStructure: string;
  communicationProtocol: string;
  
  // Outcomes
  animalsRescued: number;
  humanInjuries: number;
  propertyDamage: boolean;
  publicSafetyRestored: boolean;
  
  // After Action
  debriefingCompleted: boolean;
  lessonsLearned: string[];
  improvementActions: string[];
  
  notes?: string;
}

export interface ResponseAgency {
  agencyName: string;
  agencyType: 'animal-control' | 'police' | 'fire' | 'emergency-medical' | 'environmental' | 'child-protective' | 'other';
  contactPerson: string;
  phone: string;
  role: string;
  resourcesProvided: string[];
}

// Analytics and Reporting Types
export interface ComplaintAnalytics {
  reportingPeriod: DateRange;
  
  // Volume Metrics
  totalComplaints: number;
  newComplaints: number;
  closedComplaints: number;
  activeComplaints: number;
  
  // Type Breakdown
  complaintsByType: ComplaintTypeMetric[];
  complaintsByPriority: PriorityMetric[];
  complaintsByLocation: LocationMetric[];
  
  // Performance Metrics
  averageResolutionTime: number; // days
  resolutionRateByType: ResolutionRateMetric[];
  investigatorPerformance: InvestigatorPerformanceMetric[];
  
  // Quality Metrics
  reporterSatisfactionAverage: number;
  evidenceQualityAverage: number;
  outcomeSucessRate: number;
  
  // Trends and Patterns
  seasonalTrends: SeasonalTrendMetric[];
  geographicPatterns: GeographicPatternMetric[];
  timeOfDayPatterns: TimePatternMetric[];
  
  // Resource Utilization
  costsByCategory: CostCategoryMetric[];
  resourceUtilization: ResourceUtilizationMetric[];
  
  // Outcomes and Impact
  animalWelfareImpact: WelfareImpactMetric[];
  preventionEffectiveness: PreventionMetric[];
  
  lastUpdated: Date;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface ComplaintTypeMetric {
  type: string;
  count: number;
  percentage: number;
  averageResolutionTime: number;
  resolutionRate: number;
}

export interface PriorityMetric {
  priority: string;
  count: number;
  percentage: number;
  averageResponseTime: number;
}

export interface LocationMetric {
  location: string;
  count: number;
  percentage: number;
  resolutionRate: number;
}

export interface ResolutionRateMetric {
  category: string;
  totalCases: number;
  resolvedCases: number;
  resolutionRate: number;
  averageTime: number;
}

export interface InvestigatorPerformanceMetric {
  investigatorId: string;
  investigatorName: string;
  casesAssigned: number;
  casesCompleted: number;
  averageResolutionTime: number;
  qualityScore: number;
  caseloadBalance: number;
}

export interface SeasonalTrendMetric {
  season: string;
  complaintCount: number;
  percentageChange: number;
  dominantTypes: string[];
}

export interface GeographicPatternMetric {
  area: string;
  complaintDensity: number;
  resourceAllocation: number;
  resolutionEfficiency: number;
}

export interface TimePatternMetric {
  timeFrame: string;
  peakHours: string[];
  resourceNeeds: string[];
  responseEfficiency: number;
}

export interface CostCategoryMetric {
  category: string;
  totalCost: number;
  averageCostPerCase: number;
  budgetPercentage: number;
}

export interface ResourceUtilizationMetric {
  resource: string;
  utilizationRate: number;
  demandVsCapacity: number;
  efficiency: number;
}

export interface WelfareImpactMetric {
  impactCategory: string;
  animalsHelped: number;
  conditionsImproved: number;
  preventionAchieved: number;
}

export interface PreventionMetric {
  interventionType: string;
  effectivenessRate: number;
  costEfficiency: number;
  longTermImpact: number;
}