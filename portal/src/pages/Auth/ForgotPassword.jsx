import { Form, Input, Button, Checkbox, Typography } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Text } = Typography

function Logo() {
  return (
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 72, height: 72, borderRadius: '50%',
        background: 'rgba(34,197,94,0.12)',
        border: '1px solid rgba(34,197,94,0.25)',
        marginBottom: 16,
        boxShadow: '0 0 24px rgba(34,197,94,0.15)',
      }}>
        <svg width="44" height="44" viewBox="0 0 80 80" fill="none">
          <rect x="10" y="20" width="44" height="44" rx="5" transform="rotate(-45 10 20)" fill="#22c55e" />
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="800" fontFamily="Arial">ST</text>
        </svg>
      </div>
      <div style={{ color: '#e6edf3', fontWeight: 800, fontSize: 18, lineHeight: 1.2, letterSpacing: '-0.3px' }}>
        ST Engineering Solutions
      </div>
    </div>
  )
}

export default function ForgotPassword() {
  return (
    <div className="auth-bg">
      <div className="auth-card">
        <Logo />

        <Text style={{ display: 'block', textAlign: 'center', color: '#64748b', marginBottom: 28, fontSize: 13 }}>
          Enter your email to reset your password
        </Text>

        <Form layout="vertical">
          <Form.Item name="email" style={{ marginBottom: 14 }}>
            <Input
              prefix={<MailOutlined style={{ color: '#4b5563' }} />}
              placeholder="E-mail"
              size="large"
            />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <Checkbox style={{ color: '#64748b', fontSize: 13 }}>Remember Me</Checkbox>
            <Link to="/login" style={{ color: '#22c55e', fontSize: 13, fontWeight: 500 }}>Go Back</Link>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="btn-primary"
              style={{ height: 44, fontSize: 15, fontWeight: 700, letterSpacing: '0.3px', borderRadius: 10 }}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
