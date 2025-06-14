import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { useAnimals, useAnimalMutations, useFeaturedAnimals } from '@shelter/utils/hooks/useAnimals';
import { useAuthContext, AuthGuard } from '../../contexts/AuthContext';
import type { AnimalSearchFilters, Animal } from '@shelter/types';

export default function AnimalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<AnimalSearchFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);

  // API hooks
  const { data: animalsData, isLoading, isError, error } = useAnimals({
    query: searchQuery,
    filters,
    page: currentPage,
    limit: 12,
  });

  const { data: featuredAnimals } = useFeaturedAnimals(6);
  const { updateStatus, isUpdatingStatus } = useAnimalMutations();

  // Memoized animals data
  const animals = useMemo(() => animalsData?.data || [], [animalsData]);
  const pagination = useMemo(() => animalsData?.pagination, [animalsData]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<AnimalSearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  // Handle status update
  const handleStatusUpdate = (animalId: string, status: string) => {
    updateStatus({ id: animalId, status });
  };

  // Handle bulk selection
  const handleSelectAnimal = (animalId: string) => {
    setSelectedAnimals(prev => 
      prev.includes(animalId) 
        ? prev.filter(id => id !== animalId)
        : [...prev, animalId]
    );
  };

  const handleSelectAll = () => {
    setSelectedAnimals(
      selectedAnimals.length === animals.length 
        ? [] 
        : animals.map(animal => animal.id)
    );
  };

  return (
    <>
      <Head>
        <title>Animals - Animal Shelter Management</title>
        <meta name="description" content="Manage animals in the shelter system" />
      </Head>

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            background: 'linear-gradient(45deg, #4CAF50, #FF6B35)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            🐾 Animal Management
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Manage animals in the shelter system
          </p>
        </div>

        {/* Featured Animals Section */}
        {featuredAnimals && featuredAnimals.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#333' }}>
              ⭐ Featured Animals
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {featuredAnimals.map(animal => (
                <AnimalCard 
                  key={animal.id} 
                  animal={animal} 
                  onStatusUpdate={handleStatusUpdate}
                  isUpdating={isUpdatingStatus}
                />
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <SearchAndFilters 
            searchQuery={searchQuery}
            filters={filters}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Bulk Actions */}
        <AuthGuard requiredRoles={['admin', 'staff']}>
          {selectedAnimals.length > 0 && (
            <div style={{ 
              background: '#e3f2fd', 
              padding: '1rem', 
              borderRadius: '8px', 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span>{selectedAnimals.length} animals selected</span>
              <button style={{
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Bulk Update Status
              </button>
              <button style={{
                background: '#f44336',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Bulk Delete
              </button>
            </div>
          )}
        </AuthGuard>

        {/* Animals Grid */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ 
              fontSize: '1.2rem', 
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              🔄 Loading animals...
            </div>
          </div>
        ) : isError ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            background: '#ffebee',
            borderRadius: '8px',
            color: '#c62828'
          }}>
            <h3>Error loading animals</h3>
            <p>{error?.message || 'Something went wrong'}</p>
            <button style={{
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}>
              Try Again
            </button>
          </div>
        ) : animals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🐕</div>
            <h3>No animals found</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              {searchQuery || Object.keys(filters).length > 0 
                ? 'Try adjusting your search criteria' 
                : 'No animals in the system yet'}
            </p>
            <AuthGuard requiredRoles={['admin', 'staff']}>
              <button style={{
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}>
                Add New Animal
              </button>
            </AuthGuard>
          </div>
        ) : (
          <>
            {/* Results header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '1rem' 
            }}>
              <div style={{ color: '#666' }}>
                Showing {animals.length} of {pagination?.total || 0} animals
              </div>
              <AuthGuard requiredRoles={['admin', 'staff']}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input 
                      type="checkbox"
                      checked={selectedAnimals.length === animals.length}
                      onChange={handleSelectAll}
                    />
                    Select All
                  </label>
                </div>
              </AuthGuard>
            </div>

            {/* Animals grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {animals.map(animal => (
                <AnimalCard 
                  key={animal.id} 
                  animal={animal} 
                  onStatusUpdate={handleStatusUpdate}
                  isUpdating={isUpdatingStatus}
                  isSelected={selectedAnimals.includes(animal.id)}
                  onSelect={() => handleSelectAnimal(animal.id)}
                  showSelection={true}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

// Animal Card Component
interface AnimalCardProps {
  animal: Animal;
  onStatusUpdate: (id: string, status: string) => void;
  isUpdating: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  showSelection?: boolean;
}

function AnimalCard({ 
  animal, 
  onStatusUpdate, 
  isUpdating, 
  isSelected, 
  onSelect, 
  showSelection 
}: AnimalCardProps) {
  const primaryPhoto = animal.photos?.find(p => p.isPrimary) || animal.photos?.[0];
  const { hasAnyRole } = useAuthContext();
  const canManage = hasAnyRole(['admin', 'staff']);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#4CAF50';
      case 'adopted': return '#2196F3';
      case 'pending': return '#FF9800';
      case 'medical': return '#f44336';
      case 'foster': return '#9C27B0';
      default: return '#666';
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      border: isSelected ? '2px solid #4CAF50' : '2px solid transparent',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }}>
      {/* Selection checkbox */}
      {showSelection && canManage && (
        <div style={{ 
          position: 'absolute', 
          top: '8px', 
          left: '8px', 
          zIndex: 10,
          background: 'white',
          borderRadius: '4px',
          padding: '4px'
        }}>
          <input 
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
          />
        </div>
      )}

      {/* Photo */}
      <div style={{ 
        height: '200px', 
        backgroundImage: primaryPhoto 
          ? `url(${primaryPhoto.url})` 
          : 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {!primaryPhoto && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '3rem',
            opacity: 0.5
          }}>
            📷
          </div>
        )}
        
        {/* Status badge */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: getStatusColor(animal.status),
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>
          {animal.status}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1rem' }}>
        <h3 style={{ 
          fontSize: '1.2rem', 
          fontWeight: 'bold', 
          marginBottom: '0.5rem',
          color: '#333'
        }}>
          {animal.name}
        </h3>
        
        <div style={{ marginBottom: '0.5rem', color: '#666' }}>
          <span>{animal.species} • {animal.breed}</span>
        </div>
        
        <div style={{ marginBottom: '0.5rem', color: '#666' }}>
          <span>{animal.age} years old • {animal.gender}</span>
        </div>

        {animal.description && (
          <p style={{ 
            color: '#666', 
            fontSize: '0.9rem', 
            marginBottom: '1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {animal.description}
          </p>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button style={{
            background: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            flex: 1
          }}>
            View Details
          </button>
          
          <AuthGuard requiredRoles={['admin', 'staff']}>
            <select 
              value={animal.status}
              onChange={(e) => onStatusUpdate(animal.id, e.target.value)}
              disabled={isUpdating}
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '0.9rem'
              }}
            >
              <option value="available">Available</option>
              <option value="adopted">Adopted</option>
              <option value="pending">Pending</option>
              <option value="medical">Medical</option>
              <option value="foster">Foster</option>
              <option value="hold">Hold</option>
            </select>
          </AuthGuard>
        </div>
      </div>
    </div>
  );
}

// Search and Filters Component
interface SearchAndFiltersProps {
  searchQuery: string;
  filters: AnimalSearchFilters;
  onSearch: (query: string) => void;
  onFilterChange: (filters: Partial<AnimalSearchFilters>) => void;
}

function SearchAndFilters({ searchQuery, filters, onSearch, onFilterChange }: SearchAndFiltersProps) {
  return (
    <div>
      <h3 style={{ marginBottom: '1rem', color: '#333' }}>Search & Filters</h3>
      
      {/* Search bar */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search animals by name, breed, or description..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            border: '2px solid #ddd',
            borderRadius: '8px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem' 
      }}>
        {/* Species filter */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Species
          </label>
          <select
            value={filters.species?.[0] || ''}
            onChange={(e) => onFilterChange({ 
              species: e.target.value ? [e.target.value as any] : undefined 
            })}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '6px'
            }}
          >
            <option value="">All Species</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rabbit">Rabbit</option>
            <option value="bird">Bird</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Status filter */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Status
          </label>
          <select
            value={filters.status?.[0] || ''}
            onChange={(e) => onFilterChange({ 
              status: e.target.value ? [e.target.value as any] : undefined 
            })}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '6px'
            }}
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="adopted">Adopted</option>
            <option value="pending">Pending</option>
            <option value="medical">Medical</option>
            <option value="foster">Foster</option>
          </select>
        </div>

        {/* Age range */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Age Range
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="number"
              placeholder="Min"
              min="0"
              value={filters.ageRange?.min || ''}
              onChange={(e) => onFilterChange({
                ageRange: {
                  ...filters.ageRange,
                  min: e.target.value ? parseInt(e.target.value) : undefined
                } as any
              })}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '6px'
              }}
            />
            <input
              type="number"
              placeholder="Max"
              min="0"
              value={filters.ageRange?.max || ''}
              onChange={(e) => onFilterChange({
                ageRange: {
                  ...filters.ageRange,
                  max: e.target.value ? parseInt(e.target.value) : undefined
                } as any
              })}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '6px'
              }}
            />
          </div>
        </div>

        {/* Special attributes */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Special Attributes
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={filters.goodWithKids || false}
                onChange={(e) => onFilterChange({ goodWithKids: e.target.checked || undefined })}
              />
              Good with Kids
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={filters.goodWithAnimals || false}
                onChange={(e) => onFilterChange({ goodWithAnimals: e.target.checked || undefined })}
              />
              Good with Animals
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={filters.specialNeeds || false}
                onChange={(e) => onFilterChange({ specialNeeds: e.target.checked || undefined })}
              />
              Special Needs
            </label>
          </div>
        </div>
      </div>

      {/* Clear filters */}
      {(searchQuery || Object.keys(filters).length > 0) && (
        <button
          onClick={() => {
            onSearch('');
            onFilterChange({});
          }}
          style={{
            marginTop: '1rem',
            background: '#f44336',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: '0.5rem',
      marginTop: '2rem'
    }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '0.5rem 1rem',
          border: '1px solid #ddd',
          borderRadius: '6px',
          background: currentPage === 1 ? '#f5f5f5' : 'white',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
        }}
      >
        Previous
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ddd',
            borderRadius: '6px',
            background: page === currentPage ? '#4CAF50' : 'white',
            color: page === currentPage ? 'white' : '#333',
            cursor: 'pointer'
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '0.5rem 1rem',
          border: '1px solid #ddd',
          borderRadius: '6px',
          background: currentPage === totalPages ? '#f5f5f5' : 'white',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
        }}
      >
        Next
      </button>
    </div>
  );
}