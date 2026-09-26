export interface StatusRepresentation {
  id?: string | number;
  name?: string;
}

export interface LeaseAgreementRepresentation {
  id?: string | number;
  leaseCode?: string;
  startDate?: string;
  endDate?: string;
  monthlyRent?: string;
  securityDeposit?: string;
  terms?: string;
  signedDate?: string;
  /** Request: status id. Response: { id, name } */
  status?: any;
}
