import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { AnimalService } from '../services/animals';
import { queryKeys } from '../api';
import type { 
  Animal, 
  AnimalSearchFilters, 
  SearchParams, 
  AnimalPhoto 
} from '@shelter/types';

// Get all animals with pagination
export function useAnimals(params: SearchParams & { filters?: AnimalSearchFilters } = {}) {
  return useQuery({
    queryKey: queryKeys.animalSearch(params),
    queryFn: () => AnimalService.getAnimals(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    placeholderData: (previousData) => previousData,
  });
}

// Infinite scroll for animals
export function useInfiniteAnimals(params: SearchParams & { filters?: AnimalSearchFilters } = {}) {
  return useInfiniteQuery({
    queryKey: ['animals', 'infinite', params],
    queryFn: ({ pageParam = 1 }) => 
      AnimalService.getAnimals({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => 
      lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined,
    staleTime: 2 * 60 * 1000,
    initialPageParam: 1,
  });
}

// Get single animal
export function useAnimal(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.animal(id),
    queryFn: () => AnimalService.getAnimal(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get available animals for adoption
export function useAvailableAnimals(params: SearchParams = {}) {
  return useQuery({
    queryKey: ['animals', 'available', params],
    queryFn: () => AnimalService.getAvailableAnimals(params),
    staleTime: 2 * 60 * 1000,
  });
}

// Get recent animals
export function useRecentAnimals(limit: number = 10) {
  return useQuery({
    queryKey: ['animals', 'recent', limit],
    queryFn: () => AnimalService.getRecentAnimals(limit),
    staleTime: 5 * 60 * 1000,
  });
}

// Get featured animals
export function useFeaturedAnimals(limit: number = 6) {
  return useQuery({
    queryKey: ['animals', 'featured', limit],
    queryFn: () => AnimalService.getFeaturedAnimals(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Animal search with debouncing
export function useAnimalSearch(searchParams: any) {
  return useQuery({
    queryKey: ['animals', 'search', searchParams],
    queryFn: () => AnimalService.searchAnimals(searchParams),
    enabled: !!searchParams.query || Object.keys(searchParams).length > 1,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Get animal medical records
export function useAnimalMedicalRecords(animalId: string) {
  return useQuery({
    queryKey: queryKeys.animalMedicalRecords(animalId),
    queryFn: () => AnimalService.getAnimalMedicalRecords(animalId),
    enabled: !!animalId,
    staleTime: 5 * 60 * 1000,
  });
}

// Get animal statistics
export function useAnimalStats() {
  return useQuery({
    queryKey: ['animals', 'stats'],
    queryFn: AnimalService.getAnimalStats,
    staleTime: 5 * 60 * 1000,
  });
}

// Get breeds by species
export function useBreedsBySpecies(species: string) {
  return useQuery({
    queryKey: ['animals', 'breeds', species],
    queryFn: () => AnimalService.getBreedsBySpecies(species),
    enabled: !!species,
    staleTime: 30 * 60 * 1000, // 30 minutes - breeds don't change often
  });
}

// Animal mutations
export function useAnimalMutations() {
  const queryClient = useQueryClient();

  // Create animal mutation
  const createAnimalMutation = useMutation({
    mutationFn: (animalData: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) =>
      AnimalService.createAnimal(animalData),
    onSuccess: (newAnimal) => {
      // Invalidate animals list
      queryClient.invalidateQueries({ queryKey: queryKeys.animals });
      // Add to cache
      queryClient.setQueryData(queryKeys.animal(newAnimal.id), newAnimal);
      // Update stats
      queryClient.invalidateQueries({ queryKey: ['animals', 'stats'] });
    },
    onError: (error) => {
      console.error('Create animal failed:', error);
    },
  });

  // Update animal mutation
  const updateAnimalMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Animal> }) =>
      AnimalService.updateAnimal(id, data),
    onSuccess: (updatedAnimal) => {
      // Update specific animal in cache
      queryClient.setQueryData(queryKeys.animal(updatedAnimal.id), updatedAnimal);
      // Invalidate animals list
      queryClient.invalidateQueries({ queryKey: queryKeys.animals });
      // Update stats if status changed
      if (updatedAnimal.status) {
        queryClient.invalidateQueries({ queryKey: ['animals', 'stats'] });
      }
    },
    onError: (error) => {
      console.error('Update animal failed:', error);
    },
  });

  // Delete animal mutation
  const deleteAnimalMutation = useMutation({
    mutationFn: (id: string) => AnimalService.deleteAnimal(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.animal(deletedId) });
      // Invalidate animals list
      queryClient.invalidateQueries({ queryKey: queryKeys.animals });
      // Update stats
      queryClient.invalidateQueries({ queryKey: ['animals', 'stats'] });
    },
    onError: (error) => {
      console.error('Delete animal failed:', error);
    },
  });

  // Upload photo mutation
  const uploadPhotoMutation = useMutation({
    mutationFn: ({ 
      animalId, 
      file, 
      caption, 
      isPrimary, 
      onProgress 
    }: {
      animalId: string;
      file: File;
      caption?: string;
      isPrimary?: boolean;
      onProgress?: (progressEvent: any) => void;
    }) => AnimalService.uploadAnimalPhoto(animalId, file, caption, isPrimary, onProgress),
    onSuccess: (newPhoto, variables) => {
      // Update animal in cache to include new photo
      const animalId = variables.animalId;
      queryClient.setQueryData(queryKeys.animal(animalId), (oldData: Animal | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          photos: [...oldData.photos, newPhoto],
        };
      });
    },
    onError: (error) => {
      console.error('Upload photo failed:', error);
    },
  });

  // Delete photo mutation
  const deletePhotoMutation = useMutation({
    mutationFn: ({ animalId, photoId }: { animalId: string; photoId: string }) =>
      AnimalService.deleteAnimalPhoto(animalId, photoId),
    onSuccess: (_, variables) => {
      // Update animal in cache to remove photo
      const { animalId, photoId } = variables;
      queryClient.setQueryData(queryKeys.animal(animalId), (oldData: Animal | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          photos: oldData.photos.filter(photo => photo.id !== photoId),
        };
      });
    },
    onError: (error) => {
      console.error('Delete photo failed:', error);
    },
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: string; notes?: string }) =>
      AnimalService.updateAnimalStatus(id, status, notes),
    onSuccess: (updatedAnimal) => {
      // Update animal in cache
      queryClient.setQueryData(queryKeys.animal(updatedAnimal.id), updatedAnimal);
      // Invalidate animals list
      queryClient.invalidateQueries({ queryKey: queryKeys.animals });
      // Update stats
      queryClient.invalidateQueries({ queryKey: ['animals', 'stats'] });
    },
    onError: (error) => {
      console.error('Update status failed:', error);
    },
  });

  // Transfer animal mutation
  const transferAnimalMutation = useMutation({
    mutationFn: ({ id, locationId, notes }: { id: string; locationId: string; notes?: string }) =>
      AnimalService.transferAnimal(id, locationId, notes),
    onSuccess: (updatedAnimal) => {
      // Update animal in cache
      queryClient.setQueryData(queryKeys.animal(updatedAnimal.id), updatedAnimal);
      // Invalidate animals list
      queryClient.invalidateQueries({ queryKey: queryKeys.animals });
    },
    onError: (error) => {
      console.error('Transfer animal failed:', error);
    },
  });

  // Bulk update mutation
  const bulkUpdateMutation = useMutation({
    mutationFn: ({ animalIds, updates }: { animalIds: string[]; updates: Partial<Animal> }) =>
      AnimalService.bulkUpdateAnimals(animalIds, updates),
    onSuccess: () => {
      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: queryKeys.animals });
      queryClient.invalidateQueries({ queryKey: ['animals', 'stats'] });
    },
    onError: (error) => {
      console.error('Bulk update failed:', error);
    },
  });

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: (animalIds: string[]) => AnimalService.bulkDeleteAnimals(animalIds),
    onSuccess: (_, deletedIds) => {
      // Remove from cache
      deletedIds.forEach(id => {
        queryClient.removeQueries({ queryKey: queryKeys.animal(id) });
      });
      // Invalidate animals list
      queryClient.invalidateQueries({ queryKey: queryKeys.animals });
      // Update stats
      queryClient.invalidateQueries({ queryKey: ['animals', 'stats'] });
    },
    onError: (error) => {
      console.error('Bulk delete failed:', error);
    },
  });

  return {
    // Create
    createAnimal: createAnimalMutation.mutate,
    createAnimalAsync: createAnimalMutation.mutateAsync,
    isCreating: createAnimalMutation.isPending,
    createError: createAnimalMutation.error,

    // Update
    updateAnimal: updateAnimalMutation.mutate,
    updateAnimalAsync: updateAnimalMutation.mutateAsync,
    isUpdating: updateAnimalMutation.isPending,
    updateError: updateAnimalMutation.error,

    // Delete
    deleteAnimal: deleteAnimalMutation.mutate,
    deleteAnimalAsync: deleteAnimalMutation.mutateAsync,
    isDeleting: deleteAnimalMutation.isPending,
    deleteError: deleteAnimalMutation.error,

    // Photos
    uploadPhoto: uploadPhotoMutation.mutate,
    uploadPhotoAsync: uploadPhotoMutation.mutateAsync,
    isUploadingPhoto: uploadPhotoMutation.isPending,
    uploadPhotoError: uploadPhotoMutation.error,

    deletePhoto: deletePhotoMutation.mutate,
    deletePhotoAsync: deletePhotoMutation.mutateAsync,
    isDeletingPhoto: deletePhotoMutation.isPending,
    deletePhotoError: deletePhotoMutation.error,

    // Status
    updateStatus: updateStatusMutation.mutate,
    updateStatusAsync: updateStatusMutation.mutateAsync,
    isUpdatingStatus: updateStatusMutation.isPending,
    updateStatusError: updateStatusMutation.error,

    // Transfer
    transferAnimal: transferAnimalMutation.mutate,
    transferAnimalAsync: transferAnimalMutation.mutateAsync,
    isTransferring: transferAnimalMutation.isPending,
    transferError: transferAnimalMutation.error,

    // Bulk operations
    bulkUpdate: bulkUpdateMutation.mutate,
    bulkUpdateAsync: bulkUpdateMutation.mutateAsync,
    isBulkUpdating: bulkUpdateMutation.isPending,
    bulkUpdateError: bulkUpdateMutation.error,

    bulkDelete: bulkDeleteMutation.mutate,
    bulkDeleteAsync: bulkDeleteMutation.mutateAsync,
    isBulkDeleting: bulkDeleteMutation.isPending,
    bulkDeleteError: bulkDeleteMutation.error,
  };
}

