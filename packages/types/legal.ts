export interface LegalCase {
  id: string;
  type: 'licensing-compliance' | 'policy-development' | 'audit-response' | 'regulatory-filing' | 'legal-review' | 'litigation' | 'contract-management' | 'intellectual-property';
  status: 'active' | 'pending-review' | 'completed' | 'on-hold' | 'cancelled' | 'escalated';
  priority: 'critical' | 'high' | 'medium' | 'low';
  
  // Basic Information
  title: string;
  description: string;
  caseNumber?: string;
  
  // Dates and Timeline
  createdDate: Date;
  dueDate?: Date;
  completedDate?: Date;
  lastUpdated: Date;
  
  // Assignment and Responsibility
  assignedTo: string;
  assignedTeam?: string;
  externalCounsel?: ExternalCounsel;
  supervisor?: string;
  
  // Progress and Status
  completionStatus: number; // percentage
  milestones: LegalMilestone[];
  requirements: LegalRequirement[];
  
  // Regulatory Context
  jurisdiction: 'local' | 'state' | 'federal' | 'international' | 'internal';
  regulatoryBody?: string;
  applicableLaws: string[];
  regulationReferences: string[];
  
  // Financial
  estimatedCost: number;
  actualCost?: number;
  billingRate?: number;
  budgetApproved: boolean;
  
  // Documentation
  documentsRequired: number;
  documentsSubmitted: number;
  attachments: LegalDocument[];
  
  // Communication and Stakeholders
  stakeholders: LegalStakeholder[];
  communications: LegalCommunication[];
  
  // Risk and Impact
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  businessImpact: string;
  complianceImpact: string;
  
  // Related Items
  relatedCases: string[];
  precedents: LegalPrecedent[];
  
  // Workflow
  approvals: LegalApproval[];
  reviewStage: 'initial' | 'draft' | 'review' | 'final' | 'approved';
  
  // Metadata
  createdBy: string;
  modifiedBy: string;
  confidentialityLevel: 'public' | 'internal' | 'confidential' | 'privileged';
  tags: string[];
  notes?: string;
}

export interface ExternalCounsel {
  firmName: string;
  attorneyName: string;
  contactEmail: string;
  contactPhone: string;
  hourlyRate: number;
  specializationAreas: string[];
  barNumber?: string;
  jurisdiction: string[];
  retainerAmount?: number;
  billingArrangement: 'hourly' | 'flat-fee' | 'contingency' | 'retainer';
}

export interface LegalMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completedDate?: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  assignedTo: string;
  deliverables: string[];
  dependencies: string[];
  criticalPath: boolean;
}

export interface LegalRequirement {
  id: string;
  requirement: string;
  type: 'document' | 'action' | 'approval' | 'filing' | 'payment' | 'training' | 'inspection';
  status: 'pending' | 'in-progress' | 'completed' | 'not-applicable';
  dueDate?: Date;
  completedDate?: Date;
  completedBy?: string;
  evidence?: string[];
  notes?: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  type: 'contract' | 'license' | 'permit' | 'policy' | 'procedure' | 'report' | 'correspondence' | 'filing' | 'evidence' | 'form';
  version: string;
  status: 'draft' | 'review' | 'approved' | 'executed' | 'expired' | 'superseded';
  
  // Content and Location
  filePath: string;
  fileSize: number;
  fileFormat: string;
  pageCount?: number;
  
  // Metadata
  createdDate: Date;
  modifiedDate: Date;
  effectiveDate?: Date;
  expirationDate?: Date;
  
  // Authorship and Review
  author: string;
  reviewedBy: string[];
  approvedBy?: string;
  signedBy: DocumentSignature[];
  
  // Legal Properties
  confidentialityLevel: 'public' | 'internal' | 'confidential' | 'privileged';
  privilegeType?: 'attorney-client' | 'work-product' | 'executive' | 'other';
  retentionPeriod: number; // years
  
  // Relationships
  relatedDocuments: string[];
  supersededBy?: string;
  supersedes?: string[];
  
  // Access and Distribution
  accessRestrictions: string[];
  distributionList: string[];
  
  // Compliance and Audit
  requiredBy: string[];
  complianceRelevant: boolean;
  auditTrail: DocumentAuditEntry[];
  
  // Digital Properties
  digitalSignature?: string;
  hashValue?: string;
  timestamped: boolean;
  
  keywords: string[];
  summary?: string;
  notes?: string;
}

export interface DocumentSignature {
  signerName: string;
  signerTitle: string;
  signerOrganization: string;
  signatureDate: Date;
  signatureMethod: 'wet-signature' | 'electronic' | 'digital-certificate';
  ipAddress?: string;
  location?: string;
  witnessName?: string;
  notarized: boolean;
}

export interface DocumentAuditEntry {
  timestamp: Date;
  action: 'created' | 'modified' | 'viewed' | 'downloaded' | 'shared' | 'deleted' | 'restored';
  performedBy: string;
  ipAddress?: string;
  location?: string;
  details: string;
  oldValue?: string;
  newValue?: string;
}

