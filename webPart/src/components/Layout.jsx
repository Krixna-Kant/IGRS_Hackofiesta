import { useNavigate, Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BellIcon } from '@heroicons/react/24/outline'
import Sidebar from './Sidebar'

function Layout() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            {/* IGRS Logo & Title */}
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-yellow-500">IGRS</h1>
                <span className="ml-2 text-gray-500 text-sm">Analytics Dashboard</span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-3xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search grievances, reports, or analytics..."
                  className="w-full h-10 px-4 pr-10 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Notifications & Profile */}
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-3 p-1.5 bg-gray-900 rounded-lg focus:outline-none">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full text-white text-sm font-medium">
                    {user?.avatar || 'AU'}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-gray-400">{user?.userType || 'Administrator'}</p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                    Logged in as {user?.userType}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6 bg-yellow-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout 