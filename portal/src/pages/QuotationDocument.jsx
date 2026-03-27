import { Button, Typography, Divider } from 'antd'
import { DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Text } = Typography

// Static document data (matches screenshot)
const DOC = {
  ref: 'STES-24/67A',
  date: 'July 25, 2024',
  status: 'Holy',
  ms: 'Chair BMC',
  attn: 'BMC Chair',
  projectName: 'BMC Street Light',
  subject: 'BMC Street Light Delivery',
  address: '3rd Floor 29A - Sadiq Centre, Jinnah Boulevard West, Main G.T Road DHA Phase II, Islamabad',
  phone: '+92 51 5413364-5',
  email: 'tanveer@stems.com',
  items: [
    { srNo: 1, item: 'Street Light', description: 'Supply of Street light Model: ST400 250W, CRI-80', set: 200, unitPrice: 200, totalAmount: 40000 },
    { srNo: 2, item: 'Breakers',     description: 'Supply of Breakers Model: Chint Breakers C10',   set: 100, unitPrice: 100, totalAmount: 10000 },
    { srNo: 3, item: 'Electric boxes', description: 'Supply the items, Supply with the team',        set: 50,  unitPrice: 2800, totalAmount: 140000 },
  ],
  totalAmount: 190000,
  gst: 34200,
  grandTotal: 224200,
  terms: [
    { label: 'Delivery Schedule', value: '13-15 Working Weeks after confirmation of the order along with advance' },
    { label: 'Prices', value: 'FOB Site These are special discounted prices and cannot be taken as reference' },
    { label: 'Validity', value: '4-5 Days' },
    { label: 'Income Tax', value: 'Above mentioned goods will be imported under tax layout U/S 148 and 153 of Income Tax Ordinance 2001. Income Tax will be paid at the time of Import. Thankful you will not deduct our Income Tax.' },
    { label: 'Tax and duties', value: 'Our prices are based on current duties, taxes, exchange rates and levies applicable in Pakistan at the date of offer submission. In case of any change in legislation resulting in additional or new duties or taxes, exchange rate having any impact on the price, the client shall pay the additional amount to the contractor.' },
    { label: 'Others', value: 'Force majeur clause is applicable, Part payment / part delivery is allowed.' },
    { label: 'Test', value: 'The item will be good' },
  ],
  signatory: { name: 'Tanveer', title: 'Director', phone: '0312 0013999' },
}

const cell = (extra = {}) => ({
  padding: '7px 10px',
  border: '1px solid #d0d0d0',
  fontSize: 12,
  verticalAlign: 'top',
  ...extra,
})

const thCell = (extra = {}) => ({
  ...cell(extra),
  background: '#f0f0f0',
  fontWeight: 700,
  fontSize: 11,
})

