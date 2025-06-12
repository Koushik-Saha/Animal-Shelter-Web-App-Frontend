export interface BehaviorProfile {
  animalId: string;
  energyLevel: number; // 1-5 scale
  socialSkills: number; // 1-5 scale
  trainability: number; // 1-5 scale
  anxietyLevel: number; // 1-5 scale
  aggressionLevel: number; // 1-5 scale
  playfulness: number; // 1-5 scale
  confidenceLevel: number; // 1-5 scale
  attentionSpan: number; // 1-5 scale
  
  // Specific Behaviors
  respondsToCalls: boolean;
  isTimid: boolean;
  isDestructive: boolean;
  hasResourceGuarding: boolean;
  hasSeparationAnxiety: boolean;
  isGoodWithChildren: boolean;
  isGoodWithDogs: boolean;
  isGoodWithCats: boolean;
  isGoodWithStrangers: boolean;
  
  // Assessment History
  assessments: BehaviorAssessment[];
  lastUpdated: Date;
  assessedBy: string;
  nextAssessmentDue: Date;
  
  // Special Notes
  triggers: string[];
  strengths: string[];
  improvementAreas: string[];
  specialNeeds: string[];
  notes?: string;
}

export interface BehaviorAssessment {
  id: string;
  animalId: string;
  assessmentDate: Date;
  assessorId: string;
  assessorName: string;
  assessmentType: 'initial' | 'weekly' | 'monthly' | 'pre-adoption' | 'post-incident' | 'progress-check';
  
  // Behavioral Metrics
  energyLevel: number;
  socialSkills: number;
  trainability: number;
  anxietyLevel: number;
  aggressionLevel: number;
  playfulness: number;
  confidenceLevel: number;
  attentionSpan: number;
  
  // Specific Tests
  tests: BehaviorTest[];
  
  // Overall Assessment
  overallScore: number; // 1-100
  readinessForAdoption: 'ready' | 'needs-work' | 'not-ready' | 'special-placement';
  recommendedPrograms: string[];
  restrictionsRecommended: string[];
  
  // Follow-up
  followUpRequired: boolean;
  followUpDate?: Date;
  followUpType?: string;
  
  notes: string;
  recommendations: string[];
}

export interface BehaviorTest {
  testName: string;
  testType: 'stranger-interaction' | 'food-guarding' | 'toy-possession' | 'handling' | 'noise-sensitivity' | 'child-interaction' | 'dog-interaction' | 'cat-interaction';
  score: number; // 1-5 scale
  passed: boolean;
  observations: string;
  recommendations?: string[];
}

export interface BehaviorObservation {
  id: string;
  animalId: string;
  observerId: string;
  observerName: string;
  observationDate: Date;
  observationTime: string;
  
  // Context
  location: string;
  situation: string;
  triggerEvent?: string;
  
  // Observation Details
  behaviorCategory: 'social' | 'play' | 'anxiety' | 'aggression' | 'training' | 'feeding' | 'exercise' | 'rest' | 'grooming';
  behaviorType: string;
  description: string;
  intensity: number; // 1-5 scale
  duration: number; // minutes
  
  // Environmental Factors
  weatherConditions?: string;
  noiseLevel?: 'quiet' | 'moderate' | 'loud';
  crowdingLevel?: 'alone' | 'few-animals' | 'many-animals';
  staffPresent: number;
  volunteersPresent: number;
  visitorsPresent: number;
  
  // Response and Resolution
  intervention?: string;
  interventionEffective?: boolean;
  resolutionTime?: number; // minutes
  
  // Media
  photos?: string[];
  videos?: string[];
  
  // Follow-up
  requiresFollowUp: boolean;
  followUpDate?: Date;
  followUpType?: string;
  
  tags: string[];
  notes?: string;
}

export interface BehaviorGoal {
  id: string;
  animalId: string;
  goalType: 'behavior-modification' | 'socialization' | 'training' | 'anxiety-reduction' | 'confidence-building' | 'adoption-readiness';
  title: string;
  description: string;
  
  // Goal Details
  targetBehavior: string;
  currentLevel: number; // 1-10 scale
  targetLevel: number; // 1-10 scale
  progress: number; // percentage
  
  // Timeline
  startDate: Date;
  targetDate: Date;
  estimatedDuration: number; // days
  
  // Methods and Strategy
  trainingMethods: string[];
  enrichmentActivities: string[];
  interventions: string[];
  
  // Assignment
  assignedTo: string[];
  supervising: string;
  
  // Progress Tracking
  milestones: BehaviorMilestone[];
  progressLogs: ProgressLog[];
  
  // Status
  status: 'active' | 'paused' | 'completed' | 'discontinued';
  priority: 'low' | 'medium' | 'high' | 'critical';
  
  // Completion
  completedDate?: Date;
  completionNotes?: string;
  successfullyMet: boolean;
  
