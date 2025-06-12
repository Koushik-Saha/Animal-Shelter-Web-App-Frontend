export interface TransportOperation {
  id: string;
  type: 'rescue-transport' | 'adoption-transport' | 'medical-transport' | 'inter-shelter' | 'emergency-relocation';
  status: 'scheduled' | 'in-transit' | 'completed' | 'cancelled' | 'delayed' | 'emergency-stop';
  priority: 'critical' | 'high' | 'medium' | 'low';
  
  // Animals Being Transported
  animals: TransportAnimal[];
  totalAnimals: number;
  
  // Locations
  origin: TransportLocation;
  destination: TransportLocation;
  intermediateStops: TransportLocation[];
  
  // Personnel
  driver: TransportDriver;
  coDriver?: TransportDriver;
  veterinarian?: TransportVeterinarian;
  coordinator: string; // staff member ID
  
  // Vehicle
  vehicle: TransportVehicle;
  
  // Scheduling
  schedule: TransportSchedule;
  
  // Route and Tracking
  route: TransportRoute;
  currentLocation?: GeoCoordinates;
  trackingHistory: TrackingPoint[];
  
  // Environmental Conditions
  weatherConditions: WeatherInfo;
  roadConditions: string[];
  trafficAlerts: TrafficAlert[];
  
  // Checkpoints and Monitoring
  checkpoints: TransportCheckpoint[];
  monitoringProtocol: MonitoringProtocol;
  
  // Documentation and Compliance
  documentation: TransportDocumentation;
  permits: TransportPermit[];
  
  // Emergency Procedures
  emergencyContacts: EmergencyContact[];
  emergencyProcedures: EmergencyProcedure[];
  
  // Communication
  communications: TransportCommunication[];
  reportingSchedule: 'hourly' | '2-hourly' | '4-hourly' | 'checkpoints-only';
  
  // Costs and Logistics
  estimatedCost: number;
  actualCost?: number;
  fuelConsumption?: FuelConsumption;
  
  // Special Requirements
  specialInstructions: string[];
  medicalRequirements: MedicalRequirement[];
  behavioralConsiderations: BehavioralConsideration[];
  
  // Post-Transport
  deliveryConfirmation?: DeliveryConfirmation;
  followUpRequired: boolean;
  followUpTasks: FollowUpTask[];
  
  // Administrative
  createdBy: string;
  createdDate: Date;
  lastModified: Date;
  modifiedBy: string;
  notes?: string;
}

export interface TransportAnimal {
  animalId: string;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  weight?: number;
  size: 'small' | 'medium' | 'large' | 'extra-large';
  
  // Health Status
  healthStatus: 'healthy' | 'stable' | 'monitoring-required' | 'critical';
  medicalConditions: string[];
  medications: TransportMedication[];
  veterinaryNotes?: string;
  
  // Behavioral Info
  temperament: string[];
  transportStressLevel: 'low' | 'medium' | 'high';
  behavioralNotes?: string;
  specialHandling: string[];
  
  // Transport Requirements
  carrierType: 'soft-carrier' | 'hard-carrier' | 'kennel' | 'crate' | 'special-enclosure';
  carrierSize: string;
  requiresSeparation: boolean;
  canTravelTogether: string[]; // animal IDs
  cannotTravelTogether: string[]; // animal IDs
  
  // Emergency Info
  urgencyLevel: 'critical' | 'high' | 'moderate' | 'low';
  emergencyInstructions?: string;
  
  // Documentation
  microchipId?: string;
  tagNumber?: string;
  healthCertificateId?: string;
  
  // Destination Info
  destinationType: 'shelter' | 'foster' | 'adopter' | 'veterinary' | 'sanctuary';
  destinationContact: string;
  expectedStayDuration?: number; // days
}

export interface TransportMedication {
  medicationName: string;
  dosage: string;
  frequency: string;
  administrationTime: string[];
  administrationMethod: 'oral' | 'injection' | 'topical' | 'other';
  specialInstructions?: string;
  emergencyDosage?: string;
}

export interface TransportLocation {
  id: string;
  name: string;
  type: 'shelter' | 'veterinary-clinic' | 'foster-home' | 'adopter-home' | 'rescue-site' | 'transport-hub' | 'border-crossing';
  
  // Address Information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: GeoCoordinates;
  
  // Contact Information
  primaryContact: LocationContact;
  alternateContacts: LocationContact[];
  operatingHours: OperatingHours[];
  
  // Facilities
  facilities: LocationFacility[];
  parkingAvailable: boolean;
  loadingDock: boolean;
  weatherProtection: boolean;
  
  // Access Requirements
  accessRestrictions: string[];
  securityRequirements: string[];
  appointmentRequired: boolean;
  advanceNoticeRequired: number; // hours
  
  // Special Considerations
  specialInstructions: string[];
  equipmentAvailable: string[];
  servicesProvided: string[];
  
  // Administrative
  isActive: boolean;
  lastVerified: Date;
  notes?: string;
}

export interface LocationContact {
  name: string;
  role: string;
  phone: string;
  email?: string;
  availability: 'business-hours' | '24-7' | 'emergency-only' | 'custom';
  preferredContactMethod: 'phone' | 'email' | 'text';
  languages: string[];
}

export interface OperatingHours {
  dayOfWeek: number; // 0-6
  openTime: string;
  closeTime: string;
  isClosed: boolean;
  specialNotes?: string;
}

export interface LocationFacility {
  type: 'veterinary-services' | 'quarantine-area' | 'feeding-station' | 'exercise-area' | 'grooming' | 'temporary-housing';
  available: boolean;
  capacity?: number;
  restrictions?: string[];
}

