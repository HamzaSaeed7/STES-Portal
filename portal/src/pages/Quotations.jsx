import { useState } from 'react'
import { Table, Button, Input, DatePicker, Select, Tabs, Typography, Card, Space } from 'antd'
import { EyeOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { quotations } from '../data/staticData'
import StatusBadge from '../components/Shared/StatusBadge'
import PageHeader from '../components/Shared/PageHeader'

const { Text } = Typography

export default function Quotations() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('current')
  const [filters, setFilters] = useState({ invoice: '', client: '', project: '', for: '' })

  const resetFilters = () => setFilters({ invoice: '', client: '', project: '', for: '' })

  const columns = [
    {
      title: '#', render: (_, __, i) => (
        <Text style={{ color: '#9ca3af', fontWeight: 600 }}>{i + 1}</Text>
      ), width: 48,
    },
    {
      title: 'Invoice Number', dataIndex: 'invoiceNumber',
      render: v => <Text style={{ color: '#111827', fontWeight: 600, fontFamily: 'monospace' }}>{v}</Text>,
    },
    { title: 'Client Name', dataIndex: 'clientName', render: v => <Text style={{ color: '#6b7280' }}>{v}</Text> },
    { title: 'Project', dataIndex: 'project', render: v => <Text style={{ color: '#9ca3af' }}>{v}</Text> },
    { title: 'Quotation For', dataIndex: 'quotationFor', render: v => <Text style={{ color: '#9ca3af' }}>{v}</Text> },
    { title: 'Date', dataIndex: 'date', render: v => <Text style={{ color: '#9ca3af', fontSize: 12 }}>{v}</Text> },
    { title: 'Status', dataIndex: 'status', render: v => <StatusBadge status={v} /> },
    {
      title: 'Action', width: 60,
      render: (_, record) => (
        <Button type="text" size="small" icon={<EyeOutlined />}
          style={{ color: '#22c55e', background: 'rgba(34,197,94,0.08)', borderRadius: 6 }}
          onClick={() => navigate(`/quotations/${record.id}/document`)}
        />
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="Quote Generation"
        subtitle="Manage and track your quotations"
        extra={
          <Button type="primary" icon={<PlusOutlined />} className="btn-primary" onClick={() => navigate('/quotations/new')}>
            Create New Quotation
          </Button>
        }
      />

      <Card style={{ background: '#ffffff', border: '1px solid #e5e7eb' }} bodyStyle={{ padding: 0 }}>
        <div style={{ padding: '0 20px', borderBottom: '1px solid #e5e7eb' }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              { key: 'current', label: 'Current Quotations' },
              { key: 'deleted', label: 'Deleted Quotations' },
            ]}
          />
        </div>

        {/* Filters */}
        <div className="filter-bar" style={{ margin: '16px 20px 0' }}>
          <div className="filter-bar-field">
            <span className="filter-bar-label">Invoice No.</span>
            <Input placeholder="e.g. STES241-17A" prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
              style={{ width: 170 }} value={filters.invoice}
              onChange={e => setFilters(f => ({ ...f, invoice: e.target.value }))} allowClear
            />
          </div>
          <div className="filter-bar-field">
            <span className="filter-bar-label">Client Name</span>
            <Input placeholder="Search client..." prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
              style={{ width: 160 }} value={filters.client}
              onChange={e => setFilters(f => ({ ...f, client: e.target.value }))} allowClear
            />
          </div>
          <div className="filter-bar-field">
            <span className="filter-bar-label">Project</span>
            <Input placeholder="Project name" style={{ width: 140 }} value={filters.project}
              onChange={e => setFilters(f => ({ ...f, project: e.target.value }))} allowClear
            />
          </div>
          <div className="filter-bar-field">
            <span className="filter-bar-label">Quotation For</span>
            <Select placeholder="All" style={{ width: 150 }} allowClear
              options={[
                { value: 'STES Solutions', label: 'STES Solutions' },
                { value: 'Hertz Solutions', label: 'Hertz Solutions' },
              ]}
            />
          </div>
          <div className="filter-bar-divider" />
          <div className="filter-bar-field">
            <span className="filter-bar-label">Start Date</span>
            <DatePicker placeholder="From" style={{ width: 130 }} />
          </div>
          <div className="filter-bar-field">
            <span className="filter-bar-label">End Date</span>
            <DatePicker placeholder="To" style={{ width: 130 }} />
          </div>
          <div className="filter-bar-divider" />
          <div style={{ alignSelf: 'flex-end' }}>
            <Button icon={<ReloadOutlined />} onClick={resetFilters}
              style={{ borderColor: '#e5e7eb', color: '#9ca3af' }}
            >
              Reset
            </Button>
          </div>
        </div>

        <div style={{ padding: '16px 0 0' }}>
          <Table
            dataSource={activeTab === 'current' ? quotations : []}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10, style: { padding: '12px 20px' } }}
            locale={{ emptyText: activeTab === 'deleted' ? 'No deleted quotations' : 'No quotations found' }}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </Card>
    </div>
  )
}