export interface LegalStakeholder {
  id: string;
  name: string;
  organization?: string;
  role: 'client' | 'attorney' | 'judge' | 'regulator' | 'counterparty' | 'witness' | 'expert' | 'consultant';
  contactInfo: ContactInformation;
  relationship: string;
  authority: string[];
  interests: string[];
  influence: 'low' | 'medium' | 'high';
  supportLevel: 'opposed' | 'neutral' | 'supportive' | 'champion';
}

export interface ContactInformation {
  email?: string;
  phone?: string;
  address?: string;
  preferredMethod: 'email' | 'phone' | 'mail' | 'in-person';
  timeZone?: string;
  availability?: string;
  emergencyContact?: boolean;
}

export interface LegalCommunication {
  id: string;
  timestamp: Date;
  type: 'email' | 'phone' | 'meeting' | 'letter' | 'filing' | 'hearing' | 'deposition';
  direction: 'inbound' | 'outbound' | 'internal';
  
  // Participants
  from: CommunicationParticipant;
  to: CommunicationParticipant[];
  cc?: CommunicationParticipant[];
  
  // Content
  subject: string;
  content: string;
  attachments: string[];
  
  // Legal Properties
  privileged: boolean;
  confidential: boolean;
  workProduct: boolean;
  
  // Follow-up
  actionRequired: boolean;
  followUpDate?: Date;
  followUpWith?: string;
  
  // Billing
  billable: boolean;
  billableTime?: number; // hours
  
  // Metadata
  recordedBy: string;
  verified: boolean;
  
  tags: string[];
  notes?: string;
}

export interface CommunicationParticipant {
  name: string;
  organization?: string;
  role: string;
  email?: string;
  phone?: string;
}

export interface LegalPrecedent {
  id: string;
  title: string;
  type: 'case-law' | 'statute' | 'regulation' | 'ruling' | 'opinion' | 'internal-precedent';
  citation: string;
  jurisdiction: string;
  date: Date;
  
  // Content
  summary: string;
  keyHoldings: string[];
  relevantFacts: string[];
  legalIssues: string[];
  
  // Application
  applicability: 'directly-applicable' | 'analogous' | 'distinguishable' | 'contrary';
  strength: 'strong' | 'moderate' | 'weak';
  
  // References
  sourceUrl?: string;
  internalReferences: string[];
  
  addedBy: string;
  addedDate: Date;
  notes?: string;
}

export interface LegalApproval {
  id: string;
  approvalType: 'legal-review' | 'management-approval' | 'board-approval' | 'regulatory-approval' | 'client-approval';
  approverName: string;
  approverTitle: string;
  
  // Status
  status: 'pending' | 'approved' | 'rejected' | 'conditional' | 'withdrawn';
  requestDate: Date;
  responseDate?: Date;
  
  // Content
  approvalScope: string;
  conditions?: string[];
  comments?: string;
  
  // Documentation
  approvalDocument?: string;
  signature?: string;
  
  // Workflow
  escalationRequired: boolean;
  delegated: boolean;
  delegatedTo?: string;
}

// Compliance Management Types
export interface ComplianceFramework {
  id: string;
  name: string;
  type: 'regulatory' | 'industry-standard' | 'internal' | 'contractual';
  scope: 'organization-wide' | 'department-specific' | 'project-specific';
  
  // Framework Details
  description: string;
  objectives: string[];
  applicableLaws: string[];
  industry: string;
  jurisdiction: string[];
  
  // Implementation
  implementationDate: Date;
  lastReviewDate: Date;
  nextReviewDate: Date;
  reviewFrequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
  
  // Structure
  controlCategories: ComplianceControlCategory[];
  requirements: ComplianceRequirement[];
  
  // Responsibility
  owner: string;
  stewards: string[];
  
  // Status
  status: 'active' | 'under-development' | 'under-review' | 'retired';
  maturityLevel: 'initial' | 'developing' | 'defined' | 'managed' | 'optimized';
  
  // Metrics
  overallComplianceScore: number;
  riskScore: number;
  
  // Documentation
  frameworkDocuments: string[];
  trainingMaterials: string[];
  
  notes?: string;
}

export interface ComplianceControlCategory {
  id: string;
  name: string;
  description: string;
  controlObjective: string;
  controls: ComplianceControl[];
  weight: number; // for scoring
  parentCategory?: string;
}

export interface ComplianceControl {
  id: string;
  controlId: string; // external reference ID
  title: string;
  description: string;
  type: 'preventive' | 'detective' | 'corrective' | 'directive';
  
  // Implementation
  controlActivity: string;
  controlFrequency: 'continuous' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'event-driven';
  automationLevel: 'manual' | 'semi-automated' | 'fully-automated';
  
  // Responsibility
  controlOwner: string;
  controlOperator: string;
  reviewer?: string;
  
  // Assessment
  lastAssessment: Date;
  nextAssessment: Date;
  assessmentResults: ControlAssessment[];
  
