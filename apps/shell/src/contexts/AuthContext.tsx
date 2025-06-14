import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@shelter/utils/hooks/useAuth';
import type { User } from '@shelter/types';

interface AuthContextType {
  user: User | undefined | null;
  isLoading: boolean;
  isError: boolean;
  error: any;
  isAuthenticated: boolean;
  
  // Auth actions
  login: (credentials: any) => void;
  loginAsync: (credentials: any) => Promise<any>;
  isLoggingIn: boolean;
  loginError: any;
  
  register: (userData: any) => void;
  registerAsync: (userData: any) => Promise<any>;
  isRegistering: boolean;
  registerError: any;
  
  logout: () => void;
  logoutAsync: () => Promise<void>;
  isLoggingOut: boolean;
  
  updateProfile: (userData: Partial<User>) => void;
  updateProfileAsync: (userData: Partial<User>) => Promise<User>;
  isUpdatingProfile: boolean;
  updateProfileError: any;
  
  changePassword: (data: any) => void;
  changePasswordAsync: (data: any) => Promise<void>;
  isChangingPassword: boolean;
  changePasswordError: any;
  
  forgotPassword: (email: string) => void;
  forgotPasswordAsync: (email: string) => Promise<void>;
  isSendingForgotPassword: boolean;
  forgotPasswordError: any;
  
  resetPassword: (data: any) => void;
  resetPasswordAsync: (data: any) => Promise<void>;
  isResettingPassword: boolean;
  resetPasswordError: any;
  
  verifyEmail: (token: string) => void;
  verifyEmailAsync: (token: string) => Promise<void>;
  isVerifyingEmail: boolean;
  verifyEmailError: any;
  
  resendVerification: () => void;
  resendVerificationAsync: () => Promise<void>;
  isResendingVerification: boolean;
  resendVerificationError: any;
  
  // Utility methods
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protected routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRoles?: string[]
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, hasAnyRole, isLoading } = useAuthContext();

    if (isLoading) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          Loading...
        </div>
      );
    }

    if (!isAuthenticated) {
      // Redirect to login or show login modal
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return null;
    }

    if (requiredRoles && !hasAnyRole(requiredRoles)) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column'
        }}>
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

// Hook for route protection
export function useRequireAuth(requiredRoles?: string[]) {
  const { isAuthenticated, hasAnyRole, isLoading } = useAuthContext();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }, [isAuthenticated, isLoading]);

  const hasRequiredRole = requiredRoles ? hasAnyRole(requiredRoles) : true;

  return {
    isAuthenticated,
    hasRequiredRole,
    isLoading,
    canAccess: isAuthenticated && hasRequiredRole,
  };
}

// Component for conditional rendering based on auth status
interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requiredRoles?: string[];
  requireAuth?: boolean;
}

export function AuthGuard({ 
  children, 
  fallback = null, 
  requiredRoles, 
  requireAuth = true 
}: AuthGuardProps) {
  const { isAuthenticated, hasAnyRole, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (requireAuth && !isAuthenticated) {
    return <>{fallback}</>;
  }

  if (requiredRoles && !hasAnyRole(requiredRoles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Hook for permissions
export function usePermissions() {
  const { user, hasRole, hasAnyRole } = useAuthContext();

  const permissions = React.useMemo(() => {
    if (!user) return {};

    return {
      // Admin permissions
      canManageUsers: hasRole('admin'),
      canManageSettings: hasRole('admin'),
      canViewReports: hasAnyRole(['admin', 'staff']),
      
      // Animal management
      canAddAnimals: hasAnyRole(['admin', 'staff']),
      canEditAnimals: hasAnyRole(['admin', 'staff']),
      canDeleteAnimals: hasRole('admin'),
      canViewAnimals: hasAnyRole(['admin', 'staff', 'volunteer', 'adopter']),
      
      // Adoption management
      canProcessAdoptions: hasAnyRole(['admin', 'staff']),
      canViewAdoptions: hasAnyRole(['admin', 'staff']),
      canApplyForAdoption: hasAnyRole(['adopter', 'admin', 'staff']),
      
      // Medical records
      canAddMedicalRecords: hasAnyRole(['admin', 'staff', 'veterinarian']),
      canViewMedicalRecords: hasAnyRole(['admin', 'staff', 'veterinarian']),
      canEditMedicalRecords: hasAnyRole(['admin', 'veterinarian']),
      
      // Volunteer management
      canManageVolunteers: hasAnyRole(['admin', 'staff']),
      canViewVolunteerTasks: hasAnyRole(['admin', 'staff', 'volunteer']),
      canAssignTasks: hasAnyRole(['admin', 'staff']),
      
      // Donations
      canViewDonations: hasAnyRole(['admin', 'staff']),
      canManageDonations: hasAnyRole(['admin', 'staff']),
      canMakeDonations: true, // Anyone can donate
      
      // Events
      canCreateEvents: hasAnyRole(['admin', 'staff']),
      canManageEvents: hasAnyRole(['admin', 'staff']),
      canViewEvents: true, // Anyone can view events
      canRegisterForEvents: hasAnyRole(['volunteer', 'adopter', 'donor']),
    };
  }, [user, hasRole, hasAnyRole]);

  return permissions;
}