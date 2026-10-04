export interface StatusRepresentation {
  id?: string | number;
  name?: string;
}

export interface MaintenanceRequestRepresentation {
  id?: string | number;
  requestCode?: string;
  requestDate?: string;
  issueTitle?: string;
  issueDetails?: string;
  priority?: string;
  resolvedDate?: string;
  resolutionNotes?: string;
  tenant?: any;
  property?: any;
  agent?: any;
  /** Request: { id }. Response: { id, name } */
  status?: any;
}
