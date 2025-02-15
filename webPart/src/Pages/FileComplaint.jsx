import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const departments = [
  { 
    id: 'jal-board', 
    name: 'UP Jal Board', 
    icon: '💧',
    description: 'Water supply issues, leakages, water quality concerns',
    commonIssues: ['Water Supply Disruption', 'Leaking Pipelines', 'Water Quality'],
    formType: 'form'
  },
  { 
    id: 'electricity', 
    name: 'Electricity Department', 
    icon: '⚡',
    description: 'Power outages, voltage issues, billing problems',
    commonIssues: ['Power Outages', 'Voltage Fluctuation', 'Faulty Meters'],
    formType: 'form'
  },
  { 
    id: 'roads', 
    name: 'Public Works Department', 
    icon: '🛣️',
    description: 'Road maintenance, street lights, public infrastructure',
    commonIssues: ['Road Damage', 'Street Light Issues', 'Bridge Repairs'],
    formType: 'chatbot'
  },
  { 
    id: 'sanitation', 
    name: 'Sanitation Department', 
    icon: '🧹',
    description: 'Waste management, cleanliness, sewage issues',
    commonIssues: ['Garbage Collection', 'Sewage Blockage', 'Street Cleaning'],
    formType: 'chatbot'
  },
  { 
    id: 'health', 
    name: 'Health Department', 
    icon: '🏥',
    description: 'Public health concerns, medical facilities',
    commonIssues: ['Hospital Services', 'Medical Emergency', 'Health Camps'],
    formType: 'chatbot'
  },
  { 
    id: 'education', 
    name: 'Education Department', 
    icon: '🎓',
    description: 'School-related issues, education quality, facilities',
    commonIssues: ['School Infrastructure', 'Teacher Attendance', 'Education Quality'],
    formType: 'chatbot'
  }
]

function FileComplaint() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDepartmentClick = (dept) => {
    console.log('Navigating to:', `/file-complaint/${dept.id}`)
    navigate(`/file-complaint/${dept.id}`)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">File a Complaint 📝</h1>
        <p className="mt-2 text-gray-600">
          Select the relevant department to file your complaint. We provide both form-based and AI-assisted complaint filing options.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search departments or describe your issue..."
            className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-3.5">🔍</span>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-yellow-500 transition-all duration-200"
          >
            <div className="p-6 flex flex-col h-full">
              {/* Department Header */}
              <div className="flex items-start space-x-4 mb-4">
                <span className="text-4xl p-2 bg-gray-50 rounded-lg">{dept.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{dept.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{dept.description}</p>
                </div>
              </div>
              
              {/* Common Issues Section */}
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Common Issues:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {dept.commonIssues.map((issue, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {issue}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleDepartmentClick(dept)}
                className="w-full px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 font-medium shadow-sm hover:shadow"
              >
                <span>File Complaint</span>
                <span className="text-xl">
                  {dept.formType === 'form' ? '📝' : '🤖'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-yellow-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">📋 Filing Tips</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-yellow-700">
              <span className="mr-2">✓</span>
              Be specific about your complaint
            </li>
            <li className="flex items-center text-yellow-700">
              <span className="mr-2">✓</span>
              Include location details
            </li>
            <li className="flex items-center text-yellow-700">
              <span className="mr-2">✓</span>
              Attach relevant photos if possible
            </li>
            <li className="flex items-center text-yellow-700">
              <span className="mr-2">✓</span>
              Keep track of your complaint ID
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">💡 Filing Options</h3>
          <p className="text-blue-700 mb-4">
            We offer two ways to file complaints:
          </p>
          <ul className="space-y-2">
            <li className="flex items-center text-blue-700">
              <span className="mr-2">📝</span>
              Form-based filing for structured complaints
            </li>
            <li className="flex items-center text-blue-700">
              <span className="mr-2">🤖</span>
              AI-assisted filing for guided support
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FileComplaint