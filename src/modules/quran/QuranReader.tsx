import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, BookOpen, Volume2, Bookmark, MessageSquare, Filter, Grid3X3, List } from 'lucide-react'
import { Button, Card } from '@shared/components/ui/BaseComponents'
import { useQuery } from '@tanstack/react-query'

interface QuranReaderProps {}

export const QuranReader: React.FC<QuranReaderProps> = () => {
  const navigate = useNavigate()
  const { surahId, verseId } = useParams()
  
  // Mock data for Surah list
  const [surahs, setSurahs] = useState<any[]>([])
  
  // View mode: list or grid
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  
  // Search functionality
  const [searchQuery, setSearchQuery] = useState('')
  
  // Mock data for Surahs
  useEffect(() => {
    // In a real app, this would come from an API
    const mockSurahs = Array.from({ length: 114 }, (_, i) => ({
      id: i + 1,
      name: `Surah ${i + 1}`,
      arabicName: ['سُورَةُ ٱلْفَاتِحَةِ', 'سُورَةُ البَقَرَةِ', 'سُورَةُ آلِ عِمْرَانَ', 'سُورَةُ النِّسَاءِ', 'سُورَةُ المَائـِدَةِ', 'سُورَةُ الأَنْعَامِ', 'سُورَةُ الأَعْرَافِ', 'سُورَةُ التَّوْبَةِ', 'سُورَةُ يُونُسَ', 'سُورَةُ هُودٍ', 'سُورَةُ يُوسُفَ', 'سُورَةُ الرَّعْدِ', 'سُورَةُ إِبْرَاهِيمَ', 'سُورَةُ الحِجْرِ', 'سُورَةُ النَّحْلِ', 'سُورَةُ الإِسْرَاءِ', 'سُورَةُ الكَهْفِ', 'سُورَةُ مَرْيَمَ', 'سُورَةُ طه', 'سُورَةُ الأَنْبِيَاءِ'][i] || `سُورَةُ ${i + 1}`,
      translation: ['Al-Fatihah', 'Al-Baqarah', 'Ali Imran', 'An-Nisa', 'Al-Ma\'idah', 'Al-An\'am', 'Al-A\'raf', 'At-Taubah', 'Yunus', 'Hud', 'Yusuf', 'Ar-Ra\'d', 'Ibrahim', 'Al-Hijr', 'An-Nahl', 'Al-Isra', 'Al-Kahf', 'Maryam', 'Ta-Ha', 'Al-Anbiya'][i] || `Surah ${i + 1}`,
      verseCount: Math.floor(Math.random() * 280) + 20,
      revelationPlace: i % 2 === 0 ? 'Makkah' : 'Medina',
      revelationOrder: i + 1
    }))
    
    setSurahs(mockSurahs)
  }, [])

  // Filter surahs based on search
  const filteredSurahs = surahs.filter(surah => 
    surah.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.arabicName.includes(searchQuery)
  )

  // Handle surah selection
  const handleSurahSelect = (id: number) => {
    navigate(`/quran/${id}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-brand-primary" />
          Al-Quran
        </h2>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode('grid')}>
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewMode('list')}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search surah by name or meaning..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-brand-surface backdrop-blur-lg border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
        />
      </div>

      {/* Surah List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Surah List</h3>
        
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredSurahs.map((surah) => (
              <motion.div
                key={surah.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-4 rounded-xl bg-brand-surface backdrop-blur-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => handleSurahSelect(surah.id)}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mr-4">
                    <span className="text-brand-primary font-bold">{surah.id}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{surah.translation}</h4>
                    <p className="text-gray-400 text-sm">{surah.arabicName}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-gray-300">{surah.verseCount} verses</p>
                  <p className="text-xs text-gray-500">{surah.revelationPlace}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSurahs.map((surah) => (
              <motion.div
                key={surah.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl bg-brand-surface backdrop-blur-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors text-center"
                onClick={() => handleSurahSelect(surah.id)}
              >
                <div className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-brand-primary font-bold text-lg">{surah.id}</span>
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{surah.translation}</h4>
                <p className="text-gray-400 text-xs mb-2">{surah.arabicName}</p>
                <p className="text-xs text-gray-500">{surah.verseCount} verses</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* If a surah is selected, render the surah reader */}
      {surahId && (
        <SurahReader surahId={parseInt(surahId)} />
      )}
    </div>
  )
}

interface SurahReaderProps {
  surahId: number
}

const SurahReader: React.FC<SurahReaderProps> = ({ surahId }) => {
  const navigate = useNavigate()
  
  // Mock data for verses
  const [verses, setVerses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate API call to get verses
    const mockVerses = Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      text: `هَٰذَا بَلَاغٌ لِّلنَّاسِ وَهُدًى وَذِكْرَىٰ لِلْمُتَّقِينَ ${i + 1}`,
      translation: `This is a message for mankind, and guidance and reminder for the God-fearing ${i + 1}`,
      transliteration: `Hatha balaghun linnasi wa hudan wa dhikra lil muttaqina ${i + 1}`
    }))
    
    setTimeout(() => {
      setVerses(mockVerses)
      setIsLoading(false)
    }, 500)
  }, [surahId])
  
  if (isLoading) {
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
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/quran')}
          className="text-brand-primary hover:underline flex items-center"
        >
          ← Back to Surah List
        </button>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Volume2 className="w-4 h-4 mr-1" /> Audio
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="w-4 h-4 mr-1" /> Bookmark
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-1" /> Tafsir
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {verses.map((verse) => (
          <motion.div
            key={verse.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-brand-surface backdrop-blur-lg border border-white/10"
          >
            <div className="quran-text text-center mb-6">
              {verse.text}
            </div>
            
            <div className="text-gray-300 mb-2 italic">
              {verse.translation}
            </div>
            
            <div className="text-gray-500 text-sm mb-4">
              {verse.transliteration}
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Verse {verse.id}</span>
              <span className="bg-brand-primary/20 px-2 py-1 rounded text-xs">
                Surah {surahId}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}