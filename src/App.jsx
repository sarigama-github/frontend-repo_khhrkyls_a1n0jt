import React from 'react'
import Hero from './components/Hero'
import WorkCycle from './components/WorkCycle'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <WorkCycle />
      <Footer />
    </div>
  )
}