export interface TransportDriver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseClass: string;
  licenseExpiration: Date;
  
  // Experience and Qualifications
  experienceLevel: 'novice' | 'intermediate' | 'experienced' | 'expert';
  animalTransportExperience: number; // years
  certifications: DriverCertification[];
  specializations: string[];
  
  // Contact Information
  phone: string;
  email?: string;
  emergencyContact: EmergencyContact;
  
  // Availability
  currentStatus: 'available' | 'on-duty' | 'off-duty' | 'unavailable';
  shiftSchedule: ShiftSchedule[];
  
  // Performance Metrics
  totalTransports: number;
  onTimePercentage: number;
  safetyRating: number; // 1-5
  animalCareRating: number; // 1-5
  incidentCount: number;
  
  // Training and Compliance
  lastTrainingDate: Date;
  nextTrainingDue: Date;
  backgroundCheckDate: Date;
  medicalClearanceDate: Date;
  
  // Equipment and Vehicle Authorization
  authorizedVehicles: string[]; // vehicle IDs
  specialEquipmentCertified: string[];
  
  notes?: string;
}

export interface DriverCertification {
  name: string;
  issuingOrganization: string;
  certificationNumber: string;
  issueDate: Date;
  expirationDate: Date;
  verificationStatus: 'valid' | 'expired' | 'suspended' | 'pending-renewal';
  attachmentUrl?: string;
}

export interface ShiftSchedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isRegularShift: boolean;
  maxHours: number;
}

export interface TransportVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  
  // Vehicle Specifications
  vehicleType: 'van' | 'truck' | 'trailer' | 'bus' | 'specialized-transport';
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  capacity: VehicleCapacity;
  
  // Equipment and Features
  features: VehicleFeature[];
  safetyEquipment: SafetyEquipment[];
  animalEquipment: AnimalEquipment[];
  
  // Maintenance and Compliance
  lastInspection: Date;
  nextInspectionDue: Date;
  insurancePolicy: string;
  insuranceExpiration: Date;
  registrationExpiration: Date;
  
  // Operational Status
  currentStatus: 'available' | 'in-use' | 'maintenance' | 'out-of-service';
  currentLocation?: GeoCoordinates;
  currentMileage: number;
  fuelLevel: number; // percentage
  
  // Maintenance History
  maintenanceRecords: MaintenanceRecord[];
  fuelRecords: FuelRecord[];
  incidentHistory: VehicleIncident[];
  
  // GPS and Tracking
  gpsDeviceId?: string;
  trackingEnabled: boolean;
  
  notes?: string;
}

export interface VehicleCapacity {
  maxAnimals: number;
  maxWeight: number; // pounds
  smallCarriers: number;
  mediumCarriers: number;
  largeCarriers: number;
  specialEnclosures: number;
}

export interface VehicleFeature {
  feature: 'climate-control' | 'backup-camera' | 'gps-navigation' | 'two-way-radio' | 'emergency-lights' | 'hydraulic-lift' | 'sound-dampening';
  isOperational: boolean;
  lastServiced?: Date;
  notes?: string;
}

export interface SafetyEquipment {
  equipment: 'first-aid-kit' | 'fire-extinguisher' | 'emergency-tools' | 'reflective-triangles' | 'flashlights' | 'emergency-radio';
  quantity: number;
  condition: 'excellent' | 'good' | 'fair' | 'needs-replacement';
  lastInspected: Date;
  expirationDate?: Date;
}

export interface AnimalEquipment {
  equipment: 'carriers' | 'kennels' | 'leashes' | 'blankets' | 'food-water-bowls' | 'cleaning-supplies' | 'medical-kit';
  quantity: number;
  condition: 'excellent' | 'good' | 'fair' | 'needs-replacement';
  size?: string;
  specifications?: string;
}

export interface MaintenanceRecord {
  id: string;
  date: Date;
  type: 'routine' | 'repair' | 'inspection' | 'recall';
  description: string;
  mileage: number;
  cost: number;
  performedBy: string;
  nextServiceDue?: Date;
  warrantyInfo?: string;
}

export interface FuelRecord {
  date: Date;
  gallons: number;
  cost: number;
  mileage: number;
  location: string;
  fuelType: string;
}

export interface VehicleIncident {
  id: string;
  date: Date;
  type: 'accident' | 'breakdown' | 'minor-damage' | 'theft' | 'vandalism';
  description: string;
  severity: 'minor' | 'moderate' | 'major' | 'total-loss';
  repairCost?: number;
  insuranceClaim?: string;
  resolved: boolean;
}

export interface TransportSchedule {
  plannedDeparture: Date;
  actualDeparture?: Date;
  estimatedArrival: Date;
  actualArrival?: Date;
  
  // Buffer Times
  loadingTime: number; // minutes
  unloadingTime: number; // minutes
  bufferTime: number; // minutes for unexpected delays
  
  // Time Constraints
  maxTravelTime: number; // hours
  mandatoryBreaks: ScheduledBreak[];
  timeZoneChanges: TimeZoneChange[];
  
  // Delay Management
  delays: TransportDelay[];
  contingencyPlans: ContingencyPlan[];
}

export interface ScheduledBreak {
  plannedTime: Date;
  duration: number; // minutes
  type: 'driver-rest' | 'animal-care' | 'fuel-stop' | 'meal-break' | 'inspection';
  location?: string;
  mandatory: boolean;
}

export interface TimeZoneChange {
  location: string;
  fromTimeZone: string;
  toTimeZone: string;
  timeOffset: number; // hours
}

export interface TransportDelay {
  id: string;
  reportedTime: Date;
  reason: 'traffic' | 'weather' | 'vehicle-issue' | 'animal-emergency' | 'road-closure' | 'customs' | 'other';
  description: string;
  estimatedDuration: number; // minutes
  actualDuration?: number; // minutes
  impactOnSchedule: number; // minutes
  mitigationActions: string[];
  resolved: boolean;
}

