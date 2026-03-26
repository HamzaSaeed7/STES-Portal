import { Typography } from 'antd'

const { Title, Text } = Typography

export default function PageHeader({ title, subtitle, extra }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      marginBottom: 24, paddingBottom: 20,
      borderBottom: '1px solid #1e2a3d',
    }}>
      <div>
        <Title level={2} style={{ color: '#e6edf3', margin: 0, fontWeight: 800, fontSize: 22 }}>
          {title}
        </Title>
        {subtitle && (
          <Text style={{ color: '#4b5563', fontSize: 13, marginTop: 4, display: 'block' }}>
            {subtitle}
          </Text>
        )}
      </div>
      {extra && <div>{extra}</div>}
    </div>
  )
}
