import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../services/auth';
import { queryKeys } from '../api';
import type { LoginRequest, RegisterRequest, User } from '@shelter/types';

// Auth state hook
export function useAuth() {
  const queryClient = useQueryClient();

  // Get current user query
  const userQuery = useQuery({
    queryKey: queryKeys.user,
    queryFn: AuthService.getCurrentUser,
    enabled: AuthService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => AuthService.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user, data.user);
      queryClient.invalidateQueries({ queryKey: queryKeys.user });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => AuthService.register(userData),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user, data.user);
      queryClient.invalidateQueries({ queryKey: queryKeys.user });
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(queryKeys.user, null);
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Still clear data on logout failure
      queryClient.clear();
      queryClient.setQueryData(queryKeys.user, null);
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (userData: Partial<User>) => AuthService.updateProfile(userData),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.user, updatedUser);
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => AuthService.changePassword(data),
    onError: (error) => {
      console.error('Password change failed:', error);
    },
  });

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => AuthService.forgotPassword(email),
    onError: (error) => {
      console.error('Forgot password failed:', error);
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: (data: {
      token: string;
      password: string;
      confirmPassword: string;
    }) => AuthService.resetPassword(data),
    onError: (error) => {
      console.error('Password reset failed:', error);
    },
  });

  // Verify email mutation
  const verifyEmailMutation = useMutation({
    mutationFn: (token: string) => AuthService.verifyEmail(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user });
    },
    onError: (error) => {
      console.error('Email verification failed:', error);
    },
  });

  // Resend verification email mutation
  const resendVerificationMutation = useMutation({
    mutationFn: AuthService.resendVerificationEmail,
    onError: (error) => {
      console.error('Resend verification failed:', error);
    },
  });

  return {
    // State
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    isError: userQuery.isError,
    error: userQuery.error,
    isAuthenticated: !!userQuery.data && AuthService.isAuthenticated(),

    // Mutations
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,

    updateProfile: updateProfileMutation.mutate,
    updateProfileAsync: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
    updateProfileError: updateProfileMutation.error,

    changePassword: changePasswordMutation.mutate,
    changePasswordAsync: changePasswordMutation.mutateAsync,
    isChangingPassword: changePasswordMutation.isPending,
    changePasswordError: changePasswordMutation.error,

    forgotPassword: forgotPasswordMutation.mutate,
    forgotPasswordAsync: forgotPasswordMutation.mutateAsync,
    isSendingForgotPassword: forgotPasswordMutation.isPending,
    forgotPasswordError: forgotPasswordMutation.error,

    resetPassword: resetPasswordMutation.mutate,
    resetPasswordAsync: resetPasswordMutation.mutateAsync,
    isResettingPassword: resetPasswordMutation.isPending,
    resetPasswordError: resetPasswordMutation.error,

    verifyEmail: verifyEmailMutation.mutate,
    verifyEmailAsync: verifyEmailMutation.mutateAsync,
    isVerifyingEmail: verifyEmailMutation.isPending,
    verifyEmailError: verifyEmailMutation.error,

    resendVerification: resendVerificationMutation.mutate,
    resendVerificationAsync: resendVerificationMutation.mutateAsync,
    isResendingVerification: resendVerificationMutation.isPending,
    resendVerificationError: resendVerificationMutation.error,

    // Utility methods
    hasRole: (role: string) => AuthService.hasRole(role),
    hasAnyRole: (roles: string[]) => AuthService.hasAnyRole(roles),
    refetch: userQuery.refetch,
  };
}

// Two-factor authentication hooks
export function useTwoFactorAuth() {
  const queryClient = useQueryClient();

  const enableTwoFactorMutation = useMutation({
    mutationFn: AuthService.enableTwoFactor,
    onError: (error) => {
      console.error('Enable 2FA failed:', error);
    },
  });

  const verifyTwoFactorMutation = useMutation({
    mutationFn: (code: string) => AuthService.verifyTwoFactor(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user });
    },
    onError: (error) => {
      console.error('2FA verification failed:', error);
    },
  });

  const disableTwoFactorMutation = useMutation({
    mutationFn: (password: string) => AuthService.disableTwoFactor(password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user });
    },
    onError: (error) => {
      console.error('Disable 2FA failed:', error);
    },
  });

  return {
    enableTwoFactor: enableTwoFactorMutation.mutate,
    enableTwoFactorAsync: enableTwoFactorMutation.mutateAsync,
    isEnabling: enableTwoFactorMutation.isPending,
    enableError: enableTwoFactorMutation.error,

    verifyTwoFactor: verifyTwoFactorMutation.mutate,
    verifyTwoFactorAsync: verifyTwoFactorMutation.mutateAsync,
    isVerifying: verifyTwoFactorMutation.isPending,
    verifyError: verifyTwoFactorMutation.error,

    disableTwoFactor: disableTwoFactorMutation.mutate,
    disableTwoFactorAsync: disableTwoFactorMutation.mutateAsync,
    isDisabling: disableTwoFactorMutation.isPending,
    disableError: disableTwoFactorMutation.error,
  };
}

// Session management hooks
export function useSessions() {
  const queryClient = useQueryClient();

  const sessionsQuery = useQuery({
    queryKey: ['sessions'],
    queryFn: AuthService.getSessions,
    enabled: AuthService.isAuthenticated(),
  });

  const revokeSessionMutation = useMutation({
    mutationFn: (sessionId: string) => AuthService.revokeSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: (error) => {
      console.error('Revoke session failed:', error);
    },
  });

  const revokeAllSessionsMutation = useMutation({
    mutationFn: AuthService.revokeAllSessions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: (error) => {
      console.error('Revoke all sessions failed:', error);
    },
  });

  return {
    sessions: sessionsQuery.data,
    isLoading: sessionsQuery.isLoading,
    isError: sessionsQuery.isError,
    error: sessionsQuery.error,

    revokeSession: revokeSessionMutation.mutate,
    revokeSessionAsync: revokeSessionMutation.mutateAsync,
    isRevokingSession: revokeSessionMutation.isPending,
    revokeSessionError: revokeSessionMutation.error,

    revokeAllSessions: revokeAllSessionsMutation.mutate,
    revokeAllSessionsAsync: revokeAllSessionsMutation.mutateAsync,
    isRevokingAllSessions: revokeAllSessionsMutation.isPending,
    revokeAllSessionsError: revokeAllSessionsMutation.error,

    refetch: sessionsQuery.refetch,
  };
}