import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { useUserStore } from '@stores/useUserStore'

interface SupabaseContextType {
  supabase: typeof supabase
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false)
  const { fetchProfile, logout } = useUserStore()

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        await fetchProfile()
      }
      setInitialized(true)
    }

    checkSession()

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          await fetchProfile()
        } else if (event === 'SIGNED_OUT') {
          await logout()
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchProfile, logout])

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <div className="pulse-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}