export interface ContingencyPlan {
  scenario: 'vehicle-breakdown' | 'animal-emergency' | 'severe-weather' | 'road-closure' | 'driver-unavailable';
  description: string;
  actionSteps: string[];
  alternativeRoutes?: string[];
  backupVehicles?: string[];
  backupDrivers?: string[];
  emergencyContacts: string[];
}

export interface TransportRoute {
  totalDistance: number; // miles
  estimatedDuration: number; // minutes
  actualDuration?: number; // minutes
  
  // Current Progress
  currentPosition?: GeoCoordinates;
  progressPercentage: number;
  remainingDistance: number;
  estimatedTimeRemaining: number;
  
  // Route Planning
  primaryRoute: RouteSegment[];
  alternativeRoutes: AlternativeRoute[];
  avoidances: RouteAvoidance[];
  
  // Real-time Updates
  currentSpeed: number; // mph
  averageSpeed: number; // mph
  trafficConditions: 'light' | 'moderate' | 'heavy' | 'stop-and-go';
  
  // Navigation
  nextWaypoint: string;
  nextDirection: string;
  distanceToNextWaypoint: number;
}

export interface RouteSegment {
  segmentId: string;
  startPoint: GeoCoordinates;
  endPoint: GeoCoordinates;
  distance: number; // miles
  estimatedTime: number; // minutes
  roadType: 'highway' | 'arterial' | 'local' | 'rural';
  tollRoad: boolean;
  tollCost?: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
}

export interface AlternativeRoute {
  routeId: string;
  description: string;
  totalDistance: number;
  estimatedTime: number;
  additionalCost?: number;
  advantages: string[];
  disadvantages: string[];
  recommendationScore: number; // 1-10
}

export interface RouteAvoidance {
  type: 'construction' | 'accident' | 'weather' | 'high-traffic' | 'weight-restriction' | 'animal-restriction';
  location: string;
  coordinates?: GeoCoordinates;
  radius: number; // miles
  reason: string;
  temporaryRestriction: boolean;
  expirationDate?: Date;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number; // meters
}

export interface TrackingPoint {
  timestamp: Date;
  coordinates: GeoCoordinates;
  speed: number; // mph
  heading: number; // degrees
  fuel: number; // percentage
  engineStatus: 'running' | 'idle' | 'stopped';
  doorStatus: 'closed' | 'open' | 'unknown';
  temperatureInside?: number; // fahrenheit
  humidityInside?: number; // percentage
}

export interface WeatherInfo {
  currentConditions: string;
  temperature: number; // fahrenheit
  humidity: number; // percentage
  windSpeed: number; // mph
  windDirection: string;
  visibility: number; // miles
  precipitation: string;
  weatherAlerts: WeatherAlert[];
  forecast: WeatherForecast[];
}

export interface WeatherAlert {
  alertType: 'severe-weather' | 'high-winds' | 'extreme-temperature' | 'poor-visibility' | 'road-conditions';
  severity: 'advisory' | 'watch' | 'warning' | 'emergency';
  description: string;
  effectiveDate: Date;
  expirationDate: Date;
  affectedAreas: string[];
  recommendedActions: string[];
}

export interface WeatherForecast {
  time: Date;
  temperature: number;
  conditions: string;
  precipitationProbability: number; // percentage
  windSpeed: number;
  visibility: number;
}

export interface TrafficAlert {
  alertId: string;
  type: 'accident' | 'construction' | 'road-closure' | 'heavy-traffic' | 'incident';
  severity: 'minor' | 'moderate' | 'major' | 'severe';
  location: string;
  coordinates: GeoCoordinates;
  description: string;
  estimatedDelay: number; // minutes
  alternativeRouteSuggested: boolean;
  reportedTime: Date;
  estimatedClearanceTime?: Date;
}

export interface TransportCheckpoint {
  id: string;
  name: string;
  type: 'mandatory' | 'optional' | 'emergency' | 'custom';
  location: GeoCoordinates;
  address?: string;
  
  // Timing
  plannedArrivalTime: Date;
  actualArrivalTime?: Date;
  plannedDepartureTime: Date;
  actualDepartureTime?: Date;
  duration: number; // minutes
  
  // Status
  status: 'pending' | 'approaching' | 'arrived' | 'completed' | 'skipped';
  
  // Activities
  requiredActivities: CheckpointActivity[];
  completedActivities: CheckpointActivity[];
  
  // Documentation
  checkpointReport: CheckpointReport;
  photos: string[];
  videos: string[];
  
  // Personnel
  onSitePersonnel: string[];
  requiredPersonnel: string[];
  
  notes?: string;
}

export interface CheckpointActivity {
  activity: 'animal-wellness-check' | 'feeding' | 'water' | 'exercise' | 'medication' | 'rest' | 'vehicle-inspection' | 'fuel-stop' | 'documentation-check';
  required: boolean;
  completed: boolean;
  completedBy?: string;
  completionTime?: Date;
  notes?: string;
  issues?: string[];
}

export interface CheckpointReport {
  reportId: string;
  reportedBy: string;
  reportTime: Date;
  
  // Animal Status
  animalStatuses: AnimalCheckpointStatus[];
  overallAnimalWelfare: 'excellent' | 'good' | 'fair' | 'concerning' | 'critical';
  
  // Vehicle Status
  vehicleCondition: 'excellent' | 'good' | 'minor-issues' | 'major-issues' | 'breakdown';
  fuelLevel: number;
  climateControlStatus: 'optimal' | 'acceptable' | 'suboptimal' | 'malfunction';
  