  // Status
  implementationStatus: 'not-implemented' | 'in-progress' | 'implemented' | 'operating-effectively' | 'needs-improvement';
  effectivenessRating: 'effective' | 'partially-effective' | 'ineffective' | 'not-tested';
  
  // Risk
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  mitigatedRisks: string[];
  
  // Evidence
  evidenceRequirements: string[];
  evidenceCollected: ControlEvidence[];
  
  // Issues and Actions
  deficiencies: ControlDeficiency[];
  remediationActions: RemediationAction[];
  
  notes?: string;
}

export interface ControlAssessment {
  id: string;
  assessmentDate: Date;
  assessor: string;
  assessmentType: 'self-assessment' | 'management-review' | 'internal-audit' | 'external-audit';
  
  // Results
  overallRating: 'effective' | 'partially-effective' | 'ineffective';
  designEffectiveness: 'adequate' | 'inadequate';
  operatingEffectiveness: 'effective' | 'ineffective' | 'not-tested';
  
  // Detailed Findings
  testingProcedures: string[];
  sampleSize?: number;
  exceptions: AssessmentException[];
  
  // Conclusions
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  
  // Follow-up
  followUpRequired: boolean;
  nextAssessmentDate?: Date;
  
  // Documentation
  workPapers: string[];
  supportingEvidence: string[];
  
  notes?: string;
}

export interface AssessmentException {
  id: string;
  exceptionType: 'design-gap' | 'operating-failure' | 'documentation-gap' | 'sampling-deviation';
  description: string;
  impact: 'low' | 'medium' | 'high';
  rootCause?: string;
  frequency: 'isolated' | 'infrequent' | 'frequent' | 'pervasive';
  managementResponse: string;
  correctionActions: string[];
  timeframe: string;
}

export interface ControlEvidence {
  id: string;
  evidenceType: 'document' | 'record' | 'report' | 'system-screenshot' | 'interview-notes' | 'observation';
  description: string;
  source: string;
  collectionDate: Date;
  collectedBy: string;
  filePath?: string;
  retained: boolean;
  retentionPeriod?: number; // years
}

export interface ControlDeficiency {
  id: string;
  deficiencyType: 'design-deficiency' | 'operating-deficiency' | 'material-weakness' | 'significant-deficiency';
  severity: 'low' | 'medium' | 'high' | 'critical';
  
  // Description
  title: string;
  description: string;
  impact: string;
  rootCause: string;
  
  // Discovery
  discoveredDate: Date;
  discoveredBy: string;
  discoveryMethod: 'self-identified' | 'management-review' | 'internal-audit' | 'external-audit' | 'incident';
  
  // Assessment
  likelihood: 'remote' | 'unlikely' | 'possible' | 'likely' | 'almost-certain';
  impactLevel: 'negligible' | 'minor' | 'moderate' | 'major' | 'severe';
  riskRating: 'low' | 'medium' | 'high' | 'critical';
  
  // Response
  managementResponse: string;
  agreedActions: string[];
  targetCompletionDate: Date;
  actualCompletionDate?: Date;
  
  // Status
  status: 'open' | 'in-progress' | 'completed' | 'overdue' | 'not-applicable';
  
  // Relationships
  relatedDeficiencies: string[];
  controlsAffected: string[];
  
  notes?: string;
}

export interface RemediationAction {
  id: string;
  actionType: 'process-improvement' | 'control-enhancement' | 'training' | 'system-change' | 'policy-update' | 'additional-monitoring';
  title: string;
  description: string;
  
  // Assignment
  assignedTo: string;
  assignedDate: Date;
  targetCompletionDate: Date;
  actualCompletionDate?: Date;
  
  // Status
  status: 'planned' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';
  progressPercentage: number;
  
  // Resources
  estimatedEffort: number; // hours
  actualEffort?: number;
  estimatedCost: number;
  actualCost?: number;
  
  // Validation
  validationRequired: boolean;
  validatedBy?: string;
  validationDate?: Date;
  validationEvidence?: string[];
  
  // Impact
  expectedBenefits: string[];
  actualBenefits?: string[];
  risksAddressed: string[];
  
  // Dependencies
  dependencies: string[];
  blockers: string[];
  
  // Communication
  stakeholdersNotified: string[];
  reportingRequired: boolean;
  reportingFrequency?: string;
  
  notes?: string;
}

export interface ComplianceRequirement {
  id: string;
  requirementId: string; // external reference
  title: string;
  description: string;
  type: 'legal' | 'regulatory' | 'contractual' | 'industry-standard' | 'internal-policy';
  
  // Source
  sourceDocument: string;
  sourceSection: string;
  authority: string;
  
  // Applicability
  applicableToOrganization: boolean;
  applicabilityRationale: string;
  exemptions?: string[];
  
  // Implementation
  implementationApproach: string;
  responsibleParty: string;
  implementationDate: Date;
  complianceDeadline?: Date;
  
  // Assessment
  complianceStatus: 'compliant' | 'partially-compliant' | 'non-compliant' | 'not-applicable' | 'under-assessment';
  lastAssessmentDate: Date;
  nextAssessmentDate: Date;
  assessmentEvidence: string[];
  
