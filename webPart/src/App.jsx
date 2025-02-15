import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import GrievanceAnalytics from './pages/GrievanceAnalytics'
import TrendAnalysis from './pages/TrendAnalysis'
import PredictiveInsights from './pages/PredictiveInsights'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import FileComplaint from './pages/FileComplaint'
import JalBoardComplaint from './pages/JalBoardComplaint'
import ElectricityComplaint from './pages/ElectricityComplaint'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected routes */}
      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/file-complaint" element={<FileComplaint />} />
        <Route path="/file-complaint/jal-board" element={<JalBoardComplaint />} />
        <Route path="/file-complaint/electricity" element={<ElectricityComplaint />} />
        <Route path="/analytics" element={<GrievanceAnalytics />} />
        <Route path="/trends" element={<TrendAnalysis />} />
        <Route path="/insights" element={<PredictiveInsights />} />
      </Route>

      {/* Redirect all other routes to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App 