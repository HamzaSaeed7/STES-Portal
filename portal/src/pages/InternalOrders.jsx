import { useState } from 'react'
import { Card, Row, Col, Button, Input, Modal, Select, Typography, Tag } from 'antd'
import {
  FilterOutlined, SearchOutlined,
  ClockCircleOutlined, InboxOutlined, CheckCircleOutlined, CloseCircleOutlined,
} from '@ant-design/icons'
import { internalOrders } from '../data/staticData'
import StatusBadge from '../components/Shared/StatusBadge'
import PageHeader from '../components/Shared/PageHeader'

const { Title, Text } = Typography

const STAT_ITEMS = [
  { label: 'Waiting for Internal Order', icon: <ClockCircleOutlined />, color: '#f59e0b', accent: 'stat-card-amber',  getValue: () => 0 },
  { label: 'Ready To Deliver',           icon: <InboxOutlined />,       color: '#3b82f6', accent: 'stat-card-blue',   getValue: () => 0 },
  { label: 'Completed',                  icon: <CheckCircleOutlined />, color: '#22c55e', accent: 'stat-card-green',  getValue: orders => orders.filter(o => o.status === 'Completed').length },
  { label: 'Orders Lost',                icon: <CloseCircleOutlined />, color: '#ef4444', accent: 'stat-card-red',    getValue: orders => orders.filter(o => o.status === 'Partial Delivery').length > 0 ? 1 : 0 },
]

function FilterModal({ open, onClose }) {
  return (
    <Modal open={open} onCancel={onClose} footer={null}
      title={<span style={{ color: '#e6edf3', fontWeight: 700 }}>Apply Filters</span>}
      width={380}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
        <Input size="large" placeholder="Search by Package Name" />
        <Input size="large" placeholder="Search by Project Name" />
        <Select size="large" placeholder="Filter by Status" style={{ width: '100%' }} allowClear
          options={[
            { value: 'Completed', label: 'Completed' },
            { value: 'Partial Delivery', label: 'Partial Delivery' },
            { value: 'Pending', label: 'Pending' },
          ]}
        />
        <Button type="primary" block size="large" className="btn-primary" onClick={onClose}>
          Show Results
        </Button>
      </div>
    </Modal>
  )
}

function OrderCard({ order, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className="order-card-item"
      style={{
        background: active ? '#1a2235' : '#0e1829',
        border: `1px solid ${active ? '#22c55e40' : '#1e2a3d'}`,
        borderLeft: `3px solid ${active ? '#22c55e' : 'transparent'}`,
        borderRadius: 8,
        padding: '12px 14px',
        marginBottom: 8,
        cursor: 'pointer',
        transition: 'all 0.18s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <Text style={{ color: '#e6edf3', fontWeight: 600, fontSize: 13 }}>{order.projectDetails}</Text>
        <StatusBadge status={order.status} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 8px' }}>
        {[['Region', order.region], ['Subject', order.subject], ['Client', order.client]].map(([k, v]) => (
          <Text key={k} style={{ color: '#4b5563', fontSize: 11 }}>
            <span style={{ color: '#374151' }}>{k}: </span>{v}
          </Text>
        ))}
      </div>
      <Text style={{ color: '#2d3d52', fontSize: 10, display: 'block', marginTop: 6 }}>
        Created {order.creationDate}
      </Text>
    </div>
  )
}

export default function InternalOrders() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = internalOrders.filter(o =>
    o.projectDetails.toLowerCase().includes(search.toLowerCase()) ||
    o.client.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <PageHeader title="Orders" subtitle="Track and manage internal orders" />

      {/* Stats */}
      <Row gutter={[14, 14]} style={{ marginBottom: 24 }}>
        {STAT_ITEMS.map(item => (
          <Col span={6} key={item.label}>
            <Card
              className={item.accent}
              bodyStyle={{ padding: '16px 20px' }}
              style={{ background: '#131c2e', border: '1px solid #1e2a3d' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: item.color + '18', border: `1px solid ${item.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, color: item.color, flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ color: '#e6edf3', fontWeight: 800, fontSize: 24, lineHeight: 1 }}>
                    {item.getValue(internalOrders)}
                  </div>
                  <Text style={{ color: '#4b5563', fontSize: 11, display: 'block', marginTop: 3 }}>
                    {item.label}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Orders */}
      <Card style={{ background: '#131c2e', border: '1px solid #1e2a3d' }} bodyStyle={{ padding: 20 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <Input
            placeholder="Search orders..."
            prefix={<SearchOutlined style={{ color: '#4b5563' }} />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: 260 }}
            allowClear
          />
          <Button icon={<FilterOutlined />} onClick={() => setFilterOpen(true)}>Filters</Button>
        </div>

        <Row gutter={20}>
          <Col span={10}>
            {filtered.map(order => (
              <OrderCard key={order.id} order={order} active={selected?.id === order.id} onClick={() => setSelected(order)} />
            ))}
          </Col>

          <Col span={14}>
            {selected ? (
              <Card style={{ background: '#0e1829', border: '1px solid #1e2a3d', borderRadius: 10 }} bodyStyle={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <Title level={5} style={{ color: '#e6edf3', margin: 0 }}>{selected.projectDetails}</Title>
                  <StatusBadge status={selected.status} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[['Region', selected.region], ['Subject', selected.subject], ['Client', selected.client], ['Creation Date', selected.creationDate]].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: 10, padding: '8px 12px', background: '#131c2e', borderRadius: 8 }}>
                      <Text style={{ color: '#4b5563', width: 110, flexShrink: 0, fontSize: 13 }}>{k}</Text>
                      <Text style={{ color: '#e6edf3', fontSize: 13 }}>{v}</Text>
                    </div>
                  ))}
                </div>
              </Card>
            ) : (
              <div style={{
                height: '100%', minHeight: 220,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                border: '2px dashed #1e2a3d', borderRadius: 10,
              }}>
                <InboxOutlined style={{ fontSize: 36, color: '#1e2a3d', marginBottom: 10 }} />
                <Text style={{ color: '#4b5563', textAlign: 'center', fontSize: 13 }}>
                  Select an order to view its details
                </Text>
              </div>
            )}
          </Col>
        </Row>
      </Card>

      <FilterModal open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  )
}
