// ─── Employees ──────────────────────────────────────────────────────────────
export const employees = [
  {
    id: 1,
    name: 'Sales Person',
    email: 'kareeba539@gmail.com',
    code: 'SalePerson',
    role: 'Sales Team',
    status: 'yes',
    joiningDate: 'Oct 15, 2024',
    phone: '+92 301 7612066',
    address: 'Street 2',
    invitedBy: 'kareeba539.manager@gmail.com (Manager)',
  },
  {
    id: 2,
    name: 'Muhammad Haroon Khan',
    email: 'salesdemo.com',
    code: 'ST',
    role: 'Sales Team',
    status: 'no',
    joiningDate: 'Nov 1, 2024',
    phone: '+92 300 0000000',
    address: 'Islamabad',
    invitedBy: 'kareeba539.manager@gmail.com (Manager)',
  },
]

// ─── Quotations ──────────────────────────────────────────────────────────────
export const quotations = [
  {
    id: 1,
    invoiceNumber: 'STES241-17A',
    clientName: 'AHF',
    project: '—',
    quotationFor: 'STES Solutions',
    date: 'Aug 7, 2024 9:47 pm',
    status: 'Completed',
  },
  {
    id: 2,
    invoiceNumber: 'STES241-17A',
    clientName: 'talha',
    project: 'Salsa town',
    quotationFor: 'STES Solutions',
    date: 'Oct 15, 2024 1:23 pm',
    status: 'Pending',
  },
  {
    id: 3,
    invoiceNumber: 'STES241-67A',
    clientName: 'webster',
    project: 'Salsa town',
    quotationFor: 'STES Solutions',
    date: 'Oct 15, 2024 1:12 pm',
    status: 'Partial Delivery',
  },
  {
    id: 4,
    invoiceNumber: 'STES222-57A',
    clientName: 'Chair BMC',
    project: 'BMC Street Light',
    quotationFor: 'STES Solutions',
    date: 'Jul 25, 2024 8:52 am',
    status: 'Completed',
  },
  {
    id: 5,
    invoiceNumber: 'STES222-57A',
    clientName: 'Riaz and Sons',
    project: 'Islamabad Jail',
    quotationFor: 'STES Solutions',
    date: 'Jul 15, 2024 4:08 pm',
    status: 'Completed',
  },
  {
    id: 6,
    invoiceNumber: 'STES222-57A',
    clientName: 'Agp',
    project: 'BBP',
    quotationFor: 'Hertz Solutions',
    date: 'Sep 13, 2024 8:12 pm',
    status: 'Rejected',
  },
]

export const quotationDocument = {
  ref: 'STES241-67A',
  date: 'October 19, 2024',
  status: 'Normal',
  projectName: 'test',
  subject: 'test',
  clientName: 'Areeba',
  attn: 'test',
  totalAmount: 0,
  gst: 17400,
  grandTotal: 0,
  terms: [
    {
      label: 'Delivery Schedule',
      value: '13-15 Working Weeks after confirmation of the order along with Horse.',
    },
    {
      label: 'Prices',
      value: 'FOB. These are special discounted prices and cannot be further negotiated.',
    },
    { label: 'Validity', value: '4-5 Days' },
    { label: 'Payment Terms', value: '100% advance before delivery' },
    {
      label: 'Income Tax',
      value:
        'As per Income Tax Ordinance 2001, Income Tax will be paid at the time of payment. Therefore you will not deduct Income Tax.',
    },
    {
      label: 'Tax and duties',
      value:
        'Our prices are based on current duties taxes, exchange rates applicable to Pakistan at the date of offer submission. Any change in legislation resulting in new or higher duties, taxes, exchange rate having any impact on the price of supply will be on buyer account.',
    },
    {
      label: 'Others',
      value: 'Force majeur clause is applicable. Part payment / part delivery is possible.',
    },
  ],
}

// ─── Internal Orders ─────────────────────────────────────────────────────────
export const internalOrders = [
  {
    id: 1,
    projectDetails: 'Salsa Town',
    region: 'Islamabad',
    subject: 'Indoor lights',
    client: 'webster',
    status: 'Partial Delivery',
    creationDate: 'Jul 13, 2024',
  },
  {
    id: 2,
    projectDetails: 'Street Lights',
    region: 'Islamabad',
    subject: 'Brewery',
    client: 'AHC',
    status: 'Completed',
    creationDate: 'Aug 25, 2024',
  },
  {
    id: 3,
    projectDetails: 'BMC Street Light',
    region: 'Islamabad',
    subject: 'BMC Street Light Delivery',
    client: 'Chair BMC',
    status: 'Completed',
    creationDate: 'Jul 13, 2024',
  },
  {
    id: 4,
    projectDetails: 'Islamabad Jail',
    region: 'Islamabad',
    subject: 'Quotation for LED Lights',
    client: 'Riaz and Sons',
    status: 'Completed',
    creationDate: 'Jul 15, 2024',
  },
]

