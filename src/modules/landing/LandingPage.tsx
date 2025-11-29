import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@shared/components/ui/BaseComponents'

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 z-[-1] opacity-30"
          style={{ 
            backgroundImage: "url('/src/assets/bg/kufi-splash.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block p-4 rounded-full bg-brand-primary/20 mb-8">
            <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">📖</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            QuranPulse
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The Ultimate AI-Powered Islamic SuperApp. From Iqra 1 to Khatam Quran with AI guidance and multimedia support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={() => navigate('/login')} 
              size="lg"
              className="px-8 py-4 text-lg"
            >
              Get Started
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/quran')}
              size="lg"
              className="px-8 py-4 text-lg"
            >
              Explore Quran
            </Button>
          </div>
          
          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-brand-surface backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="text-brand-primary text-3xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-white mb-2">Iqra Learning</h3>
              <p className="text-gray-400">Complete Iqra 1-6 with AI voice analysis</p>
            </div>
            
            <div className="bg-brand-surface backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="text-brand-primary text-3xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Ustaz</h3>
              <p className="text-gray-400">24/7 Islamic guidance with authentic sources</p>
            </div>
            
            <div className="bg-brand-surface backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="text-brand-primary text-3xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-white mb-2">Islamic Marketplace</h3>
              <p className="text-gray-400">Halal products and services for Muslims</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>© 2025 QuranPulse. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-6">
          <a href="#" className="hover:text-brand-primary">Terms</a>
          <a href="#" className="hover:text-brand-primary">Privacy</a>
          <a href="#" className="hover:text-brand-primary">Contact</a>
        </div>
      </footer>
    </div>
  )
}