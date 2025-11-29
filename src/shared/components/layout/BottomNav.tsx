import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, BookOpen, Mosque, Users, ShoppingCart, User, MessageCircle, Music, Settings } from 'lucide-react'
import { useUserStore } from '@stores/useUserStore'
import { cn } from '@utils/cn'

interface BottomNavProps {}

export const BottomNav: React.FC<BottomNavProps> = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { profile } = useUserStore()
  
  const navItems = [
    {
      name: 'Home',
      path: '/home',
      icon: Home,
    },
    {
      name: 'Quran',
      path: '/quran',
      icon: BookOpen,
    },
    {
      name: 'Ibadah',
      path: '/ibadah',
      icon: Mosque,
    },
    {
      name: 'Community',
      path: '/community',
      icon: Users,
    },
    {
      name: 'Souq',
      path: '/souq',
      icon: ShoppingCart,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User,
    }
  ]

  const isActive = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/home' || location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-brand-surface backdrop-blur-lg border-t border-white/10">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-lg transition-colors',
                active 
                  ? 'text-brand-primary' 
                  : 'text-gray-400 hover:text-white'
              )}
              aria-label={item.name}
            >
              <Icon 
                className={cn(
                  'w-6 h-6',
                  active ? 'text-brand-primary' : 'text-gray-400'
                )} 
              />
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const location = useLocation()
  const { profile, logout } = useUserStore()
  const navigate = useNavigate()
  
  // Determine header title based on current route
  const getHeaderTitle = () => {
    if (location.pathname.startsWith('/quran')) return 'Al-Quran'
    if (location.pathname.startsWith('/iqra')) return 'Iqra Learning'
    if (location.pathname.startsWith('/tanya-ustaz')) return 'Tanya Ustaz'
    if (location.pathname.startsWith('/media')) return 'Multimedia'
    if (location.pathname.startsWith('/ibadah')) return 'Ibadah Toolkit'
    if (location.pathname.startsWith('/souq')) return 'The Souq'
    if (location.pathname.startsWith('/family')) return 'Family Hub'
    if (location.pathname.startsWith('/admin')) return 'Admin Panel'
    if (location.pathname.startsWith('/infaq')) return 'Infaq'
    if (location.pathname.startsWith('/profile')) return 'Profile'
    if (location.pathname.startsWith('/settings')) return 'Settings'
    return 'QuranPulse'
  }

  return (
    <header className="sticky top-0 z-50 bg-brand-surface backdrop-blur-lg border-b border-white/10 px-4 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-brand-primary">{getHeaderTitle()}</h1>
        
        <div className="flex items-center space-x-3">
          {/* Notification Bell */}
          <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
              <span className="text-sm font-medium text-black">
                {profile?.username ? profile.username.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            
            <button 
              onClick={logout}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}