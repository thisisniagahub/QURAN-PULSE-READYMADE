import { create } from 'zustand'
import { supabase } from '@lib/supabaseClient'

interface AudioState {
  currentTrack: {
    url: string
    title: string
    type: string
  } | null
  isPlaying: boolean
  progress: number
  queue: any[]
  play: (track: { url: string; title: string; type: string }) => void
  pause: () => void
  stop: () => void
  addToQueue: (track: any) => void
}

export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  queue: [],

  play: (track) => {
    set({ currentTrack: track, isPlaying: true })
  },

  pause: () => {
    set({ isPlaying: false })
  },

  stop: () => {
    set({ currentTrack: null, isPlaying: false, progress: 0 })
  },

  addToQueue: (track) => {
    set((state) => ({ queue: [...state.queue, track] }))
  }
}))

interface SettingsState {
  theme: 'nur' | 'layl' | 'system'
  quranFontScale: number
  translationLang: 'ms' | 'en' | 'ar'
  notificationEnabled: boolean
  toggleTheme: () => void
  updateFontScale: (scale: number) => void
  updateTranslationLang: (lang: 'ms' | 'en' | 'ar') => void
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: 'layl',
  quranFontScale: 1,
  translationLang: 'ms',
  notificationEnabled: true,

  toggleTheme: () => {
    set((state) => ({ 
      theme: state.theme === 'nur' ? 'layl' : 'nur' 
    }))
  },

  updateFontScale: (scale) => {
    set({ quranFontScale: scale })
  },

  updateTranslationLang: (lang) => {
    set({ translationLang: lang })
  }
}))

interface UIState {
  activeModal: string | null
  isLoading: boolean
  showLoader: boolean
  toggleModal: (modalName: string | null) => void
  setLoading: (loading: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  activeModal: null,
  isLoading: false,
  showLoader: false,

  toggleModal: (modalName) => set({ activeModal: modalName }),
  setLoading: (loading) => set({ isLoading: loading })
}))

interface InfaqState {
  monthlyTarget: number
  currentCollection: number
  recentDonors: any[]
  fetchTransparencyData: () => Promise<void>
}

export const useInfaqStore = create<InfaqState>((set) => ({
  monthlyTarget: 500,
  currentCollection: 350,
  recentDonors: [],

  fetchTransparencyData: async () => {
    // Implementation will fetch from transparency_reports table
    const { data, error } = await supabase
      .from('transparency_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
    
    if (data && data[0]) {
      set({
        monthlyTarget: data[0].total_expenses,
        currentCollection: data[0].total_collected,
      })
    }
  }
}))