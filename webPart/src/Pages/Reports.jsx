import React, { useState, useEffect } from 'react'
import { TrashIcon, EyeIcon } from '@heroicons/react/24/outline'

function Reports() {
  const [dashboardReports, setDashboardReports] = useState([])
  const [grievanceReports, setGrievanceReports] = useState([])
  const [forecastReports, setForecastReports] = useState([])

  useEffect(() => {
    const savedDashboardReports = JSON.parse(localStorage.getItem('dashboardReports') || '[]')
    const savedGrievanceReports = JSON.parse(localStorage.getItem('grievanceReports') || '[]')
    const savedForecastReports = JSON.parse(localStorage.getItem('forecastReports') || '[]')
    setDashboardReports(savedDashboardReports)
    setGrievanceReports(savedGrievanceReports)
    setForecastReports(savedForecastReports)
  }, [])

  const handleDelete = (reportId, type) => {
    switch (type) {
      case 'dashboard':
        const updatedDashboardReports = dashboardReports.filter(report => report.id !== reportId)
        setDashboardReports(updatedDashboardReports)
        localStorage.setItem('dashboardReports', JSON.stringify(updatedDashboardReports))
        break
      case 'grievance':
        const updatedGrievanceReports = grievanceReports.filter(report => report.id !== reportId)
        setGrievanceReports(updatedGrievanceReports)
        localStorage.setItem('grievanceReports', JSON.stringify(updatedGrievanceReports))
        break
      case 'forecast':
        const updatedForecastReports = forecastReports.filter(report => report.id !== reportId)
        setForecastReports(updatedForecastReports)
        localStorage.setItem('forecastReports', JSON.stringify(updatedForecastReports))
        break
    }
  }

  const ReportTable = ({ reports, title, type }) => (
    <div className="bg-white rounded-xl shadow-sm mb-8">
      <h2 className="text-xl font-semibold text-gray-900 p-6">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Export Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time Range
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.fileName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.exportDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.timeRange}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => window.open(`/reports/${report.fileName}`, '_blank')}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(report.id, type)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Exported Reports</h1>
        
        <ReportTable 
          reports={dashboardReports} 
          title="Dashboard Reports" 
          type="dashboard" 
        />
        
        <ReportTable 
          reports={grievanceReports} 
          title="Grievance Analysis Reports" 
          type="grievance" 
        />
        
        <ReportTable 
          reports={forecastReports} 
          title="Predictive Analysis Reports" 
          type="forecast" 
        />
      </div>
    </div>
  )
}

export default Reports
