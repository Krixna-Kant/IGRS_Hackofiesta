import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Bubble } from 'react-chartjs-2'
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, SparklesIcon, ChartBarIcon } from '@heroicons/react/24/outline'

function TrendAnalysis() {
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Actual Grievances',
        data: [3200, 3500, 3800, 3600, 3900, 4200, 4500, 4300, 4600],
        borderColor: 'rgba(255, 159, 64, 0.8)',
        backgroundColor: 'rgba(255, 159, 64, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Predicted Trend',
        data: [3200, 3500, 3800, 3600, 3900, 4200, 4500, 4800, 5100],
        borderColor: 'rgba(153, 102, 255, 0.8)',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  }

  const correlationData = {
    datasets: [{
      label: 'Category Correlation',
      data: [
        { x: 2, y: 5, r: 15 },
        { x: 4, y: 3, r: 10 },
        { x: 6, y: 8, r: 20 },
        { x: 8, y: 4, r: 12 },
        { x: 3, y: 7, r: 18 }
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)'
      ]
    }]
  }

  const trendInsights = [
    {
      icon: <ArrowTrendingUpIcon className="w-8 h-8" />,
      title: "Rising Trends",
      categories: ["Infrastructure", "Healthcare"],
      change: "+23%",
      description: "Significant increase in infrastructure-related grievances in urban areas"
    },
    {
      icon: <ArrowTrendingDownIcon className="w-8 h-8" />,
      title: "Declining Issues",
      categories: ["Education", "Transportation"],
      change: "-15%",
      description: "Notable improvement in education-related grievances"
    },
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: "AI Predictions",
      categories: ["Sanitation", "Public Services"],
      change: "+8%",
      description: "Expected increase in sanitation issues during monsoon season"
    },
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      title: "Pattern Analysis",
      categories: ["Multiple"],
      change: "Variable",
      description: "Seasonal patterns detected in multiple categories"
    }
  ]

  const seasonalPatterns = [
    {
      season: "Summer",
      topIssues: ["Water Supply", "Power Outages"],
      prediction: "High",
      impact: "Severe",
      recommendations: "Preventive maintenance of water infrastructure"
    },
    {
      season: "Monsoon",
      topIssues: ["Drainage", "Road Damage"],
      prediction: "Very High",
      impact: "Critical",
      recommendations: "Pre-monsoon drain cleaning"
    },
    {
      season: "Winter",
      topIssues: ["Air Quality", "Healthcare"],
      prediction: "Moderate",
      impact: "Significant",
      recommendations: "Air quality monitoring systems"
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
    scales: {
      x: {
        grid: {
          display: true
        }
      },
      y: {
        grid: {
          display: true
        },
        beginAtZero: true
      }
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Trend Analysis</h1>
          <p className="text-gray-600 mt-1">Historical Patterns and Predictions</p>
        </div>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border rounded-lg bg-white">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 6 months</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendInsights.map((insight, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-yellow-500 mb-4">{insight.icon}</div>
            <h3 className="font-semibold text-gray-800 mb-2">{insight.title}</h3>
            <div className="flex items-center space-x-2 mb-2">
              {insight.categories.map((category, idx) => (
                <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  {category}
                </span>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-600">{insight.change}</span>
            <p className="text-sm text-gray-600 mt-2">{insight.description}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Trend Overview</h3>
          <div className="relative w-full" style={{ height: '300px' }}>
            <Line 
              data={trendData} 
              options={chartOptions}
              style={{ maxHeight: '100%' }}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Correlation Analysis</h3>
          <div className="relative w-full" style={{ height: '300px' }}>
            <Bubble 
              data={correlationData} 
              options={chartOptions}
              style={{ maxHeight: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Seasonal Patterns Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Seasonal Pattern Analysis</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3">Season</th>
                  <th className="pb-3">Top Issues</th>
                  <th className="pb-3">Prediction</th>
                  <th className="pb-3">Impact</th>
                  <th className="pb-3">Recommendations</th>
                </tr>
              </thead>
              <tbody>
                {seasonalPatterns.map((pattern, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-4 font-medium">{pattern.season}</td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-1">
                        {pattern.topIssues.map((issue, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            {issue}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        pattern.prediction === 'High' ? 'bg-red-100 text-red-800' :
                        pattern.prediction === 'Very High' ? 'bg-red-200 text-red-900' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pattern.prediction}
                      </span>
                    </td>
                    <td className="py-4">{pattern.impact}</td>
                    <td className="py-4 text-sm text-gray-600">{pattern.recommendations}</td>
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

export default TrendAnalysis 