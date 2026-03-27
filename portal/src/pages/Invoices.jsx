import { Table, Typography, Card, Tag } from 'antd'
import { invoices } from '../data/staticData'
import PageHeader from '../components/Shared/PageHeader'

const { Text } = Typography

export default function Invoices() {
  const total = invoices.reduce((s, i) => s + i.totalPayment, 0)

  const columns = [
    {
      title: 'Invoice Number', dataIndex: 'invoiceNumber',
      render: v => <Text style={{ color: '#111827', fontWeight: 700, fontFamily: 'monospace' }}>{v}</Text>,
    },
    {
      title: 'Delivered By', dataIndex: 'deliveredBy',
      render: v => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            {v.slice(0, 1).toUpperCase()}
          </div>
          <Text style={{ color: '#6b7280' }}>{v}</Text>
        </div>
      ),
    },
    { title: 'Date of Delivery', dataIndex: 'dateOfDelivery', render: v => <Text style={{ color: '#9ca3af', fontSize: 12 }}>{v}</Text> },
    {
      title: 'Total Payment', dataIndex: 'totalPayment',
      render: v => (
        <Text style={{ color: '#22c55e', fontWeight: 700, fontSize: 14 }}>
          PKR {v.toLocaleString()}
        </Text>
      ),
    },
    {
      title: 'Type', dataIndex: 'type',
      render: v => <Tag color="blue" style={{ borderRadius: 6 }}>{v}</Tag>,
    },
  ]

  return (
    <div>
      <PageHeader
        title="Invoices"
        subtitle={`${invoices.length} invoices · Total PKR ${total.toLocaleString()}`}
      />
      <Card style={{ background: '#ffffff', border: '1px solid #e5e7eb' }} bodyStyle={{ padding: 0 }}>
        <Table dataSource={invoices} columns={columns} rowKey="id" pagination={false} scroll={{ x: 'max-content' }} />
      </Card>
    </div>
  )
}
