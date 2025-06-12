export interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  category: InventoryCategory;
  subcategory?: string;
  
  // Stock Information
  currentStock: number;
  minimumStock: number;
  maximumStock?: number;
  reorderPoint: number;
  
  // Unit Information
  unit: 'pieces' | 'lbs' | 'kg' | 'bottles' | 'boxes' | 'bags' | 'cans' | 'gallons' | 'liters';
  unitCost: number;
  
  // Supplier Information
  supplier?: Supplier;
  supplierItemCode?: string;
  preferredSupplier?: string;
  alternateSuppliers?: string[];
  
  // Location & Storage
  location: string;
  storageArea?: string;
  shelf?: string;
  barcode?: string;
  qrCode?: string;
  
  // Dates & Expiration
  lastRestocked: Date;
  expirationDate?: Date;
  batchNumber?: string;
  
  // Status & Alerts
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired' | 'recalled';
  alerts: InventoryAlert[];
  
  // Usage Tracking
  averageMonthlyUsage: number;
  lastUsed?: Date;
  usageHistory: UsageRecord[];
  
  // Financial
  totalValue: number;
  costCenter?: string;
  
  // Special Properties
  isPrescription: boolean;
  requiresRefrigeration: boolean;
  isHazardous: boolean;
  isDonated: boolean;
  
  // Metadata
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
  updatedBy: string;
  notes?: string;
}

