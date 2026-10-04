export interface StatusRepresentation {
  id?: string | number;
  name?: string;
}

export interface PropertyInspectionRepresentation {
  id?: string | number;
  inspectionCode?: string;
  inspectionDate?: string;
  inspectionType?: string;
  conditionNotes?: string;
  damageReported?: string;
  photosURL?: string;
  /** Request: { id }. Response: { id, name } */
  status?: any;
}
