import { useState } from 'react'
import { Table, Button, Input, Select, Drawer, Form, Modal, Space, Typography, Row, Col, Card, Tag } from 'antd'
import { EditOutlined, DeleteOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { stockItems } from '../data/staticData'
import PageHeader from '../components/Shared/PageHeader'

const { Title, Text } = Typography

const SUB_CATEGORY_OPTIONS = [
  'Street Light','Flood Light','MR','Recessed Down Light','Surface Down Light','Spot Light',
  'Panel Light','Button Light','High Bay Light','Strip Light','Cylinder','Up & Down',
  'Outdoor Wall Light','Surface Ceiling Light','Boulbound','Track Light','Multiple Light',
  'Emergency/Exit Light','Inground LED Light','Bollard Light','Obstruction Light',
  'Cutoff Box','Bollard','IP-65 Linear Light','Underwater Light',
].map(v => ({ value: v, label: v }))

function UpdateDrawer({ open, item, onClose }) {
  const [form] = Form.useForm()
  if (item) form.setFieldsValue({
    modelName: item.model, subCategory: item.subCategory,
    description: item.description, colorTemp: '', wattage: '', price: '', currentStock: item.openingStock,
  })
  return (
    <Drawer open={open} onClose={onClose} width={360}
      title={
        <div>
          <Text style={{ color: '#e6edf3', fontWeight: 700, fontSize: 15 }}>Stock Update</Text>
          {item && (
            <div style={{ marginTop: 4 }}>
              <Tag color="green" style={{ fontSize: 11 }}>{item.category}</Tag>
              <Text style={{ color: '#4b5563', fontSize: 11, marginLeft: 4 }}>
                Last updated Oct 18, 2024
              </Text>
            </div>
          )}
        </div>
      }
      styles={{
        body: { background: '#0e1829', padding: 20 },
        header: { background: '#131c2e', borderBottom: '1px solid #1e2a3d' },
      }}
    >
      <Form form={form} layout="vertical">
        <Row gutter={12}>
          <Col span={14}><Form.Item label="Model Name" name="modelName"><Input /></Form.Item></Col>
          <Col span={10}><Form.Item label="Sub Category" name="subCategory"><Input /></Form.Item></Col>
        </Row>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Row gutter={12}>
          <Col span={12}><Form.Item label="Color Temp (K)" name="colorTemp"><Input /></Form.Item></Col>
          <Col span={12}><Form.Item label="Wattage (W)" name="wattage"><Input /></Form.Item></Col>
        </Row>
        <Form.Item label="Price (PKR)" name="price"><Input /></Form.Item>
        <Form.Item label="Current Stock" name="currentStock"><Input /></Form.Item>
        <Button type="primary" block size="large" className="btn-primary" onClick={onClose}>
          Update Stock
        </Button>
      </Form>
    </Drawer>
  )
}

function DeleteModal({ open, item, onClose }) {
  return (
    <Modal open={open} onCancel={onClose} footer={null} centered width={380}>
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px', fontSize: 24,
        }}>
          🗑️
        </div>
        <Title level={5} style={{ color: '#e6edf3' }}>Delete {item?.model}?</Title>
        <Text style={{ color: '#4b5563', fontSize: 13 }}>
          This will permanently remove <strong style={{ color: '#94a3b8' }}>{item?.model}</strong> from your stock inventory.
        </Text>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
          <Button size="large" onClick={onClose} style={{ minWidth: 100 }}>Cancel</Button>
          <Button size="large" danger type="primary" onClick={onClose} style={{ minWidth: 100 }}>Delete</Button>
        </div>
      </div>
    </Modal>
  )
}

