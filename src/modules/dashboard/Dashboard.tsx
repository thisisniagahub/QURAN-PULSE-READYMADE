import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, BookOpen, Volume2, Users, TrendingUp, Award, Calendar, Star } from 'lucide-react'
import { Card } from '@shared/components/ui/BaseComponents'
import { useUserStore } from '@stores/useUserStore'
import { getPrayerTimes } from '@utils/prayerTimes'

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const { profile, xp, currentLevel } = useUserStore()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [prayerTimes, setPrayerTimes] = useState<any>(null)
  const [nextPrayer, setNextPrayer] = useState<any>(null)

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    // Get prayer times for current location
    getPrayerTimes().then(setPrayerTimes)

    return () => clearInterval(timer)
  }, [])

  // Calculate next prayer
  useEffect(() => {
    if (prayerTimes) {
      const now = currentTime
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      
      // Find next prayer time
      const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']
      for (const prayer of prayers) {
        if (timeStr < prayerTimes[prayer]) {
          setNextPrayer({ name: prayer, time: prayerTimes[prayer] })
          break
        }
      }
    }
  }, [prayerTimes, currentTime])

  // Sample data for dashboard cards
  const quickActions = [
    { name: 'Continue Iqra', icon: BookOpen, path: '/iqra', color: 'from-blue-500 to-blue-600' },
    { name: 'Read Quran', icon: Volume2, path: '/quran', color: 'from-green-500 to-green-600' },
    { name: 'Tanya Ustaz', icon: Users, path: '/tanya-ustaz', color: 'from-purple-500 to-purple-600' },
    { name: 'Prayer Times', icon: Clock, path: '/ibadah', color: 'from-amber-500 to-amber-600' },
  ]

  const recentActivity = [
    { id: 1, title: 'Completed Iqra Lesson 3.2', time: '2 hours ago', type: 'learning' },
    { id: 2, title: 'Prayed Dhuhr', time: '3 hours ago', type: 'ibadah' },
    { id: 3, title: 'Read Surah Al-Fatihah', time: '5 hours ago', type: 'quran' },
    { id: 4, title: 'Earned new badge', time: '1 day ago', type: 'achievement' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-2xl p-6 text-white"
      >
        <h2 className="text-2xl font-bold mb-2">
          Assalamualaikum, {profile?.username || 'User'}!
        </h2>
        <p className="text-gray-300 mb-4">
          Continue your journey from where you left off
        </p>
        
        {/* Daily Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-primary">{xp}</div>
            <div className="text-sm text-gray-400">XP Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-secondary">{currentLevel}</div>
            <div className="text-sm text-gray-400">Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">7</div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 cursor-pointer hover:bg-white/10 transition-colors group">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">{action.name}</h3>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Next Prayer Card */}
      {nextPrayer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-amber-400" />
                  Next Prayer: {nextPrayer.name.charAt(0).toUpperCase() + nextPrayer.name.slice(1)}
                </h3>
                <p className="text-2xl font-bold text-amber-400 mt-1">{nextPrayer.time}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-300">Remaining</div>
                <div className="text-xl font-bold text-white">1h 24m</div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-brand-primary" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center mr-3">
                {activity.type === 'learning' && <BookOpen className="w-5 h-5 text-brand-primary" />}
                {activity.type === 'ibadah' && <Clock className="w-5 h-5 text-green-400" />}
                {activity.type === 'quran' && <Volume2 className="w-5 h-5 text-blue-400" />}
                {activity.type === 'achievement' && <Award className="w-5 h-5 text-yellow-400" />}
              </div>
              <div className="flex-1">
                <p className="text-white">{activity.title}</p>
                <p className="text-sm text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Daily Ayah */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-brand-secondary" />
          Ayat of the Day
        </h3>
        <Card className="p-5">
          <div className="quran-text mb-4 text-center">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <p className="text-gray-300 text-center italic mb-4">
            "In the name of Allah, the Entirely Merciful, the Especially Merciful."
          </p>
          <p className="text-sm text-gray-500 text-center">
            Surah Al-Fatihah, Verse 1
          </p>
        </Card>
      </motion.div>
    </div>
  )
}