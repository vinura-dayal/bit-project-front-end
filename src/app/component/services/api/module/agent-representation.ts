export interface StatusRepresentation {
  id?: string | number;
  name?: string;
}

export interface AgentRepresentation {
  id?: string | number;
  agentCode?: string;
  licenseNo?: string;
  commissionRate?: string;
  phone?: string;
  /** Request: status id. Response: { id, name } */
  status?: any;
}
