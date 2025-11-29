import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useUserStore } from '@stores/useUserStore'
import { MainLayout } from '@shared/components/layout/MainLayout'
import { LandingPage } from '@modules/landing/LandingPage'
import { LoginPage } from '@modules/auth/LoginPage'
import { Dashboard } from '@modules/dashboard/Dashboard'
import { QuranReader } from '@modules/quran/QuranReader'
import { IqraLearning } from '@modules/iqra/IqraLearning'
import { AiHub } from '@modules/ai-hub/AiHub'
import { MultimediaHub } from '@modules/multimedia/MultimediaHub'
import { IbadahToolkit } from '@modules/ibadah/IbadahToolkit'
import { Gamification } from '@modules/gamification/Gamification'
import { Marketplace } from '@modules/souq/Marketplace'
import { FamilyHub } from '@modules/family/FamilyHub'
import { AdminPanel } from '@modules/admin/AdminPanel'
import { InfaqHub } from '@modules/infaq/InfaqHub'

function App() {
  const { isAuthenticated } = useUserStore()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Routes */}
      {isAuthenticated && (
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/quran/*" element={<QuranReader />} />
          <Route path="/iqra/*" element={<IqraLearning />} />
          <Route path="/tanya-ustaz" element={<AiHub />} />
          <Route path="/media/*" element={<MultimediaHub />} />
          <Route path="/ibadah" element={<IbadahToolkit />} />
          <Route path="/community" element={<Gamification />} />
          <Route path="/souq" element={<Marketplace />} />
          <Route path="/family" element={<FamilyHub />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/infaq" element={<InfaqHub />} />
        </Route>
      )}
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/"} />} />
    </Routes>
  )
}

export default App