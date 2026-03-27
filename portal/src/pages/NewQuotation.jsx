import { useState } from 'react'
import { Form, Input, Button, Select, Table, Modal, Typography, Row, Col, Card, Divider } from 'antd'
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography
const { TextArea } = Input

// ── Dropdown options ──────────────────────────────────────────────
const STATUS_OPTIONS = ['Normal', 'Review', 'reply', 'Urgent', 'Remarks'].map(v => ({ value: v, label: v }))
const CATEGORY_OPTIONS = ['Indoor', 'Façade Lighting', 'Outdoor', 'Other'].map(v => ({ value: v, label: v }))
const WATTAGE_OPTIONS = ['14W', '15W', '18W', '24W', 'Other'].map(v => ({ value: v, label: v }))
const COLOR_TEMP_OPTIONS = ['2700K', '3000K', '3500K', '4000K', '5000K', '5700K', '6000K', '6500K', 'RGB', 'Nill'].map(v => ({ value: v, label: v }))
const QUOTATION_FOR_OPTIONS = [
  { value: 'Hertz Solutions', label: 'Hertz Solutions' },
  { value: 'STES Solutions', label: 'STES Solutions' },
]

const DEFAULT_TERMS = [
  { key: '1', label: 'Delivery Schedule', value: '13-15 Working Weeks after confirmation of the order along with advance' },
  { key: '2', label: 'Prices', value: 'FOB Site These are special discounted prices and cannot be taken as reference' },
  { key: '3', label: 'Validity', value: '4-5 Days' },
  { key: '4', label: 'Payment Terms', value: '100% advance before delivery' },
  { key: '5', label: 'Income Tax', value: 'Above mentioned goods will be imported under tax layout U/S 148 and 153 of Income Tax Ordinance 2001. Income Tax will be paid at the time of Import. Thankful you will not deduct our Income tax.' },
  { key: '6', label: 'Tax and duties', value: 'Our prices are based on current duties, taxes, exchange rates and levies applicable in Pakistan at the date of offer submission. In case of any change in legislation resulting in additional or new duties or taxes, exchange rate having any impact on the price, the client shall pay the additional amount to the contractor.' },
  { key: '7', label: 'Others', value: 'Force majeur clause is applicable, Part payment / part delivery is allowed.' },
]