  notes?: string;
}

export interface BehaviorMilestone {
  id: string;
  milestone: string;
  targetDate: Date;
  achievedDate?: Date;
  isAchieved: boolean;
  evidence?: string;
  notes?: string;
}

export interface ProgressLog {
  id: string;
  date: Date;
  loggedBy: string;
  progressRating: number; // 1-10 scale
  description: string;
  activities: string[];
  challenges: string[];
  successes: string[];
  nextSteps: string[];
  mediaFiles?: string[];
}

export interface EnrichmentActivity {
  id: string;
  name: string;
  type: 'cognitive' | 'physical' | 'social' | 'sensory' | 'foraging' | 'comfort' | 'training';
  category: 'puzzle' | 'exercise' | 'play' | 'exploration' | 'relaxation' | 'mental-stimulation';
  
  // Activity Details
  description: string;
  instructions: string[];
  duration: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard';
  
  // Suitability
  species: ('dog' | 'cat' | 'rabbit' | 'bird' | 'other')[];
  ageGroups: ('puppy' | 'kitten' | 'young' | 'adult' | 'senior')[];
  energyLevels: ('low' | 'medium' | 'high')[];
  sizeGroups: ('tiny' | 'small' | 'medium' | 'large' | 'giant')[];
  
  // Benefits and Contraindications
  benefits: string[];
  contraindications: string[];
  safetyNotes: string[];
  
  // Requirements
  equipment: EquipmentItem[];
  supplies: string[];
  spaceRequired: string;
  supervisionLevel: 'none' | 'minimal' | 'moderate' | 'constant';
  staffRequirements: string[];
  
  // Tracking
  frequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly' | 'as-needed';
  seasonalRestrictions?: string[];
  weatherRestrictions?: string[];
  
  // Performance Metrics
  successMetrics: string[];
  timesUsed: number;
  averageRating: number;
  averageEngagement: number;
  
  // Administrative
  createdBy: string;
  createdDate: Date;
  lastModified: Date;
  modifiedBy: string;
  isActive: boolean;
  approvedBy?: string;
  approvalDate?: Date;
  
  tags: string[];
  photos?: string[];
  videos?: string[];
}

export interface EquipmentItem {
  name: string;
  quantity: number;
  isRequired: boolean;
  alternatives?: string[];
}

export interface ActivitySession {
  id: string;
  animalId: string;
  activityId: string;
  scheduledDate: Date;
  scheduledTime: string;
  actualStartTime?: Date;
  actualEndTime?: Date;
  
  // Assignment
  assignedTo: string;
  assignedBy: string;
  assignmentDate: Date;
  
  // Session Details
  location: string;
  equipment: string[];
  participants: string[]; // other animals if group activity
  
  // Execution
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  actualDuration?: number; // minutes
  completionPercentage: number;
  
  // Assessment
  animalEngagement: number; // 1-5 scale
  animalEnjoyment: number; // 1-5 scale
  difficultyLevel: number; // 1-5 scale
  achievedObjectives: string[];
  challengesFaced: string[];
  
  // Observations
  behaviorObserved: string[];
  progressNoted: string[];
  concernsRaised: string[];
  
  // Follow-up
  recommendContinue: boolean;
  suggestedModifications: string[];
  nextSessionDate?: Date;
  
  // Media and Documentation
  photos?: string[];
  videos?: string[];
  notes: string;
  
  // Administrative
  conductedBy: string;
  witnessedBy?: string[];
  reportedDate: Date;
}

export interface BehaviorProgram {
  id: string;
  name: string;
  description: string;
  programType: 'basic-training' | 'behavior-modification' | 'socialization' | 'therapy' | 'specialized';
  
  // Program Structure
  duration: number; // days
  sessionsPerWeek: number;
  sessionDuration: number; // minutes
  totalSessions: number;
  
  // Eligibility
  eligibilityCriteria: string[];
  species: string[];
  ageRequirements?: {
    min?: number;
    max?: number;
  };
  behaviorRequirements: string[];
  
  // Program Content
  curriculum: ProgramSession[];
  requiredActivities: string[];
  optionalActivities: string[];
  assessmentSchedule: string[];
  
  // Resources
  staffRequirements: string[];
  equipmentNeeded: string[];
  spaceRequirements: string;
  budget?: number;
  
  // Tracking and Metrics
  successCriteria: string[];
  graduationRequirements: string[];
  successRate: number;
  averageDuration: number;
  
  // Status
  isActive: boolean;
  enrollmentOpen: boolean;
  maxParticipants: number;
  currentEnrollment: number;
  waitingList: number;
  
  // Administrative
  createdBy: string;
  createdDate: Date;
  lastModified: Date;
  modifiedBy: string;
  approvedBy?: string;
  approvalDate?: Date;
}

