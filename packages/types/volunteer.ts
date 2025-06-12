export interface Volunteer {
  id: string;
  userId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    };
  };
  
  // Volunteer Status
  status: 'active' | 'inactive' | 'on-hold' | 'training';
  joinDate: Date;
  lastActiveDate: Date;
  
  // Skills and Interests
  skills: VolunteerSkill[];
  interests: string[];
  certifications: Certification[];
  
  // Availability
  availability: AvailabilitySchedule;
  preferredTasks: TaskType[];
  
  // Gamification
  level: number;
  totalHours: number;
  totalPoints: number;
  badges: Badge[];
  achievements: Achievement[];
  currentStreak: number;
  longestStreak: number;
  
  // Performance
  rating: number; // 1-5 stars
  reviewCount: number;
  reliability: number; // percentage
  feedback: VolunteerFeedback[];
  
  // Training
  trainingCompleted: TrainingModule[];
  trainingInProgress: TrainingModule[];
  nextTrainingDue?: Date;
  
  // Restrictions
  restrictions?: string[];
  notes?: string;
}

export interface VolunteerSkill {
  id: string;
  name: string;
  category: 'animal-care' | 'administrative' | 'maintenance' | 'events' | 'transport' | 'training' | 'medical-assist';
  proficiencyLevel: 1 | 2 | 3 | 4 | 5; // 1 = beginner, 5 = expert
  verifiedBy?: string;
  verificationDate?: Date;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: Date;
  expirationDate?: Date;
  certificateNumber?: string;
  documentUrl?: string;
  isExpired: boolean;
}

export interface AvailabilitySchedule {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
  blackoutDates: Date[];
  notes?: string;
}

export interface TimeSlot {
  startTime: string; // HH:MM format
  endTime: string;
  isRecurring: boolean;
}

export type TaskType = 
  | 'dog-walking'
  | 'cat-socializing'
  | 'cleaning-kennels'
  | 'feeding'
  | 'grooming'
  | 'training-assist'
  | 'adoption-counseling'
  | 'transport'
  | 'events'
  | 'administrative'
  | 'photography'
  | 'maintenance'
  | 'fundraising'
  | 'education';

export interface VolunteerTask {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Assignment
  assignedTo?: string; // volunteer ID
  assignedBy: string; // staff ID
  assignedDate: Date;
  
  // Scheduling
  scheduledDate?: Date;
  estimatedDuration: number; // minutes
  actualDuration?: number;
  
  // Status
  status: 'assigned' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  completedDate?: Date;
  
  // Location and Requirements
  location: string;
  requiredSkills: string[];
  animalIds?: string[];
  equipment?: string[];
  instructions?: string;
  
  // Gamification
  pointsReward: number;
  difficultyLevel: 1 | 2 | 3 | 4 | 5;
  
  // Feedback
  feedback?: TaskFeedback;
  photos?: string[];
  
  // Recurring
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
}

export interface TaskFeedback {
  rating: number; // 1-5 stars
  comment?: string;
  submittedBy: string;
  submittedDate: Date;
  animalWellbeing?: number; // 1-5 rating for animal care tasks
  taskQuality?: number; // 1-5 rating for task completion
}

export interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number; // every X days/weeks/months
  daysOfWeek?: number[]; // 0-6, Sunday = 0
  endDate?: Date;
  maxOccurrences?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'hours' | 'tasks' | 'animals' | 'skills' | 'special';
  requirement: string;
  earnedDate: Date;
  progress?: number;
  maxProgress?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  unlockedDate: Date;
  category: 'milestone' | 'streak' | 'quality' | 'impact' | 'leadership';
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: 'orientation' | 'animal-handling' | 'safety' | 'specialized';
  duration: number; // minutes
  isRequired: boolean;
  prerequisites?: string[];
  
  // Content
  sections: TrainingSection[];
  
  // Progress
  status: 'not-started' | 'in-progress' | 'completed' | 'expired';
  startDate?: Date;
  completionDate?: Date;
  expirationDate?: Date;
  score?: number; // percentage
  attempts: number;
  
  // Certification
  providesCertification: boolean;
  certificationType?: string;
}

export interface TrainingSection {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'interactive';
  content: string; // URL or content
  duration: number; // minutes
  isCompleted: boolean;
  score?: number;
}

export interface VolunteerFeedback {
  id: string;
  fromUserId: string;
  fromUserType: 'staff' | 'volunteer' | 'adopter';
  rating: number; // 1-5 stars
  comment: string;
  date: Date;
  taskId?: string;
  isAnonymous: boolean;
  categories: {
    reliability: number;
    animalCare: number;
    teamwork: number;
    communication: number;
  };
}

export interface VolunteerShift {
  id: string;
  volunteerId: string;
  date: Date;
  startTime: string;
  endTime: string;
  actualStartTime?: string;
  actualEndTime?: string;
  
  // Status
  status: 'scheduled' | 'checked-in' | 'completed' | 'no-show' | 'cancelled';
  
  // Tasks
  assignedTasks: string[];
  completedTasks: string[];
  
  // Check-in/out
  checkInMethod?: 'qr-code' | 'manual' | 'app';
  checkInLocation?: {
    latitude: number;
    longitude: number;
  };
  
  // Supervisor
  supervisorId?: string;
  supervisorNotes?: string;
  
  // Points and Feedback
  hoursWorked: number;
  pointsEarned: number;
  feedback?: string;
}

export interface VolunteerEvent {
  id: string;
  title: string;
  description: string;
  type: 'training' | 'social' | 'fundraising' | 'adoption-event' | 'cleanup' | 'workshop';
  
  // Scheduling
  startDate: Date;
  endDate: Date;
  location: string;
  maxAttendees?: number;
  
  // Requirements
  requiredSkills?: string[];
  minimumLevel?: number;
  
  // Registration
  registrationDeadline?: Date;
  requiresApproval: boolean;
  
  // Attendees
  registeredVolunteers: EventRegistration[];
  
  // Gamification
  pointsReward: number;
  specialBadge?: string;
  
  // Organization
  organizerId: string;
  instructors?: string[];
  
  // Resources
  materials?: string[];
  equipment?: string[];
  agenda?: EventAgendaItem[];
}

export interface EventRegistration {
  volunteerId: string;
  registrationDate: Date;
  status: 'registered' | 'waitlisted' | 'confirmed' | 'attended' | 'no-show' | 'cancelled';
  notes?: string;
}

export interface EventAgendaItem {
  time: string;
  activity: string;
  duration: number; // minutes
  presenter?: string;
}

export interface VolunteerMetrics {
  totalActiveVolunteers: number;
  totalHoursThisMonth: number;
  averageHoursPerVolunteer: number;
  retentionRate: number; // percentage
  newVolunteersThisMonth: number;
  
  // Task Completion
  tasksCompletedThisWeek: number;
  averageTaskRating: number;
  noShowRate: number; // percentage
  
  // Engagement
  averageLevel: number;
  badgesEarnedThisMonth: number;
  trainingCompletionRate: number; // percentage
  
  // Popular Activities
  popularTasks: {
    taskType: TaskType;
    volunteerCount: number;
    averageRating: number;
  }[];
  
  // Volunteer Levels
  levelDistribution: {
    level: number;
    count: number;
  }[];
}

export interface VolunteerNotification {
  id: string;
  volunteerId: string;
  type: 'task-assigned' | 'shift-reminder' | 'badge-earned' | 'training-due' | 'event-invitation' | 'feedback-received';
  title: string;
  message: string;
  isRead: boolean;
  createdDate: Date;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}