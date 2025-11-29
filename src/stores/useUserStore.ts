import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@lib/supabaseClient'

interface UserState {
  user: any | null
  profile: any | null
  isAuthenticated: boolean
  isLoading: boolean
  xp: number
  currentLevel: string
  subscriptionTier: string
  fiqhPreference: string
  fetchProfile: () => Promise<void>
  updateProfile: (data: any) => Promise<void>
  logout: () => Promise<void>
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isAuthenticated: false,
      isLoading: true,
      xp: 0,
      currentLevel: 'Bronze',
      subscriptionTier: 'free',
      fiqhPreference: 'shafii',

      fetchProfile: async () => {
        set({ isLoading: true })
        try {
          const { data: { user } } = await supabase.auth.getUser()
          if (user) {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single()
            
            if (error) throw error
            
            set({ 
              user, 
              profile, 
              isAuthenticated: true,
              xp: profile?.xp_total || 0,
              currentLevel: profile?.current_level || 'Bronze',
              subscriptionTier: profile?.subscription_tier || 'free',
              fiqhPreference: profile?.fiqh_preference || 'shafii'
            })
          }
        } catch (error) {
          console.error('Error fetching profile:', error)
          set({ user: null, profile: null, isAuthenticated: false })
        } finally {
          set({ isLoading: false })
        }
      },

      updateProfile: async (data) => {
        const { user } = get()
        if (!user) return
        
        try {
          const { error } = await supabase
            .from('profiles')
            .update(data)
            .eq('id', user.id)
          
          if (error) throw error
          
          // Update local state
          set({ profile: { ...get().profile, ...data } })
        } catch (error) {
          console.error('Error updating profile:', error)
        }
      },

      logout: async () => {
        await supabase.auth.signOut()
        set({ 
          user: null, 
          profile: null, 
          isAuthenticated: false, 
          xp: 0, 
          currentLevel: 'Bronze',
          subscriptionTier: 'free',
          fiqhPreference: 'shafii'
        })
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        xp: state.xp,
        currentLevel: state.currentLevel,
        subscriptionTier: state.subscriptionTier,
        fiqhPreference: state.fiqhPreference
      })
    }
  )
)