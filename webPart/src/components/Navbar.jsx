import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

function Navbar() {
  const [notifications] = useState([
    {
      id: 1,
      message: "New high-priority grievance reported",
      time: "5 minutes ago"
    },
    {
      id: 2,
      message: "AI detected emerging pattern in healthcare sector",
      time: "10 minutes ago"
    },
    {
      id: 3,
      message: "Monthly analytics report ready",
      time: "1 hour ago"
    }
  ])

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-yellow-500">IGRS</span>
            <span className="ml-2 text-sm text-gray-500">Analytics Dashboard</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Search grievances, reports, or analytics..."
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative group">
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Notifications Dropdown */}
              <div className="absolute right-0 w-80 mt-2 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  <div className="mt-2 space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-3 px-4 py-2 text-sm text-center text-yellow-600 hover:text-yellow-700">
                    View All Notifications
                  </button>
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="relative group">
              <button className="flex items-center space-x-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://ui-avatars.com/api/?name=Admin+User"
                  alt="Profile"
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                  <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <a href="#help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help Center</a>
                  <hr className="my-1" />
                  <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign out</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
