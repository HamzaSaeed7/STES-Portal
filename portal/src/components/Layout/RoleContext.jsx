import { createContext, useContext, useState } from 'react'
import { ROLES } from '../../data/staticData'

const RoleContext = createContext(null)

export function RoleProvider({ children }) {
  const [role, setRole] = useState(ROLES.MANAGER)
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  return useContext(RoleContext)
}
