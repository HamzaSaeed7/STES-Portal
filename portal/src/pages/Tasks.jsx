import { useState } from 'react'
import { Button, Modal, Form, Input, Typography, Card, Tag, Avatar } from 'antd'
import { PlusOutlined, CalendarOutlined, UserOutlined, CheckCircleOutlined, ClockCircleOutlined, SyncOutlined } from '@ant-design/icons'
import PageHeader from '../components/Shared/PageHeader'
import { tasks as staticTasks } from '../data/staticData'

const { Text } = Typography

const STATUS_CONFIG = {
  'Completed':  { color: 'success',  icon: <CheckCircleOutlined /> },
  'In Progress':{ color: 'processing', icon: <SyncOutlined spin /> },
  'Pending':    { color: 'warning',  icon: <ClockCircleOutlined /> },
}

function CreateTaskModal({ open, onClose }) {
  const [form] = Form.useForm()
  return (
    <Modal open={open} onCancel={onClose} footer={null} centered width={440}
      title={<span style={{ color: '#e6edf3', fontWeight: 700 }}>Create Task</span>}
    >
      <Text style={{ color: '#4b5563', fontSize: 13, display: 'block', marginBottom: 20 }}>
        Enter the following information for the new task
      </Text>
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title">
          <Input placeholder="Task title" size="large" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} placeholder="Describe the task..." />
        </Form.Item>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <Button size="large" onClick={() => { form.resetFields(); onClose() }}>Cancel</Button>
          <Button size="large" type="primary" className="btn-primary"
            onClick={() => { form.resetFields(); onClose() }}>
            Add Task
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default function Tasks() {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <div>
      <PageHeader
        title="Tasks"
        subtitle={`${staticTasks.length} tasks in your workspace`}
        extra={
          <Button type="primary" icon={<PlusOutlined />} className="btn-primary" onClick={() => setCreateOpen(true)}>
            Create Task
          </Button>
        }
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {staticTasks.map(task => {
          const cfg = STATUS_CONFIG[task.status] || { color: 'default', icon: null }
          return (
            <Card key={task.id}
              style={{ background: '#131c2e', border: '1px solid #1e2a3d' }}
              bodyStyle={{ padding: '14px 20px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <Text style={{ color: '#e6edf3', fontWeight: 600, fontSize: 14 }}>{task.title}</Text>
                    <Tag color={cfg.color} icon={cfg.icon} style={{ borderRadius: 6, fontSize: 11 }}>
                      {task.status}
                    </Tag>
                  </div>
                  <Text style={{ color: '#64748b', fontSize: 12, lineHeight: 1.6 }}>{task.description}</Text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Avatar size={20} style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', fontSize: 9, fontWeight: 700 }}>
                      {task.assignedTo.slice(0, 2).toUpperCase()}
                    </Avatar>
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>{task.assignedTo}</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <CalendarOutlined style={{ color: '#4b5563', fontSize: 11 }} />
                    <Text style={{ color: '#4b5563', fontSize: 11 }}>{task.createdAt}</Text>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <CreateTaskModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  )
}
