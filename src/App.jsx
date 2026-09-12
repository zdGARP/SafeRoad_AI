import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { RiskMapPage } from './pages/RiskMapPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { CausesPage } from './pages/CausesPage';
import { PredictionPage } from './pages/PredictionPage';
import { VulnerabilityPage } from './pages/VulnerabilityPage';
import { InterventionsPage } from './pages/InterventionsPage';
import { ImpactSimulationPage } from './pages/ImpactSimulationPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Main Protected Application Layout Shell */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/risk-map" element={<RiskMapPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/causes" element={<CausesPage />} />
            <Route path="/prediction" element={<PredictionPage />} />
            <Route path="/vulnerability" element={<VulnerabilityPage />} />
            <Route path="/interventions" element={<InterventionsPage />} />
            <Route path="/impact-simulation" element={<ImpactSimulationPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
