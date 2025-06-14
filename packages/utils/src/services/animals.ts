import { api, handleApiError, uploadFile, createPaginationParams, parsePaginationResponse } from '../api';
import type { 
  Animal, 
  AnimalSearchFilters, 
  SearchParams, 
  ApiResponse, 
  PaginationMeta,
  AnimalPhoto,
  MedicalRecord
} from '@shelter/types';

export class AnimalService {
  // Get all animals with pagination and filtering
  static async getAnimals(params: SearchParams & { filters?: AnimalSearchFilters } = {}) {
    try {
      const { page = 1, limit = 10, query, filters, sort, order } = params;
      const paginationParams = createPaginationParams(page, limit);

      const queryParams = new URLSearchParams({
        ...paginationParams,
        ...(query && { search: query }),
        ...(sort && { sort }),
        ...(order && { order }),
        ...(filters && { filters: JSON.stringify(filters) }),
      });

      const response = await api.get<ApiResponse<Animal[]>>(`/animals?${queryParams}`);
      
      if (response.data.success) {
        return parsePaginationResponse<Animal>(response);
      }
      
      throw new Error(response.data.message || 'Failed to fetch animals');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get single animal by ID
  static async getAnimal(id: string): Promise<Animal> {
    try {
      const response = await api.get<ApiResponse<Animal>>(`/animals/${id}`);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Animal not found');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Create new animal
  static async createAnimal(animalData: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Animal> {
    try {
      const response = await api.post<ApiResponse<Animal>>('/animals', animalData);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to create animal');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Update animal
  static async updateAnimal(id: string, animalData: Partial<Animal>): Promise<Animal> {
    try {
      const response = await api.patch<ApiResponse<Animal>>(`/animals/${id}`, animalData);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to update animal');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Delete animal
  static async deleteAnimal(id: string): Promise<void> {
    try {
      const response = await api.delete<ApiResponse<void>>(`/animals/${id}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete animal');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Upload animal photos
  static async uploadAnimalPhoto(
    animalId: string, 
    file: File, 
    caption?: string,
    isPrimary: boolean = false,
    onProgress?: (progressEvent: any) => void
  ): Promise<AnimalPhoto> {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      if (caption) formData.append('caption', caption);
      formData.append('isPrimary', isPrimary.toString());

      const response = await api.post<ApiResponse<AnimalPhoto>>(
        `/animals/${animalId}/photos`,
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
      
      throw new Error(response.data.message || 'Failed to upload photo');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Delete animal photo
  static async deleteAnimalPhoto(animalId: string, photoId: string): Promise<void> {
    try {
      const response = await api.delete<ApiResponse<void>>(`/animals/${animalId}/photos/${photoId}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete photo');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Update photo details
  static async updateAnimalPhoto(
    animalId: string, 
    photoId: string, 
    data: { caption?: string; isPrimary?: boolean }
  ): Promise<AnimalPhoto> {
    try {
      const response = await api.patch<ApiResponse<AnimalPhoto>>(
        `/animals/${animalId}/photos/${photoId}`,
        data
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to update photo');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get animal medical records
  static async getAnimalMedicalRecords(animalId: string): Promise<MedicalRecord[]> {
    try {
      const response = await api.get<ApiResponse<MedicalRecord[]>>(`/animals/${animalId}/medical-records`);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to fetch medical records');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Search animals with advanced filters
  static async searchAnimals(searchParams: {
    query?: string;
    species?: string[];
    breed?: string[];
    ageMin?: number;
    ageMax?: number;
    gender?: string[];
    status?: string[];
    location?: string[];
    specialNeeds?: boolean;
    goodWithKids?: boolean;
    goodWithAnimals?: boolean;
    energyLevel?: string[];
    size?: string[];
    page?: number;
    limit?: number;
  }) {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(`${key}[]`, v.toString()));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });

      const response = await api.get<ApiResponse<Animal[]>>(`/animals/search?${queryParams}`);
      
      if (response.data.success) {
        return parsePaginationResponse<Animal>(response);
      }
      
      throw new Error(response.data.message || 'Search failed');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get animals available for adoption
  static async getAvailableAnimals(params: SearchParams = {}) {
    try {
      const searchParams = {
        ...params,
        filters: {
          ...params.filters,
          status: ['available'],
        },
      };
      
      return this.getAnimals(searchParams);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get recently added animals
  static async getRecentAnimals(limit: number = 10): Promise<Animal[]> {
    try {
      const response = await api.get<ApiResponse<Animal[]>>(`/animals/recent?limit=${limit}`);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to fetch recent animals');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get featured animals
  static async getFeaturedAnimals(limit: number = 6): Promise<Animal[]> {
    try {
      const response = await api.get<ApiResponse<Animal[]>>(`/animals/featured?limit=${limit}`);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to fetch featured animals');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Update animal status
  static async updateAnimalStatus(id: string, status: string, notes?: string): Promise<Animal> {
    try {
      const response = await api.patch<ApiResponse<Animal>>(`/animals/${id}/status`, {
        status,
        notes,
      });
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to update animal status');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Transfer animal to different location
  static async transferAnimal(id: string, locationId: string, notes?: string): Promise<Animal> {
    try {
      const response = await api.post<ApiResponse<Animal>>(`/animals/${id}/transfer`, {
        locationId,
        notes,
      });
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to transfer animal');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get animal statistics
  static async getAnimalStats(): Promise<{
    total: number;
    available: number;
    adopted: number;
    fostered: number;
    medical: number;
    bySpecies: Record<string, number>;
    byStatus: Record<string, number>;
    adoptionRate: number;
  }> {
    try {
      const response = await api.get<ApiResponse<any>>('/animals/stats');
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to fetch animal statistics');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Get animal breeds by species
  static async getBreedsBySpecies(species: string): Promise<string[]> {
    try {
      const response = await api.get<ApiResponse<string[]>>(`/animals/breeds/${species}`);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to fetch breeds');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Generate animal report
  static async generateAnimalReport(params: {
    animalId?: string;
    startDate?: string;
    endDate?: string;
    format: 'pdf' | 'csv' | 'excel';
  }): Promise<{ downloadUrl: string; filename: string }> {
    try {
      const response = await api.post<ApiResponse<{ downloadUrl: string; filename: string }>>(
        '/animals/reports',
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
  static async bulkUpdateAnimals(animalIds: string[], updates: Partial<Animal>): Promise<void> {
    try {
      const response = await api.patch<ApiResponse<void>>('/animals/bulk-update', {
        animalIds,
        updates,
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Bulk update failed');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async bulkDeleteAnimals(animalIds: string[]): Promise<void> {
    try {
      const response = await api.delete<ApiResponse<void>>('/animals/bulk-delete', {
        data: { animalIds },
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Bulk delete failed');
      }
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Import/Export
  static async importAnimals(file: File, onProgress?: (progressEvent: any) => void): Promise<{
    success: number;
    errors: Array<{ row: number; message: string }>;
  }> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post<ApiResponse<any>>('/animals/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onProgress,
      });
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Import failed');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async exportAnimals(params: {
    filters?: AnimalSearchFilters;
    format: 'csv' | 'excel' | 'pdf';
    includePhotos?: boolean;
  }): Promise<{ downloadUrl: string; filename: string }> {
    try {
      const response = await api.post<ApiResponse<{ downloadUrl: string; filename: string }>>(
        '/animals/export',
        params
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Export failed');
    } catch (error) {
      throw handleApiError(error);
    }
  }
}