// ─── Stock ───────────────────────────────────────────────────────────────────
export const stockItems = [
  { id: 1, category: 'Indoor', model: 'ST-400', subCategory: 'Street Light', description: 'Supply of Street light Model: ST400 150W, CRI-80', openingStock: 36, stockDelivered: 0, stockOnHold: 0 },
  { id: 2, category: 'Outdoor', model: 'ST-400', subCategory: 'Street Light', description: 'Supply of Street light Model: ST400 150W, CRI-80', openingStock: 185, stockDelivered: 0, stockOnHold: 0 },
  { id: 3, category: 'Outdoor', model: 'ST-500', subCategory: 'Street Light', description: 'Supply of Street light Model: ST400 250W, CRI-80', openingStock: 4, stockDelivered: 200, stockOnHold: 13 },
  { id: 4, category: 'Outdoor', model: 'AGC Hi Soldier', subCategory: 'Street Light', description: 'Supply of AGC Street light Model: AGC Hi Soldier 120W, CRI-80', openingStock: 13, stockDelivered: 0, stockOnHold: 0 },
  { id: 5, category: 'Outdoor', model: 'AGC Linear Highway', subCategory: 'Street Light', description: 'Supply of AGC Street light Model: AGC Hi Soldier 120W, 3000K, CRI-80', openingStock: 44, stockDelivered: 0, stockOnHold: 0 },
  { id: 6, category: 'Outdoor', model: 'AGC Linear Highway', subCategory: 'Street Light', description: 'Supply of AGC Street light Model: AGC Hi Soldier 120W, 6000K, CRI-80', openingStock: 25, stockDelivered: 0, stockOnHold: 0 },
  { id: 7, category: 'Outdoor', model: 'Hi Smooth-4 with 7 PIN Nema Socket', subCategory: 'Street Light', description: 'Supply of AGC Street light Model: Hi Smooth-4 120W, 3000K, CRI-80, with Nema Socket', openingStock: 14, stockDelivered: 0, stockOnHold: 0 },
  { id: 8, category: 'Outdoor', model: 'LITA', subCategory: 'Street Light', description: "Supply of Street light Model: LITA 150W, CRI-80", openingStock: 0, stockDelivered: 0, stockOnHold: 0 },
  { id: 9, category: 'Outdoor', model: 'LITA', subCategory: 'Street Light', description: "Supply of Street light Model: LITA 130W, CRI-80", openingStock: 8, stockDelivered: 0, stockOnHold: 0 },
  { id: 10, category: 'Outdoor', model: 'AVENTO', subCategory: 'Street Light', description: 'Supply of Shreder Street light Model: AVENTO 120W, 3000K, CRI-80', openingStock: 18, stockDelivered: 0, stockOnHold: 0 },
  { id: 11, category: 'Outdoor', model: 'AVENTO', subCategory: 'Street Light', description: 'Supply of Shreder Street light Model: AVENTO 120W, 5000K, CRI-80', openingStock: 10, stockDelivered: 0, stockOnHold: 0 },
  { id: 12, category: 'Outdoor', model: 'AVENTO', subCategory: 'Street Light', description: 'Supply of Shreder Street light Model: AVENTO 150W, 3000K, CRI-80', openingStock: 24, stockDelivered: 0, stockOnHold: 0 },
  { id: 13, category: 'Outdoor', model: 'Sylvania Garden (L)', subCategory: 'Street Light', description: 'Supply of Sylvania Street light Model: Sylvania Garden (L) 110W, 3000K CRI-80', openingStock: 28, stockDelivered: 0, stockOnHold: 0 },
  { id: 14, category: 'Outdoor', model: 'Sylvania Garden (M)', subCategory: 'Street Light', description: 'Supply of Sylvania Street light Model: Sylvania Garden (M) 60W, 3000K CRI-80', openingStock: 900, stockDelivered: 0, stockOnHold: 0 },
  { id: 15, category: 'Outdoor', model: 'Zephyr', subCategory: 'Street Light', description: 'Supply of Street light Model: Zephyr 150W, 3000K CRI-80', openingStock: 200, stockDelivered: 0, stockOnHold: 0 },
]

