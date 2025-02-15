import React, { useState } from 'react';

function GrievancesTable() {
  const [grievances, setGrievances] = useState([
    {
      id: 1,
      user: 'Raj',
      description: 'Metro trains are overcrowded in Delhi',
      status: 'Pending',
      priority: 'High',
      dateSubmitted: '2024-10-22 10:30:00',
      updateStatus: 'Pending',
      details: 'The metro trains in Delhi are often overcrowded during peak hours, causing inconvenience to commuters. Passengers struggle to find space, leading to discomfort, delays in boarding and deboarding, and safety concerns. The situation worsens during office hours, festivals, and weekends, making travel stressful. Authorities need to introduce more frequent trains, better crowd management, and additional coaches to ease congestion.'
  }, {
      id: 2,
      user: 'Anita',
      description: 'Frequent bus delays in Bangalore',
      status: 'In Progress',
      priority: 'Medium',
      dateSubmitted: '2024-10-23 12:45:15',
      updateStatus: 'Ongoing',
      details: 'Buses in Bangalore are frequently delayed, leading to long waiting times for passengers. Traffic congestion, inadequate fleet size, and route mismanagement contribute to the delays. Commuters often have to wait for extended periods, especially during rush hours, causing frustration and difficulty in reaching work or appointments on time. The lack of real-time tracking and inconsistent schedules make the situation worse, affecting daily travel.'
  }, {
      id: 3,
      user: 'Suresh',
      description: 'Auto-rickshaw overcharging in Chennai',
      status: 'Resolved',
      priority: 'Low',
      dateSubmitted: '2024-10-23 15:00:45',
      updateStatus: 'Completed',
      details: 'Auto-rickshaw drivers in Chennai are overcharging passengers, especially during nighttime. Many drivers refuse to follow meter rates and demand excessive fares, taking advantage of passengers who have limited travel options late at night. Tourists and locals alike face difficulty in negotiating fair prices, and there is a lack of strict enforcement of fare regulations. Although complaints have been raised, stricter monitoring and penalties are required to curb this issue.'
  }, {
      id: 4,
      user: 'Maneesh',
      description: 'Bus transportation is not good in Hyderabad',
      status: 'Pending',
      priority: 'Medium',
      dateSubmitted: '2024-10-24 17:14:29',
      updateStatus: 'Pending',
      details: 'The bus transportation system in Hyderabad is not efficient, with irregular schedules and poor maintenance. Many buses are overcrowded, and some routes have infrequent services, making daily commuting difficult. Several buses are in poor condition, with broken seats, malfunctioning doors, and lack of proper ventilation. Due to unpredictable timings, commuters often resort to expensive alternatives like cabs or auto-rickshaws. Better scheduling, an increased number of buses, and fleet maintenance are essential to improve public transport in the city.'
  }, {
      id: 5,
      user: 'Priya',
      description: 'Lack of last-mile connectivity in Mumbai',
      status: 'Pending',
      priority: 'High',
      dateSubmitted: '2024-10-25 09:20:10',
      updateStatus: 'Pending',
      details: 'There is a lack of last-mile connectivity in Mumbai, making it difficult for commuters to reach their final destinations. Although Mumbai has an extensive public transport system, including local trains and buses, passengers struggle to find convenient options for the last leg of their journey. Many areas lack adequate rickshaw, taxi, or feeder bus services, forcing people to walk long distances or rely on expensive transport. This issue is especially severe in suburban areas and during late hours, highlighting the need for better last-mile solutions such as shuttle services, shared mobility options, and improved infrastructure.'
  }
  ]);

  const [priorityFilter, setPriorityFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedGrievance, setSelectedGrievance] = useState(null);

  const handleUpdateStatus = (id, newStatus) => {
    setGrievances(grievances.map(grievance => 
      grievance.id === id ? { ...grievance, updateStatus: newStatus } : grievance
    ));
  };

  const handlePriorityChange = (event) => {
    setPriorityFilter(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const resetFilters = () => {
    setPriorityFilter('All');
    setStartDate('');
    setEndDate('');
  };

  const filteredGrievances = grievances.filter(grievance => {
    const grievanceDate = new Date(grievance.dateSubmitted);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (
      (priorityFilter === 'All' || grievance.priority === priorityFilter) &&
      (!start || grievanceDate >= start) &&
      (!end || grievanceDate <= end)
    );
  });

  const handleDescriptionClick = (grievance) => {
    setSelectedGrievance(grievance);
  };

  const closeModal = () => {
    setSelectedGrievance(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Grievances for Transport Department</h1>

      <div className="flex flex-wrap mb-4 items-end">
        <div className="flex-1 mr-2 mb-2">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex-1 mr-2 mb-2">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex-1 mr-2 mb-2">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
          <select id="priority" value={priorityFilter} onChange={handlePriorityChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="flex-1 mb-2">
          <button onClick={resetFilters} className="bg-yellow-500 text-white hover:bg-yellow-600 transition-colors shadow-sm font-bold py-2 px-4 rounded">
            Reset Filters
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User </th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Priority</th>
            <th className="py-2 px-4 border-b">Date Submitted</th>
            <th className="py-2 px-4 border-b">Update Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrievances.map(grievance => (
            <tr key={grievance.id}>
              <td className="py-2 px-4 border-b">{grievance.user}</td>
              <td className="py-2 px-4 border-b cursor-pointer text-yellow-500" onClick={() => handleDescriptionClick(grievance)}>{grievance.description}</td>
              <td className="py-2 px-4 border-b">{grievance.status}</td>
              <td className="py-2 px-4 border-b">{grievance.priority}</td>
              <td className="py-2 px-4 border-b">{grievance.dateSubmitted}</td>
              <td className="py-2 px-4 border-b">
                <select 
                  value={grievance.updateStatus} 
                  onChange={(e) => handleUpdateStatus(grievance.id, e.target.value)} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedGrievance && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Grievance Details</h2>
            <p><strong>User:</strong> {selectedGrievance.user}</p>
            <p><strong>Description:</strong> {selectedGrievance.description}</p>
            <p><strong>Status:</strong> {selectedGrievance.status}</p>
            <p><strong>Priority:</strong> {selectedGrievance.priority}</p>
            <p><strong>Date Submitted:</strong> {selectedGrievance.dateSubmitted}</p>
            <p><strong>Update Status:</strong> {selectedGrievance.updateStatus}</p>
            <p><strong>Details:</strong> {selectedGrievance.details}</p>
            <button onClick={closeModal} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GrievancesTable;