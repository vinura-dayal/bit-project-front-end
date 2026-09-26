import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertyRepresentation } from '../module/property-representation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseUrl : string= 'http://localhost:8010/api/v1/property'; 

  constructor(
    private http:HttpClient
  ) { }

  createProperty(property:any,type:any):Observable<any>{
      if(type=='Add'){
        return this.http.post(this.baseUrl,property);
      }else{
        return this.http.put(this.baseUrl+"/"+property.id,property);
    }
        
  }

  GetAllPropertys():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  GetPropertysById(ID:any):Observable<any>{
    return this.http.get(this.baseUrl+"/"+ID);
  }

  DeletePropertyById(ID:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+ID)
  }


}