// Import/Export hooks
export function useAnimalImportExport() {
  const queryClient = useQueryClient();

  const importMutation = useMutation({
    mutationFn: ({ file, onProgress }: { file: File; onProgress?: (progressEvent: any) => void }) =>
      AnimalService.importAnimals(file, onProgress),
    onSuccess: () => {
      // Invalidate animals list and stats
      queryClient.invalidateQueries({ queryKey: queryKeys.animals });
      queryClient.invalidateQueries({ queryKey: ['animals', 'stats'] });
    },
    onError: (error) => {
      console.error('Import failed:', error);
    },
  });

  const exportMutation = useMutation({
    mutationFn: (params: {
      filters?: AnimalSearchFilters;
      format: 'csv' | 'excel' | 'pdf';
      includePhotos?: boolean;
    }) => AnimalService.exportAnimals(params),
    onError: (error) => {
      console.error('Export failed:', error);
    },
  });

  return {
    importAnimals: importMutation.mutate,
    importAnimalsAsync: importMutation.mutateAsync,
    isImporting: importMutation.isPending,
    importError: importMutation.error,
    importResult: importMutation.data,

    exportAnimals: exportMutation.mutate,
    exportAnimalsAsync: exportMutation.mutateAsync,
    isExporting: exportMutation.isPending,
    exportError: exportMutation.error,
    exportResult: exportMutation.data,
  };
}