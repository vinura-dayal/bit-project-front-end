export interface StatusRepresentation {
  id?: string | number;
  name?: string;
}

export interface LandlordRepresentation {
  id?: string | number;
  landlordCode?: string;
  landlordName?: string;
  email?: string;
  phone?: string;
  nic?: string;
  address?: string;
  bankAccount?: string;
  /** Request: status id. Response: { id, name } */
  status?: any;
}