export default function QuotationDocument() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Top controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Button type="text" icon={<ArrowLeftOutlined />} style={{ color: '#9ca3af' }}
          onClick={() => navigate('/quotations')}>
          Back to Quotations
        </Button>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button icon={<DownloadOutlined />} style={{ background: '#22c55e', border: 'none', color: '#fff', fontWeight: 600 }}>
            Download
          </Button>
          <Button icon={<span style={{ fontSize: 16 }}>📱</span>} style={{ background: '#25D366', border: 'none', color: '#fff' }} />
        </div>
      </div>

      {/* Document */}
      <div style={{
        background: '#fff',
        color: '#111',
        maxWidth: 820,
        margin: '0 auto',
        padding: '36px 44px',
        borderRadius: 8,
        fontFamily: 'Arial, sans-serif',
        fontSize: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 52, height: 52,
              background: 'rgba(34,197,94,0.12)', border: '2px solid #22c55e',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="32" height="32" viewBox="0 0 80 80" fill="none">
                <rect x="10" y="20" width="44" height="44" rx="4" transform="rotate(-45 10 20)" fill="#22c55e" />
                <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="Arial">ST</text>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, color: '#111' }}>ST Engineering</div>
              <div style={{ fontWeight: 800, fontSize: 14, color: '#22c55e' }}>Solutions</div>
            </div>
          </div>
          {/* Address */}
          <div style={{ textAlign: 'right', fontSize: 11, color: '#444', maxWidth: 280 }}>
            <div>{DOC.address}</div>
            <div style={{ marginTop: 4 }}>Ph: {DOC.phone}</div>
            <div>Email: {DOC.email}</div>
          </div>
        </div>

        <Divider style={{ borderColor: '#ccc', margin: '8px 0 16px' }} />

        {/* Client info + Ref */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ lineHeight: 1.8, fontSize: 12 }}>
            <div><strong>M/s:</strong> {DOC.ms}</div>
            <div><strong>Attn:</strong> {DOC.attn}</div>
            <div><strong>Project Name:</strong> {DOC.projectName}</div>
            <div><strong>Subject: {DOC.subject}</strong></div>
          </div>
          <div style={{ textAlign: 'right', lineHeight: 1.8, fontSize: 12 }}>
            <div><strong>Ref:</strong> {DOC.ref}</div>
            <div><strong>Date:</strong> {DOC.date}</div>
            <div><strong>Status:</strong> {DOC.status}</div>
          </div>
        </div>

        <p style={{ marginBottom: 6, fontSize: 12 }}><strong>Dear Sir,</strong></p>
        <p style={{ marginBottom: 20, fontSize: 12, lineHeight: 1.6, color: '#444' }}>
          Referenced to your inquiry, please find below our best possible prices along with technical details.
        </p>

        {/* Items table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 0 }}>
          <thead>
            <tr>
              <th style={thCell({ width: 40, textAlign: 'center' })}>Sr.#</th>
              <th style={thCell({ width: 120 })}>Item</th>
              <th style={thCell()}>Description</th>
              <th style={thCell({ width: 60, textAlign: 'center' })}>Set</th>
              <th style={thCell({ width: 90, textAlign: 'right' })}>Q/Price</th>
              <th style={thCell({ width: 110, textAlign: 'right' })}>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {DOC.items.map(item => (
              <tr key={item.srNo}>
                <td style={cell({ textAlign: 'center', color: '#666' })}>{item.srNo}</td>
                <td style={cell({ fontWeight: 600 })}>{item.item}</td>
                <td style={cell({ color: '#555' })}>{item.description}</td>
                <td style={cell({ textAlign: 'center' })}>{item.set}</td>
                <td style={cell({ textAlign: 'right' })}>PKR {item.unitPrice.toLocaleString()}</td>
                <td style={cell({ textAlign: 'right', fontWeight: 600 })}>PKR {item.totalAmount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
          <tbody>
            <tr>
              <td style={{ ...cell(), borderTop: 'none' }} colSpan={4}></td>
              <td style={{ ...cell({ fontWeight: 700, background: '#fafafa', borderTop: 'none' }) }}>Total Amount</td>
              <td style={{ ...cell({ textAlign: 'right', fontWeight: 700, background: '#fafafa', borderTop: 'none' }) }}>
                PKR {DOC.totalAmount.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td style={{ ...cell(), border: 'none' }} colSpan={4}></td>
              <td style={cell({ fontWeight: 700, background: '#fafafa' })}>GSTD 18%</td>
              <td style={cell({ textAlign: 'right', fontWeight: 700, background: '#fafafa' })}>
                PKR {DOC.gst.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td style={{ border: 'none' }} colSpan={4}></td>
              <td style={cell({ fontWeight: 800, background: '#e8f5e9', fontSize: 13 })}>Grand Total</td>
              <td style={cell({ textAlign: 'right', fontWeight: 800, background: '#e8f5e9', fontSize: 13 })}>
                PKR {DOC.grandTotal.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Terms & Conditions */}
        <div style={{ background: '#1a2a5e', color: '#fff', padding: '8px 12px', fontWeight: 700, fontSize: 13, marginBottom: 0 }}>
          Terms and Conditions
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
          <tbody>
            {DOC.terms.map((term, i) => (
              <tr key={i}>
                <td style={{
                  ...cell({ width: '22%', fontWeight: 700, verticalAlign: 'middle' }),
                  background: i % 2 === 0 ? '#fafafa' : '#fff',
                }}>
                  {term.label}
                </td>
                <td style={{ ...cell({ lineHeight: 1.6 }), background: i % 2 === 0 ? '#fafafa' : '#fff' }}>
                  {term.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Signature */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 20 }}>FOR ST Engineering Solutions</div>
          <div>
            <div style={{ width: 140, borderTop: '1px solid #000', paddingTop: 6 }}>
              <div style={{ fontWeight: 700 }}>{DOC.signatory.name}</div>
              <div style={{ color: '#555' }}>{DOC.signatory.title}</div>
              <div style={{ color: '#555' }}>{DOC.signatory.phone}</div>
            </div>
          </div>
        </div>

        <Divider style={{ borderColor: '#ddd' }} />
        <p style={{ textAlign: 'center', color: '#aaa', fontSize: 10 }}>
          This is a computer generated Quotation does not need signatures.
        </p>
      </div>
    </div>
  )
}
