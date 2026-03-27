import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#22c55e',
          colorBgBase: '#ffffff',
          colorBgContainer: '#ffffff',
          colorBgElevated: '#ffffff',
          colorBgLayout: '#f5f6f8',
          borderRadius: 8,
          borderRadiusLG: 10,
          colorBorder: '#e5e7eb',
          colorBorderSecondary: '#e5e7eb',
          colorText: '#111827',
          colorTextSecondary: '#6b7280',
          colorTextTertiary: '#9ca3af',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif",
          fontSize: 14,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          boxShadowSecondary: '0 1px 4px rgba(0,0,0,0.06)',
        },
        components: {
          Layout: {
            siderBg: '#122525',
            headerBg: '#ffffff',
            bodyBg: '#f5f6f8',
            triggerBg: '#122525',
          },
          Menu: {
            darkItemBg: 'transparent',
            darkSubMenuItemBg: 'transparent',
            darkItemSelectedBg: 'rgba(34,197,94,0.15)',
            darkItemSelectedColor: '#22c55e',
            darkItemHoverBg: 'rgba(255,255,255,0.06)',
            darkItemColor: '#c9d1d9',
            itemHeight: 42,
          },
          Table: {
            headerBg: '#f9fafb',
            headerColor: '#6b7280',
            rowHoverBg: '#f9fafb',
            borderColor: '#e5e7eb',
            colorBgContainer: '#ffffff',
          },
          Card: {
            colorBgContainer: '#ffffff',
            colorBorderSecondary: '#e5e7eb',
            paddingLG: 20,
            headerBg: 'transparent',
          },
          Modal: {
            contentBg: '#ffffff',
            headerBg: '#ffffff',
            footerBg: '#ffffff',
          },
          Drawer: {
            colorBgElevated: '#ffffff',
          },
          Input: {
            colorBgContainer: '#ffffff',
            colorBorder: '#e5e7eb',
            activeBorderColor: '#22c55e',
            hoverBorderColor: '#86efac',
            activeShadow: '0 0 0 2px rgba(34,197,94,0.12)',
          },
          Select: {
            colorBgContainer: '#ffffff',
            colorBorder: '#e5e7eb',
            optionSelectedBg: 'rgba(34,197,94,0.08)',
          },
          Button: {
            colorPrimary: '#22c55e',
            colorPrimaryHover: '#16a34a',
            colorPrimaryActive: '#15803d',
            defaultBg: '#ffffff',
            defaultBorderColor: '#e5e7eb',
            defaultColor: '#374151',
          },
          Tag: {
            borderRadiusSM: 6,
          },
          Tabs: {
            inkBarColor: '#22c55e',
            itemActiveColor: '#22c55e',
            itemSelectedColor: '#22c55e',
          },
          DatePicker: {
            colorBgContainer: '#ffffff',
            colorBorder: '#e5e7eb',
          },
          Checkbox: {
            colorPrimary: '#22c55e',
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