  // Environmental Conditions
  outsideTemperature: number;
  insideTemperature: number;
  humidity: number;
  weatherConditions: string;
  
  // Issues and Concerns
  issuesReported: string[];
  actionsRequired: string[];
  emergencyProtocolsActivated: boolean;
  
  // Next Steps
  approvedToContinue: boolean;
  delaysAnticipated: number; // minutes
  routeChangesRequired: boolean;
  additionalResourcesNeeded: string[];
  
  attachments: string[];
  digitalSignature?: string;
}

export interface AnimalCheckpointStatus {
  animalId: string;
  animalName: string;
  healthStatus: 'excellent' | 'good' | 'stable' | 'concerning' | 'critical';
  behaviorStatus: 'calm' | 'alert' | 'anxious' | 'stressed' | 'aggressive';
  feedingStatus: 'completed' | 'partial' | 'refused' | 'not-attempted';
  hydrationStatus: 'adequate' | 'minimal' | 'dehydrated';
  medicationGiven: boolean;
  exerciseProvided: boolean;
  specialConcerns: string[];
  veterinaryConsultationNeeded: boolean;
}

export interface MonitoringProtocol {
  animalCheckFrequency: number; // minutes
  vitalsMonitoring: boolean;
  temperatureMonitoring: boolean;
  behaviorObservation: boolean;
  
  // Automated Systems
  gpsTracking: boolean;
  temperatureSensors: boolean;
  motionDetectors: boolean;
  soundMonitoring: boolean;
  
  // Alert Thresholds
  temperatureThresholds: TemperatureThreshold[];
  movementAlerts: boolean;
  timeoutAlerts: number; // minutes without communication
  
  // Reporting Requirements
  reportingInterval: number; // minutes
  photoRequirements: PhotoRequirement[];
  mandatoryContactPoints: string[];
  
  emergencyProtocols: EmergencyProtocol[];
}

export interface TemperatureThreshold {
  location: 'interior' | 'animal-area' | 'driver-cab';
  minTemperature: number;
  maxTemperature: number;
  alertLevel: 'warning' | 'critical' | 'emergency';
  responseRequired: string[];
}

export interface PhotoRequirement {
  subject: 'animals' | 'vehicle' | 'documentation' | 'checkpoint';
  frequency: 'departure' | 'hourly' | 'checkpoint' | 'arrival' | 'emergency';
  required: boolean;
  specifications: string[];
}

export interface EmergencyProtocol {
  scenario: 'animal-medical-emergency' | 'vehicle-breakdown' | 'accident' | 'severe-weather' | 'security-threat';
  triggerConditions: string[];
  immediateActions: EmergencyAction[];
  contactProcedure: EmergencyContactProcedure[];
  documentationRequired: string[];
  followUpRequired: boolean;
}

export interface EmergencyAction {
  actionOrder: number;
  action: string;
  timeLimit: number; // minutes
  requiredPersonnel: string[];
  requiredEquipment: string[];
  successCriteria: string[];
}

export interface EmergencyContactProcedure {
  contactOrder: number;
  contactType: 'emergency-services' | 'veterinary' | 'transport-coordinator' | 'facility-contact' | 'management';
  contactInfo: string;
  messageTemplate: string;
  responseExpected: boolean;
  escalationTime: number; // minutes
}

export interface TransportDocumentation {
  manifestId: string;
  healthCertificates: HealthCertificate[];
  permits: string[];
  insuranceDocuments: string[];
  crossBorderDocuments: CrossBorderDocument[];
  veterinaryRecords: string[];
  
  // Digital Documentation
  digitalManifest: string; // URL or file reference
  eSignatures: DigitalSignature[];
  blockchainVerification?: string;
  
  // Compliance Tracking
  regulatoryCompliance: RegulatoryCompliance[];
  auditTrail: AuditTrailEntry[];
  
  // Document Status
  allDocumentsVerified: boolean;
  verificationDate?: Date;
  verifiedBy?: string;
  expirationAlerts: DocumentExpiration[];
}

export interface HealthCertificate {
  certificateId: string;
  animalId: string;
  issuingVeterinarian: string;
  issueDate: Date;
  expirationDate: Date;
  validStates: string[];
  validCountries: string[];
  restrictions: string[];
  certificateUrl: string;
  verificationStatus: 'valid' | 'expired' | 'suspended' | 'pending';
}

export interface CrossBorderDocument {
  documentType: 'import-permit' | 'export-permit' | 'health-certificate' | 'customs-declaration' | 'quarantine-clearance';
  documentId: string;
  issuingAuthority: string;
  issueDate: Date;
  expirationDate?: Date;
  applicableAnimals: string[]; // animal IDs
  restrictions: string[];
  fees: number;
  processingTime: number; // hours
  requiredInspections: string[];
}

export interface DigitalSignature {
  signerId: string;
  signerName: string;
  signerRole: string;
  signatureDate: Date;
  signatureMethod: 'electronic' | 'digital-certificate' | 'biometric';
  documentHash: string;
  signatureHash: string;
  verificationStatus: 'valid' | 'invalid' | 'expired';
}

export interface RegulatoryCompliance {
  regulation: string;
  jurisdiction: string;
  complianceStatus: 'compliant' | 'non-compliant' | 'pending-review' | 'exempted';
  lastAuditDate?: Date;
  nextAuditDue?: Date;
  violations: ComplianceViolation[];
  correctiveActions: CorrectiveAction[];
}

export interface ComplianceViolation {
  violationId: string;
  violationType: string;
  description: string;
  severity: 'minor' | 'moderate' | 'major' | 'critical';
  discoveredDate: Date;
  reportedBy: string;
  fineAmount?: number;
  correctionDeadline: Date;
  status: 'open' | 'in-progress' | 'resolved' | 'appealed';
}

