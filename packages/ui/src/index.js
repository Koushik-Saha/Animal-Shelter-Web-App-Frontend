// Simple JavaScript exports to avoid TypeScript build complexity
// This allows the workspace to function without complex DTS compilation

// For now, we'll provide simple placeholders that apps can use
export const AnimatedButton = () => {
  console.log('AnimatedButton component loaded from @shelter/ui')
  return null
}

export const AnimalCard = () => {
  console.log('AnimalCard component loaded from @shelter/ui')
  return null
}

export const theme = {
  palette: {
    primary: { main: '#2E7D32' },
    secondary: { main: '#FF6B35' },
  }
}

export const lightTheme = theme
export const darkTheme = theme
