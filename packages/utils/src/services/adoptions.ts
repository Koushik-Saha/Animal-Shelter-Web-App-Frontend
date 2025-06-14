import { api, handleApiError, uploadFile, createPaginationParams, parsePaginationResponse } from '../api';
import type { 
  AdoptionApplication,
  ApplicationStatus,
  AdoptionApplicationData,
  ApiResponse,
  SearchParams,
  Animal,
  User
} from '@shelter/types';

export class AdoptionService {
  // Get all adoption applications with pagination and filtering
  static async getApplications(params: SearchParams & { 
    status?: ApplicationStatus[];
    animalId?: string;
    applicantId?: string;
  } = {}) {
    try {
      const { page = 1, limit = 10, query, filters, sort, order, status, animalId, applicantId } = params;
      const paginationParams = createPaginationParams(page, limit);

      const queryParams = new URLSearchParams({
        ...paginationParams,
        ...(query && { search: query }),
        ...(sort && { sort }),
        ...(order && { order }),
        ...(status && { status: status.join(',') }),
        ...(animalId && { animalId }),
        ...(applicantId && { applicantId }),
        ...(filters && { filters: JSON.stringify(filters) }),
      });

      const response = await api.get<ApiResponse<AdoptionApplication[]>>(`/adoptions/applications?${queryParams}`);
      
      if (response.data.success) {
        return parsePaginationResponse<AdoptionApplication>(response);
      }
      
      throw new Error(response.data.message || 'Failed to fetch applications');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get single adoption application by ID
  static async getApplication(id: string): Promise<AdoptionApplication> {
    try {
      const response = await api.get<ApiResponse<AdoptionApplication>>(`/adoptions/applications/${id}`);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Application not found');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Submit new adoption application
  static async submitApplication(data: {
    animalId: string;
    applicationData: AdoptionApplicationData;
  }): Promise<AdoptionApplication> {
    try {
      const response = await api.post<ApiResponse<AdoptionApplication>>('/adoptions/applications', data);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to submit application');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Update adoption application
  static async updateApplication(
    id: string, 
    data: Partial<AdoptionApplication>
  ): Promise<AdoptionApplication> {
    try {
      const response = await api.patch<ApiResponse<AdoptionApplication>>(
        `/adoptions/applications/${id}`,
        data
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to update application');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Update application status
  static async updateApplicationStatus(
    id: string,
    status: ApplicationStatus,
    notes?: string,
    reviewedBy?: string
  ): Promise<AdoptionApplication> {
    try {
      const response = await api.patch<ApiResponse<AdoptionApplication>>(
        `/adoptions/applications/${id}/status`,
        {
          status,
          notes,
          reviewedBy,
          reviewedAt: new Date().toISOString(),
        }
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to update application status');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Upload application documents
  static async uploadDocument(
    applicationId: string,
    file: File,
    documentType: string,
    onProgress?: (progressEvent: any) => void
  ): Promise<{ id: string; url: string; filename: string }> {
    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('type', documentType);

      const response = await api.post<ApiResponse<any>>(
        `/adoptions/applications/${applicationId}/documents`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: onProgress,
        }
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to upload document');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Delete application document
  static async deleteDocument(applicationId: string, documentId: string): Promise<void> {
    try {
      const response = await api.delete<ApiResponse<void>>(
        `/adoptions/applications/${applicationId}/documents/${documentId}`
      );
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete document');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Schedule home visit
  static async scheduleHomeVisit(
    applicationId: string,
    visitDate: string,
    notes?: string
  ): Promise<AdoptionApplication> {
    try {
      const response = await api.post<ApiResponse<AdoptionApplication>>(
        `/adoptions/applications/${applicationId}/home-visit`,
        {
          visitDate,
          notes,
        }
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to schedule home visit');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Complete home visit
  static async completeHomeVisit(
    applicationId: string,
    data: {
      visitCompleted: boolean;
      visitNotes: string;
      recommendApproval: boolean;
      concerns?: string[];
    }
  ): Promise<AdoptionApplication> {
    try {
      const response = await api.patch<ApiResponse<AdoptionApplication>>(
        `/adoptions/applications/${applicationId}/home-visit`,
        {
          ...data,
          completedAt: new Date().toISOString(),
        }
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to complete home visit');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Contact references
  static async contactReference(
    applicationId: string,
    referenceId: string,
    data: {
      contacted: boolean;
      contactedAt: string;
      feedback: string;
      recommendation: 'positive' | 'neutral' | 'negative';
    }
  ): Promise<AdoptionApplication> {
    try {
      const response = await api.patch<ApiResponse<AdoptionApplication>>(
        `/adoptions/applications/${applicationId}/references/${referenceId}`,
        data
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to update reference');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Finalize adoption
  static async finalizeAdoption(
    applicationId: string,
    data: {
      adoptionDate: string;
      adoptionFee: number;
      paymentMethod: string;
      contractSigned: boolean;
      microchipTransferred: boolean;
      notes?: string;
    }
  ): Promise<AdoptionApplication> {
    try {
      const response = await api.post<ApiResponse<AdoptionApplication>>(
        `/adoptions/applications/${applicationId}/finalize`,
        data
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to finalize adoption');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get user's adoption applications
  static async getUserApplications(userId?: string): Promise<AdoptionApplication[]> {
    try {
      const endpoint = userId ? `/adoptions/users/${userId}/applications` : '/adoptions/my-applications';
      const response = await api.get<ApiResponse<AdoptionApplication[]>>(endpoint);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to fetch user applications');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get applications for a specific animal
  static async getAnimalApplications(animalId: string): Promise<AdoptionApplication[]> {
    try {
      const response = await api.get<ApiResponse<AdoptionApplication[]>>(
        `/adoptions/animals/${animalId}/applications`
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to fetch animal applications');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get adoption matching suggestions
  static async getMatchingSuggestions(applicationId: string): Promise<Animal[]> {
    try {
      const response = await api.get<ApiResponse<Animal[]>>(
        `/adoptions/applications/${applicationId}/matches`
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to fetch matching suggestions');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get adoption statistics
  static async getAdoptionStats(params: {
    startDate?: string;
    endDate?: string;
    groupBy?: 'day' | 'week' | 'month' | 'year';
  } = {}): Promise<{
    totalAdoptions: number;
    pendingApplications: number;
    averageProcessingTime: number;
    adoptionRate: number;
    adoptionsByPeriod: Array<{
      period: string;
      count: number;
    }>;
    topBreeds: Array<{
      breed: string;
      count: number;
    }>;
    applicationStatusBreakdown: Record<ApplicationStatus, number>;
  }> {
    try {
      const queryParams = new URLSearchParams(params as any);
      const response = await api.get<ApiResponse<any>>(`/adoptions/stats?${queryParams}`);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to fetch adoption statistics');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Generate adoption contract
  static async generateContract(applicationId: string): Promise<{ contractUrl: string }> {
    try {
      const response = await api.post<ApiResponse<{ contractUrl: string }>>(
        `/adoptions/applications/${applicationId}/contract`
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to generate contract');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Send follow-up communication
  static async sendFollowUp(
    applicationId: string,
    data: {
      type: 'email' | 'sms' | 'call';
      subject?: string;
      message: string;
      scheduledFor?: string;
    }
  ): Promise<void> {
    try {
      const response = await api.post<ApiResponse<void>>(
        `/adoptions/applications/${applicationId}/follow-up`,
        data
      );
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to send follow-up');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Withdraw application
  static async withdrawApplication(
    applicationId: string,
    reason?: string
  ): Promise<AdoptionApplication> {
    try {
      const response = await api.patch<ApiResponse<AdoptionApplication>>(
        `/adoptions/applications/${applicationId}/withdraw`,
        { reason }
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to withdraw application');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get adoption history for an animal
  static async getAnimalAdoptionHistory(animalId: string): Promise<Array<{
    id: string;
    adopter: User;
    adoptionDate: string;
    returnDate?: string;
    returnReason?: string;
    status: 'active' | 'returned' | 'transferred';
  }>> {
    try {
      const response = await api.get<ApiResponse<any>>(`/adoptions/animals/${animalId}/history`);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to fetch adoption history');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Return adopted animal
  static async returnAnimal(data: {
    animalId: string;
    adoptionId: string;
    returnReason: string;
    returnDate: string;
    notes?: string;
  }): Promise<void> {
    try {
      const response = await api.post<ApiResponse<void>>('/adoptions/returns', data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to process return');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Generate adoption reports
  static async generateReport(params: {
    type: 'adoptions' | 'applications' | 'returns';
    startDate?: string;
    endDate?: string;
    format: 'pdf' | 'csv' | 'excel';
    filters?: any;
  }): Promise<{ downloadUrl: string; filename: string }> {
    try {
      const response = await api.post<ApiResponse<{ downloadUrl: string; filename: string }>>(
        '/adoptions/reports',
        params
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to generate report');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Bulk operations
  static async bulkUpdateApplications(
    applicationIds: string[],
    updates: Partial<AdoptionApplication>
  ): Promise<void> {
    try {
      const response = await api.patch<ApiResponse<void>>('/adoptions/applications/bulk-update', {
        applicationIds,
        updates,
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Bulk update failed');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Send batch communications
  static async sendBatchCommunication(data: {
    applicationIds: string[];
    type: 'email' | 'sms';
    subject?: string;
    message: string;
    scheduledFor?: string;
  }): Promise<void> {
    try {
      const response = await api.post<ApiResponse<void>>('/adoptions/batch-communication', data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to send batch communication');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }
}