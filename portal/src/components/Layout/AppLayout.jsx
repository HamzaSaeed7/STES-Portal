import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown, Select, Typography, Tag } from 'antd'
import {
  DashboardOutlined,
  TeamOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  FileDoneOutlined,
  BarChartOutlined,
  CheckSquareOutlined,
  SettingOutlined,
  OrderedListOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import { RoleProvider, useRole } from './RoleContext'
import { ROLES, NAV_BY_ROLE } from '../../data/staticData'

const { Sider, Header, Content } = Layout
const { Text } = Typography

const ALL_NAV_ITEMS = [
  { key: '/', label: 'Dashboard', icon: <DashboardOutlined />, id: 'dashboard' },
  { key: '/employees', label: 'Employees', icon: <TeamOutlined />, id: 'employees' },
  { key: '/quotations', label: 'Generate Quotations', icon: <FileTextOutlined />, id: 'quotations' },
  { key: '/internal-orders', label: 'Internal Orders', icon: <OrderedListOutlined />, id: 'internal-orders' },
  { key: '/stock', label: 'Stock', icon: <DatabaseOutlined />, id: 'stock' },
  { key: '/invoices', label: 'Invoices', icon: <FileDoneOutlined />, id: 'invoices' },
  { key: '/reports', label: 'Reports', icon: <BarChartOutlined />, id: 'reports' },
  { key: '/tasks', label: 'Tasks', icon: <CheckSquareOutlined />, id: 'tasks' },
  { key: '/settings', label: 'Settings', icon: <SettingOutlined />, id: 'settings' },
]

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/employees': 'Employees',
  '/quotations': 'Quote Generation',
  '/quotations/new': 'New Quotation',
  '/internal-orders': 'Internal Orders',
  '/stock': 'Stock',
  '/invoices': 'Invoices',
  '/reports': 'Reports',
  '/tasks': 'Tasks',
  '/settings': 'Settings',
}

const ROLE_COLORS = {
  [ROLES.MANAGER]: 'green',
  [ROLES.ACCOUNTANT]: 'blue',
  [ROLES.SALES_PERSON]: 'purple',
}

const ROLE_INITIALS = {
  [ROLES.MANAGER]: 'MG',
  [ROLES.ACCOUNTANT]: 'AC',
  [ROLES.SALES_PERSON]: 'SP',
}

function SidebarLogo() {
  return (
    <div style={{
      padding: '24px 20px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      marginBottom: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: 'rgba(34,197,94,0.15)',
          border: '1px solid rgba(34,197,94,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 0 12px rgba(34,197,94,0.1)',
        }}>
          <svg width="24" height="24" viewBox="0 0 80 80" fill="none">
            <rect x="10" y="20" width="44" height="44" rx="4" transform="rotate(-45 10 20)" fill="#22c55e" />
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="Arial">ST</text>
          </svg>
        </div>
        <div>
          <div style={{ color: '#e6edf3', fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>ST Engineering</div>
          <div style={{ color: '#22c55e', fontWeight: 600, fontSize: 11, lineHeight: 1.3 }}>Solutions Portal</div>
        </div>
      </div>
    </div>
  )
}

function AppLayoutInner() {
  const { role, setRole } = useRole()
  const navigate = useNavigate()
  const location = useLocation()

  const allowedIds = NAV_BY_ROLE[role]
  const navItems = ALL_NAV_ITEMS.filter(item => allowedIds.includes(item.id))

  const menuItems = navItems.map(item => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
    onClick: () => navigate(item.key),
  }))

  const selectedKey = location.pathname === '/'
    ? '/'
    : ALL_NAV_ITEMS.find(i => i.key !== '/' && location.pathname.startsWith(i.key))?.key || '/'

  const pageTitle = PAGE_TITLES[selectedKey] || 'Dashboard'

  const userDropdown = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Log out',
      danger: true,
      onClick: () => navigate('/login'),
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ── Sidebar ── */}
      <Sider
        width={230}
        className="stes-sider"
        style={{
          background: '#0c1425',
          position: 'fixed',
          left: 0, top: 0, bottom: 0,
          zIndex: 100,
          borderRight: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <SidebarLogo />

          <div className="section-title" style={{ marginTop: 4 }}>Navigation</div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            style={{ background: 'transparent', border: 'none', flex: 1, fontSize: 13 }}
          />

          {/* Log out */}
          <div style={{ padding: '16px 14px 24px' }}>
            <div
              onClick={() => navigate('/login')}
              style={{
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.2)',
                color: '#22c55e',
                textAlign: 'center',
                padding: '10px',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(34,197,94,0.18)'
                e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(34,197,94,0.1)'
                e.currentTarget.style.borderColor = 'rgba(34,197,94,0.2)'
              }}
            >
              Log out
            </div>
          </div>
        </div>
      </Sider>

      {/* ── Main area ── */}
      <Layout style={{ marginLeft: 230, background: '#0a0f1a' }}>
        {/* Header */}
        <Header style={{
          background: '#0e1829',
          padding: '0 24px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 99,
        }}>
          {/* Page title */}
          <Text style={{ color: '#e6edf3', fontWeight: 600, fontSize: 15 }}>
            {pageTitle}
          </Text>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Demo role switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <SwapOutlined style={{ color: '#4b5563', fontSize: 12 }} />
              <Text style={{ color: '#4b5563', fontSize: 12 }}>Demo:</Text>
              <Select
                value={role}
                onChange={setRole}
                size="small"
                variant="borderless"
                style={{ width: 130 }}
                options={Object.values(ROLES).map(r => ({ value: r, label: r }))}
                styles={{ popup: { root: { minWidth: 140 } } }}
              />
            </div>

            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)' }} />

            {/* User dropdown */}
            <Dropdown menu={{ items: userDropdown }} trigger={['click']} placement="bottomRight">
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                padding: '4px 8px', borderRadius: 8,
                transition: 'background 0.18s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Avatar
                  size={30}
                  style={{
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                  }}
                >
                  {ROLE_INITIALS[role]}
                </Avatar>
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ color: '#e6edf3', fontSize: 13, fontWeight: 600 }}>{role}</div>
                  <Tag
                    color={ROLE_COLORS[role]}
                    style={{ fontSize: 10, lineHeight: '14px', padding: '0 4px', margin: 0, height: 16 }}
                  >
                    {role}
                  </Tag>
                </div>
                <DownOutlined style={{ color: '#4b5563', fontSize: 10 }} />
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* Content */}
        <Content style={{ padding: '28px 28px 40px', minHeight: 'calc(100vh - 60px)' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default function AppLayout() {
  return (
    <RoleProvider>
      <AppLayoutInner />
    </RoleProvider>
  )
}