  // Monitoring
  monitoringControls: string[];
  monitoringFrequency: string;
  keyIndicators: ComplianceIndicator[];
  
  // Risk
  nonComplianceRisk: 'low' | 'medium' | 'high' | 'critical';
  nonComplianceConsequences: string[];
  
  // Documentation
  policies: string[];
  procedures: string[];
  guidelines: string[];
  
  // Relationships
  relatedRequirements: string[];
  dependentRequirements: string[];
  
  notes?: string;
}

export interface ComplianceIndicator {
  id: string;
  name: string;
  description: string;
  type: 'leading' | 'lagging' | 'concurrent';
  
  // Measurement
  measurementMethod: string;
  dataSource: string;
  frequency: 'real-time' | 'daily' | 'weekly' | 'monthly' | 'quarterly';
  
  // Targets
  target: number;
  unit: string;
  threshold: number;
  escalationTrigger: number;
  
  // Current Status
  currentValue: number;
  trend: 'improving' | 'stable' | 'declining';
  lastMeasurement: Date;
  
  // Historical Data
  historicalData: IndicatorDataPoint[];
  
  // Responsibility
  dataOwner: string;
  reportingTo: string[];
  
  notes?: string;
}

export interface IndicatorDataPoint {
  date: Date;
  value: number;
  status: 'within-target' | 'at-threshold' | 'exceeds-threshold';
  comments?: string;
}

// Policy Management Types
export interface Policy {
  id: string;
  title: string;
  type: 'organizational-policy' | 'operational-procedure' | 'guideline' | 'standard' | 'charter' | 'code-of-conduct';
  category: 'governance' | 'operations' | 'human-resources' | 'financial' | 'information-security' | 'animal-welfare' | 'safety' | 'legal' | 'other';
  
  // Version Control
  version: string;
  versionHistory: PolicyVersion[];
  status: 'draft' | 'under-review' | 'approved' | 'published' | 'retired' | 'superseded';
  
  // Dates
  createdDate: Date;
  effectiveDate: Date;
  lastReviewDate: Date;
  nextReviewDate: Date;
  expirationDate?: Date;
  retirementDate?: Date;
  
  // Content
  purpose: string;
  scope: string;
  applicability: string[];
  policyStatement: string;
  procedures?: PolicyProcedure[];
  definitions: PolicyDefinition[];
  
  // Governance
  owner: string;
  approvedBy: string;
  approvalDate: Date;
  reviewCycle: 'annual' | 'biennial' | 'triennial' | 'as-needed';
  
  // Stakeholders
  stakeholders: PolicyStakeholder[];
  affectedParties: string[];
  subjectMatterExperts: string[];
  
  // Compliance
  relatedRegulations: string[];
  complianceRequirements: string[];
  monitoringMethods: string[];
  
  // Implementation
  implementationGuidance: string;
  trainingRequired: boolean;
  trainingMaterials: string[];
  rolloutPlan?: string;
  
  // Communication
  communicationPlan: string;
  publicationChannels: string[];
  acknowledgmentRequired: boolean;
  
  // Relationships
  relatedPolicies: string[];
  supersededPolicies: string[];
  referencedBy: string[];
  
  // Documentation
  attachments: string[];
  templates: string[];
  forms: string[];
  
  // Quality
  clarityScore?: number;
  completenessScore?: number;
  stakeholderFeedback: PolicyFeedback[];
  
  // Metrics
  complianceRate?: number;
  violationCount?: number;
  waiverRequests?: number;
  
  tags: string[];
  notes?: string;
}

export interface PolicyVersion {
  version: string;
  releaseDate: Date;
  changes: string[];
  changedBy: string;
  approvedBy: string;
  changeReason: string;
  impactAssessment: string;
  migrationNotes?: string;
}

export interface PolicyProcedure {
  id: string;
  title: string;
  description: string;
  steps: PolicyStep[];
  responsibleRole: string;
  frequency?: string;
  duration?: string;
  inputs: string[];
  outputs: string[];
  controlPoints: string[];
  risks: string[];
  mitigations: string[];
}

export interface PolicyStep {
  stepNumber: number;
  description: string;
  actor: string;
  inputRequired: string[];
  outputGenerated: string[];
  duration?: string;
  decision?: PolicyDecision;
  exceptions?: string[];
}

export interface PolicyDecision {
  decisionPoint: string;
  criteria: string[];
  outcomes: PolicyOutcome[];
  escalationPath?: string;
  approvalRequired?: string;
}

export interface PolicyOutcome {
  outcome: string;
  action: string;
  nextStep?: number;
  documentation?: string[];
}

export interface PolicyDefinition {
  term: string;
  definition: string;
  source?: string;
  context?: string;
}

export interface PolicyStakeholder {
  name: string;
  role: string;
  involvement: 'owner' | 'approver' | 'reviewer' | 'implementer' | 'affected-party' | 'subject-matter-expert';
  responsibilities: string[];
  contactInfo?: ContactInformation;
}

