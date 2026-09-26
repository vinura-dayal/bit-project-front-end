export interface StatusRepresentation {
  id?: string | number;
  name?: string;
}

export interface PropertyRepresentation {
  id?: string | number;
  propertyCode?: string;
  propertyTitle?: string;
  address?: string;
  city?: string;
  bedrooms?: string;
  bathrooms?: string;
  floorAreaSqft?: string;
  monthlyRent?: string;
  securityDeposit?: string;
  description?: string;
  /** Request: status id. Response: { id, name } */
  status?: any;
}