export type InventoryCategory = 
  | 'food'
  | 'medicine'
  | 'medical-supplies'
  | 'cleaning-supplies'
  | 'bedding'
  | 'toys'
  | 'leashes-collars'
  | 'grooming'
  | 'office-supplies'
  | 'maintenance'
  | 'safety-equipment'
  | 'other';

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: Address;
  website?: string;
  taxId?: string;
  
  // Business Information
  paymentTerms: string;
  leadTime: number; // days
  minimumOrderAmount?: number;
  shippingCost?: number;
  
  // Performance
  rating: number; // 1-5 stars
  reliability: number; // percentage
  qualityRating: number; // 1-5 stars
  
  // Status
  isActive: boolean;
  isPrimary: boolean;
  
  // Contract Information
  contractStartDate?: Date;
  contractEndDate?: Date;
  discount?: number; // percentage
  
  // Categories they supply
  categories: InventoryCategory[];
  
  // Contact History
  lastContact?: Date;
  contactHistory: ContactRecord[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ContactRecord {
  id: string;
  date: Date;
  type: 'email' | 'phone' | 'meeting' | 'order';
  summary: string;
  contactedBy: string;
}

export interface InventoryAlert {
  id: string;
  type: 'low-stock' | 'out-of-stock' | 'expiring' | 'expired' | 'overstock' | 'recall';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  createdDate: Date;
  isActive: boolean;
  acknowledgedBy?: string;
  acknowledgedDate?: Date;
  resolvedBy?: string;
  resolvedDate?: Date;
}

export interface UsageRecord {
  id: string;
  date: Date;
  quantityUsed: number;
  purpose: string;
  usedBy: string;
  animalId?: string;
  notes?: string;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierId: string;
  status: 'draft' | 'pending-approval' | 'approved' | 'ordered' | 'partial-received' | 'received' | 'cancelled';
  
  // Order Information
  orderDate: Date;
  expectedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  
  // Items
  items: PurchaseOrderItem[];
  
  // Financial
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  totalAmount: number;
  
  // Approval Workflow
  requestedBy: string;
  approvedBy?: string;
  approvedDate?: Date;
  
  // Receiving
  receivedBy?: string;
  receivedDate?: Date;
  packingSlip?: string;
  invoice?: string;
  
  // Payment
  paymentStatus: 'pending' | 'paid' | 'overdue';
  paymentDate?: Date;
  paymentMethod?: string;
  
  notes?: string;
}

export interface PurchaseOrderItem {
  id: string;
  inventoryItemId: string;
  description: string;
  quantityOrdered: number;
  quantityReceived: number;
  unitCost: number;
  totalCost: number;
  
  // Receiving Details
  condition?: 'good' | 'damaged' | 'expired';
  expirationDate?: Date;
  batchNumber?: string;
  
  notes?: string;
}

export interface StockMovement {
  id: string;
  inventoryItemId: string;
  type: 'in' | 'out' | 'adjustment' | 'transfer' | 'waste' | 'return';
  quantity: number;
  
  // Transaction Details
  date: Date;
  reason: string;
  reference?: string; // PO number, transfer ID, etc.
  
  // Location
  fromLocation?: string;
  toLocation?: string;
  
  // Personnel
  performedBy: string;
  approvedBy?: string;
  
  // Additional Info
  cost?: number;
  notes?: string;
  
  // Related Records
  animalId?: string;
  volunteerId?: string;
  purchaseOrderId?: string;
}

export interface InventoryCount {
  id: string;
  type: 'full' | 'cycle' | 'spot' | 'annual';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  
  // Schedule Information
  scheduledDate: Date;
  startDate?: Date;
  completedDate?: Date;
  
  // Scope
  location?: string;
  category?: InventoryCategory;
  items: InventoryCountItem[];
  
  // Personnel
  assignedTo: string[];
  supervisedBy?: string;
  
  // Results
  totalItemsCounted: number;
  discrepanciesFound: number;
  adjustmentsMade: number;
  
  notes?: string;
}

export interface InventoryCountItem {
  inventoryItemId: string;
  expectedQuantity: number;
  countedQuantity: number;
  discrepancy: number;
  
  // Count Details
  countedBy: string;
  countDate: Date;
  verified: boolean;
  verifiedBy?: string;
  
  // Resolution
  adjustmentMade: boolean;
  adjustmentReason?: string;
  
  notes?: string;
}

export interface DonationRequest {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Request Details
  requestedItems: RequestedItem[];
  totalEstimatedValue: number;
  
  // Dates
  createdDate: Date;
  neededByDate?: Date;
  
  // Status
  status: 'draft' | 'published' | 'partially-fulfilled' | 'fulfilled' | 'expired' | 'cancelled';
  
  // Visibility
  isPublic: boolean;
  isEmailCampaign: boolean;
  isSocialMedia: boolean;
  
  // Campaign Information
  campaignTitle?: string;
  campaignDescription?: string;
  campaignImage?: string;
  goalAmount?: number;
  currentAmount: number;
  
  // Contact
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  
  // Tracking
  views: number;
  responses: number;
  
  // Fulfillment
  donations: DonationFulfillment[];
  
  notes?: string;
}

export interface RequestedItem {
  inventoryItemId?: string;
  name: string;
  description?: string;
  category: InventoryCategory;
  quantityNeeded: number;
  quantityReceived: number;
  unit: string;
  estimatedValue: number;
  priority: 'low' | 'medium' | 'high';
}

export interface DonationFulfillment {
  id: string;
  donorName: string;
  donorEmail?: string;
  donorPhone?: string;
  donorAddress?: Address;
  
  // Donation Details
  items: DonatedItem[];
  totalValue: number;
  
  // Dates
  promisedDate?: Date;
  receivedDate?: Date;
  
  // Status
  status: 'promised' | 'received' | 'processed' | 'cancelled';
  
  // Recognition
  acknowledgmentSent: boolean;
  acknowledgmentDate?: Date;
  isAnonymous: boolean;
  
  notes?: string;
}

export interface DonatedItem {
  requestedItemId?: string;
  name: string;
  quantity: number;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  estimatedValue: number;
  
  // Acceptance
  accepted: boolean;
  rejectionReason?: string;
  
  // Processing
  processed: boolean;
  processedDate?: Date;
  addedToInventory: boolean;
  inventoryItemId?: string;
}

export interface InventoryReport {
  id: string;
  title: string;
  type: 'stock-levels' | 'usage-analysis' | 'cost-analysis' | 'supplier-performance' | 'expiration' | 'custom';
  
  // Parameters
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  categories?: InventoryCategory[];
  locations?: string[];
  suppliers?: string[];
  
  // Report Data
  data: any; // This would contain the actual report data structure
  
  // Generation Info
  generatedDate: Date;
  generatedBy: string;
  
  // Sharing
  recipients: string[];
  isScheduled: boolean;
  scheduleFrequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  nextRunDate?: Date;
  
  // Format
  format: 'pdf' | 'excel' | 'csv' | 'json';
  
  notes?: string;
}

export interface InventoryDashboardMetrics {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  expiringSoonItems: number;
  
  // Categories
  categoryBreakdown: {
    category: InventoryCategory;
    itemCount: number;
    value: number;
  }[];
  
  // Trends
  monthlyUsage: {
    month: string;
    totalUsage: number;
    totalCost: number;
  }[];
  
  // Top Items
  topUsedItems: {
    itemId: string;
    name: string;
    usageCount: number;
  }[];
  
  // Suppliers
  supplierPerformance: {
    supplierId: string;
    name: string;
    onTimeDelivery: number; // percentage
    qualityRating: number;
    totalOrders: number;
  }[];
  
  // Alerts
  activeAlerts: number;
  criticalAlerts: number;
  
  // Financial
  monthlySpending: number;
  averageOrderValue: number;
  costSavings: number; // from donations, bulk purchases, etc.
}