import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Box,
  Badge,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Share,
  Pets,
  Male,
  Female,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Animal } from '@shelter/types';
import AnimatedButton from './AnimatedButton';

interface AnimalCardProps {
  animal: Animal;
  onFavorite?: (animalId: string) => void;
  onShare?: (animal: Animal) => void;
  onAdopt?: (animal: Animal) => void;
  isFavorited?: boolean;
  showAdoptButton?: boolean;
}

const AnimalCard: React.FC<AnimalCardProps> = ({
  animal,
  onFavorite,
  onShare,
  onAdopt,
  isFavorited = false,
  showAdoptButton = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [favoriteClicked, setFavoriteClicked] = useState(false);

  const cardSpring = useSpring({
    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0px) scale(1)',
    boxShadow: isHovered
      ? '0 20px 40px rgba(0,0,0,0.15)'
      : '0 4px 20px rgba(0,0,0,0.1)',
  });

  const handleFavorite = () => {
    setFavoriteClicked(true);
    setTimeout(() => setFavoriteClicked(false), 300);
    onFavorite?.(animal.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'adopted': return 'default';
      case 'foster': return 'warning';
      case 'medical': return 'error';
      default: return 'default';
    }
  };

  const getAgeText = (age: number) => {
    if (age < 1) return `${Math.round(age * 12)} months`;
    return `${age} ${age === 1 ? 'year' : 'years'}`;
  };

  return (
    <animated.div style={cardSpring}>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{ 
          maxWidth: 400, 
          position: 'relative',
          overflow: 'visible',
          borderRadius: 3,
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="250"
            image={animal.photos[0] || '/placeholder-animal.jpg'}
            alt={animal.name}
            sx={{ borderRadius: '12px 12px 0 0' }}
          />
          
          {/* Status Badge */}
          <Chip
            label={animal.status.charAt(0).toUpperCase() + animal.status.slice(1)}
            color={getStatusColor(animal.status) as any}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              fontWeight: 600,
            }}
          />

          {/* Sponsored Badge */}
          {animal.isSponsored && (
            <Chip
              label="Sponsored"
              color="secondary"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                fontWeight: 600,
              }}
            />
          )}

          {/* Favorite Button */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
            }}
            animate={favoriteClicked ? { scale: [1, 1.5, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <IconButton
              onClick={handleFavorite}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,1)',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <AnimatePresence mode="wait">
                {isFavorited ? (
                  <motion.div
                    key="favorited"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Favorite color="error" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="not-favorited"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <FavoriteBorder />
                  </motion.div>
                )}
              </AnimatePresence>
            </IconButton>
          </motion.div>
        </Box>

        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography variant="h6" component="h2" fontWeight={700}>
              {animal.name}
            </Typography>
            {animal.gender === 'male' ? (
              <Male color="primary" fontSize="small" />
            ) : (
              <Female color="secondary" fontSize="small" />
            )}
          </Box>

          <Typography color="text.secondary" gutterBottom>
            {animal.breed} • {getAgeText(animal.age)} • {animal.weight} lbs
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 2,
          }}>
            {animal.description}
          </Typography>

          {/* Temperament Tags */}
          <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
            {animal.behaviorProfile.temperament.slice(0, 3).map((trait, index) => (
              <Chip
                key={index}
                label={trait}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Box>
            <IconButton onClick={() => onShare?.(animal)} size="small">
              <Share />
            </IconButton>
          </Box>
          
          {showAdoptButton && animal.status === 'available' && (
            <AnimatedButton
              variant="contained"
              size="small"
              onClick={() => onAdopt?.(animal)}
              animationType="glow"
              glowColor="#4CAF50"
              startIcon={<Pets />}
            >
              Adopt Me
            </AnimatedButton>
          )}
        </CardActions>

        {/* Sponsorship Progress */}
        {animal.isSponsored && animal.sponsorshipGoal && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Sponsorship Progress
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 6,
                backgroundColor: 'grey.300',
                borderRadius: 3,
                overflow: 'hidden',
                mt: 0.5,
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  backgroundColor: '#FF6B35',
                  borderRadius: 3,
                }}
                initial={{ width: 0 }}
                animate={{
                  width: `${((animal.currentSponsorship || 0) / animal.sponsorshipGoal) * 100}%`
                }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              ${animal.currentSponsorship || 0} / ${animal.sponsorshipGoal}
            </Typography>
          </Box>
        )}
      </Card>
    </animated.div>
  );
};

export default AnimalCard;