export default function Stock() {
  const [filters, setFilters] = useState({ category: '', subCategory: '', model: '' })
  const [editItem, setEditItem] = useState(null)
  const [deleteItem, setDeleteItem] = useState(null)

  const resetFilters = () => setFilters({ category: '', subCategory: '', model: '' })

  const filtered = stockItems.filter(item =>
    (!filters.category || item.category.toLowerCase().includes(filters.category.toLowerCase())) &&
    (!filters.subCategory || item.subCategory === filters.subCategory) &&
    (!filters.model || item.model.toLowerCase().includes(filters.model.toLowerCase()))
  )

  const columns = [
    { title: '#', render: (_, __, i) => <Text style={{ color: '#4b5563', fontWeight: 600 }}>{i + 1}</Text>, width: 50 },
    {
      title: 'Category', dataIndex: 'category',
      render: v => <Tag color={v === 'Outdoor' ? 'blue' : 'purple'} style={{ borderRadius: 6 }}>{v}</Tag>,
      width: 100,
    },
    { title: 'Model', dataIndex: 'model', render: v => <Text style={{ color: '#e6edf3', fontWeight: 600 }}>{v}</Text> },
    { title: 'Sub-category', dataIndex: 'subCategory', render: v => <Text style={{ color: '#64748b' }}>{v}</Text> },
    { title: 'Description', dataIndex: 'description', render: v => <Text style={{ color: '#4b5563', fontSize: 12 }}>{v}</Text>, ellipsis: true },
    {
      title: 'Opening Stock', dataIndex: 'openingStock',
      render: v => <Text style={{ color: '#e6edf3', fontWeight: 600 }}>{v}</Text>, width: 110,
    },
    {
      title: 'Delivered', dataIndex: 'stockDelivered',
      render: v => <Text style={{ color: v > 0 ? '#22c55e' : '#4b5563' }}>{v}</Text>, width: 90,
    },
    {
      title: 'On Hold', dataIndex: 'stockOnHold',
      render: v => <Text style={{ color: v > 0 ? '#f59e0b' : '#4b5563' }}>{v}</Text>, width: 80,
    },
    {
      title: '', width: 72,
      render: (_, record) => (
        <Space size={4}>
          <Button type="text" size="small" icon={<EditOutlined />}
            style={{ color: '#22c55e', background: 'rgba(34,197,94,0.08)', borderRadius: 6 }}
            onClick={() => setEditItem(record)}
          />
          <Button type="text" size="small" icon={<DeleteOutlined />}
            style={{ color: '#ef4444', background: 'rgba(239,68,68,0.08)', borderRadius: 6 }}
            onClick={() => setDeleteItem(record)}
          />
        </Space>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="Stock"
        subtitle={`${filtered.length} items in inventory`}
      />

      <Card style={{ background: '#131c2e', border: '1px solid #1e2a3d' }} bodyStyle={{ padding: 0 }}>
        <div className="filter-bar" style={{ margin: 0, borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none', borderBottom: '1px solid #1e2a3d', padding: '14px 20px' }}>
          <Input
            placeholder="Search by Category"
            prefix={<SearchOutlined style={{ color: '#4b5563' }} />}
            style={{ width: 170 }} value={filters.category}
            onChange={e => setFilters(f => ({ ...f, category: e.target.value }))} allowClear
          />
          <Select
            placeholder="Sub-category"
            style={{ width: 190 }} allowClear
            options={SUB_CATEGORY_OPTIONS}
            value={filters.subCategory || undefined}
            onChange={v => setFilters(f => ({ ...f, subCategory: v || '' }))}
          />
          <Input
            placeholder="Search by Model"
            style={{ width: 170 }} value={filters.model}
            onChange={e => setFilters(f => ({ ...f, model: e.target.value }))} allowClear
          />
          <Button icon={<ReloadOutlined />} onClick={resetFilters}>Reset Filters</Button>
        </div>

        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 20, style: { padding: '12px 20px' } }}
          scroll={{ x: 900 }}
          size="small"
        />
      </Card>

      <UpdateDrawer open={!!editItem} item={editItem} onClose={() => setEditItem(null)} />
      <DeleteModal open={!!deleteItem} item={deleteItem} onClose={() => setDeleteItem(null)} />
    </div>
  )
}
