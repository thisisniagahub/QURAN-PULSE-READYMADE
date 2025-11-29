import React, { useState, useEffect } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BottomNav } from './BottomNav'
import { Header } from './Header'
import { useUserStore } from '@stores/useUserStore'

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = () => {
  const location = useLocation()
  const { profile } = useUserStore()
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Update time every minute for prayer time calculations
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute
    
    return () => clearInterval(timer)
  }, [])

  // Define routes that should show bottom navigation
  const showBottomNav = !location.pathname.includes('/tanya-ustaz') && 
                       !location.pathname.includes('/media/') && 
                       !location.pathname.includes('/admin')

  return (
    <div className="min-h-screen bg-brand-dark relative overflow-hidden">
      {/* Kufi Background Pattern */}
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-top opacity-40 mix-blend-soft-light pointer-events-none"
        style={{ backgroundImage: "url('/src/assets/bg/kufi-header.jpg')" }}
      />
      
      {/* Footer Pattern */}
      <div 
        className="fixed bottom-0 left-0 w-full h-32 bg-cover bg-bottom opacity-30 mix-blend-soft-light pointer-events-none"
        style={{ backgroundImage: "url('/src/assets/bg/kufi-footer.jpg')" }}
      />

      {/* Glassmorphism overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none z-[-1]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <Header />
        
        {/* Main content area with animation */}
        <motion.main 
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 pb-20 pt-4 px-4"
        >
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </motion.main>

        {/* Bottom Navigation - Only show on appropriate routes */}
        {showBottomNav && <BottomNav />}
      </div>
    </div>
  )
}