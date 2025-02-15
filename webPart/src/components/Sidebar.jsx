import { NavLink, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  ChartBarIcon,
  ChartPieIcon,
  PresentationChartLineIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/solid'

function Sidebar() {
  const location = useLocation()

  const isLinkActive = (path) => {
    return location.pathname === path
  }

  const navigation = [
    {
      name: 'Dashboard',
      icon: HomeIcon,
      href: '/',
      current: location.pathname === '/'
    },
    {
      name: 'File Complaint',
      icon: ClipboardDocumentIcon,
      href: '/file-complaint',
      current: location.pathname === '/file-complaint'
    },
    {
      name: 'Grievance Analytics',
      icon: ChartBarIcon,
      href: '/analytics',
      current: location.pathname === '/analytics'
    },
    {
      name: 'Trend Analysis',
      icon: PresentationChartLineIcon,
      href: '/trends',
      current: location.pathname === '/trends'
    },
    {
      name: 'Predictive Insights',
      icon: ChartPieIcon,
      href: '/insights',
      current: location.pathname === '/insights'
    }
  ]

  const secondaryNavigation = [
    {
      name: 'Reports',
      icon: DocumentTextIcon,
      href: '/reports'
    },
    {
      name: 'Settings',
      icon: Cog6ToothIcon,
      href: '/settings'
    },
    {
      name: 'Help & Support',
      icon: QuestionMarkCircleIcon,
      href: '/help'
    }
  ]

  const stats = [
    { label: 'Total Grievances', value: '24.5K' },
    { label: 'Resolution Rate', value: '85%' }
  ]

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        {/* Main Navigation */}
        <nav className="mt-5 flex-1 px-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={`
                group flex items-center px-3 py-2 text-sm font-medium rounded-lg
                ${isLinkActive(item.href)
                  ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon
                className={`
                  mr-3 flex-shrink-0 h-6 w-6
                  ${isLinkActive(item.href)
                    ? 'text-yellow-500'
                    : 'text-gray-400 group-hover:text-gray-500'
                  }
                `}
              />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="px-6 py-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Quick Stats
            </h3>
            <dl className="mt-2 space-y-2">
              {stats.map((stat) => (
                <div key={stat.label} className="flex justify-between">
                  <dt className="text-sm text-gray-600">{stat.label}</dt>
                  <dd className="text-sm font-medium text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Secondary Navigation */}
        <nav className="mt-2 px-3 space-y-1">
          <div className="pt-2 border-t border-gray-200">
            {secondaryNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-lg
                  ${isLinkActive(item.href)
                    ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon
                  className={`
                    mr-3 flex-shrink-0 h-6 w-6
                    ${isLinkActive(item.href)
                      ? 'text-yellow-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                    }
                  `}
                />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* User Status */}
        <div className="px-6 py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400"></span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">System Status</p>
              <p className="text-xs text-gray-500">All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar 