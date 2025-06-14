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

          {/* Navigation Sections */}
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
              🧭 Explore All Features
            </h2>
            
            {/* Core Animal Management */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                🐾 Animal Management
              </h3>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <NavigationButton 
                  href="/animals"
                  gradient="linear-gradient(45deg, #4CAF50, #FF6B35)"
                  emoji="🐾"
                  text="View All Animals"
                />
                <NavigationButton 
                  href="/behavior"
                  gradient="linear-gradient(45deg, #9C27B0, #E91E63)"
                  emoji="🧠"
                  text="Animal Behavior"
                />
              </div>
            </div>

            {/* Adoption & Care */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                🏠 Adoption & Care
              </h3>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <NavigationButton 
                  href="http://localhost:3001"
                  gradient="linear-gradient(45deg, #2196F3, #9C27B0)"
                  emoji="🏠"
                  text="Adoption Portal"
                />
                <NavigationButton 
                  href="/sponsorship"
                  gradient="linear-gradient(45deg, #FF5722, #795548)"
                  emoji="💝"
                  text="Sponsorship"
                />
              </div>
            </div>

            {/* Medical & Health */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                🏥 Medical & Health
              </h3>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <NavigationButton 
                  href="http://localhost:3002"
                  gradient="linear-gradient(45deg, #f44336, #E91E63)"
                  emoji="🏥"
                  text="Medical Records"
                />
              </div>
            </div>

            {/* Volunteer & Community */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                🤝 Volunteer & Community
              </h3>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <NavigationButton 
                  href="http://localhost:3003"
                  gradient="linear-gradient(45deg, #FF9800, #F44336)"
                  emoji="🤝"
                  text="Volunteer Portal"
                />
              </div>
            </div>

            {/* Operations & Logistics */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                🚚 Operations & Logistics
              </h3>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <NavigationButton 
                  href="/transport"
                  gradient="linear-gradient(45deg, #607D8B, #455A64)"
                  emoji="🚚"
                  text="Transport Tracking"
                />
                <NavigationButton 
                  href="/reporting"
                  gradient="linear-gradient(45deg, #795548, #5D4037)"
                  emoji="📋"
                  text="Incident Reporting"
                />
              </div>
            </div>

            {/* Technology & Innovation */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                💎 Technology & Innovation
              </h3>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <NavigationButton 
                  href="/web3"
                  gradient="linear-gradient(45deg, #6B46C1, #8B5CF6)"
                  emoji="💎"
                  text="Web3 Donations"
                />
              </div>
            </div>

            {/* Administration */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                ⚙️ Administration
              </h3>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <NavigationButton 
                  href="http://localhost:3005"
                  gradient="linear-gradient(45deg, #424242, #616161)"
                  emoji="⚙️"
                  text="Admin Dashboard"
                />
                <NavigationButton 
                  href="/legal"
                  gradient="linear-gradient(45deg, #37474F, #546E7A)"
                  emoji="⚖️"
                  text="Legal & Compliance"
                />
              </div>
            </div>

            {/* Special Features */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.9)' }}>
                ✨ Special Features
              </h3>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <NavigationButton 
                  href="/offline"
                  gradient="linear-gradient(45deg, #9E9E9E, #757575)"
                  emoji="📱"
                  text="PWA Offline Mode"
                />
              </div>
            </div>

            {/* Quick Access Panel */}
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '2rem', 
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              marginTop: '3rem'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                🎯 Quick Access Panel
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <QuickAccessCard 
                  title="All Applications"
                  description="5 separate micro-frontend apps"
                  items={[
                    { name: "Shell (Main)", port: "7007", url: "/" },
                    { name: "Adoption", port: "3001", url: "http://localhost:3001" },
                    { name: "Medical", port: "3002", url: "http://localhost:3002" },
                    { name: "Volunteer", port: "3003", url: "http://localhost:3003" },
                    { name: "Admin", port: "3005", url: "http://localhost:3005" }
                  ]}
                />
                
                <QuickAccessCard 
                  title="Core Features"
                  description="Main functionality pages"
                  items={[
                    { name: "Animals", url: "/animals" },
                    { name: "Behavior Tracking", url: "/behavior" },
                    { name: "Transport GPS", url: "/transport" },
                    { name: "Web3 Donations", url: "/web3" },
                    { name: "Sponsorship", url: "/sponsorship" }
                  ]}
                />
                
                <QuickAccessCard 
                  title="Administration"
                  description="Management & compliance"
                  items={[
                    { name: "Admin Dashboard", url: "http://localhost:3005" },
                    { name: "Legal Compliance", url: "/legal" },
                    { name: "Incident Reports", url: "/reporting" },
                    { name: "PWA Features", url: "/offline" }
                  ]}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
              🚀 API Integration Complete
            </h2>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                ✅ Complete API Integration with React Query<br/>
                ✅ Authentication & Authorization System<br/>
                ✅ Animal Management with CRUD Operations<br/>
                ✅ Adoption Process API Integration<br/>
                ✅ Real-time Data Caching & Optimization<br/>
                ✅ Comprehensive Error Handling & Loading States<br/>
                ✅ Type-safe API Services & React Hooks<br/>
                ✅ Role-based Access Control
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

// Navigation Button Component
interface NavigationButtonProps {
  href: string;
  gradient: string;
  emoji: string;
  text: string;
}

function NavigationButton({ href, gradient, emoji, text }: NavigationButtonProps) {
  return (
    <button 
      onClick={() => window.location.href = href}
      style={{
        background: gradient,
        border: 'none',
        color: 'white',
        padding: '1rem 1.5rem',
        fontSize: '1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        minWidth: '180px',
        justifyContent: 'center'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <span style={{ fontSize: '1.2rem' }}>{emoji}</span>
      {text}
    </button>
  );
}

// Quick Access Card Component
interface QuickAccessCardProps {
  title: string;
  description: string;
  items: Array<{
    name: string;
    url: string;
    port?: string;
  }>;
}

function QuickAccessCard({ title, description, items }: QuickAccessCardProps) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h4 style={{ 
        fontSize: '1.2rem', 
        fontWeight: 'bold', 
        marginBottom: '0.5rem',
        color: 'white'
      }}>
        {title}
      </h4>
      <p style={{ 
        fontSize: '0.9rem', 
        color: 'rgba(255,255,255,0.7)', 
        marginBottom: '1rem' 
      }}>
        {description}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => window.location.href = item.url}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              padding: '0.5rem 0.75rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              textAlign: 'left',
              transition: 'background 0.2s ease',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <span>{item.name}</span>
            {item.port && (
              <span style={{ 
                fontSize: '0.8rem', 
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'monospace'
              }}>
                :{item.port}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}