export interface CorrectiveAction {
  actionId: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  completionDate?: Date;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed';
  verificationRequired: boolean;
  verifiedBy?: string;
  verificationDate?: Date;
}

export interface AuditTrailEntry {
  timestamp: Date;
  userId: string;
  action: 'created' | 'modified' | 'deleted' | 'viewed' | 'approved' | 'rejected';
  entityType: string;
  entityId: string;
  changes: FieldChange[];
  ipAddress?: string;
  deviceInfo?: string;
  geolocation?: GeoCoordinates;
}

export interface FieldChange {
  fieldName: string;
  oldValue: any;
  newValue: any;
  changeReason?: string;
}

export interface DocumentExpiration {
  documentType: string;
  documentId: string;
  expirationDate: Date;
  daysUntilExpiration: number;
  alertLevel: 'info' | 'warning' | 'critical' | 'expired';
  renewalRequired: boolean;
  renewalInProgress: boolean;
}

export interface TransportPermit {
  permitId: string;
  permitType: 'animal-transport' | 'interstate-commerce' | 'international-trade' | 'hazardous-materials' | 'oversize-load';
  issuingAuthority: string;
  issueDate: Date;
  expirationDate: Date;
  
  // Scope and Limitations
  validStates: string[];
  validCountries: string[];
  animalSpeciesAllowed: string[];
  quantityLimits: QuantityLimit[];
  
  // Conditions
  conditions: PermitCondition[];
  restrictions: PermitRestriction[];
  
  // Compliance
  complianceRequirements: string[];
  inspectionRequired: boolean;
  reportingRequired: boolean;
  
  // Financial
  permitFee: number;
  bondRequired: boolean;
  bondAmount?: number;
  insuranceRequired: boolean;
  minimumInsuranceCoverage?: number;
  
  // Status
  status: 'active' | 'suspended' | 'revoked' | 'expired' | 'pending-renewal';
  violations: PermitViolation[];
  
  attachmentUrl?: string;
}

export interface QuantityLimit {
  animalType: string;
  maxQuantity: number;
  weightLimit?: number;
  sizeRestrictions?: string[];
}

export interface PermitCondition {
  condition: string;
  description: string;
  complianceMethod: string;
  verificationRequired: boolean;
  penalty?: string;
}

export interface PermitRestriction {
  restriction: string;
  applicableScenarios: string[];
  exceptions: string[];
  penaltyForViolation: string;
}

export interface PermitViolation {
  violationId: string;
  violationDate: Date;
  description: string;
  severity: 'minor' | 'moderate' | 'major' | 'severe';
  penaltyIssued: string;
  fine?: number;
  correctiveActionRequired: string;
  status: 'open' | 'resolved' | 'appealed';
}

export interface EmergencyContact {
  id: string;
  name: string;
  organization?: string;
  role: string;
  contactType: 'primary' | 'secondary' | 'emergency-only';
  
  // Contact Information
  phone: string;
  alternatePhone?: string;
  email?: string;
  address?: string;
  
  // Availability
  availability: '24-7' | 'business-hours' | 'on-call' | 'custom';
  responseTime: 'immediate' | '15-minutes' | '30-minutes' | '1-hour' | 'next-day';
  
  // Specialization
  specialties: string[];
  languages: string[];
  serviceArea: string[];
  
  // Contact Protocols
  escalationOrder: number;
  authorizationLevel: string[];
  decisionMakingAuthority: string[];
  
  // Performance
  averageResponseTime: number; // minutes
  reliabilityRating: number; // 1-5
  lastContactDate?: Date;
  contactHistory: ContactAttempt[];
  
  // Status
  isActive: boolean;
  lastVerified: Date;
  notes?: string;
}

export interface ContactAttempt {
  attemptDate: Date;
  contactMethod: 'phone' | 'email' | 'text' | 'radio' | 'in-person';
  successful: boolean;
  responseTime?: number; // minutes
  messageLeft: boolean;
  callbackReceived: boolean;
  issueResolved: boolean;
  notes?: string;
}

export interface EmergencyProcedure {
  id: string;
  emergencyType: 'animal-medical' | 'vehicle-accident' | 'severe-weather' | 'vehicle-breakdown' | 'security-incident' | 'natural-disaster';
  procedureName: string;
  description: string;
  
  // Activation
  triggerCriteria: string[];
  automaticActivation: boolean;
  activationAuthority: string[];
  
  // Response Steps
  responseSteps: EmergencyResponseStep[];
  timelineRequirements: TimelineRequirement[];
  
  // Resources
  requiredPersonnel: string[];
  requiredEquipment: string[];
  requiredVehicles: string[];
  backupResources: string[];
  
  // Communication
  notificationList: string[];
  communicationProtocol: CommunicationProtocol[];
  publicCommunication: boolean;
  mediaResponse?: string;
  
  // Documentation
  incidentReportingRequired: boolean;
  legalNotificationRequired: boolean;
  insuranceNotificationRequired: boolean;
  regulatoryReportingRequired: boolean;
  
  // Recovery
  recoveryProcedures: RecoveryProcedure[];
  businessContinuityPlan: string;
  lessonsLearnedProcess: string;
  
  // Training and Testing
  trainingRequired: boolean;
  trainingFrequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
  drillSchedule: string;
  lastTested?: Date;
  
  // Status
  isActive: boolean;
  lastReviewed: Date;
  nextReviewDue: Date;
  revisionHistory: ProcedureRevision[];
}

export interface EmergencyResponseStep {
  stepNumber: number;
  stepName: string;
  description: string;
  timeLimit: number; // minutes
  responsibleRole: string;
  prerequisites: string[];
  deliverables: string[];
  successCriteria: string[];
  escalationTriggers: string[];
  alternativeActions: string[];
}

