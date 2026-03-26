import { Tag } from 'antd'

const STATUS_CONFIG = {
  'Completed': { color: 'success' },
  'Pending': { color: 'warning' },
  'Partial Delivery': { color: 'orange' },
  'Rejected': { color: 'error' },
  'Orders Lost': { color: 'error' },
  'Waiting': { color: 'default' },
  'Ready To Deliver': { color: 'processing' },
}

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || { color: 'default' }
  return <Tag color={config.color}>{status}</Tag>
}
