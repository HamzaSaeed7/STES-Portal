import { Typography } from 'antd'

const { Title, Text } = Typography

export default function PageHeader({ title, subtitle, extra }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      flexWrap: 'wrap', gap: 12,
      marginBottom: 24, paddingBottom: 20,
      borderBottom: '1px solid #e5e7eb',
    }}>
      <div>
        <Title level={2} style={{ color: '#111827', margin: 0, fontWeight: 800, fontSize: 22 }}>
          {title}
        </Title>
        {subtitle && (
          <Text style={{ color: '#9ca3af', fontSize: 13, marginTop: 4, display: 'block' }}>
            {subtitle}
          </Text>
        )}
      </div>
      {extra && <div style={{ flexShrink: 0 }}>{extra}</div>}
    </div>
  )
}