export interface TimelineRequirement {
  milestone: string;
  timeFromActivation: number; // minutes
  responsibleParty: string;
  criticalPath: boolean;
  dependencies: string[];
}

export interface CommunicationProtocol {
  audience: 'internal' | 'external' | 'public' | 'regulatory' | 'media';
  method: 'phone' | 'email' | 'text' | 'radio' | 'public-announcement' | 'social-media';
  timing: 'immediate' | '15-minutes' | '1-hour' | '4-hours' | '24-hours';
  messageTemplate: string;
  approvalRequired: boolean;
  approver?: string;
}

export interface RecoveryProcedure {
  phase: 'immediate' | 'short-term' | 'long-term';
  description: string;
  objectives: string[];
  actions: RecoveryAction[];
  successMetrics: string[];
  timeframe: string;
}

export interface RecoveryAction {
  action: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignedTo: string;
  resources: string[];
  dependencies: string[];
  estimatedDuration: number; // hours
  status: 'planned' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';
}

export interface ProcedureRevision {
  revisionNumber: string;
  revisionDate: Date;
  revisedBy: string;
  changes: string[];
  reason: string;
  approvedBy: string;
  effectiveDate: Date;
}

export interface TransportCommunication {
  id: string;
  timestamp: Date;
  direction: 'inbound' | 'outbound';
  method: 'voice' | 'text' | 'email' | 'radio' | 'app' | 'automated';
  
  // Participants
  from: CommunicationParticipant;
  to: CommunicationParticipant[];
  
  // Content
  messageType: 'status-update' | 'emergency' | 'routine-check' | 'instruction' | 'request' | 'confirmation' | 'alert';
  subject?: string;
  content: string;
  attachments: string[];
  
  // Priority and Urgency
  priority: 'routine' | 'important' | 'urgent' | 'emergency';
  requiresResponse: boolean;
  responseDeadline?: Date;
  
  // Status
  deliveryStatus: 'sent' | 'delivered' | 'read' | 'responded' | 'failed';
  readTime?: Date;
  responseTime?: Date;
  responseContent?: string;
  
  // Location Context
  locationWhenSent?: GeoCoordinates;
  relevantCheckpoint?: string;
  
  // Integration
  relatedIncidents: string[];
  relatedDocuments: string[];
  
  // Archive
  archived: boolean;
  retentionDate?: Date;
}

export interface CommunicationParticipant {
  participantId: string;
  name: string;
  role: 'driver' | 'coordinator' | 'veterinarian' | 'facility-contact' | 'emergency-contact' | 'system';
  contactMethod: string;
  organizationName?: string;
}

export interface MedicalRequirement {
  animalId: string;
  requirementType: 'medication' | 'monitoring' | 'treatment' | 'emergency-preparedness';
  description: string;
  frequency: string;
  instructions: string[];
  
  // Medication Specific
  medication?: TransportMedication;
  administrationLog: MedicationLog[];
  
  // Monitoring Specific
  vitalSigns?: string[];
  monitoringFrequency?: number; // minutes
  alertThresholds?: VitalSignThreshold[];
  
  // Emergency Preparedness
  emergencyMedications?: string[];
  emergencyProcedures?: string[];
  nearestEmergencyVets?: EmergencyVetInfo[];
  
  // Personnel Requirements
  requiredPersonnel: string[];
  trainingRequired: string[];
  certificationRequired: string[];
  
  // Equipment Requirements
  requiredEquipment: string[];
  backupEquipment: string[];
  
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold' | 'emergency';
}

export interface MedicationLog {
  timestamp: Date;
  medicationName: string;
  dosageGiven: string;
  administeredBy: string;
  method: 'oral' | 'injection' | 'topical' | 'other';
  animalResponse: 'normal' | 'positive' | 'adverse' | 'no-response';
  sideEffects?: string[];
  notes?: string;
  nextDoseScheduled?: Date;
}

export interface VitalSignThreshold {
  vitalSign: 'temperature' | 'heart-rate' | 'respiratory-rate' | 'blood-pressure';
  normalRange: { min: number; max: number };
  cautionRange: { min: number; max: number };
  criticalRange: { min: number; max: number };
  alertActions: string[];
}

export interface EmergencyVetInfo {
  facilityName: string;
  address: string;
  phone: string;
  distanceFromRoute: number; // miles
  services: string[];
  availability: '24-7' | 'emergency-hours' | 'appointment-only';
  acceptsEmergencies: boolean;
  specializations: string[];
  estimatedCost: number;
}

export interface BehavioralConsideration {
  animalId: string;
  considerationType: 'stress-management' | 'aggression-prevention' | 'comfort-measures' | 'social-needs' | 'phobia-management';
  description: string;
  severity: 'minor' | 'moderate' | 'major' | 'critical';
  
  // Triggers
  knownTriggers: string[];
  environmentalFactors: string[];
  
  // Management Strategies
  preventionMeasures: string[];
  interventionStrategies: string[];
  comfortItems: string[];
  
  // Monitoring
  behaviorSignsToWatch: string[];
  escalationSigns: string[];
  monitoringFrequency: number; // minutes
  
  // Personnel Requirements
  handlingInstructions: string[];
  requiredTraining: string[];
  experienceLevel: 'novice' | 'intermediate' | 'advanced' | 'expert';
  
  // Contingency Plans
  ifBehaviorWorsens: string[];
  emergencyProtocols: string[];
  alternativeTransportMethods: string[];
  
  // Documentation
  behaviorLog: BehaviorLogEntry[];
  
  status: 'stable' | 'improving' | 'concerning' | 'critical';
}

