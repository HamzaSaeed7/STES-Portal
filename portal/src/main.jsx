import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#22c55e',
          colorBgBase: '#0a0f1a',
          colorBgContainer: '#131c2e',
          colorBgElevated: '#1a2235',
          colorBgLayout: '#0a0f1a',
          borderRadius: 8,
          borderRadiusLG: 10,
          colorBorder: '#1e2a3d',
          colorBorderSecondary: '#1e2a3d',
          colorText: '#e6edf3',
          colorTextSecondary: '#8b949e',
          colorTextTertiary: '#4b5563',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif",
          fontSize: 14,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          boxShadowSecondary: '0 2px 10px rgba(0,0,0,0.3)',
        },
        components: {
          Layout: {
            siderBg: '#0c1425',
            headerBg: '#0e1829',
            bodyBg: '#0a0f1a',
            triggerBg: '#0c1425',
          },
          Menu: {
            darkItemBg: 'transparent',
            darkSubMenuItemBg: 'transparent',
            darkItemSelectedBg: 'rgba(34,197,94,0.1)',
            darkItemSelectedColor: '#22c55e',
            darkItemHoverBg: 'rgba(255,255,255,0.04)',
            darkItemColor: '#94a3b8',
            itemHeight: 42,
          },
          Table: {
            headerBg: '#131c2e',
            headerColor: '#94a3b8',
            headerSortActiveBg: '#1a2235',
            rowHoverBg: '#1a2235',
            borderColor: '#1e2a3d',
            colorBgContainer: '#0f1826',
          },
          Card: {
            colorBgContainer: '#131c2e',
            colorBorderSecondary: '#1e2a3d',
            paddingLG: 20,
            headerBg: 'transparent',
          },
          Modal: {
            contentBg: '#131c2e',
            headerBg: '#131c2e',
            footerBg: '#131c2e',
          },
          Drawer: {
            colorBgElevated: '#131c2e',
          },
          Input: {
            colorBgContainer: '#0e1829',
            colorBorder: '#1e2a3d',
            activeBorderColor: '#22c55e',
            hoverBorderColor: '#2d4a6e',
            activeShadow: '0 0 0 2px rgba(34,197,94,0.12)',
          },
          Select: {
            colorBgContainer: '#0e1829',
            colorBorder: '#1e2a3d',
            optionSelectedBg: 'rgba(34,197,94,0.1)',
          },
          Button: {
            colorPrimary: '#22c55e',
            colorPrimaryHover: '#16a34a',
            colorPrimaryActive: '#15803d',
            defaultBg: '#131c2e',
            defaultBorderColor: '#1e2a3d',
            defaultColor: '#94a3b8',
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
            colorBgContainer: '#0e1829',
            colorBorder: '#1e2a3d',
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