// ── Add Custom Item Modal ─────────────────────────────────────────
function AddCustomItemModal({ open, onClose, onAdd }) {
  const [form] = Form.useForm()
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={<span style={{ color: '#111827', fontWeight: 700 }}>Add Custom Item</span>}
      width={420}
    >
      <Form form={form} layout="vertical" style={{ marginTop: 8 }}>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="category" label="Category">
              <Select options={CATEGORY_OPTIONS} placeholder="e.g. External" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="subCategory" label="Sub-Category">
              <Input placeholder="Sub-category" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="model" label="Model">
          <Input placeholder="Model name" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input placeholder="Item description" />
        </Form.Item>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="wattage" label="Wattage">
              <Select options={WATTAGE_OPTIONS} placeholder="e.g. 18W" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="colorTemp" label="Color Temperature">
              <Select options={COLOR_TEMP_OPTIONS} placeholder="e.g. 3000K" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="quantity" label="Quantity">
              <Input type="number" placeholder="0" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="price" label="Price (PKR)">
              <Input type="number" placeholder="0" />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <Button onClick={() => { form.resetFields(); onClose() }}>Cancel</Button>
          <Button
            type="primary"
            className="btn-primary"
            onClick={() => {
              const vals = form.getFieldsValue()
              onAdd(vals)
              form.resetFields()
              onClose()
            }}
          >
            Add Item
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

// ── Main page ─────────────────────────────────────────────────────
export default function NewQuotation() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [itemForm] = Form.useForm()
  const [quotationFor, setQuotationFor] = useState('Hertz Solutions')
  const [items, setItems] = useState([])
  const [terms, setTerms] = useState(DEFAULT_TERMS)
  const [customItemOpen, setCustomItemOpen] = useState(false)

  const addItem = () => {
    const vals = itemForm.getFieldsValue()
    if (!vals.category && !vals.model) return
    setItems(prev => [...prev, {
      key: Date.now().toString(),
      category: vals.category || '',
      subCategory: vals.subCategory || '',
      model: vals.model || '',
      wattage: vals.wattage || '',
      colorTemp: vals.colorTemp || '',
      quantity: vals.quantity || 0,
      description: '',
    }])
    itemForm.resetFields()
  }

  const addCustomItem = (vals) => {
    setItems(prev => [...prev, { key: Date.now().toString(), ...vals }])
  }

  const removeItem = (key) => setItems(prev => prev.filter(i => i.key !== key))

  const updateTerm = (key, field, value) => {
    setTerms(prev => prev.map(t => t.key === key ? { ...t, [field]: value } : t))
  }
  const removeTerm = (key) => setTerms(prev => prev.filter(t => t.key !== key))
  const addTerm = () => setTerms(prev => [...prev, {
    key: Date.now().toString(), label: '', value: '',
  }])

  const itemColumns = [
    { title: 'Category', dataIndex: 'category', width: 110, render: v => <Text style={{ color: '#6b7280', fontSize: 12 }}>{v}</Text> },
    { title: 'Sub-Category', dataIndex: 'subCategory', width: 110, render: v => <Text style={{ color: '#9ca3af', fontSize: 12 }}>{v}</Text> },
    { title: 'Model', dataIndex: 'model', render: v => <Text style={{ color: '#111827', fontWeight: 600, fontSize: 12 }}>{v}</Text> },
    { title: 'Wattage', dataIndex: 'wattage', width: 80, render: v => <Text style={{ color: '#6b7280', fontSize: 12 }}>{v}</Text> },
    { title: 'Color Temp', dataIndex: 'colorTemp', width: 90, render: v => <Text style={{ color: '#6b7280', fontSize: 12 }}>{v}</Text> },
    { title: 'Qty', dataIndex: 'quantity', width: 60, render: v => <Text style={{ color: '#111827', fontSize: 12 }}>{v}</Text> },
    {
      title: '', width: 40,
      render: (_, record) => (
        <Button type="text" size="small" icon={<DeleteOutlined />}
          style={{ color: '#ef4444' }}
          onClick={() => removeItem(record.key)}
        />
      ),
    },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button type="text" icon={<ArrowLeftOutlined />}
            style={{ color: '#9ca3af' }}
            onClick={() => navigate('/quotations')}
          />
          <Title level={2} style={{ color: '#22c55e', margin: 0, fontWeight: 800, fontSize: 22 }}>
            New Quotation
          </Title>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Select
            value={quotationFor}
            onChange={setQuotationFor}
            options={QUOTATION_FOR_OPTIONS}
            style={{ width: 160 }}
            size="large"
          />
          <Button
            icon={<AppstoreAddOutlined />}
            size="large"
            style={{ borderColor: '#22c55e', color: '#22c55e' }}
            onClick={() => setCustomItemOpen(true)}
          >
            Customized Items
          </Button>
        </div>
      </div>

      {/* Header fields */}
      <Card style={{ background: '#ffffff', border: '1px solid #e5e7eb', marginBottom: 16 }} bodyStyle={{ padding: '20px 24px 8px' }}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item label="Attention Person" name="attentionPerson">
                <Input placeholder="Person name" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Client" name="client">
                <Input placeholder="Client name" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Project Name" name="projectName">
                <Input placeholder="Project name" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Subject" name="subject">
                <Input placeholder="Subject" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Status" name="status" initialValue="Normal">
                <Select options={STATUS_OPTIONS} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Add Item row */}
      <Card style={{ background: '#ffffff', border: '1px solid #e5e7eb', marginBottom: 16 }} bodyStyle={{ padding: '16px 24px' }}>
        <Form form={itemForm} layout="vertical">
          <Row gutter={12} align="bottom">
            <Col flex="1">
              <Form.Item label="Category" name="category" style={{ marginBottom: 0 }}>
                <Select options={CATEGORY_OPTIONS} placeholder="e.g., Indoor" />
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Sub-Category" name="subCategory" style={{ marginBottom: 0 }}>
                <Input placeholder="Select sub-category" />
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Model" name="model" style={{ marginBottom: 0 }}>
                <Input placeholder="e.g., M16" />
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Wattage" name="wattage" style={{ marginBottom: 0 }}>
                <Select options={WATTAGE_OPTIONS} placeholder="e.g. 18W" />
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Color Temperature" name="colorTemp" style={{ marginBottom: 0 }}>
                <Select options={COLOR_TEMP_OPTIONS} placeholder="e.g. 3000K" />
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Quantity" name="quantity" style={{ marginBottom: 0 }}>
                <Input type="number" placeholder="0" />
              </Form.Item>
            </Col>
            <Col>
              <Button
                type="primary"
                className="btn-primary"
                icon={<PlusOutlined />}
                onClick={addItem}
                style={{ marginBottom: 0 }}
              >
                Add Item
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Items table */}
        {items.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <Table
              dataSource={items}
              columns={itemColumns}
              rowKey="key"
              pagination={false}
              size="small"
            />
          </div>
        )}
      </Card>

      {/* Description */}
      <Card style={{ background: '#ffffff', border: '1px solid #e5e7eb', marginBottom: 16 }} bodyStyle={{ padding: '16px 24px' }}>
        <Form layout="vertical">
          <Form.Item label="Description" style={{ marginBottom: 0 }}>
            <TextArea
              rows={2}
              defaultValue="Reference to your inquiry, please find below our best possible prices along with technical details."
            />
          </Form.Item>
        </Form>
      </Card>

      {/* Terms and Conditions */}
      <Card style={{ background: '#ffffff', border: '1px solid #e5e7eb', marginBottom: 24 }} bodyStyle={{ padding: 0 }}>
        <div style={{
          padding: '12px 24px',
          background: '#f3f4f6',
          borderRadius: '8px 8px 0 0',
          fontWeight: 700, color: '#111827', fontSize: 14,
        }}>
          Terms and Conditions
        </div>

        <div style={{ padding: '8px 0' }}>
          {terms.map((term, idx) => (
            <div key={term.key} style={{
              display: 'flex', alignItems: 'flex-start', gap: 0,
              borderBottom: '1px solid #e5e7eb',
              minHeight: 44,
            }}>
              {/* Label */}
              <div style={{
                width: 180, flexShrink: 0,
                padding: '10px 16px',
                borderRight: '1px solid #e5e7eb',
                background: idx % 2 === 0 ? '#f9fafb' : '#ffffff',
              }}>
                <Input
                  variant="borderless"
                  value={term.label}
                  onChange={e => updateTerm(term.key, 'label', e.target.value)}
                  style={{ color: '#6b7280', fontSize: 13, fontWeight: 600, padding: 0 }}
                  placeholder="Label"
                />
              </div>
              {/* Value */}
              <div style={{ flex: 1, padding: '10px 16px', background: idx % 2 === 0 ? '#f9fafb' : '#ffffff' }}>
                <Input.TextArea
                  variant="borderless"
                  value={term.value}
                  onChange={e => updateTerm(term.key, 'value', e.target.value)}
                  autoSize={{ minRows: 1 }}
                  style={{ color: '#9ca3af', fontSize: 12, padding: 0, resize: 'none' }}
                  placeholder="Term description"
                />
              </div>
              {/* Delete */}
              <div style={{
                width: 40, flexShrink: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: idx % 2 === 0 ? '#f9fafb' : '#ffffff',
                borderLeft: '1px solid #e5e7eb',
                padding: '10px 8px',
              }}>
                <Button type="text" size="small" icon={<DeleteOutlined />}
                  style={{ color: '#ef4444' }}
                  onClick={() => removeTerm(term.key)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add term row */}
        <div style={{ padding: '10px 24px' }}>
          <Button type="dashed" icon={<PlusOutlined />} onClick={addTerm}
            style={{ borderColor: '#e5e7eb', color: '#9ca3af' }}
          >
            ADD
          </Button>
        </div>
      </Card>

      {/* Action buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <Button size="large" style={{ minWidth: 140, borderColor: '#e5e7eb' }}
          onClick={() => navigate('/quotations')}
        >
          Save as Draft
        </Button>
        <Button
          type="primary"
          size="large"
          className="btn-primary"
          style={{ minWidth: 180 }}
          onClick={() => navigate('/quotations')}
        >
          Generate Quotation
        </Button>
      </div>

      <AddCustomItemModal open={customItemOpen} onClose={() => setCustomItemOpen(false)} onAdd={addCustomItem} />
    </div>
  )
}
