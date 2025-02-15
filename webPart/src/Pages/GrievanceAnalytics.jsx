import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, PolarArea } from 'react-chartjs-2'
import { MapPinIcon, TagIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Margin, usePDF } from 'react-to-pdf'
import { useRef } from 'react'

function GrievanceAnalytics() {
  // Add usePDF hook at the top of the component
  const { toPDF, targetRef } = usePDF({
    filename: 'grievance-analytics-report.pdf',
    page: { 
      margin: Margin.MEDIUM,
      format: 'A4',
      orientation: 'portrait'
    },
    canvas: {
      useCORS: true,
      logging: true,
      scale: 2
    },
    font: {
      family: 'Inter',
      size: 12,
      style: 'normal'
    }
  });

  // Add handleExport function
  const handleExport = async () => {
    try {
      setTimeout(async () => {
        await toPDF();
        
        const currentDate = new Date().toLocaleString();
        const fileName = `grievance-analytics-report-${Date.now()}.pdf`;
        
        // Store only the raw data without chart configuration
        const reportData = {
          categories: {
            labels: categoryData.labels,
            values: categoryData.datasets[0].data
          },
          sentiment: {
            labels: sentimentData.labels,
            values: sentimentData.datasets[0].data
          },
          regions: regions.map(region => ({
            name: region.name,
            count: region.count,
            trend: region.trend,
            hotspots: region.hotspots
          })),
          insights: insights.map(insight => ({
            title: insight.title,
            description: insight.description
          }))
        };

        // Save report metadata to localStorage
        const reports = JSON.parse(localStorage.getItem('grievanceReports') || '[]');
        reports.push({
          id: Date.now(),
          fileName,
          exportDate: currentDate,
          type: 'Grievance Analytics',
          data: reportData
        });
        localStorage.setItem('grievanceReports', JSON.stringify(reports));
      }, 500);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const categoryData = {
    labels: ['Infrastructure', 'Education', 'Healthcare', 'Sanitation', 'Public Services', 'Transportation'],
    datasets: [{
      label: 'Grievances by Category',
      data: [4500, 3200, 2800, 2600, 2200, 1800],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)'
      ]
    }]
  }

  const sentimentData = {
    labels: ['Urgent', 'Critical', 'Moderate', 'Low Priority'],
    datasets: [{
      data: [30, 20, 35, 15],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 205, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)'
      ]
    }]
  }

  const regions = [
    { name: 'Lucknow', count: 4256, trend: '+12%', hotspots: 3 },
    { name: 'Kanpur', count: 3845, trend: '+8%', hotspots: 2 },
    { name: 'Varanasi', count: 3542, trend: '-5%', hotspots: 4 },
    { name: 'Agra', count: 3124, trend: '+15%', hotspots: 2 },
    { name: 'Prayagraj', count: 2987, trend: '+3%', hotspots: 1 }
  ]

  const insights = [
    {
      icon: <MapPinIcon className="w-8 h-8" />,
      title: "Geographic Hotspots",
      description: "3 new emerging hotspots identified in Lucknow district requiring immediate attention."
    },
    {
      icon: <TagIcon className="w-8 h-8" />,
      title: "Category Insights",
      description: "Infrastructure-related grievances show 23% increase in urban areas over last quarter."
    },
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: "Resolution Patterns",
      description: "Average resolution time improved by 15% through AI-assisted categorization."
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: "Citizen Engagement",
      description: "Citizen satisfaction increased by 18% with new feedback system implementation."
    }
  ]

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    layout: {
      padding: 20
    },
    height: 300
  }

  return (
    <div className="container mx-auto h-full" ref={targetRef}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Grievance Analytics</h1>
          <p className="text-gray-600 mt-1">AI-Powered Insights and Analysis</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
            Filter
          </button>
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">

            <div className="text-yellow-500 mb-4">{insight.icon}</div>
            <h3 className="font-semibold text-gray-800 mb-2">{insight.title}</h3>
            <p className="text-sm text-gray-600">{insight.description}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>

          <div style={{ height: '300px', maxHeight: '300px', position: 'relative' }}>
            <Bar data={categoryData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Sentiment Analysis</h3>
          <div style={{ height: '300px', maxHeight: '300px', position: 'relative' }}>
            <PolarArea data={sentimentData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Regional Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Regional Analysis</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3">Region</th>
                  <th className="pb-3">Total Grievances</th>
                  <th className="pb-3">Trend</th>
                  <th className="pb-3">Active Hotspots</th>
                  <th className="pb-3">Action Required</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((region, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-4 font-medium">{region.name}</td>
                    <td className="py-4">{region.count}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        region.trend.startsWith('+') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {region.trend}
                      </span>
                    </td>
                    <td className="py-4">{region.hotspots}</td>
                    <td className="py-4">
                      <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GrievanceAnalytics