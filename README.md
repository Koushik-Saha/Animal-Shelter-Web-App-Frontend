# 🐾 Animal Shelter Management System

A comprehensive, enterprise-grade Animal Shelter Management System built with Next.js, TypeScript, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Animal Management**: Complete CRUD operations for animal records
- **Adoption Process**: End-to-end adoption workflow management
- **Medical Records**: Comprehensive health tracking and veterinary management
- **Volunteer Management**: Gamified volunteer portal with skill tracking
- **Donation System**: Traditional and Web3 blockchain donations
- **Event Management**: Adoption events and community engagement
- **Inventory Management**: Supplies and resource tracking
- **Transport Tracking**: Real-time GPS fleet management

### Technical Features
- **API Integration**: Complete REST API integration with React Query
- **Authentication**: Role-based access control and session management
- **Real-time Updates**: WebSocket integration for live data
- **Offline Support**: PWA capabilities with service workers
- **Type Safety**: Full TypeScript implementation
- **Testing**: Comprehensive unit and E2E testing
- **Responsive Design**: Mobile-first responsive UI
- **Performance**: Optimized caching and data fetching

## 🏗️ Architecture

### Frontend Structure
```
Animal-Shelter-System/
├── apps/
│   ├── shell/           # Main host application
│   ├── adoption/        # Adoption portal
│   ├── medical/         # Medical records system
│   ├── volunteer/       # Volunteer management
│   └── admin/          # Admin dashboard
├── packages/
│   ├── ui/             # Shared UI components
│   ├── utils/          # API services and utilities
│   ├── types/          # TypeScript type definitions
│   └── config/         # Shared configuration
```

### Technology Stack
- **Framework**: Next.js 14+ with TypeScript
- **State Management**: React Query (TanStack Query)
- **Styling**: CSS-in-JS with Material-UI components
- **Authentication**: JWT-based with role management
- **Testing**: Jest + React Testing Library + Playwright
- **Build System**: Turborepo monorepo
- **API Client**: Axios with interceptors

## 🛠️ API Integration

### Base Configuration
The system integrates with a RESTful API. Configure your API endpoint in the environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Available API Services

#### Authentication Service
```typescript
// Login
await AuthService.login({ email, password });

// Register
await AuthService.register({ firstName, lastName, email, password });

// Get current user
const user = await AuthService.getCurrentUser();
```

#### Animal Service
```typescript
// Get animals with pagination and filters
const animals = await AnimalService.getAnimals({
  page: 1,
  limit: 10,
  filters: {
    species: ['dog', 'cat'],
    status: ['available']
  }
});

// Create new animal
const newAnimal = await AnimalService.createAnimal(animalData);

// Update animal
const updatedAnimal = await AnimalService.updateAnimal(id, updates);
```

#### Adoption Service
```typescript
// Submit adoption application
const application = await AdoptionService.submitApplication({
  animalId,
  applicationData
});

// Get user's applications
const applications = await AdoptionService.getUserApplications();
```

### React Query Hooks

#### Authentication
```typescript
const { user, login, logout, isAuthenticated } = useAuth();
```

#### Animals
```typescript
// Get animals with automatic caching
const { data: animals, isLoading, error } = useAnimals({
  filters: { species: ['dog'] }
});

// Mutations for CRUD operations
const { createAnimal, updateAnimal, deleteAnimal } = useAnimalMutations();
```

#### Infinite Loading
```typescript
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
} = useInfiniteAnimals();
```

## 🔐 Authentication & Authorization

### Role-Based Access Control
The system supports multiple user roles:
- **Admin**: Full system access
- **Staff**: Shelter operations management
- **Volunteer**: Task and animal care access
- **Adopter**: Adoption applications and updates
- **Veterinarian**: Medical records access
- **Donor**: Donation tracking and receipts

### Protected Routes
```typescript
// Higher-order component protection
export default withAuth(AdminPage, ['admin']);

// Hook-based protection
const { canAccess } = useRequireAuth(['admin', 'staff']);

// Component-level protection
<AuthGuard requiredRoles={['staff']}>
  <SensitiveComponent />
</AuthGuard>
```

### Permissions System
```typescript
const {
  canAddAnimals,
  canProcessAdoptions,
  canViewReports
} = usePermissions();
```

## 📊 API Endpoints Structure

Based on the provided API documentation, the system expects these endpoint patterns:

### Animals
- `GET /api/animals` - List animals with pagination and filters
- `POST /api/animals` - Create new animal
- `GET /api/animals/:id` - Get single animal
- `PATCH /api/animals/:id` - Update animal
- `DELETE /api/animals/:id` - Delete animal
- `POST /api/animals/:id/photos` - Upload animal photos
- `GET /api/animals/stats` - Get animal statistics

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Adoptions
- `GET /api/adoptions/applications` - List applications
- `POST /api/adoptions/applications` - Submit application
- `GET /api/adoptions/applications/:id` - Get application
- `PATCH /api/adoptions/applications/:id/status` - Update status
- `POST /api/adoptions/applications/:id/documents` - Upload documents

### Medical Records
- `GET /api/animals/:id/medical-records` - Get animal medical history
- `POST /api/medical-records` - Create medical record
- `PATCH /api/medical-records/:id` - Update medical record

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Animal-Shelter-System
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
```bash
cp .env.example .env.local
# Edit .env.local with your API configuration
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at:
- **Main App**: http://localhost:7007
- **Adoption Portal**: http://localhost:3001
- **Medical System**: http://localhost:3002
- **Volunteer Portal**: http://localhost:3003
- **Admin Dashboard**: http://localhost:3005

### Environment Variables

Key environment variables to configure:

```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional but recommended
NEXT_PUBLIC_ENABLE_WEB3_DONATIONS=true
NEXT_PUBLIC_ENABLE_REAL_TIME_UPDATES=true
NEXT_PUBLIC_DEBUG_MODE=true
```

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# All tests
npm run test:all
```

### Test Coverage
The system includes comprehensive testing:
- Unit tests for API services
- Component tests with React Testing Library
- E2E tests with Playwright
- API integration tests

## 📱 PWA Features

The application includes Progressive Web App capabilities:
- Offline functionality
- Service worker caching
- Push notifications
- Install prompts
- Background sync

## 🌐 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
docker build -t animal-shelter-frontend .
docker run -p 3000:3000 animal-shelter-frontend
```

### Environment-Specific Builds
```bash
# Development
npm run dev

# Staging
npm run build:staging

# Production
npm run build:production
```

## 📖 API Documentation Integration

This frontend is designed to work with the Animal Shelter API documented at:
https://documenter.getpostman.com/view/7026572/2sB2cRE5TU

### Key Integration Points:
1. **Authentication flow** with JWT tokens
2. **Animal management** with full CRUD operations
3. **File uploads** for animal photos and documents
4. **Real-time updates** via WebSocket connections
5. **Pagination and filtering** for large datasets
6. **Error handling** with user-friendly messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the troubleshooting guide in `/docs`

## 🎯 Roadmap

### Current Status ✅
- [x] Complete API integration layer
- [x] Authentication and authorization
- [x] Animal management system
- [x] Adoption process integration
- [x] Real-time data caching
- [x] Error handling and loading states
- [x] Type-safe API services

### Upcoming Features 🚧
- [ ] Medical records integration
- [ ] Volunteer management API
- [ ] Donation and Web3 integration
- [ ] Real-time WebSocket features
- [ ] Advanced reporting system
- [ ] Mobile app integration

---

Built with ❤️ for animal welfare organizations worldwide.