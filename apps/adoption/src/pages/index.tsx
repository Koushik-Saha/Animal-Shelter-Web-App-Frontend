import React from 'react'
import Head from 'next/head'

export default function AdoptionPortalHome() {
  return (
    <>
      <Head>
        <title>Adoption Portal - Animal Shelter</title>
        <meta name="description" content="Adoption Portal module" />
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
            🏠 Adoption Portal
          </h1>
          
          <p style={{ 
            fontSize: '1.5rem', 
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Adoption Portal module for comprehensive animal shelter management
          </p>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '2rem',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{ marginBottom: '1rem' }}>✅ Module Ready</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              This Adoption Portal module is part of the comprehensive Animal Shelter Management System.
              Ready for integration and feature development.
            </p>
          </div>

          <p style={{ marginTop: '2rem', opacity: 0.8 }}>
            Running on Port 3001 | Animal Shelter Management System
          </p>
        </div>
      </main>
    </>
  )
}