export interface PolicyFeedback {
  id: string;
  submittedBy: string;
  submissionDate: Date;
  feedbackType: 'suggestion' | 'concern' | 'clarification-request' | 'error-report' | 'process-improvement';
  description: string;
  impact: 'low' | 'medium' | 'high';
  status: 'submitted' | 'under-review' | 'accepted' | 'rejected' | 'deferred';
  response?: string;
  responseDate?: Date;
  respondedBy?: string;
  actionTaken?: string;
}

// Audit Management Types
export interface LegalAudit {
  id: string;
  title: string;
  type: 'compliance-audit' | 'financial-audit' | 'operational-audit' | 'information-security-audit' | 'contract-audit' | 'regulatory-examination';
  scope: 'organization-wide' | 'department-specific' | 'process-specific' | 'system-specific';
  
  // Planning
  auditObjective: string;
  auditCriteria: string[];
  auditScope: string;
  exclusions?: string[];
  
  // Scheduling
  plannedStartDate: Date;
  plannedEndDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  auditDuration: number; // days
  
  // Parties Involved
  auditType: 'internal' | 'external' | 'regulatory' | 'certification';
  auditFirm?: string;
  leadAuditor: string;
  auditTeam: AuditTeamMember[];
  auditee: string;
  auditeeContacts: ContactInformation[];
  
  // Status
  status: 'planned' | 'in-progress' | 'fieldwork-complete' | 'reporting' | 'completed' | 'follow-up';
  overallRating?: 'satisfactory' | 'satisfactory-with-recommendations' | 'needs-improvement' | 'unsatisfactory';
  
  // Preparation
  preparationStatus: number; // percentage
  documentsRequested: AuditDocumentRequest[];
  documentsProvided: number;
  preMeetingCompleted: boolean;
  entranceMeetingDate?: Date;
  exitMeetingDate?: Date;
  
  // Execution
  auditProgram: AuditProgram[];
  testingPerformed: AuditTest[];
  interviewsConducted: AuditInterview[];
  observationsMade: AuditObservation[];
  
  // Findings
  findings: AuditFinding[];
  recommendations: AuditRecommendation[];
  bestPractices: string[];
  
  // Reporting
  draftReportDate?: Date;
  finalReportDate?: Date;
  reportDistribution: string[];
  managementResponse: AuditResponse[];
  
  // Follow-up
  followUpRequired: boolean;
  followUpDate?: Date;
  correctionPlans: CorrectionPlan[];
  
  // Costs
  estimatedCost: number;
  actualCost?: number;
  internalEffort: number; // hours
  externalFees?: number;
  
  // Quality
  auditQualityRating?: number; // 1-10
  stakeholderSatisfaction?: number;
  objectivesMet: boolean;
  timeliness: boolean;
  
  // Documentation
  workPapers: string[];
  evidenceCollected: string[];
  reportAttachments: string[];
  
  notes?: string;
}

export interface AuditTeamMember {
  name: string;
  role: 'lead-auditor' | 'senior-auditor' | 'auditor' | 'specialist' | 'observer';
  organization: string;
  qualifications: string[];
  expertiseAreas: string[];
  assignedAreas: string[];
  hoursAllocated: number;
  hourlyRate?: number;
}

export interface AuditDocumentRequest {
  id: string;
  documentType: string;
  description: string;
  purpose: string;
  requestDate: Date;
  dueDate: Date;
  providedDate?: Date;
  providedBy?: string;
  status: 'requested' | 'provided' | 'not-available' | 'not-applicable';
  location?: string;
  format: 'hard-copy' | 'electronic' | 'system-access';
}

export interface AuditProgram {
  id: string;
  areaBeingAudited: string;
  auditObjective: string;
  auditProcedures: AuditProcedure[];
  allocatedHours: number;
  assignedAuditor: string;
  status: 'not-started' | 'in-progress' | 'completed';
  completionDate?: Date;
}

export interface AuditProcedure {
  id: string;
  procedureDescription: string;
  testingApproach: string;
  sampleSize?: number;
  selectionCriteria?: string;
  expectedEvidence: string[];
  risks: string[];
  status: 'not-started' | 'in-progress' | 'completed';
  completedBy?: string;
  completionDate?: Date;
  results?: string;
  workPaperRef?: string;
}

export interface AuditTest {
  id: string;
  testName: string;
  testObjective: string;
  testProcedure: string;
  populationTested: string;
  sampleSize: number;
  selectionMethod: 'random' | 'judgmental' | 'systematic' | 'stratified';
  
  // Results
  exceptionsFound: number;
  exceptionRate: number;
  testConclusion: string;
  exceptions: TestException[];
  
  // Documentation
  workPaperRef: string;
  evidenceObtained: string[];
  
  performedBy: string;
  reviewedBy?: string;
  testDate: Date;
}

export interface TestException {
  id: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  rootCause?: string;
  frequency: 'isolated' | 'recurring';
  correctiveAction: string;
  managementResponse: string;
}

