import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Badge,
  Paper,
  Avatar,
} from '@mui/material';
import {
  FilterList,
  Favorite,
  FavoriteBorder,
  Share,
  Close,
  Star,
  LocationOn,
  Cake,
  Scale,
  Pets,
} from '@mui/icons-material';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import TinderCard from 'react-tinder-card';
import { Animal, AdoptionPreferences } from '@shelter/types';

// Mock data - in real app this would come from API
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
    photos: ['/api/placeholder/400/600', '/api/placeholder/400/600'],
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
    photos: ['/api/placeholder/400/600'],
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
];

interface AdoptionBrowserProps {
  showFilters?: boolean;
  onAnimalSelect?: (animal: Animal) => void;
}

const AdoptionBrowser: React.FC<AdoptionBrowserProps> = ({
  showFilters = true,
  onAnimalSelect,
}) => {
  const [currentIndex, setCurrentIndex] = useState(mockAnimals.length - 1);
  const [lastDirection, setLastDirection] = useState<string>();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [likedAnimals, setLikedAnimals] = useState<string[]>([]);
  const [rejectedAnimals, setRejectedAnimals] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    species: 'all',
    ageRange: [0, 10],
    energyLevel: [1, 5],
    size: 'all',
    goodWithKids: false,
    goodWithPets: false,
  });

  const childRefs = useMemo(
    () =>
      Array(mockAnimals.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
  };

  const canGoBack = currentIndex < mockAnimals.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    
    if (direction === 'right') {
      setLikedAnimals(prev => [...prev, nameToDelete]);
    } else if (direction === 'left') {
      setRejectedAnimals(prev => [...prev, nameToDelete]);
    }
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`);
    if (currentIndex >= idx) {
      childRefs[idx].current.restoreCard();
    }
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < mockAnimals.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const getCompatibilityScore = (animal: Animal): number => {
    // Simple compatibility algorithm
    let score = 80; // Base score
    
    if (filters.goodWithKids && animal.behaviorProfile.socialWithKids) score += 10;
    if (filters.goodWithPets && (animal.behaviorProfile.socialWithDogs || animal.behaviorProfile.socialWithCats)) score += 10;
    
    return Math.min(score, 100);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          Find Your Perfect Match
        </Typography>
        
        {showFilters && (
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => setFiltersOpen(true)}
          >
            Filters
          </Button>
        )}
      </Box>

      <Grid container spacing={4}>
        {/* Swipe Cards */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              position: 'relative',
              height: 600,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {mockAnimals.map((animal, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={animal.name}
                onSwipe={(dir) => swiped(dir, animal.id, index)}
                onCardLeftScreen={() => outOfFrame(animal.name, index)}
                preventSwipe={['up', 'down']}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    maxWidth: 400,
                    height: 580,
                    borderRadius: 20,
                    backgroundImage: `url(${animal.photos[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'grab',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ cursor: 'grabbing' }}
                >
                  {/* Gradient Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '60%',
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      borderRadius: '0 0 20px 20px',
                    }}
                  />

                  {/* Compatibility Score */}
                  <Chip
                    icon={<Star />}
                    label={`${getCompatibilityScore(animal)}% Match`}
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      fontWeight: 600,
                      zIndex: 2,
                    }}
                  />

                  {/* Animal Info */}
                  <Box sx={{ p: 3, color: 'white', position: 'relative', zIndex: 1 }}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      {animal.name}, {animal.age}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Pets fontSize="small" />
                      <Typography variant="body1">
                        {animal.breed} • {animal.weight} lbs
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2,
                        opacity: 0.9,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {animal.description}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {animal.behaviorProfile.temperament.slice(0, 3).map((trait) => (
                        <Chip
                          key={trait}
                          label={trait}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontSize: '0.7rem',
                          }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {animal.behaviorProfile.socialWithKids && (
                          <Chip label="Good with kids" size="small" color="success" />
                        )}
                        {animal.behaviorProfile.socialWithDogs && (
                          <Chip label="Dog friendly" size="small" color="info" />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </TinderCard>
            ))}

            {/* No more cards */}
            {currentIndex < 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  No more animals to show!
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  You've seen all available animals. Check back later for new arrivals!
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    setCurrentIndex(mockAnimals.length - 1);
                    setLikedAnimals([]);
                    setRejectedAnimals([]);
                  }}
                >
                  Start Over
                </Button>
              </motion.div>
            )}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                size="large"
                onClick={() => swipe('left')}
                disabled={!canSwipe}
                sx={{
                  bgcolor: 'error.light',
                  color: 'white',
                  width: 60,
                  height: 60,
                  '&:hover': {
                    bgcolor: 'error.main',
                  },
                }}
              >
                <Close />
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                size="large"
                onClick={goBack}
                disabled={!canGoBack}
                sx={{
                  bgcolor: 'warning.light',
                  color: 'white',
                  width: 50,
                  height: 50,
                  '&:hover': {
                    bgcolor: 'warning.main',
                  },
                }}
              >
                ↶
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                size="large"
                onClick={() => swipe('right')}
                disabled={!canSwipe}
                sx={{
                  bgcolor: 'success.light',
                  color: 'white',
                  width: 60,
                  height: 60,
                  '&:hover': {
                    bgcolor: 'success.main',
                  },
                }}
              >
                <Favorite />
              </IconButton>
            </motion.div>
          </Box>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Matches
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {likedAnimals.map((animalId) => {
                const animal = mockAnimals.find(a => a.id === animalId);
                return animal ? (
                  <Avatar
                    key={animalId}
                    src={animal.photos[0]}
                    alt={animal.name}
                    sx={{ width: 50, height: 50 }}
                  />
                ) : null;
              })}
              {likedAnimals.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  Start swiping to see your matches!
                </Typography>
              )}
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Tips
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="Swipe Right"
                  secondary="If you're interested in the animal"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Swipe Left"
                  secondary="If you want to pass"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Check Compatibility"
                  secondary="Look for the match percentage"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Filters Drawer */}
      <Drawer
        anchor="right"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        PaperProps={{
          sx: { width: 320, p: 3 },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Filter Animals
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Species</InputLabel>
          <Select
            value={filters.species}
            label="Species"
            onChange={(e) => setFilters(prev => ({ ...prev, species: e.target.value }))}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="dog">Dogs</MenuItem>
            <MenuItem value="cat">Cats</MenuItem>
            <MenuItem value="rabbit">Rabbits</MenuItem>
          </Select>
        </FormControl>

        <Typography gutterBottom>Age Range</Typography>
        <Slider
          value={filters.ageRange}
          onChange={(_, value) => setFilters(prev => ({ ...prev, ageRange: value as number[] }))}
          valueLabelDisplay="auto"
          min={0}
          max={15}
          sx={{ mb: 3 }}
        />

        <Typography gutterBottom>Energy Level</Typography>
        <Slider
          value={filters.energyLevel}
          onChange={(_, value) => setFilters(prev => ({ ...prev, energyLevel: value as number[] }))}
          valueLabelDisplay="auto"
          min={1}
          max={5}
          sx={{ mb: 3 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={filters.goodWithKids}
              onChange={(e) => setFilters(prev => ({ ...prev, goodWithKids: e.target.checked }))}
            />
          }
          label="Good with children"
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={filters.goodWithPets}
              onChange={(e) => setFilters(prev => ({ ...prev, goodWithPets: e.target.checked }))}
            />
          }
          label="Good with other pets"
        />

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setFilters({
                species: 'all',
                ageRange: [0, 10],
                energyLevel: [1, 5],
                size: 'all',
                goodWithKids: false,
                goodWithPets: false,
              });
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={() => setFiltersOpen(false)}
            sx={{ flex: 1 }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </Container>
  );
};

export default AdoptionBrowser;