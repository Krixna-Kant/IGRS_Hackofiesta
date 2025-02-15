import { useState, useEffect } from 'react'

function TrackComplaints() {
  const [complaints, setComplaints] = useState([])
  const [searchId, setSearchId] = useState('')
  const [filteredComplaints, setFilteredComplaints] = useState([])

  useEffect(() => {
    // Load complaints from localStorage
    const savedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]')
    setComplaints(savedComplaints)
    setFilteredComplaints(savedComplaints)
  }, [])

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchId(query)
    if (query) {
      setFilteredComplaints(
        complaints.filter(complaint => 
          complaint.id.toLowerCase().includes(query.toLowerCase())
        )
      )
    } else {
      setFilteredComplaints(complaints)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Track Complaints 🔍</h1>
        <p className="mt-2 text-gray-600">
          View and track the status of your complaints
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by complaint ID..."
            className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            value={searchId}
            onChange={handleSearch}
          />
          <span className="absolute left-3 top-3.5">🔍</span>
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Complaint ID: {complaint.id}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Filed on: {new Date(complaint.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  complaint.status === 'Resolved' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {complaint.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {Object.entries(complaint.answers).map(([questionId, answer]) => (
                  <div key={questionId} className="text-sm">
                    <span className="text-gray-600">{
                      departmentQuestions[complaint.serviceId]?.find(q => q.id === parseInt(questionId))?.question
                    }</span>
                    <p className="font-medium text-gray-900">{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No complaints found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TrackComplaints 