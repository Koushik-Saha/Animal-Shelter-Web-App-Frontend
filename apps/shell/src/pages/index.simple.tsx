import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Animal Shelter Management System</title>
        <meta name="description" content="Enterprise-grade Animal Shelter Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ 
        minHeight: '100vh', 
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '2rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            🐾 Animal Shelter Management System
          </h1>
          
          <p style={{ 
            fontSize: '1.5rem', 
            marginBottom: '3rem',
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            Enterprise-grade platform for comprehensive animal shelter operations
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            <FeatureCard 
              icon="🏠"
              title="Adoption Portal"
              description="Advanced matching algorithm for successful adoptions"
            />
            <FeatureCard 
              icon="🏥"
              title="Medical Records"
              description="Comprehensive health tracking and veterinary management"
            />
            <FeatureCard 
              icon="👥"
              title="Volunteer Management" 
              description="Gamified volunteer portal with skill tracking"
            />
            <FeatureCard 
              icon="📊"
              title="Analytics Dashboard"
              description="Real-time metrics and performance insights"
            />
            <FeatureCard 
              icon="🚚"
              title="Transport Tracking"
              description="GPS-enabled fleet management and routing"
            />
            <FeatureCard 
              icon="🎯"
              title="Behavior Module"
              description="Animal enrichment and behavior tracking"
            />
          </div>

          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
              🧪 Comprehensive Testing Suite Complete
            </h2>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                ✅ Unit Tests: 6+ component test suites<br/>
                ✅ E2E Tests: Complete user journey validation<br/>
                ✅ PWA Features: Offline support & service workers<br/>
                ✅ Web3 Integration: Blockchain donations & NFT rewards<br/>
                ✅ Real-time Tracking: GPS fleet management<br/>
                ✅ Advanced Analytics: 22 core features implemented
              </p>
            </div>
          </div>

          <footer style={{ marginTop: '4rem', opacity: 0.8, fontSize: '1rem' }}>
            <p>🚀 Enterprise Animal Shelter Management System - Built with Next.js & TypeScript</p>
            <p>📍 Running on Port 7007</p>
          </footer>
        </div>
      </main>
    </>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      padding: '2rem',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{title}</h3>
      <p style={{ opacity: 0.9, lineHeight: 1.5 }}>{description}</p>
    </div>
  )
}