export interface BehaviorLogEntry {
  timestamp: Date;
  behaviorObserved: string;
  trigger?: string;
  duration: number; // minutes
  intensity: 'mild' | 'moderate' | 'severe';
  interventionUsed?: string;
  effectiveness: 'very-effective' | 'effective' | 'somewhat-effective' | 'ineffective';
  observedBy: string;
  notes?: string;
  photosVideos?: string[];
}

export interface FuelConsumption {
  startingFuelLevel: number; // percentage or gallons
  endingFuelLevel: number;
  fuelPurchased: FuelPurchase[];
  totalConsumption: number; // gallons
  averageMpg: number;
  fuelCostTotal: number;
  fuelEfficiencyRating: 'excellent' | 'good' | 'average' | 'poor';
  
  // Environmental Impact
  carbonFootprint: number; // kg CO2
  emissionOffset?: number; // cost of offsetting
  
  // Analysis
  expectedConsumption: number;
  varianceFromExpected: number; // percentage
  factorsAffectingConsumption: string[];
}

export interface FuelPurchase {
  timestamp: Date;
  location: string;
  gallons: number;
  pricePerGallon: number;
  totalCost: number;
  fuelType: string;
  receipt?: string;
  odometer: number;
}

export interface DeliveryConfirmation {
  confirmationId: string;
  deliveryDate: Date;
  deliveryTime: Date;
  
  // Delivery Details
  deliveredTo: DeliveryRecipient;
  deliveryLocation: string;
  
  // Animal Condition
  animalConditions: AnimalDeliveryCondition[];
  overallConditionRating: 'excellent' | 'good' | 'fair' | 'concerning' | 'poor';
  
  // Documentation
  documentsTransferred: string[];
  digitalSignatures: DigitalSignature[];
  photoDocumentation: string[];
  
  // Handover Process
  handoverDuration: number; // minutes
  handoverNotes: string;
  questionsAnswered: string[];
  instructionsProvided: string[];
  
  // Follow-up
  followUpRequired: boolean;
  followUpScheduled?: Date;
  contactInformation: string;
  
  // Verification
  deliveryVerified: boolean;
  verifiedBy: string;
  verificationMethod: 'in-person' | 'video-call' | 'photo-verification' | 'third-party';
  
  // Satisfaction
  recipientSatisfaction?: number; // 1-5 rating
  transportRating?: number; // 1-5 rating
  feedback?: string;
  
  // Issues
  deliveryIssues: string[];
  resolutionActions: string[];
  
  completionStatus: 'successful' | 'successful-with-issues' | 'unsuccessful' | 'pending-resolution';
}

export interface DeliveryRecipient {
  recipientId: string;
  name: string;
  organization?: string;
  role: string;
  
  // Contact Information
  phone: string;
  email?: string;
  address: string;
  
  // Authorization
  authorizationLevel: string;
  identificationVerified: boolean;
  identificationMethod: 'photo-id' | 'digital-signature' | 'biometric' | 'pre-authorization';
  
  // Relationship to Animals
  relationshipType: 'adopter' | 'foster' | 'facility-staff' | 'veterinarian' | 'authorized-agent';
  previousHistory: boolean;
  backgroundCheckStatus?: 'pending' | 'approved' | 'denied' | 'expired';
}

export interface AnimalDeliveryCondition {
  animalId: string;
  animalName: string;
  
  // Physical Condition
  physicalCondition: 'excellent' | 'good' | 'stable' | 'fair' | 'poor' | 'requiring-attention';
  injuries?: string[];
  healthConcerns?: string[];
  
  // Behavioral State
  behavioralState: 'calm' | 'alert' | 'anxious' | 'stressed' | 'aggressive' | 'lethargic';
  temperamentNotes: string;
  
  // Transport Effects
  transportStress: 'none' | 'minimal' | 'moderate' | 'significant' | 'severe';
  adaptationTime: number; // minutes
  specialAttentionNeeded: string[];
  
  // Immediate Needs
  immediateNeeds: string[];
  feedingRequired: boolean;
  hydrationRequired: boolean;
  medicationDue: boolean;
  restRequired: boolean;
  
  // Recipient Readiness
  recipientPreparedness: 'fully-prepared' | 'mostly-prepared' | 'somewhat-prepared' | 'unprepared';
  setupApproved: boolean;
  safetyCheckCompleted: boolean;
  
  // Recommendations
  recommendedActions: string[];
  followUpSchedule: string[];
  emergencyContacts: string[];
  
  deliverySuccessful: boolean;
  issues?: string[];
}

export interface FollowUpTask {
  taskId: string;
  taskType: 'wellness-check' | 'documentation-followup' | 'feedback-collection' | 'issue-resolution' | 'payment-processing' | 'reporting';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Assignment
  assignedTo: string;
  assignedDate: Date;
  dueDate: Date;
  
  // Execution
  status: 'pending' | 'in-progress' | 'completed' | 'overdue' | 'cancelled';
  startDate?: Date;
  completionDate?: Date;
  timeSpent?: number; // hours
  
  // Requirements
  requiredActions: string[];
  requiredDocuments: string[];
  requiredContacts: string[];
  
  // Results
  outcome?: string;
  resultDocuments?: string[];
  issuesDiscovered?: string[];
  additionalTasksCreated?: string[];
  
  // Communication
  communicationLog: TaskCommunication[];
  
  // Dependencies
  dependsOn: string[]; // other task IDs
  blocks: string[]; // other task IDs
  
  notes?: string;
}

export interface TaskCommunication {
  timestamp: Date;
  communicationType: 'phone-call' | 'email' | 'text-message' | 'in-person' | 'video-call';
  contactedParty: string;
  successful: boolean;
  response: string;
  followUpRequired: boolean;
  nextContactDate?: Date;
}

