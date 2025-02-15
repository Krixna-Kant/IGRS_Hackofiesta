import React, { useState } from 'react';
import { DocumentTextIcon, ClockIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

function UserDashboard() {
  const [filter, setFilter] = useState('all');

  // Dummy complaints data
  const dummyComplaints = [
    {
      _id: '1',
      complaintId: 'JB202501',
      issueType: 'Water Supply',
      status: 'pending',
      createdAt: '2025-01-15T10:30:00',
      updatedAt: '2025-01-15T10:30:00',
      description: 'No water supply in Block A',
    },
    {
      _id: '2',
      complaintId: 'EC202502',
      issueType: 'Electricity',
      status: 'in-progress',
      createdAt: '2025-01-10T14:20:00',
      updatedAt: '2025-01-12T09:15:00',
      description: 'Frequent power cuts',
    },
    {
      _id: '3',
      complaintId: 'JB202503',
      issueType: 'Water Quality',
      status: 'resolved',
      createdAt: '2024-12-25T08:45:00',
      updatedAt: '2025-01-05T16:30:00',
      description: 'Contaminated water supply',
    },
    {
      _id: '4',
      complaintId: 'EC202504',
      issueType: 'Voltage Issue',
      status: 'rejected',
      createdAt: '2024-12-20T11:00:00',
      updatedAt: '2024-12-22T13:20:00',
      description: 'High voltage fluctuation',
    }
  ];

  const stats = [
    {
      title: "Total Complaints",
      value: dummyComplaints.length,
      icon: DocumentTextIcon,
      bgColor: "bg-blue-100"
    },
    {
      title: "In Progress",
      value: dummyComplaints.filter(c => c.status === 'in-progress').length,
      icon: ClockIcon,
      bgColor: "bg-yellow-100"
    },
    {
      title: "Resolved",
      value: dummyComplaints.filter(c => c.status === 'resolved').length,
      icon: CheckCircleIcon,
      bgColor: "bg-green-100"
    },
    {
      title: "Pending",
      value: dummyComplaints.filter(c => c.status === 'pending').length,
      icon: ExclamationCircleIcon,
      bgColor: "bg-red-100"
    }
  ];

  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  const filteredComplaints = dummyComplaints.filter(complaint => {
    if (filter === 'all') return true;
    return complaint.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Complaints</h1>
            <p className="mt-1 text-gray-600">Track and manage your complaints</p>
          </div>
          <div className="flex items-center gap-4">
            <select 
              className="px-4 py-2 border rounded-lg bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Complaints</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className={`inline-flex p-3 rounded-lg ${stat.bgColor} mb-4`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Complaints List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Complaint ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Filed Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {complaint.complaintId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {complaint.issueType}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {complaint.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[complaint.status]}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(complaint.updatedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;