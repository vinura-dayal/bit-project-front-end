export interface StatusRepresentation {
  id?: string | number;
  name?: string;
}

export interface TenantRepresentation {
  id?: string | number;
  tenantCode?: string;
  tenantName?: string;
  email?: string;
  phone?: string;
  nic?: string;
  occupation?: string;
  emergencyContact?: string;
  registeredDate?: string;
  /** Request: status id. Response: { id, name } */
  status?: any;
}