export interface TransportAnalytics {
  // Overview Metrics
  totalTransports: number;
  completedTransports: number;
  completionRate: number;
  averageTransportTime: number; // hours
  onTimePerformance: number; // percentage
  
  // Animal Metrics
  totalAnimalsTransported: number;
  animalsBySpecies: { [species: string]: number };
  animalsByUrgency: { [urgency: string]: number };
  averageAnimalsPerTransport: number;
  
  // Operational Metrics
  totalDistance: number; // miles
  totalFuelConsumed: number; // gallons
  averageFuelEfficiency: number; // mpg
  totalCost: number;
  averageCostPerMile: number;
  
  // Performance Metrics
  driverPerformance: DriverPerformanceMetrics[];
  vehicleUtilization: VehicleUtilizationMetrics[];
  routeEfficiency: RouteEfficiencyMetrics[];
  
  // Geographic Analysis
  routesByRegion: RegionMetrics[];
  distanceByRegion: RegionMetrics[];
  
  // Temporal Analysis
  transportsByTimeOfDay: TimeOfDayMetrics[];
  transportsByDayOfWeek: DayOfWeekMetrics[];
  seasonalTrends: SeasonalMetrics[];
  
  // Quality Metrics
  animalWelfareScores: WelfareScoreMetrics[];
  incidentRates: IncidentRateMetrics[];
  customerSatisfaction: SatisfactionMetrics[];
  
  // Environmental Impact
  carbonFootprint: number; // kg CO2
  fuelConsumptionTrends: FuelTrendMetrics[];
  emissionReductionTargets: EmissionTargetMetrics[];
  
  // Financial Analysis
  costBreakdown: CostBreakdownMetrics[];
  profitabilityAnalysis: ProfitabilityMetrics[];
  budgetVariance: BudgetVarianceMetrics[];
  
  reportingPeriod: {
    startDate: Date;
    endDate: Date;
  };
  lastUpdated: Date;
}

export interface DriverPerformanceMetrics {
  driverId: string;
  driverName: string;
  totalTransports: number;
  onTimePercentage: number;
  safetyScore: number;
  fuelEfficiency: number;
  animalCareRating: number;
  incidentCount: number;
  totalMiles: number;
  totalHours: number;
  customerRating: number;
}

export interface VehicleUtilizationMetrics {
  vehicleId: string;
  utilizationRate: number; // percentage
  totalMiles: number;
  totalTransports: number;
  maintenanceCost: number;
  fuelConsumption: number;
  downtime: number; // hours
  efficiency: number;
}

export interface RouteEfficiencyMetrics {
  routeId: string;
  routeName: string;
  averageTime: number; // hours
  averageDistance: number; // miles
  trafficDelays: number; // percentage
  fuelEfficiency: number;
  usageFrequency: number;
  costEffectiveness: number;
}

export interface RegionMetrics {
  region: string;
  transportCount: number;
  totalDistance: number;
  averageDistance: number;
  totalCost: number;
  averageCost: number;
  completionRate: number;
}

export interface TimeOfDayMetrics {
  hour: number;
  transportCount: number;
  averageDuration: number;
  onTimeRate: number;
  incidentRate: number;
}

export interface DayOfWeekMetrics {
  dayOfWeek: number;
  transportCount: number;
  averageDistance: number;
  completionRate: number;
  averageCost: number;
}

export interface SeasonalMetrics {
  season: 'spring' | 'summer' | 'fall' | 'winter';
  transportCount: number;
  weatherDelays: number;
  fuelEfficiency: number;
  incidentRate: number;
  costVariance: number;
}

export interface WelfareScoreMetrics {
  transportId: string;
  overallScore: number;
  physicalWelfareScore: number;
  behavioralWelfareScore: number;
  environmentalScore: number;
  careQualityScore: number;
  improvementAreas: string[];
}

export interface IncidentRateMetrics {
  incidentType: string;
  incidentCount: number;
  incidentRate: number; // per 1000 transports
  severity: string;
  trendDirection: 'increasing' | 'decreasing' | 'stable';
  preventionMeasures: string[];
}

export interface SatisfactionMetrics {
  respondentType: 'recipient' | 'facility' | 'driver' | 'coordinator';
  averageRating: number;
  responseRate: number;
  satisfactionTrend: 'improving' | 'declining' | 'stable';
  commonComplaints: string[];
  commonPraise: string[];
  improvementActions: string[];
}

export interface FuelTrendMetrics {
  period: Date;
  totalConsumption: number;
  averageEfficiency: number;
  costPerGallon: number;
  costVariance: number;
  consumptionTrend: 'increasing' | 'decreasing' | 'stable';
}

export interface EmissionTargetMetrics {
  targetType: 'annual' | 'quarterly' | 'monthly';
  targetReduction: number; // percentage
  actualReduction: number;
  progressTowardsTarget: number; // percentage
  strategiesImplemented: string[];
  futureInitiatives: string[];
}

export interface CostBreakdownMetrics {
  category: 'fuel' | 'maintenance' | 'labor' | 'permits' | 'insurance' | 'equipment' | 'other';
  amount: number;
  percentage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  budgetVariance: number;
}

export interface ProfitabilityMetrics {
  transportType: string;
  revenue: number;
  costs: number;
  profit: number;
  profitMargin: number;
  volumeTrend: 'increasing' | 'decreasing' | 'stable';
  profitabilityTrend: 'improving' | 'declining' | 'stable';
}

export interface BudgetVarianceMetrics {
  budgetCategory: string;
  budgetedAmount: number;
  actualAmount: number;
  variance: number;
  variancePercentage: number;
  varianceReason: string;
  correctiveActions: string[];
}