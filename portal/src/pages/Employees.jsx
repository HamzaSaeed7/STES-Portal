import { useState } from 'react'
import { Table, Button, Input, Modal, Form, Avatar, Tag, Space, Typography, Divider, Card, Select } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { employees as initialEmployees } from '../data/staticData'
import PageHeader from '../components/Shared/PageHeader'

const { Title, Text } = Typography

function EmployeeFormModal({ open, onClose, employee }) {
  const [form] = Form.useForm()
  const isEdit = !!employee

  const handleOpen = () => {
    if (isEdit) {
      form.setFieldsValue({
        fullName: employee.name,
        email: employee.email,
        phone: employee.phone,
        designation: employee.role,
        userRole: employee.role,
      })
    } else {
      form.resetFields()
    }
  }

  return (
    <Modal
      open={open}
      onCancel={() => { form.resetFields(); onClose() }}
      footer={null}
      afterOpenChange={visible => { if (visible) handleOpen() }}
      title={
        <span style={{ color: '#111827', fontWeight: 700 }}>
          {isEdit ? 'Edit Employee' : 'Invite Employee'}
        </span>
      }
    >
      <Text style={{ color: '#9ca3af', fontSize: 13, display: 'block', marginBottom: 20 }}>
        {isEdit ? 'Update the information for this employee' : 'Add the following information about the new user'}
      </Text>
      <Form form={form} layout="vertical">
        <Form.Item name="fullName" label="Full Name"><Input placeholder="Full Name" size="large" /></Form.Item>
        <Form.Item name="email" label="Email"><Input placeholder="Email address" size="large" /></Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input addonBefore="+92" placeholder="300 0000000" size="large" />
        </Form.Item>
        <Form.Item name="designation" label="Designation"><Input placeholder="e.g. Sales Executive" size="large" /></Form.Item>
        <Form.Item name="userRole" label="User Role">
          <Select placeholder="Select a role" size="large"
            options={[
              { value: 'Accountant', label: 'Accountant' },
              { value: 'Manager', label: 'Manager' },
              { value: 'Sales Person', label: 'Sales Person' },
            ]}
          />
        </Form.Item>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <Button onClick={() => { form.resetFields(); onClose() }}>Cancel</Button>
          <Button type="primary" className="btn-primary"
            onClick={() => { form.resetFields(); onClose() }}>
            {isEdit ? 'Save Changes' : 'Send Invite'}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

function DeleteModal({ open, employee, onClose }) {
  return (
    <Modal open={open} onCancel={onClose} footer={null} centered width={400}>
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px', fontSize: 24,
        }}>
          🗑️
        </div>
        <Title level={5} style={{ color: '#111827', marginBottom: 6 }}>
          Remove {employee?.name}?
        </Title>
        <Text style={{ color: '#9ca3af', fontSize: 13 }}>
          This will remove <strong style={{ color: '#6b7280' }}>{employee?.name}</strong> from your
          organization permanently.
        </Text>
        <Tag color="blue" style={{ marginTop: 8 }}>{employee?.role}</Tag>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
          <Button size="large" onClick={onClose} style={{ minWidth: 100 }}>Cancel</Button>
          <Button size="large" danger type="primary" onClick={onClose} style={{ minWidth: 100 }}>Delete</Button>
        </div>
      </div>
    </Modal>
  )
}

function ViewModal({ open, employee, onClose }) {
  if (!employee) return null
  return (
    <Modal open={open} onCancel={onClose} footer={null} width={380} title={null}>
      <div style={{ textAlign: 'center', padding: '16px 0 20px' }}>
        <Avatar size={72} style={{
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          fontSize: 22, fontWeight: 700, marginBottom: 12,
        }}>
          {employee.name.slice(0, 2).toUpperCase()}
        </Avatar>
        <Title level={5} style={{ color: '#111827', margin: '0 0 6px' }}>{employee.name}</Title>
        <Tag color="green">{employee.role}</Tag>
      </div>
      <Divider style={{ borderColor: '#e5e7eb', margin: '8px 0 16px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          ['E-mail', employee.email],
          ['Joining Date', employee.joiningDate],
          ['Phone Number', employee.phone],
          ['Address', employee.address],
          ['Invited By', employee.invitedBy],
        ].map(([label, value]) => (
          <div key={label} style={{
            display: 'flex', gap: 10, padding: '8px 12px',
            background: '#f9fafb', borderRadius: 8,
          }}>
            <Text style={{ color: '#9ca3af', width: 100, flexShrink: 0, fontSize: 12 }}>{label}</Text>
            <Text style={{ color: '#111827', fontSize: 12 }}>{value}</Text>
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default function Employees() {
  const [search, setSearch] = useState('')
  const [inviteOpen, setInviteOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [viewTarget, setViewTarget] = useState(null)

  const filtered = initialEmployees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    {
      title: 'Employee Name',
      dataIndex: 'name',
      render: name => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar size={32} style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', fontSize: 11, fontWeight: 700 }}>
            {name.slice(0, 2).toUpperCase()}
          </Avatar>
          <Text style={{ color: '#111827', fontWeight: 500 }}>{name}</Text>
        </div>
      ),
    },
    { title: 'Email', dataIndex: 'email', render: v => <Text style={{ color: '#9ca3af' }}>{v}</Text> },
    { title: 'Employee Code', dataIndex: 'code', render: v => <Text style={{ color: '#6b7280' }}>{v}</Text> },
    {
      title: 'Role', dataIndex: 'role',
      render: v => <Tag color="blue" style={{ borderRadius: 6 }}>{v}</Tag>,
    },
    {
      title: 'Status', dataIndex: 'status',
      render: v => <Tag color={v === 'yes' ? 'success' : 'default'} style={{ borderRadius: 6 }}>{v === 'yes' ? 'Active' : 'Inactive'}</Tag>,
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space size={4}>
          <Button type="text" size="small" icon={<EditOutlined />}
            style={{ color: '#22c55e', background: 'rgba(34,197,94,0.08)', borderRadius: 6 }}
            onClick={() => setEditTarget(record)}
          />
          <Button type="text" size="small" icon={<DeleteOutlined />}
            style={{ color: '#ef4444', background: 'rgba(239,68,68,0.08)', borderRadius: 6 }}
            onClick={() => setDeleteTarget(record)}
          />
          <Button type="text" size="small" icon={<EyeOutlined />}
            style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.08)', borderRadius: 6 }}
            onClick={() => setViewTarget(record)}
          />
        </Space>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="Employees"
        subtitle={`${filtered.length} member${filtered.length !== 1 ? 's' : ''} in your organization`}
        extra={
          <Button type="primary" icon={<PlusOutlined />} className="btn-primary" onClick={() => setInviteOpen(true)}>
            Invite Employee
          </Button>
        }
      />

      <Card style={{ background: '#ffffff', border: '1px solid #e5e7eb' }} bodyStyle={{ padding: 0 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
          <Input
            placeholder="Search employees by name..."
            prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: 320 }}
            size="large"
            allowClear
          />
        </div>
        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="id"
          pagination={false}
          scroll={{ x: 'max-content' }}
          style={{ background: 'transparent' }}
        />
      </Card>

      <EmployeeFormModal open={inviteOpen} onClose={() => setInviteOpen(false)} employee={null} />
      <EmployeeFormModal open={!!editTarget} onClose={() => setEditTarget(null)} employee={editTarget} />
      <DeleteModal open={!!deleteTarget} employee={deleteTarget} onClose={() => setDeleteTarget(null)} />
      <ViewModal open={!!viewTarget} employee={viewTarget} onClose={() => setViewTarget(null)} />
    </div>
  )
}
