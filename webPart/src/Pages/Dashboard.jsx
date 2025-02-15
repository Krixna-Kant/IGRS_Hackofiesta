import React, { useState, useRef, useEffect } from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import { Line, Doughnut } from 'react-chartjs-2';
import { Margin, usePDF } from 'react-to-pdf';

// Add these dummy data objects at the top of your component
const dummyData = {
  '7days': {
    stats: [
      { title: "Total Grievances", value: "1,589", change: "+8%", isPositive: false, description: "Total complaints received" },
      { title: "Resolution Rate", value: "82%", change: "+3%", isPositive: true, description: "Cases successfully resolved" },
      { title: "Avg Response Time", value: "1.8 days", change: "-15%", isPositive: true, description: "Time to first response" },
      { title: "Citizen Satisfaction", value: "89%", change: "+5%", isPositive: true, description: "Based on feedback" }
    ],
    lineData: [300, 450, 400, 600, 500, 700, 650],
    doughnutData: [58, 25, 12, 5]
  },
  '30days': {
    stats: [
      { title: "Total Grievances", value: "8,976", change: "+10%", isPositive: false, description: "Total complaints received" },
      { title: "Resolution Rate", value: "85%", change: "+5%", isPositive: true, description: "Cases successfully resolved" },
      { title: "Avg Response Time", value: "2.3 days", change: "-18%", isPositive: true, description: "Time to first response" },
      { title: "Citizen Satisfaction", value: "92%", change: "+8%", isPositive: true, description: "Based on feedback" }
    ],
    lineData: [800, 1200, 1000, 1500, 1300, 1800, 1600],
    doughnutData: [63, 20, 12, 5]
  },
  '90days': {
    stats: [
      { title: "Total Grievances", value: "24,589", change: "+12%", isPositive: false, description: "Total complaints received" },
      { title: "Resolution Rate", value: "88%", change: "+7%", isPositive: true, description: "Cases successfully resolved" },
      { title: "Avg Response Time", value: "2.5 days", change: "-20%", isPositive: true, description: "Time to first response" },
      { title: "Citizen Satisfaction", value: "94%", change: "+10%", isPositive: true, description: "Based on feedback" }
    ],
    lineData: [2400, 3100, 2800, 3500, 3200, 3800],
    doughnutData: [68, 18, 10, 4]
  }
};

function Dashboard() {
  const [timeRange, setTimeRange] = useState('7days');
  const [currentStats, setCurrentStats] = useState(dummyData['7days'].stats);
  const [currentLineData, setCurrentLineData] = useState(dummyData['7days'].lineData);
  const [currentDoughnutData, setCurrentDoughnutData] = useState(dummyData['7days'].doughnutData);

  // Update data when timeRange changes
  useEffect(() => {
    setCurrentStats(dummyData[timeRange].stats);
    setCurrentLineData(dummyData[timeRange].lineData);
    setCurrentDoughnutData(dummyData[timeRange].doughnutData);
  }, [timeRange]);

  const componentRef = useRef()

  const { toPDF, targetRef } = usePDF({
    filename: 'dashboard-report.pdf',
    page: { 
      margin: Margin.MEDIUM,
      format: 'A4',
      orientation: 'portrait'
    },
    canvas: {
      // Ensure charts are rendered properly
      useCORS: true,
      logging: true,
      scale: 2 // Better quality for charts
    },
    // Add fonts configuration
    font: {
      family: 'Inter',
      size: 12,
      style: 'normal'
    }
  });

  // Update your chart data objects
  const lineChartData = {
    labels: timeRange === '7days' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : timeRange === '30days'
      ? ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Grievances',
      data: currentLineData,
      borderColor: '#FFA500',
      backgroundColor: 'rgba(255, 165, 0, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#FFA500'
    }]
  }

  const doughnutData = {
    labels: ['Resolved', 'In Progress', 'New', 'Escalated'],
    datasets: [{
      data: currentDoughnutData,
      backgroundColor: ['#4CAF50', '#FFA500', '#2196F3', '#F44336'],
      borderWidth: 0
    }]
  }

  const chartOptions = {
    maintainAspectRatio: true, // Changed to true for PDF
    responsive: true,
    animation: false, // Disable animations for PDF
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          },
          padding: 20
        }
      }
    }
  }

  const handleExport = async () => {
    try {
      // Add a small delay to ensure charts are fully rendered
      setTimeout(async () => {
        await toPDF();
        
        const currentDate = new Date().toLocaleString();
        const fileName = `dashboard-report-${Date.now()}.pdf`;
        
        // Save report metadata to localStorage
        const reports = JSON.parse(localStorage.getItem('dashboardReports') || '[]');
        reports.push({
          id: Date.now(),
          fileName,
          exportDate: currentDate,
          timeRange,
          stats: [...currentStats]
        });
        localStorage.setItem('dashboardReports', JSON.stringify(reports));
      }, 500);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  // Modify the stats card rendering to use more PDF-friendly styles
  const renderStatsCard = (stat, index) => (
    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100" style={{ pageBreakInside: 'avoid' }}>
      <div className="flex justify-between items-start mb-2" style={{ minHeight: '24px' }}>
        <p className="text-sm font-medium text-gray-600" style={{ margin: 0 }}>{stat.title}</p>
        <div 
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            stat.isPositive ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
          }`}
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap'
          }}
        >
          {stat.isPositive ? (
            <ArrowTrendingUpIcon className="w-4 h-4" style={{ width: '16px', height: '16px' }} />
          ) : (
            <ArrowTrendingDownIcon className="w-4 h-4" style={{ width: '16px', height: '16px' }} />
          )}
          <span style={{ display: 'inline-block' }}>{stat.change}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1" style={{ margin: '8px 0' }}>{stat.value}</h3>
      <p className="text-xs text-gray-500" style={{ margin: 0 }}>{stat.description}</p>
    </div>
  );

  // Update your stats rendering
  const renderStatsCards = () => {
    return currentStats.map((stat, index) => renderStatsCard(stat, index));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 py-8" ref={targetRef}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="mt-1 text-gray-600">Track and analyze grievance patterns</p>
          </div>
          <div className="flex items-center gap-4">
            <select 
              className="px-4 py-2 border rounded-lg bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </select>
            <button 
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors shadow-sm"
              onClick={handleExport}
            >
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid with updated data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {renderStatsCards()}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" 
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem'
          }}>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Grievance Trends</h3>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="text-sm text-gray-600">Monthly trend</span>
              </div>
            </div>
            <div className="relative w-full h-[300px]"> {/* Fixed height */}
              <Line 
                data={lineChartData} 
                options={chartOptions}
                redraw={false}
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Status Distribution</h3>
              <div className="flex items-center gap-4">
                {doughnutData.labels.map((label, index) => (
                  <div key={label} className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: doughnutData.datasets[0].backgroundColor[index] }}
                    ></span>
                    <span className="text-sm text-gray-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full h-[300px]"> {/* Fixed height */}
              <Doughnut 
                data={doughnutData} 
                options={chartOptions}
                redraw={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard