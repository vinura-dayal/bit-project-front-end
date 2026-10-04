import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertyInspectionRepresentation } from '../module/property-inspection-representation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyInspectionService {

  private baseUrl : string= 'http://localhost:8010/api/v1/property_inspection'; 

  constructor(
    private http:HttpClient
  ) { }

  createPropertyInspection(maintenanceRequest:any,type:any):Observable<any>{
      if(type=='Add'){
        return this.http.post(this.baseUrl,maintenanceRequest);
      }else{
        return this.http.put(this.baseUrl+"/"+maintenanceRequest.id,maintenanceRequest);
    }
        
  }

  GetAllPropertyInspections():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  GetPropertyInspectionsById(ID:any):Observable<any>{
    return this.http.get(this.baseUrl+"/"+ID);
  }

  DeletePropertyInspectionById(ID:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+ID)
  }


}
