import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Role } from '../data/types';

export type RoleFilter = Role | 'all';

interface RoleContextValue {
  selectedRole: RoleFilter;
  setSelectedRole: (role: RoleFilter) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [selectedRole, setSelectedRole] = useState<RoleFilter>('all');
  const value = useMemo(() => ({ selectedRole, setSelectedRole }), [selectedRole]);
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRoleFilter() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRoleFilter must be used inside <RoleProvider>');
  return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components
export function matchesRole(itemRoles: Role[], filter: RoleFilter): boolean {
  if (filter === 'all') return true;
  return itemRoles.includes(filter);
}
