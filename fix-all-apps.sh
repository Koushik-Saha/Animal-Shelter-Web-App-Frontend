#!/bin/bash

# Fix All Apps Script for Animal Shelter Management System

echo "🔧 Fixing all applications in the monorepo..."

# Array of app directories
APPS=("adoption" "medical" "volunteer" "admin")

# Base simplified package.json template
create_simple_package() {
    local app_name=$1
    local port=$2
    
    cat > "apps/$app_name/package.json" << EOF
{
  "name": "@shelter/$app_name",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev -p $port",
    "lint": "next lint",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.18",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@types/node": "20.14.2",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "typescript": "5.4.5"
  }
}
EOF
}

# Create simplified next.config.js
create_simple_next_config() {
    local app_name=$1
    
    cat > "apps/$app_name/next.config.js" << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: process.env.NODE_ENV === 'production',
  
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  
  env: {
    CUSTOM_KEY: '$app_name-value',
  },
}

module.exports = nextConfig
EOF
}

# Create basic index page
create_index_page() {
    local app_name=$1
    local port=$2
    local icon=$3
    local title=$4
    
    mkdir -p "apps/$app_name/src/pages"
    
    cat > "apps/$app_name/src/pages/index.tsx" << EOF
import React from 'react'
import Head from 'next/head'

export default function ${title}Home() {
  return (
    <>
      <Head>
        <title>$title - Animal Shelter</title>
        <meta name="description" content="$title module" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ 
        minHeight: '100vh', 
        padding: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '2rem',
            fontWeight: 'bold'
          }}>
            $icon $title
          </h1>
          
          <p style={{ 
            fontSize: '1.5rem', 
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            $title module for comprehensive animal shelter management
          </p>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '2rem',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{ marginBottom: '1rem' }}>✅ Module Ready</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              This $title module is part of the comprehensive Animal Shelter Management System.
              Ready for integration and feature development.
            </p>
          </div>

          <p style={{ marginTop: '2rem', opacity: 0.8 }}>
            Running on Port $port | Animal Shelter Management System
          </p>
        </div>
      </main>
    </>
  )
}
EOF
}

# Create tsconfig.json
create_tsconfig() {
    local app_name=$1
    
    cat > "apps/$app_name/tsconfig.json" << EOF
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
}

# Fix each app
echo "🏠 Fixing adoption app (port 3001)..."
create_simple_package "adoption" "3001"
create_simple_next_config "adoption"
create_index_page "adoption" "3001" "🏠" "Adoption Portal"
create_tsconfig "adoption"

echo "🏥 Fixing medical app (port 3002)..."
create_simple_package "medical" "3002"
create_simple_next_config "medical"
create_index_page "medical" "3002" "🏥" "Medical Records"
create_tsconfig "medical"

echo "👥 Fixing volunteer app (port 3003)..."
create_simple_package "volunteer" "3003"
create_simple_next_config "volunteer"
create_index_page "volunteer" "3003" "👥" "Volunteer Management"
create_tsconfig "volunteer"

echo "📊 Fixing admin app (port 3005)..."
create_simple_package "admin" "3005"
create_simple_next_config "admin"
create_index_page "admin" "3005" "📊" "Admin Dashboard"
create_tsconfig "admin"

# Clean node_modules for all apps
echo "🧹 Cleaning node_modules for all apps..."
for app in "${APPS[@]}"; do
    echo "Cleaning apps/$app..."
    rm -rf "apps/$app/node_modules"
    rm -f "apps/$app/package-lock.json"
done

echo "✅ All apps fixed! You can now run:"
echo "   npx turbo dev --filter=@shelter/shell    # Shell app only"
echo "   npx turbo dev                            # All apps"
echo ""
echo "Individual app URLs:"
echo "   Shell:     http://localhost:7007"
echo "   Adoption:  http://localhost:3001"
echo "   Medical:   http://localhost:3002"
echo "   Volunteer: http://localhost:3003"
echo "   Admin:     http://localhost:3005"