// ─── Invoices ────────────────────────────────────────────────────────────────
export const invoices = [
  { id: 1, invoiceNumber: 'STES24-674', deliveredBy: 'Tanveer', dateOfDelivery: 'Jul 25, 2024 12:00 am', totalPayment: 280000, type: 'STES Solutions' },
  { id: 2, invoiceNumber: 'STES24-674', deliveredBy: 'Tanveer', dateOfDelivery: 'Aug 26, 2024 12:00 am', totalPayment: 226000, type: 'STES Solutions' },
  { id: 3, invoiceNumber: 'STES24-674', deliveredBy: 'Taha Malik', dateOfDelivery: 'Aug 30, 2024 12:00 am', totalPayment: 190000, type: 'STES Solutions' },
]

// ─── Dashboard stats ─────────────────────────────────────────────────────────
export const managerStats = {
  teamMembers: 1,
  totalQuotations: 0,
  totalProjects: 0,
  totalEarning: 2395400,
}

export const salesPersonStats = {
  totalQuotations: 0,
  totalProjects: 0,
  totalEarning: 2395400,
}

// ─── Activity Reports ────────────────────────────────────────────────────────
export const activityReports = [
  {
    id: 1,
    weekday: 'Monday',
    concept: 'Client Follow-up — BMC Street Light',
    description: 'Called BMC project manager regarding delivery schedule. Confirmed advance payment receipt and discussed timeline adjustments.',
    followUp: true,
    visits: false,
    createdAt: 'Mar 24, 2025',
    createdBy: 'Sales Person',
  },
  {
    id: 2,
    weekday: 'Tuesday',
    concept: 'Site Visit — DHA Phase II',
    description: 'Visited DHA Phase II site for inspection of installed outdoor fixtures. Noted 3 units requiring replacement under warranty.',
    followUp: false,
    visits: true,
    createdAt: 'Mar 25, 2025',
    createdBy: 'Sales Person',
  },
  {
    id: 3,
    weekday: 'Wednesday',
    concept: 'Quotation Sent — Hertz Solutions',
    description: 'Prepared and sent quotation STES241-17A to Hertz Solutions for Indoor LED lighting package. Awaiting approval.',
    followUp: true,
    visits: false,
    createdAt: 'Mar 26, 2025',
    createdBy: 'Manager',
  },
  {
    id: 4,
    weekday: 'Thursday',
    concept: 'Meeting — New Project Discussion',
    description: 'Meeting with potential client regarding façade lighting project for commercial building. Shared product catalogue and pricing sheet.',
    followUp: true,
    visits: true,
    createdAt: 'Mar 27, 2025',
    createdBy: 'Sales Person',
  },
]

// ─── Tasks ───────────────────────────────────────────────────────────────────
export const tasks = [
  {
    id: 1,
    title: 'Follow up on BMC Street Light quotation',
    description: 'Call the BMC project manager to confirm approval of quotation STES-24/67A and discuss delivery timeline.',
    status: 'Pending',
    createdAt: 'Mar 20, 2025',
    assignedTo: 'Sales Person',
  },
  {
    id: 2,
    title: 'Update stock inventory — March',
    description: 'Perform end-of-month stock audit and update inventory records for all outdoor and indoor lighting models.',
    status: 'Completed',
    createdAt: 'Mar 18, 2025',
    assignedTo: 'Manager',
  },
  {
    id: 3,
    title: 'Prepare weekly sales report',
    description: 'Compile activity logs and sales figures for the week of March 24–28 and submit to management.',
    status: 'In Progress',
    createdAt: 'Mar 24, 2025',
    assignedTo: 'Sales Person',
  },
  {
    id: 4,
    title: 'Send invoice to Hertz Solutions',
    description: 'Generate and send the final invoice for delivered goods under Internal Order #IO-2024-003.',
    status: 'Pending',
    createdAt: 'Mar 22, 2025',
    assignedTo: 'Accountant',
  },
  {
    id: 5,
    title: 'Renew supplier contracts',
    description: 'Review and renew annual contracts with primary lighting suppliers before end of March deadline.',
    status: 'Completed',
    createdAt: 'Mar 10, 2025',
    assignedTo: 'Manager',
  },
]

// ─── Roles & nav ─────────────────────────────────────────────────────────────
export const ROLES = {
  MANAGER: 'Manager',
  ACCOUNTANT: 'Accountant',
  SALES_PERSON: 'Sales Person',
}

export const NAV_BY_ROLE = {
  [ROLES.MANAGER]: ['dashboard', 'employees', 'quotations', 'stock', 'invoices', 'reports', 'tasks', 'settings'],
  [ROLES.ACCOUNTANT]: ['dashboard', 'internal-orders', 'stock', 'settings'],
  [ROLES.SALES_PERSON]: ['dashboard', 'quotations', 'stock', 'internal-orders', 'invoices', 'reports', 'tasks'],
}