export interface AuditInterview {
  id: string;
  interviewee: string;
  intervieweeTitle: string;
  interviewer: string;
  interviewDate: Date;
  duration: number; // minutes
  topicsCovered: string[];
  keyFindings: string[];
  followUpRequired: boolean;
  followUpItems?: string[];
  documentationMethod: 'notes' | 'recording' | 'both';
  evidenceObtained?: string[];
}

export interface AuditObservation {
  id: string;
  observationType: 'process-observation' | 'control-testing' | 'walkthrough' | 'facility-inspection';
  area: string;
  observationDate: Date;
  observer: string;
  duration: number; // minutes
  
  // Content
  processObserved: string;
  keyObservations: string[];
  controlsObserved: string[];
  deviationsNoted: string[];
  
  // Documentation
  photosRequired: boolean;
  photosTaken?: string[];
  workPaperRef: string;
  
  // Follow-up
  clarificationNeeded: boolean;
  followUpQuestions?: string[];
}

export interface AuditFinding {
  id: string;
  findingType: 'deficiency' | 'non-compliance' | 'inefficiency' | 'best-practice' | 'observation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  
  // Description
  title: string;
  condition: string; // what was found
  criteria: string; // what should be
  cause: string; // why it happened
  effect: string; // what could happen
  
  // Evidence
  evidence: string[];
  testingPerformed: string;
  samplesTested?: number;
  
  // Risk Assessment
  riskRating: 'low' | 'medium' | 'high' | 'critical';
  likelihood: 'remote' | 'unlikely' | 'possible' | 'likely' | 'almost-certain';
  impact: 'negligible' | 'minor' | 'moderate' | 'major' | 'severe';
  
  // Response
  managementResponse: string;
  agreedActions: string[];
  targetDate: Date;
  responsibleParty: string;
  
  // Status
  status: 'open' | 'in-progress' | 'resolved' | 'overdue';
  
  // Relationships
  relatedFindings: string[];
  affectedProcesses: string[];
  
  notes?: string;
}

export interface AuditRecommendation {
  id: string;
  recommendationType: 'corrective-action' | 'improvement-opportunity' | 'best-practice' | 'cost-reduction';
  priority: 'immediate' | 'high' | 'medium' | 'low';
  
  // Content
  title: string;
  description: string;
  rationale: string;
  expectedBenefits: string[];
  
  // Implementation
  implementationApproach: string;
  estimatedEffort: number; // hours
  estimatedCost: number;
  suggestedTimeline: string;
  
  // Response
  managementResponse: 'accepted' | 'partially-accepted' | 'rejected' | 'under-consideration';
  responseRationale: string;
  alternativeAction?: string;
  
  // Tracking
  status: 'pending-response' | 'accepted' | 'in-progress' | 'completed' | 'rejected';
  assignedTo?: string;
  targetCompletionDate?: Date;
  actualCompletionDate?: Date;
  
  // Value
  costBenefit: 'high' | 'medium' | 'low';
  riskReduction: 'significant' | 'moderate' | 'minimal';
  
  notes?: string;
}

export interface AuditResponse {
  id: string;
  respondent: string;
  responseDate: Date;
  responseType: 'management-response' | 'corrective-action-plan' | 'status-update' | 'disagreement';
  
  // Content
  findingId?: string;
  recommendationId?: string;
  response: string;
  actionPlan: string;
  
  // Timeline
  targetDate: Date;
  milestones: ResponseMilestone[];
  
  // Responsibility
  responsibleParty: string;
  accountableExecutive: string;
  
  // Status
  status: 'submitted' | 'under-review' | 'accepted' | 'requires-revision';
  reviewedBy?: string;
  reviewDate?: Date;
  reviewComments?: string;
  
  notes?: string;
}

export interface ResponseMilestone {
  milestone: string;
  targetDate: Date;
  completionDate?: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  responsibleParty: string;
  evidence?: string[];
}

export interface CorrectionPlan {
  id: string;
  findingId: string;
  planTitle: string;
  correctiveActions: CorrectiveAction[];
  overallStatus: 'draft' | 'approved' | 'in-progress' | 'completed' | 'overdue';
  
  // Ownership
  planOwner: string;
  accountableExecutive: string;
  approvedBy?: string;
  approvalDate?: Date;
  
  // Timeline
  targetCompletionDate: Date;
  actualCompletionDate?: Date;
  progressPercentage: number;
  
  // Resources
  estimatedCost: number;
  actualCost?: number;
  resourcesRequired: string[];
  
  // Monitoring
  monitoringPlan: string;
  progressReports: ProgressReport[];
  
  notes?: string;
}

export interface CorrectiveAction {
  id: string;
  actionDescription: string;
  actionType: 'immediate' | 'short-term' | 'long-term';
  priority: 'critical' | 'high' | 'medium' | 'low';
  
  // Assignment
  assignedTo: string;
  assignedDate: Date;
  targetDate: Date;
  actualCompletionDate?: Date;
  
  // Status
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';
  progressPercentage: number;
  
  // Dependencies
  dependencies: string[];
  blockers?: string[];
  
