import React from 'react'
import { Radar, Scatter } from 'react-chartjs-2'
import { BoltIcon, ShieldExclamationIcon, LightBulbIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline'
import { Margin, usePDF } from 'react-to-pdf';
import { useRef } from 'react';

function PredictiveInsights() {
  const predictionsData = {
    riskScores: [65, 59, 90, 81, 56],
    impactMetrics: [75, 49, 90, 29, 36],
    timeframes: ['30 days', '60 days', '90 days', '120 days', '150 days']
  };

  const hotspotPredictions = [
    {
      location: 'District A',
      riskLevel: 'High',
      predictedIssues: ['Road maintenance', 'Infrastructure decay'],
      probabilityScore: 0.85
    },
    {
      location: 'Region B',
      riskLevel: 'Critical',
      predictedIssues: ['Medical supply shortage', 'Staff allocation'],
      probabilityScore: 0.92
    }
  ];

  const trendData = {
    historicalTrends: [
      { month: 'Jan', value: 45 },
      { month: 'Feb', value: 52 },
      { month: 'Mar', value: 61 }
    ],
    forecastTrends: [
      { month: 'Apr', value: 68 },
      { month: 'May', value: 73 },
      { month: 'Jun', value: 80 }
    ]
  };

  const { toPDF, targetRef } = usePDF({
    filename: 'predictive-insights-report.pdf',
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

  const handleGenerateForecast = async () => {
    try {
      setTimeout(async () => {
        await toPDF();
        
        const currentDate = new Date().toLocaleString();
        const fileName = `predictive-insights-forecast-${Date.now()}.pdf`;
        
        // Save report metadata to localStorage
        const reports = JSON.parse(localStorage.getItem('forecastReports') || '[]');
        reports.push({
          id: Date.now(),
          fileName,
          exportDate: currentDate,
          type: 'Predictive Forecast',
          data: {
            predictions: predictionsData,
            hotspots: hotspotPredictions,
            trends: trendData,
            recommendations: recommendations
          }
        });
        localStorage.setItem('forecastReports', JSON.stringify(reports));
      }, 500);
    } catch (error) {
      console.error('Error generating forecast PDF:', error);
    }
  };

  const predictiveStats = [
    {
      title: "Risk Level",
      value: "High risk in 3 sectors"
    },
    {
      title: "Prediction Accuracy",
      value: "92% accuracy rate"
    },
    {
      title: "Future Trends",
      value: "15% increase expected"
    },
    {
      title: "Impact Score",
      value: "8.5/10 severity"
    }
  ]

  const radarData = {
    labels: ['Risk A', 'Risk B', 'Risk C', 'Risk D', 'Risk E'],
    datasets: [
      {
        label: 'Current Risk Level',
        data: [65, 59, 90, 81, 56],
        fill: true,
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        borderColor: 'rgb(255, 165, 0)',
        pointBackgroundColor: 'rgb(255, 165, 0)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 165, 0)'
      }
    ]
  }

  const scatterData = {
    datasets: [
      {
        label: 'Impact vs Probability',
        data: [
          { x: 65, y: 75 },
          { x: 59, y: 49 },
          { x: 80, y: 90 },
          { x: 81, y: 29 },
          { x: 56, y: 36 },
          { x: 55, y: 25 }
        ],
        backgroundColor: 'rgba(255, 165, 0, 0.6)'
      }
    ]
  }

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

  const predictiveAlerts = [
    {
      icon: <BoltIcon className="w-8 h-8" />,
      title: "High Priority Alert",
      category: "Infrastructure",
      risk: "Critical",
      timeframe: "Next 30 days",
      description: "Potential surge in road infrastructure complaints due to upcoming monsoon season"
    },
    {
      icon: <ShieldExclamationIcon className="w-8 h-8" />,
      title: "Emerging Issue",
      category: "Healthcare",
      risk: "High",
      timeframe: "Next 60 days",
      description: "Predicted increase in healthcare facility grievances in rural areas"
    },
    {
      icon: <LightBulbIcon className="w-8 h-8" />,
      title: "Preventive Action",
      category: "Education",
      risk: "Moderate",
      timeframe: "Next 90 days",
      description: "Early indicators of school infrastructure maintenance requirements"
    },
    {
      icon: <DocumentChartBarIcon className="w-8 h-8" />,
      title: "Resource Planning",
      category: "Public Services",
      risk: "Low",
      timeframe: "Next Quarter",
      description: "Resource allocation recommendations based on predicted demand"
    }
  ]

  const recommendations = [
    {
      area: "Infrastructure",
      prediction: "Road maintenance issues in District A",
      confidence: "92%",
      impact: "High",
      suggestedActions: [
        "Schedule preventive maintenance",
        "Allocate emergency repair budget",
        "Deploy monitoring teams"
      ]
    },
    {
      area: "Healthcare",
      prediction: "Medical supply shortages in Region B",
      confidence: "88%",
      impact: "Critical",
      suggestedActions: [
        "Increase medical supply inventory",
        "Coordinate with suppliers",
        "Set up emergency response team"
      ]
    },
    {
      area: "Education",
      prediction: "School facility upgrades needed",
      confidence: "85%",
      impact: "Moderate",
      suggestedActions: [
        "Conduct facility audits",
        "Plan summer renovation works",
        "Prepare budget allocation"
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8" ref={targetRef}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Predictive Insights</h1>
          <p className="text-gray-600">AI-Powered Forecasting and Recommendations</p>
        </div>
        <button 
          onClick={handleGenerateForecast}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Generate Forecast
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {predictiveStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-24">
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
            <div className="text-sm text-gray-600">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {predictiveAlerts.map((alert, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-yellow-500 mb-4">{alert.icon}</div>
            <h3 className="font-semibold text-gray-800 mb-2">{alert.title}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                {alert.category}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                alert.risk === 'Critical' ? 'bg-red-100 text-red-800' :
                alert.risk === 'High' ? 'bg-orange-100 text-orange-800' :
                alert.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {alert.risk}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-600">{alert.timeframe}</span>
            <p className="text-sm text-gray-600 mt-2">{alert.description}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Risk Assessment</h3>
          <div className="relative w-full" style={{ height: '300px' }}>
            <Radar 
              data={radarData} 
              options={chartOptions}
              style={{ maxHeight: '100%' }}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Impact vs Probability Matrix</h3>
          <div className="relative w-full" style={{ height: '300px' }}>
            <Scatter 
              data={scatterData} 
              options={chartOptions}
              style={{ maxHeight: '100%' }}
            />
          </div>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">AI-Powered Recommendations</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3">Area</th>
                  <th className="pb-3">Prediction</th>
                  <th className="pb-3">Confidence</th>
                  <th className="pb-3">Impact</th>
                  <th className="pb-3">Suggested Actions</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map((rec, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-4 font-medium">{rec.area}</td>
                    <td className="py-4">{rec.prediction}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {rec.confidence}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        rec.impact === 'Critical' ? 'bg-red-100 text-red-800' :
                        rec.impact === 'High' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {rec.impact}
                      </span>
                    </td>
                    <td className="py-4">
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {rec.suggestedActions.map((action, idx) => (
                          <li key={idx}>{action}</li>
                        ))}
                      </ul>
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

export default PredictiveInsights