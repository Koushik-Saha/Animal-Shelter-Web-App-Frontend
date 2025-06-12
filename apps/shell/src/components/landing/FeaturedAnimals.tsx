import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FilterList, GridView, ViewList } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimalCard } from '@shelter/ui';
import { Animal } from '@shelter/types';

const mockAnimals: Animal[] = [
  {
    id: '1',
    name: 'Buddy',
    species: 'dog',
    breed: 'Golden Retriever',
    age: 2,
    gender: 'male',
    weight: 65,
    color: 'Golden',
    description: 'Buddy is a friendly and energetic dog who loves playing fetch and going on long walks. He\'s great with kids and other pets!',
    status: 'available',
    intakeDate: new Date('2024-01-15'),
    photos: ['/api/placeholder/400/300'],
    healthRecords: [],
    behaviorProfile: {
      temperament: ['Friendly', 'Energetic', 'Loyal'],
      energyLevel: 4,
      socialWithDogs: true,
      socialWithCats: true,
      socialWithKids: true,
      trainingLevel: 'basic',
    },
  },
  {
    id: '2',
    name: 'Luna',
    species: 'cat',
    breed: 'Siamese Mix',
    age: 1,
    gender: 'female',
    weight: 8,
    color: 'Gray and White',
    description: 'Luna is a gentle and affectionate cat who loves to cuddle. She\'s perfect for a quiet home and enjoys sunny windowsills.',
    status: 'available',
    intakeDate: new Date('2024-02-01'),
    photos: ['/api/placeholder/400/300'],
    healthRecords: [],
    behaviorProfile: {
      temperament: ['Gentle', 'Affectionate', 'Quiet'],
      energyLevel: 2,
      socialWithDogs: false,
      socialWithCats: true,
      socialWithKids: true,
      trainingLevel: 'none',
    },
  },
  {
    id: '3',
    name: 'Charlie',
    species: 'dog',
    breed: 'Beagle Mix',
    age: 3,
    gender: 'male',
    weight: 30,
    color: 'Brown and White',
    description: 'Charlie is a playful and curious dog with a nose for adventure. He loves exploring and would be perfect for an active family.',
    status: 'available',
    intakeDate: new Date('2024-01-20'),
    photos: ['/api/placeholder/400/300'],
    healthRecords: [],
    behaviorProfile: {
      temperament: ['Playful', 'Curious', 'Active'],
      energyLevel: 4,
      socialWithDogs: true,
      socialWithCats: false,
      socialWithKids: true,
      trainingLevel: 'intermediate',
    },
    isSponsored: true,
    sponsorshipGoal: 500,
    currentSponsorship: 320,
  },
  {
    id: '4',
    name: 'Whiskers',
    species: 'cat',
    breed: 'Maine Coon',
    age: 4,
    gender: 'male',
    weight: 15,
    color: 'Orange Tabby',
    description: 'Whiskers is a majestic Maine Coon with a gentle giant personality. He loves being brushed and sitting in laps.',
    status: 'foster',
    intakeDate: new Date('2024-01-10'),
    photos: ['/api/placeholder/400/300'],
    healthRecords: [],
    behaviorProfile: {
      temperament: ['Gentle', 'Calm', 'Loving'],
      energyLevel: 2,
      socialWithDogs: true,
      socialWithCats: true,
      socialWithKids: true,
      trainingLevel: 'none',
    },
  },
];

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Dogs', value: 'dog' },
  { label: 'Cats', value: 'cat' },
  { label: 'Available', value: 'available' },
  { label: 'Sponsored', value: 'sponsored' },
];

const FeaturedAnimals: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredAnimals = mockAnimals.filter((animal) => {
    switch (selectedFilter) {
      case 'dog':
      case 'cat':
        return animal.species === selectedFilter;
      case 'available':
        return animal.status === 'available';
      case 'sponsored':
        return animal.isSponsored;
      default:
        return true;
    }
  });

  const handleFavorite = (animalId: string) => {
    setFavorites(prev => 
      prev.includes(animalId) 
        ? prev.filter(id => id !== animalId)
        : [...prev, animalId]
    );
  };

  const handleShare = (animal: Animal) => {
    if (navigator.share) {
      navigator.share({
        title: `Meet ${animal.name}`,
        text: `${animal.name} is looking for a loving home!`,
        url: window.location.href,
      });
    }
  };

  const handleAdopt = (animal: Animal) => {
    // This would navigate to the adoption application
    console.log('Starting adoption process for', animal.name);
  };

  return (
    <Box>
      {/* Filter Controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {filters.map((filter, index) => (
            <motion.div
              key={filter.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Chip
                label={filter.label}
                onClick={() => setSelectedFilter(filter.value)}
                color={selectedFilter === filter.value ? 'primary' : 'default'}
                variant={selectedFilter === filter.value ? 'filled' : 'outlined'}
                sx={{
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            </motion.div>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant={viewMode === 'grid' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setViewMode('grid')}
            startIcon={<GridView />}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setViewMode('list')}
            startIcon={<ViewList />}
          >
            List
          </Button>
        </Box>
      </Box>

      {/* Animals Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Grid container spacing={3}>
            {filteredAnimals.map((animal, index) => (
              <Grid 
                item 
                xs={12} 
                sm={viewMode === 'grid' ? 6 : 12} 
                md={viewMode === 'grid' ? 4 : 12} 
                lg={viewMode === 'grid' ? 3 : 12}
                key={animal.id}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  whileHover={{ y: -5 }}
                >
                  <AnimalCard
                    animal={animal}
                    onFavorite={handleFavorite}
                    onShare={handleShare}
                    onAdopt={handleAdopt}
                    isFavorited={favorites.includes(animal.id)}
                    showAdoptButton={animal.status === 'available'}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </AnimatePresence>

      {/* No Results */}
      {filteredAnimals.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No animals found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your filters to see more animals.
            </Typography>
          </Box>
        </motion.div>
      )}

      {/* Load More Button */}
      {filteredAnimals.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
              }}
            >
              Load More Animals
            </Button>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default FeaturedAnimals;