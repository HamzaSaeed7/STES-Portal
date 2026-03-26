import { useState } from 'react'
import { Card, Row, Col, Typography, Button, Tabs, Calendar, Avatar, Empty, Modal, Form, Input } from 'antd'
import {
  TeamOutlined, FileTextOutlined, ProjectOutlined, DollarOutlined,
  PlusOutlined, UserOutlined, RiseOutlined,
} from '@ant-design/icons'
import { useRole } from '../components/Layout/RoleContext'
import { ROLES, managerStats, salesPersonStats } from '../data/staticData'
import dayjs from 'dayjs'

const { Title, Text } = Typography

const STAT_CONFIGS = {
  manager: [
    { label: 'Team Members',     icon: <TeamOutlined />,     color: '#22c55e', accent: 'stat-card-green',  getValue: s => s.teamMembers,     unit: 'Employees' },
    { label: 'Total Quotations', icon: <FileTextOutlined />, color: '#3b82f6', accent: 'stat-card-blue',   getValue: s => s.totalQuotations, unit: 'Quotations' },
    { label: 'Total Projects',   icon: <ProjectOutlined />,  color: '#f59e0b', accent: 'stat-card-amber',  getValue: s => s.totalProjects,   unit: 'Projects' },
    { label: 'Total Earning',    icon: <DollarOutlined />,   color: '#8b5cf6', accent: 'stat-card-purple', getValue: s => `PKR ${s.totalEarning.toLocaleString()}`, unit: '' },
  ],
  salesPerson: [
    { label: 'Total Quotations', icon: <FileTextOutlined />, color: '#3b82f6', accent: 'stat-card-blue',   getValue: s => s.totalQuotations, unit: 'Quotations' },
    { label: 'Total Projects',   icon: <ProjectOutlined />,  color: '#f59e0b', accent: 'stat-card-amber',  getValue: s => s.totalProjects,   unit: 'Projects' },
    { label: 'Total Earning',    icon: <DollarOutlined />,   color: '#8b5cf6', accent: 'stat-card-purple', getValue: s => `PKR ${s.totalEarning.toLocaleString()}`, unit: '' },
  ],
}

