export interface StatusRepresentation {
  id?: string | number;
  name?: string;
}

export interface UtilityBillRepresentation {
  id?: string | number;
  billCode?: string;
  utilityType?: string;
  billingPeriod?: string;
  amount?: string;
  dueDate?: string;
  paidBy?: string;
  /** Request: { id }. Response: { id, name } */
  status?: any;
}
