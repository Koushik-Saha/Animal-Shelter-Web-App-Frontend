// Export all services
export { AuthService } from './auth';
export { AnimalService } from './animals';
export { AdoptionService } from './adoptions';
export { MedicalService } from './medical';
export { VolunteerService } from './volunteers';
export { DonationService } from './donations';
export { EventService } from './events';
export { InventoryService } from './inventory';
export { ReportService } from './reports';

// Re-export API utilities
export * from '../api';

// Service factory for dependency injection
export class ServiceFactory {
  private static instance: ServiceFactory;
  private services: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  register<T>(name: string, service: T): void {
    this.services.set(name, service);
  }

  get<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not registered`);
    }
    return service;
  }

  has(name: string): boolean {
    return this.services.has(name);
  }

  clear(): void {
    this.services.clear();
  }
}

// Initialize default services
const serviceFactory = ServiceFactory.getInstance();

serviceFactory.register('auth', AuthService);
serviceFactory.register('animals', AnimalService);
serviceFactory.register('adoptions', AdoptionService);

export { serviceFactory };