import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Volume2, Mic, CheckCircle, XCircle, RotateCcw, ArrowRight, Trophy, Star } from 'lucide-react'
import { Button, Card, Alert } from '@shared/components/ui/BaseComponents'
import { useUserStore } from '@stores/useUserStore'
import { useQuery } from '@tanstack/react-query'

interface IqraLearningProps {}

export const IqraLearning: React.FC<IqraLearningProps> = () => {
  const navigate = useNavigate()
  const { volumeId, pageId } = useParams()
  const { profile, updateProfile } = useUserStore()
  
  // Mock Iqra data
  const [iqraData, setIqraData] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  
  // Mock data for Iqra levels
  const iqraLevels = [
    { id: 1, title: 'Iqra 1', description: 'Basic letters and sounds', pages: 28 },
    { id: 2, title: 'Iqra 2', description: 'Letter combinations', pages: 32 },
    { id: 3, title: 'Iqra 3', description: 'Simple words', pages: 36 },
    { id: 4, title: 'Iqra 4', description: 'Sentences', pages: 40 },
    { id: 5, title: 'Iqra 5', description: 'Short paragraphs', pages: 44 },
    { id: 6, title: 'Iqra 6', description: 'Reading fluency', pages: 48 },
  ]
  
  // Mock page content
  const mockPageContent = {
    1: {
      title: 'Alif, Ba, Ta',
      content: 'ا ب ت',
      pronunciation: ['alif', 'ba', 'ta'],
      example: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      meaning: 'In the name of Allah, the Most Gracious, the Most Merciful',
      instruction: 'Practice the correct pronunciation of each letter'
    }
  }
  
  useEffect(() => {
    if (volumeId) {
      // Simulate API call to get Iqra data
      setTimeout(() => {
        setIqraData(mockPageContent)
        setIsLoading(false)
      }, 500)
    } else {
      setIsLoading(false)
    }
  }, [volumeId])
  
  // Handle page navigation
  const handleNextPage = () => {
    if (volumeId && pageId) {
      const currentPg = parseInt(pageId)
      const volId = parseInt(volumeId)
      const totalPages = iqraLevels.find(l => l.id === volId)?.pages || 1
      
      if (currentPg < totalPages) {
        navigate(`/iqra/${volId}/${currentPg + 1}`)
      }
    }
  }
  
  const handlePrevPage = () => {
    if (volumeId && pageId && parseInt(pageId) > 1) {
      const currentPg = parseInt(pageId)
      navigate(`/iqra/${volumeId}/${currentPg - 1}`)
    }
  }
  
  // Mock voice recording function
  const handleRecordVoice = () => {
    // In a real app, this would activate the microphone and analyze pronunciation
    console.log('Starting voice recording...')
  }
  
  // Mock AI feedback function
  const getVoiceFeedback = () => {
    // Simulate AI feedback
    return {
      accuracy: Math.floor(Math.random() * 40) + 60, // 60-99%
      feedback: 'Good pronunciation! Pay attention to the ending sound.',
      suggestions: ['Practice with more emphasis', 'Slow down on complex sounds']
    }
  }
  
  // Handle level selection
  const handleLevelSelect = (levelId: number) => {
    navigate(`/iqra/${levelId}/1`)
  }
  
  if (!volumeId) {
    // Level selection screen
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-brand-primary" />
          Iqra Learning
        </h2>
        
        <p className="text-gray-300">
          Start your Quranic reading journey from the beginning with structured Iqra lessons
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {iqraLevels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="p-6 cursor-pointer hover:bg-white/10 transition-colors text-center"
                onClick={() => handleLevelSelect(level.id)}
              >
                <div className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-brand-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{level.title}</h3>
                <p className="text-gray-400 mb-4">{level.description}</p>
                
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{level.pages} pages</span>
                  <span>{level.id}/6</span>
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  Start Learning
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }
  
  if (isLoading || !iqraData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="pulse-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
  
  // Page content for specific Iqra lesson
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/iqra')}
          className="text-brand-primary hover:underline flex items-center"
        >
          ← Back to Levels
        </button>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">
            Page {pageId} of {iqraLevels.find(l => l.id === parseInt(volumeId!))?.pages || 1}
          </span>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="text-white">Level {volumeId}</span>
          </div>
        </div>
      </div>
      
      {/* Lesson Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-6">
          {iqraData[currentPage]?.title || `Lesson ${volumeId}.${pageId}`}
        </h3>
        
        <div className="quran-text text-6xl mb-8">
          {iqraData[currentPage]?.content || 'ا ب ت'}
        </div>
        
        <div className="text-xl text-gray-300 mb-4">
          {iqraData[currentPage]?.example || 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'}
        </div>
        
        <div className="text-gray-400 italic mb-6">
          {iqraData[currentPage]?.meaning || 'In the name of Allah, the Most Gracious, the Most Merciful'}
        </div>
        
        <p className="text-gray-500">
          {iqraData[currentPage]?.instruction || 'Practice the correct pronunciation of each letter'}
        </p>
      </motion.div>
      
      {/* Pronunciation Practice */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Volume2 className="w-5 h-5 mr-2 text-brand-primary" />
          Pronunciation Practice
        </h4>
        
        <div className="space-y-4">
          <p className="text-gray-300">
            Record your voice to practice pronunciation:
          </p>
          
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={handleRecordVoice}
              className="flex items-center"
            >
              <Mic className="w-5 h-5 mr-2" />
              Record Voice
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            {iqraData[currentPage]?.pronunciation?.map((word: string, index: number) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-brand-primary mb-2">{word}</div>
                <div className="text-sm text-gray-400">Letter {index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      
      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          onClick={handlePrevPage}
          disabled={parseInt(pageId!) <= 1}
          variant="outline"
        >
          ← Previous
        </Button>
        
        <Button 
          onClick={handleNextPage}
          className="flex items-center"
        >
          Next →
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}