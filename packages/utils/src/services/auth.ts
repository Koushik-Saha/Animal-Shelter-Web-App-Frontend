import { api, storage, handleApiError } from '../api';
import type { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User, 
  ApiResponse 
} from '@shelter/types';

export class AuthService {
  // Authentication endpoints
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
      
      if (response.data.success) {
        const authData = response.data.data;
        storage.set('auth_token', authData.token);
        storage.set('refresh_token', authData.refreshToken);
        storage.set('user', authData.user);
        return authData;
      }
      
      throw new Error(response.data.message || 'Login failed');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', userData);
      
      if (response.data.success) {
        const authData = response.data.data;
        storage.set('auth_token', authData.token);
        storage.set('refresh_token', authData.refreshToken);
        storage.set('user', authData.user);
        return authData;
      }
      
      throw new Error(response.data.message || 'Registration failed');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local storage regardless of API call success
      storage.remove('auth_token');
      storage.remove('refresh_token');
      storage.remove('user');
    }
  }

  static async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = storage.get('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post<ApiResponse<AuthResponse>>('/auth/refresh', {
        refreshToken,
      });

      if (response.data.success) {
        const authData = response.data.data;
        storage.set('auth_token', authData.token);
        storage.set('refresh_token', authData.refreshToken);
        storage.set('user', authData.user);
        return authData;
      }

      throw new Error(response.data.message || 'Token refresh failed');
    } catch (error) {
      // Clear tokens on refresh failure
      storage.remove('auth_token');
      storage.remove('refresh_token');
      storage.remove('user');
      throw handleApiError(error);
    }
  }

  static async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<ApiResponse<User>>('/auth/me');
      
      if (response.data.success) {
        const user = response.data.data;
        storage.set('user', user);
        return user;
      }
      
      throw new Error(response.data.message || 'Failed to get user data');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await api.patch<ApiResponse<User>>('/auth/profile', userData);
      
      if (response.data.success) {
        const user = response.data.data;
        storage.set('user', user);
        return user;
      }
      
      throw new Error(response.data.message || 'Profile update failed');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<void> {
    try {
      const response = await api.post<ApiResponse<void>>('/auth/change-password', data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Password change failed');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async forgotPassword(email: string): Promise<void> {
    try {
      const response = await api.post<ApiResponse<void>>('/auth/forgot-password', { email });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Password reset request failed');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async resetPassword(data: {
    token: string;
    password: string;
    confirmPassword: string;
  }): Promise<void> {
    try {
      const response = await api.post<ApiResponse<void>>('/auth/reset-password', data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Password reset failed');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async verifyEmail(token: string): Promise<void> {
    try {
      const response = await api.post<ApiResponse<void>>('/auth/verify-email', { token });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Email verification failed');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async resendVerificationEmail(): Promise<void> {
    try {
      const response = await api.post<ApiResponse<void>>('/auth/resend-verification');
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to resend verification email');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Utility methods
  static isAuthenticated(): boolean {
    return !!storage.get('auth_token');
  }

  static getToken(): string | null {
    return storage.get('auth_token');
  }

  static getUser(): User | null {
    return storage.get('user');
  }

  static hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.role === role;
  }

  static hasAnyRole(roles: string[]): boolean {
    const user = this.getUser();
    return user ? roles.includes(user.role) : false;
  }

  // Two-factor authentication
  static async enableTwoFactor(): Promise<{ qrCode: string; backupCodes: string[] }> {
    try {
      const response = await api.post<ApiResponse<{ qrCode: string; backupCodes: string[] }>>('/auth/2fa/enable');
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to enable 2FA');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async verifyTwoFactor(code: string): Promise<void> {
    try {
      const response = await api.post<ApiResponse<void>>('/auth/2fa/verify', { code });
      
      if (!response.data.success) {
        throw new Error(response.data.message || '2FA verification failed');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async disableTwoFactor(password: string): Promise<void> {
    try {
      const response = await api.post<ApiResponse<void>>('/auth/2fa/disable', { password });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to disable 2FA');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Session management
  static async getSessions(): Promise<Array<{
    id: string;
    device: string;
    location: string;
    lastActive: string;
    current: boolean;
  }>> {
    try {
      const response = await api.get<ApiResponse<Array<any>>>('/auth/sessions');
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to get sessions');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async revokeSession(sessionId: string): Promise<void> {
    try {
      const response = await api.delete<ApiResponse<void>>(`/auth/sessions/${sessionId}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to revoke session');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async revokeAllSessions(): Promise<void> {
    try {
      const response = await api.delete<ApiResponse<void>>('/auth/sessions');
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to revoke all sessions');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }
}