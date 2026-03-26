import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/Layout/AppLayout'
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Quotations from './pages/Quotations'
import NewQuotation from './pages/NewQuotation'
import QuotationDocument from './pages/QuotationDocument'
import InternalOrders from './pages/InternalOrders'
import Stock from './pages/Stock'
import Invoices from './pages/Invoices'
import Reports from './pages/Reports'
import Tasks from './pages/Tasks'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="quotations/new" element={<NewQuotation />} />
          <Route path="quotations/:id/document" element={<QuotationDocument />} />
          <Route path="internal-orders" element={<InternalOrders />} />
          <Route path="stock" element={<Stock />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="reports" element={<Reports />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
