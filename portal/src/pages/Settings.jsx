import { Tabs, Form, Input, Button, Avatar, Upload, Typography, Card } from 'antd'
import { CameraOutlined, SaveOutlined, LockOutlined } from '@ant-design/icons'
import { useRole } from '../components/Layout/RoleContext'
import PageHeader from '../components/Shared/PageHeader'

const { Text } = Typography

function ProfileTab() {
  const [form] = Form.useForm()
  const { role } = useRole()

  return (
    <div style={{ maxWidth: 520 }}>
      <Text style={{ color: '#4b5563', fontSize: 13, display: 'block', marginBottom: 24 }}>
        Update your personal information and profile details
      </Text>

      {/* Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <div style={{ position: 'relative' }}>
          <Avatar size={72} style={{
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            fontSize: 22, fontWeight: 700,
          }}>
            {role.slice(0, 2).toUpperCase()}
          </Avatar>
          <Upload showUploadList={false}>
            <div style={{
              position: 'absolute', bottom: -2, right: -2,
              width: 24, height: 24, borderRadius: '50%',
              background: '#22c55e', border: '2px solid #0e1829',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <CameraOutlined style={{ fontSize: 11, color: '#fff' }} />
            </div>
          </Upload>
        </div>
        <div>
          <Text style={{ color: '#e6edf3', fontWeight: 700, fontSize: 15, display: 'block' }}>{role}</Text>
          <Text style={{ color: '#4b5563', fontSize: 12 }}>Click the camera icon to update your photo</Text>
        </div>
      </div>

      <Form form={form} layout="vertical" initialValues={{
        firstName: role, lastName: role,
        username: `Mr. ${role}`, phone: '301 7612066', homeAddress: 'Street 2',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <Form.Item label="First Name" name="firstName"><Input size="large" /></Form.Item>
          <Form.Item label="Last Name" name="lastName"><Input size="large" /></Form.Item>
        </div>
        <Form.Item label="Username" name="username"><Input size="large" /></Form.Item>
        <Form.Item label="Phone number" name="phone">
          <Input addonBefore="+92" size="large" />
        </Form.Item>
        <Form.Item label="Home Address" name="homeAddress"><Input size="large" /></Form.Item>
        <Button type="primary" size="large" icon={<SaveOutlined />} className="btn-primary">
          Save Changes
        </Button>
      </Form>
    </div>
  )
}

function SecurityTab() {
  const [form] = Form.useForm()
  return (
    <div style={{ maxWidth: 520 }}>
      <Text style={{ color: '#4b5563', fontSize: 13, display: 'block', marginBottom: 24 }}>
        Update your password. You will be logged out after saving.
      </Text>

      <Card style={{ background: '#0e1829', border: '1px solid #1e2a3d', borderRadius: 10, marginBottom: 24 }}
        bodyStyle={{ padding: 20 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <LockOutlined style={{ color: '#22c55e', fontSize: 16 }} />
          <Text style={{ color: '#e6edf3', fontWeight: 600 }}>Password Requirements</Text>
        </div>
        <Text style={{ color: '#4b5563', fontSize: 12, lineHeight: 1.8 }}>
          • At least 8 characters long<br />
          • Contains uppercase and lowercase letters<br />
          • Contains at least one number or symbol
        </Text>
      </Card>

      <Form form={form} layout="vertical">
        <Form.Item label="Current Password" name="oldPassword">
          <Input.Password size="large" placeholder="Enter current password" />
        </Form.Item>
        <Form.Item label="New Password" name="newPassword">
          <Input.Password size="large" placeholder="Enter new password" />
        </Form.Item>
        <Form.Item label="Confirm New Password" name="confirmPassword">
          <Input.Password size="large" placeholder="Confirm new password" />
        </Form.Item>
        <Button type="primary" size="large" icon={<SaveOutlined />} className="btn-primary">
          Save and Logout
        </Button>
      </Form>
    </div>
  )
}

export default function Settings() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your account preferences" />
      <Card style={{ background: '#131c2e', border: '1px solid #1e2a3d' }} bodyStyle={{ padding: '0 24px 24px' }}>
        <Tabs
          items={[
            { key: 'profile', label: 'Profile', children: <ProfileTab /> },
            { key: 'security', label: 'Security', children: <SecurityTab /> },
          ]}
        />
      </Card>
    </div>
  )
}
