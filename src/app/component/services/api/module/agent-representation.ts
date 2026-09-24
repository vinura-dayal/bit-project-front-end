export interface StatusRepresentation {
  id?: string | number;
  name?: string;
}

export interface AgentRepresentation {
  id?: string | number;
  agentCode?: string;
  agentName?: string;
  agentAge?: string;
  agentNic?: string;
  /** Request: status id. Response: { id, name } */
  status?: any;
}
