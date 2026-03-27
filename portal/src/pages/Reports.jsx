import { useState } from 'react'
import { Button, Drawer, Form, Input, Checkbox, Select, Typography, Card, Tag, Avatar } from 'antd'
import { FileTextOutlined, EditOutlined, PhoneOutlined, EnvironmentOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons'
import PageHeader from '../components/Shared/PageHeader'
import { activityReports } from '../data/staticData'

const { Text } = Typography
const WEEKDAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

function ActivityLogDrawer({ open, onClose }) {
  const [form] = Form.useForm()
  return (
    <Drawer open={open} onClose={onClose}
      title={<span style={{ color: '#111827', fontWeight: 700 }}>Activity Log</span>}
      width={340}
      styles={{
        body: { background: '#f9fafb', padding: 20 },
        header: { background: '#ffffff', borderBottom: '1px solid #e5e7eb' },
        footer: { background: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '14px 20px' },
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
            <Checkbox style={{ color: '#6b7280' }}>Follow up on Calls</Checkbox>
          </Form.Item>
          <Form.Item name="visits" valuePropName="checked" style={{ margin: 0 }}>
            <Checkbox style={{ color: '#6b7280' }}>Visits</Checkbox>
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {activityReports.map(report => (
          <Card key={report.id}
            style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}
            bodyStyle={{ padding: '16px 20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
              {/* Left */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <Tag color="blue" style={{ borderRadius: 6, fontWeight: 600, fontSize: 11 }}>
                    {report.weekday}
                  </Tag>
                  {report.followUp && (
                    <Tag icon={<PhoneOutlined />} color="purple" style={{ borderRadius: 6, fontSize: 11 }}>
                      Follow-up
                    </Tag>
                  )}
                  {report.visits && (
                    <Tag icon={<EnvironmentOutlined />} color="cyan" style={{ borderRadius: 6, fontSize: 11 }}>
                      Visit
                    </Tag>
                  )}
                </div>
                <Text style={{ color: '#111827', fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>
                  {report.concept}
                </Text>
                <Text style={{ color: '#9ca3af', fontSize: 12, lineHeight: 1.6 }}>
                  {report.description}
                </Text>
              </div>
              {/* Right */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Avatar size={20} style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', fontSize: 9, fontWeight: 700 }}>
                    {report.createdBy.slice(0, 2).toUpperCase()}
                  </Avatar>
                  <Text style={{ color: '#6b7280', fontSize: 12 }}>{report.createdBy}</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <CalendarOutlined style={{ color: '#9ca3af', fontSize: 11 }} />
                  <Text style={{ color: '#9ca3af', fontSize: 11 }}>{report.createdAt}</Text>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ActivityLogDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