export interface ProgramSession {
  sessionNumber: number;
  title: string;
  objectives: string[];
  activities: string[];
  duration: number; // minutes
  materials: string[];
  assessmentPoints: string[];
  homework?: string[];
}

export interface ProgramEnrollment {
  id: string;
  animalId: string;
  programId: string;
  enrollmentDate: Date;
  enrolledBy: string;
  
  // Status
  status: 'enrolled' | 'active' | 'completed' | 'dropped' | 'transferred';
  startDate: Date;
  expectedEndDate: Date;
  actualEndDate?: Date;
  
  // Progress
  sessionsCompleted: number;
  sessionsTotal: number;
  progressPercentage: number;
  currentLevel: string;
  
  // Performance
  overallProgress: number; // 1-100
  attendanceRate: number; // percentage
  engagementLevel: number; // 1-5 scale
  behaviorImprovement: number; // 1-5 scale
  
  // Completion
  graduated: boolean;
  graduationDate?: Date;
  finalAssessment?: string;
  certificateIssued: boolean;
  
  // Follow-up
  postProgramSupport: boolean;
  followUpDate?: Date;
  followUpNotes?: string;
  
  notes?: string;
}

export interface BehaviorAlert {
  id: string;
  animalId: string;
  alertType: 'behavioral-incident' | 'regression' | 'milestone-achieved' | 'assessment-due' | 'program-completion';
  severity: 'low' | 'medium' | 'high' | 'critical';
  
  // Alert Details
  title: string;
  description: string;
  triggerDate: Date;
  
  // Related Records
  relatedObservationId?: string;
  relatedGoalId?: string;
  relatedProgramId?: string;
  
  // Response
  status: 'new' | 'acknowledged' | 'in-progress' | 'resolved' | 'dismissed';
  assignedTo?: string;
  acknowledgedBy?: string;
  acknowledgedDate?: Date;
  
  // Resolution
  actionTaken?: string;
  resolvedBy?: string;
  resolvedDate?: Date;
  resolutionNotes?: string;
  
  // Follow-up
  requiresFollowUp: boolean;
  followUpDate?: Date;
  followUpActions?: string[];
  
  // Notifications
  notificationsSent: string[];
  escalated: boolean;
  escalatedTo?: string;
  escalationDate?: Date;
  
  createdDate: Date;
  expiresDate?: Date;
}

export interface BehaviorReport {
  id: string;
  reportType: 'individual-animal' | 'program-summary' | 'facility-overview' | 'comparative-analysis';
  generatedDate: Date;
  generatedBy: string;
  
  // Report Parameters
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  animalIds?: string[];
  programIds?: string[];
  
  // Report Data
  summary: ReportSummary;
  detailedData: any; // structured based on report type
  charts: ChartData[];
  recommendations: string[];
  
  // Sharing and Distribution
  isPublic: boolean;
  sharedWith: string[];
  distributionList: string[];
  
  // Administrative
  reportFormat: 'pdf' | 'excel' | 'web';
  reportUrl?: string;
  downloadCount: number;
  lastAccessed?: Date;
}

export interface ReportSummary {
  totalAnimalsAssessed: number;
  averageBehaviorScore: number;
  improvementRate: number;
  adoptionReadinessRate: number;
  programCompletionRate: number;
  incidentCount: number;
  keyFindings: string[];
  trendsIdentified: string[];
}

export interface ChartData {
  chartType: 'line' | 'bar' | 'pie' | 'scatter' | 'radar';
  title: string;
  data: any[];
  configuration: any;
}

export interface BehaviorMetrics {
  animalId: string;
  date: Date;
  
  // Daily Metrics
  activityLevel: number; // 1-5 scale
  moodRating: number; // 1-5 scale
  socialInteractions: number;
  trainingSessionsAttended: number;
  incidentsReported: number;
  
  // Specific Behaviors (count)
  positiveInteractions: number;
  negativeInteractions: number;
  playSessionsInitiated: number;
  anxietyEpisodes: number;
  aggressiveIncidents: number;
  
  // Environmental Factors
  weatherConditions: string;
  visitorCount: number;
  noiseLevel: number; // 1-5 scale
  kennelOccupancy: number;
  
  // Health Indicators
  appetiteRating: number; // 1-5 scale
  sleepQuality: number; // 1-5 scale
  energyLevel: number; // 1-5 scale
  stressIndicators: string[];
  
  // Activity Participation
  enrichmentActivitiesCompleted: number;
  exerciseMinutes: number;
  trainingMinutes: number;
  socializationMinutes: number;
  restMinutes: number;
  
  // Progress Indicators
  goalProgressUpdates: string[];
  milestonesAchieved: string[];
  skillsImproved: string[];
  challengesFaced: string[];
  
  // Notes
  staffObservations: string;
  volunteerFeedback: string;
  specialNotes: string;
  
  recordedBy: string;
  recordedDate: Date;
}