function StatCard({ label, icon, color, accent, value, unit }) {
  return (
    <Card className={accent} bodyStyle={{ padding: '18px 20px' }}
      style={{ background: '#131c2e', border: '1px solid #1e2a3d' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Text style={{ color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: 8 }}>
            {label}
          </Text>
          <div style={{ color: '#e6edf3', fontWeight: 800, fontSize: 22, lineHeight: 1, marginBottom: 4 }}>
            {value}
          </div>
          {unit && <Text style={{ color: '#4b5563', fontSize: 11 }}>{unit}</Text>}
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: color + '18',
          border: `1px solid ${color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, color,
          flexShrink: 0,
        }}>
          {icon}
        </div>
      </div>
    </Card>
  )
}

function ProfileCard({ name, email }) {
  return (
    <Card
      bodyStyle={{ padding: 16 }}
      style={{ background: '#131c2e', border: '1px solid #1e2a3d', marginBottom: 12 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Profile</Text>
        <a href="/settings" style={{ color: '#22c55e', fontSize: 12, fontWeight: 500 }}>Settings</a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar size={44} style={{
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          fontSize: 14, fontWeight: 700, flexShrink: 0,
        }}>
          {name.slice(0, 2).toUpperCase()}
        </Avatar>
        <div>
          <div style={{ color: '#e6edf3', fontSize: 14, fontWeight: 700 }}>{name}</div>
          <div style={{ color: '#4b5563', fontSize: 12, marginTop: 1 }}>{email}</div>
        </div>
      </div>
    </Card>
  )
}

function CalendarWidget() {
  const [current, setCurrent] = useState(dayjs())
  return (
    <Card
      bodyStyle={{ padding: 10 }}
      style={{ background: '#131c2e', border: '1px solid #1e2a3d' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: '0 4px' }}>
        <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Calendar</Text>
        <a href="#" style={{ color: '#22c55e', fontSize: 12, fontWeight: 500 }}>View all tasks</a>
      </div>
      <Calendar
        fullscreen={false}
        value={current}
        onChange={setCurrent}
        style={{ background: 'transparent' }}
        headerRender={({ value, onChange }) => (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '4px 4px 8px', gap: 8,
          }}>
            <Button size="small" type="text" style={{ color: '#94a3b8', padding: '0 6px' }}
              onClick={() => { const v = value.subtract(1, 'month'); onChange(v); setCurrent(v) }}>
              ‹
            </Button>
            <Text style={{ color: '#e6edf3', fontSize: 13, fontWeight: 600 }}>
              {value.format('MMMM YYYY')}
            </Text>
            <Button size="small" type="text" style={{ color: '#94a3b8', padding: '0 6px' }}
              onClick={() => { const v = value.add(1, 'month'); onChange(v); setCurrent(v) }}>
              ›
            </Button>
          </div>
        )}
      />
    </Card>
  )
}

function AddProjectModal({ open, onClose }) {
  return (
    <Modal open={open} onCancel={onClose} footer={null}
      title={<span style={{ color: '#e6edf3' }}>Add Project Details</span>}
      width={600} style={{ top: 60 }}
    >
      <Text style={{ color: '#4b5563', fontSize: 12, display: 'block', marginBottom: 16 }}>
        Fill in the following information to create a new project
      </Text>
      <Form layout="vertical">
        <Row gutter={16}>
          {[['Client Name','clientName'],['Consultant','consultant'],['Registration date','regDate'],
            ['Project Location','location'],['Architect','architect'],['Contractor','contractor'],
            ['Application','application'],['Project Status','status'],['Confidence Level','confidence'],
            ['Expected Delivery','delivery'],['Project Amount','amount'],['PRA','pra']
          ].map(([label, name]) => (
            <Col span={12} key={name}>
              <Form.Item label={label} name={name}><Input /></Form.Item>
            </Col>
          ))}
          <Col span={24}>
            <Form.Item label="Remarks" name="remarks"><Input.TextArea rows={2} /></Form.Item>
          </Col>
        </Row>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>Cancel</Button>
          <Button type="primary" className="btn-primary" onClick={onClose}>Add Project</Button>
        </div>
      </Form>
    </Modal>
  )
}

export default function Dashboard() {
  const { role } = useRole()
  const [addProjectOpen, setAddProjectOpen] = useState(false)
  const [projectTab, setProjectTab] = useState('my')

  const isManager = role === ROLES.MANAGER
  const isAccountant = role === ROLES.ACCOUNTANT
  const stats = isManager ? managerStats : salesPersonStats
  const statConfigs = isManager ? STAT_CONFIGS.manager : STAT_CONFIGS.salesPerson

  const userInfo = {
    [ROLES.MANAGER]:      { name: 'Manager',      email: 'manager@stengineering.com' },
    [ROLES.ACCOUNTANT]:   { name: 'Accountant',   email: 'accountant@stengineering.com' },
    [ROLES.SALES_PERSON]: { name: 'Sales Person', email: 'sales@stengineering.com' },
  }[role]

  return (
    <div>
      {/* Greeting */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ color: '#e6edf3', margin: 0, fontWeight: 800, fontSize: 24 }}>
          Dashboard
        </Title>
        <Text style={{ color: '#4b5563', fontSize: 13, marginTop: 4, display: 'block' }}>
          Welcome back, <span style={{ color: '#22c55e', fontWeight: 600 }}>{role}</span> 👋
        </Text>
      </div>

      <Row gutter={20}>
        {/* Left column */}
        <Col flex="1" style={{ minWidth: 0 }}>

          {/* Stats row */}
          {!isAccountant && (
            <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
              {statConfigs.map(cfg => (
                <Col span={isManager ? 6 : 8} key={cfg.label}>
                  <StatCard
                    label={cfg.label}
                    icon={cfg.icon}
                    color={cfg.color}
                    accent={cfg.accent}
                    value={cfg.getValue(stats)}
                    unit={cfg.unit}
                  />
                </Col>
              ))}
            </Row>
          )}

          {/* Project list */}
          {!isAccountant ? (
            <Card
              style={{ background: '#131c2e', border: '1px solid #1e2a3d' }}
              bodyStyle={{ padding: '0 0 16px' }}
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ color: '#e6edf3', fontWeight: 700 }}>Project List</Text>
                  <Button
                    size="small"
                    type="primary"
                    icon={<PlusOutlined />}
                    className="btn-primary"
                    onClick={() => setAddProjectOpen(true)}
                  >
                    Add Project
                  </Button>
                </div>
              }
              headStyle={{ borderBottom: '1px solid #1e2a3d', padding: '12px 20px' }}
            >
              <div style={{ padding: '0 20px' }}>
                <Tabs
                  size="small"
                  activeKey={projectTab}
                  onChange={setProjectTab}
                  items={[
                    { key: 'my', label: 'My Projects' },
                    { key: 'sales', label: 'Sales Team Projects' },
                  ]}
                />
                <div style={{
                  border: '2px dashed #1e2a3d', borderRadius: 10,
                  padding: '48px 24px', textAlign: 'center',
                  marginTop: 4,
                }}>
                  <ProjectOutlined style={{ fontSize: 32, color: '#1e2a3d', marginBottom: 12 }} />
                  <Text style={{ color: '#4b5563', display: 'block' }}>No projects found</Text>
                  <Text style={{ color: '#2d3d52', fontSize: 12, display: 'block', marginTop: 4 }}>
                    Click "Add Project" to create your first project
                  </Text>
                </div>
              </div>
            </Card>
          ) : (
            <Card style={{ background: '#131c2e', border: '1px solid #1e2a3d' }} bodyStyle={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <RiseOutlined style={{ color: '#22c55e', fontSize: 18 }} />
                </div>
                <div>
                  <Text style={{ color: '#e6edf3', fontWeight: 600 }}>Accountant Dashboard</Text>
                  <Text style={{ color: '#4b5563', fontSize: 12, display: 'block' }}>
                    View and manage your organization's financial records
                  </Text>
                </div>
              </div>
            </Card>
          )}
        </Col>

        {/* Right column */}
        <Col style={{ width: 268, flexShrink: 0 }}>
          <ProfileCard name={userInfo.name} email={userInfo.email} />
          <CalendarWidget />
        </Col>
      </Row>

      <AddProjectModal open={addProjectOpen} onClose={() => setAddProjectOpen(false)} />
    </div>
  )
}