  // Validation
  completionCriteria: string[];
  validationRequired: boolean;
  validatedBy?: string;
  validationDate?: Date;
  validationEvidence?: string[];
  
  // Effectiveness
  effectivenessMeasures: string[];
  effectiveness?: 'effective' | 'partially-effective' | 'ineffective' | 'to-be-determined';
  
  notes?: string;
}

export interface ProgressReport {
  id: string;
  reportDate: Date;
  reportedBy: string;
  overallProgress: number; // percentage
  
  // Status Updates
  milestonesCompleted: string[];
  currentActivities: string[];
  upcomingActivities: string[];
  
  // Issues
  issues: string[];
  risks: string[];
  changeRequests: string[];
  
  // Resources
  resourceUtilization: number; // percentage
  budgetUtilization: number; // percentage
  
  // Next Steps
  nextReportDate: Date;
  keyFocus: string[];
  
  notes?: string;
}

// Risk Management Types
export interface LegalRisk {
  id: string;
  riskTitle: string;
  riskCategory: 'regulatory' | 'contractual' | 'litigation' | 'compliance' | 'reputational' | 'operational' | 'financial' | 'strategic';
  riskType: 'legal-risk' | 'compliance-risk' | 'regulatory-risk' | 'contractual-risk';
  
  // Description
  riskDescription: string;
  riskOwner: string;
  identifiedBy: string;
  identificationDate: Date;
  
  // Assessment
  inherentRisk: RiskAssessment;
  residualRisk: RiskAssessment;
  riskAppetite: 'low' | 'medium' | 'high';
  tolerance: 'zero' | 'minimal' | 'moderate' | 'substantial';
  
  // Impact Analysis
  potentialImpacts: RiskImpact[];
  affectedAreas: string[];
  stakeholdersAffected: string[];
  
  // Controls and Mitigation
  existingControls: RiskControl[];
  mitigationStrategies: MitigationStrategy[];
  contingencyPlans: ContingencyPlan[];
  
  // Monitoring
  keyRiskIndicators: RiskIndicator[];
  monitoringFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  lastReviewDate: Date;
  nextReviewDate: Date;
  
  // Status
  status: 'active' | 'mitigated' | 'transferred' | 'accepted' | 'closed';
  trend: 'increasing' | 'stable' | 'decreasing';
  
  // Response
  riskResponse: 'avoid' | 'mitigate' | 'transfer' | 'accept';
  responseJustification: string;
  responseActions: RiskAction[];
  
  // Relationships
  relatedRisks: string[];
  cascadingRisks: string[];
  
  notes?: string;
}

export interface RiskAssessment {
  probability: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
  impact: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
  riskScore: number; // calculated score
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  assessmentDate: Date;
  assessedBy: string;
  assessmentMethod: string;
  confidence: 'low' | 'medium' | 'high';
}

export interface RiskImpact {
  impactCategory: 'financial' | 'operational' | 'reputational' | 'regulatory' | 'strategic' | 'legal';
  description: string;
  quantitativeImpact?: number;
  qualitativeImpact: string;
  timeframe: 'immediate' | 'short-term' | 'medium-term' | 'long-term';
  reversibility: 'reversible' | 'partially-reversible' | 'irreversible';
}

export interface RiskControl {
  id: string;
  controlName: string;
  controlType: 'preventive' | 'detective' | 'corrective' | 'directive';
  controlDescription: string;
  effectiveness: 'high' | 'medium' | 'low';
  frequency: 'continuous' | 'periodic' | 'event-driven';
  automation: 'manual' | 'semi-automated' | 'automated';
  owner: string;
  lastTested: Date;
  testResult: 'effective' | 'partially-effective' | 'ineffective';
}

export interface MitigationStrategy {
  id: string;
  strategyName: string;
  strategyType: 'risk-reduction' | 'risk-transfer' | 'risk-avoidance' | 'risk-acceptance';
  description: string;
  expectedEffectiveness: 'high' | 'medium' | 'low';
  
  // Implementation
  implementationPlan: string;
  timeframe: string;
  cost: number;
  resourcesRequired: string[];
  responsibleParty: string;
  
  // Status
  status: 'planned' | 'in-progress' | 'implemented' | 'suspended' | 'cancelled';
  implementationDate?: Date;
  completionDate?: Date;
  
  // Effectiveness
  actualEffectiveness?: 'high' | 'medium' | 'low';
  measurementCriteria: string[];
  
  notes?: string;
}

export interface ContingencyPlan {
  id: string;
  planName: string;
  triggerEvents: string[];
  activationCriteria: string;
  
  // Response
  responseTeam: string[];
  responseActions: ContingencyAction[];
  communicationPlan: string;
  
  // Resources
  resourcesRequired: string[];
  budgetAllocated: number;
  
  // Testing
  lastTested: Date;
  testResult: 'successful' | 'partially-successful' | 'unsuccessful';
  testingFrequency: 'annually' | 'semi-annually' | 'quarterly';
  
