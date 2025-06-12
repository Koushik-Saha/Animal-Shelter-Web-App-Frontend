import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

interface AnimatedButtonProps extends ButtonProps {
  animationType?: 'bounce' | 'scale' | 'glow' | 'pulse';
  glowColor?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  animationType = 'scale',
  glowColor,
  ...props
}) => {
  const [springs, api] = useSpring(() => ({
    scale: 1,
    rotate: 0,
    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
  }));

  const handleMouseEnter = () => {
    api.start({
      scale: animationType === 'scale' ? 1.05 : 1,
      rotate: animationType === 'bounce' ? 5 : 0,
      boxShadow: glowColor 
        ? `0px 8px 30px ${glowColor}40`
        : '0px 8px 40px rgba(0,0,0,0.2)',
    });
  };

  const handleMouseLeave = () => {
    api.start({
      scale: 1,
      rotate: 0,
      boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
    });
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  if (animationType === 'pulse') {
    return (
      <motion.div animate={pulseAnimation}>
        <Button
          {...props}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </Button>
      </motion.div>
    );
  }

  return (
    <animated.div style={springs}>
      <Button
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Button>
    </animated.div>
  );
};

export default AnimatedButton;