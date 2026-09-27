export interface StatusRepresentation {
  id?: string | number;
  name?: string;
}

export interface RentRepresentation {
  id?: string | number;
  paymentCode?: string;
  paymentDate?: string;
  dueDate?: string;
  amount?: string;
  paymentMethod?: string;
  referenceNo?: string;
  lateFee?: string;
  /** Request: status id. Response: { id, name } */
  status?: any;
}
