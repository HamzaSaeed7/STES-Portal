import { useState } from 'react'
import { Button, Drawer, Form, Input, Checkbox, Select, Typography, Card } from 'antd'
import { BulbOutlined, FileTextOutlined, EditOutlined } from '@ant-design/icons'
import PageHeader from '../components/Shared/PageHeader'

const { Text } = Typography
const WEEKDAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

function ActivityLogDrawer({ open, onClose }) {
  const [form] = Form.useForm()
  return (
    <Drawer open={open} onClose={onClose}
      title={<span style={{ color: '#e6edf3', fontWeight: 700 }}>Activity Log</span>}
      width={340}
      styles={{
        body: { background: '#0e1829', padding: 20 },
        header: { background: '#131c2e', borderBottom: '1px solid #1e2a3d' },
        footer: { background: '#131c2e', borderTop: '1px solid #1e2a3d', padding: '14px 20px' },
      }}
      footer={
        <Button type="primary" block size="large" className="btn-primary"
          onClick={() => { form.resetFields(); onClose() }}>
          Submit Activity
        </Button>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item name="weekday" label="Weekday">
          <Select options={WEEKDAYS.map(d => ({ value: d, label: d }))} placeholder="Select day" size="large" />
        </Form.Item>
        <Form.Item name="concept" label="Concept">
          <Input placeholder="Activity concept" size="large" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} placeholder="Describe the activity..." />
        </Form.Item>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '12px 0' }}>
          <Form.Item name="followUp" valuePropName="checked" style={{ margin: 0 }}>
            <Checkbox style={{ color: '#94a3b8' }}>Follow up on Calls</Checkbox>
          </Form.Item>
          <Form.Item name="visits" valuePropName="checked" style={{ margin: 0 }}>
            <Checkbox style={{ color: '#94a3b8' }}>Visits</Checkbox>
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  )
}

export default function Reports() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="View and generate your activity reports"
        extra={
          <div style={{ display: 'flex', gap: 10 }}>
            <Button icon={<FileTextOutlined />}>Generate Weekly Report</Button>
            <Button type="primary" icon={<EditOutlined />} className="btn-primary" onClick={() => setDrawerOpen(true)}>
              Activity Log
            </Button>
          </div>
        }
      />

      <Card style={{ background: '#131c2e', border: '1px solid #1e2a3d', minHeight: 320 }}
        bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}
      >
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16,
        }}>
          <BulbOutlined style={{ fontSize: 32, color: '#3b82f6' }} />
        </div>
        <Text style={{ color: '#e6edf3', fontWeight: 600, fontSize: 15, display: 'block', marginBottom: 6 }}>
          No Reports Yet
        </Text>
        <Text style={{ color: '#4b5563', fontSize: 13, textAlign: 'center', maxWidth: 340 }}>
          Add your activity by filling the form after clicking "Activity Log"
        </Text>
        <Button
          type="primary"
          icon={<EditOutlined />}
          className="btn-primary"
          style={{ marginTop: 20 }}
          onClick={() => setDrawerOpen(true)}
        >
          Add Activity Log
        </Button>
      </Card>

      <ActivityLogDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