  // Maintenance
  reviewFrequency: 'annually' | 'semi-annually' | 'quarterly';
  lastReview: Date;
  nextReview: Date;
  
  notes?: string;
}

export interface ContingencyAction {
  actionSequence: number;
  action: string;
  responsibleParty: string;
  timeframe: string;
  dependencies: string[];
  successCriteria: string[];
}

export interface RiskIndicator {
  id: string;
  indicatorName: string;
  description: string;
  type: 'leading' | 'lagging' | 'coincident';
  
  // Measurement
  measurementMethod: string;
  dataSource: string;
  frequency: 'real-time' | 'daily' | 'weekly' | 'monthly';
  
  // Thresholds
  greenThreshold: number;
  yellowThreshold: number;
  redThreshold: number;
  unit: string;
  
  // Current Status
  currentValue: number;
  status: 'green' | 'yellow' | 'red';
  trend: 'improving' | 'stable' | 'deteriorating';
  lastMeasurement: Date;
  
  // Historical Data
  historicalData: RiskIndicatorDataPoint[];
  
  // Response
  escalationProcedure: string;
  responsibleParty: string;
  
  notes?: string;
}

export interface RiskIndicatorDataPoint {
  date: Date;
  value: number;
  status: 'green' | 'yellow' | 'red';
  comments?: string;
}

export interface RiskAction {
  id: string;
  actionType: 'mitigation' | 'monitoring' | 'transfer' | 'acceptance' | 'contingency';
  actionDescription: string;
  
  // Assignment
  assignedTo: string;
  assignedDate: Date;
  targetDate: Date;
  actualCompletionDate?: Date;
  
  // Status
  status: 'planned' | 'in-progress' | 'completed' | 'overdue' | 'cancelled';
  progressPercentage: number;
  
  // Resources
  estimatedCost: number;
  actualCost?: number;
  resourcesRequired: string[];
  
  // Effectiveness
  expectedImpact: string;
  actualImpact?: string;
  measurementCriteria: string[];
  
  notes?: string;
}

// Legal Analytics Types
export interface LegalAnalytics {
  reportingPeriod: DateRange;
  
  // Case Management
  totalCases: number;
  newCases: number;
  closedCases: number;
  activeCases: number;
  casesByType: CaseTypeMetric[];
  casesByStatus: CaseStatusMetric[];
  casesByPriority: CasePriorityMetric[];
  
  // Compliance
  overallComplianceRate: number;
  complianceByFramework: ComplianceFrameworkMetric[];
  violationsByType: ViolationTypeMetric[];
  remediationEffectiveness: number;
  
  // Performance
  averageCaseResolutionTime: number;
  onTimeCompletionRate: number;
  budgetVariance: number;
  costPerCase: number;
  
  // Quality
  stakeholderSatisfactionScore: number;
  auditFindings: AuditFindingsMetric[];
  riskMitigationEffectiveness: number;
  
  // Trends
  workloadTrends: WorkloadTrendMetric[];
  complianceTrends: ComplianceTrendMetric[];
  costTrends: CostTrendMetric[];
  
  // Capacity and Resources
  teamUtilization: TeamUtilizationMetric[];
  externalCounselUsage: ExternalCounselMetric[];
  resourceAllocation: ResourceAllocationMetric[];
  
  lastUpdated: Date;
}

export interface CaseTypeMetric {
  type: string;
  count: number;
  percentage: number;
  averageResolutionTime: number;
  averageCost: number;
}

export interface CaseStatusMetric {
  status: string;
  count: number;
  percentage: number;
  aging: number; // average days in status
}

export interface CasePriorityMetric {
  priority: string;
  count: number;
  percentage: number;
  averageResolutionTime: number;
  escalationRate: number;
}

export interface ComplianceFrameworkMetric {
  framework: string;
  complianceRate: number;
  controlsEffectiveness: number;
  violations: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface ViolationTypeMetric {
  violationType: string;
  count: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  remediationRate: number;
  recurrenceRate: number;
}

export interface AuditFindingsMetric {
  auditType: string;
  totalFindings: number;
  highRiskFindings: number;
  resolutionRate: number;
  averageResolutionTime: number;
}

export interface WorkloadTrendMetric {
  period: Date;
  caseVolume: number;
  completionRate: number;
  backlog: number;
  capacity: number;
}

export interface ComplianceTrendMetric {
  period: Date;
  complianceRate: number;
  violations: number;
  riskScore: number;
  improvements: number;
}

export interface CostTrendMetric {
  period: Date;
  totalCost: number;
  internalCost: number;
  externalCost: number;
  budgetVariance: number;
}

export interface TeamUtilizationMetric {
  teamMember: string;
  utilizationRate: number;
  caseLoad: number;
  specializations: string[];
  performance: number;
}

export interface ExternalCounselMetric {
  firm: string;
  totalCost: number;
  hoursUtilized: number;
  matters: number;
  performanceRating: number;
}

export interface ResourceAllocationMetric {
  resource: string;
  allocated: number;
  utilized: number;
  efficiency: number;
  demand: number;
}