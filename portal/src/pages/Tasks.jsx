import { useState } from 'react'
import { Button, Modal, Form, Input, Typography, Card } from 'antd'
import { PlusOutlined, CheckSquareOutlined } from '@ant-design/icons'
import PageHeader from '../components/Shared/PageHeader'

const { Text } = Typography

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
        subtitle="Manage your team tasks and to-dos"
        extra={
          <Button type="primary" icon={<PlusOutlined />} className="btn-primary" onClick={() => setCreateOpen(true)}>
            Create Task
          </Button>
        }
      />

      <Card style={{ background: '#131c2e', border: '1px solid #1e2a3d', minHeight: 320 }}
        bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}
      >
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16,
        }}>
          <CheckSquareOutlined style={{ fontSize: 32, color: '#22c55e' }} />
        </div>
        <Text style={{ color: '#e6edf3', fontWeight: 600, fontSize: 15, display: 'block', marginBottom: 6 }}>
          No Tasks Yet
        </Text>
        <Text style={{ color: '#4b5563', fontSize: 13, textAlign: 'center', maxWidth: 300 }}>
          Create your first task to start tracking work
        </Text>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="btn-primary"
          style={{ marginTop: 20 }}
          onClick={() => setCreateOpen(true)}
        >
          Create Task
        </Button>
      </Card>

      <CreateTaskModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  )
}
