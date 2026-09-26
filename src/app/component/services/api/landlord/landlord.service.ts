import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LandlordRepresentation } from '../module/landlord-representation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandlordService {

  private baseUrl : string= 'http://localhost:8010/api/v1/landlord'; 

  constructor(
    private http:HttpClient
  ) { }

  createLandlord(landlord:any,type:any):Observable<any>{
      if(type=='Add'){
        return this.http.post(this.baseUrl,landlord);
      }else{
        return this.http.put(this.baseUrl+"/"+landlord.id,landlord);
    }
        
  }

  GetAllLandlords():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  GetLandlordsById(ID:any):Observable<any>{
    return this.http.get(this.baseUrl+"/"+ID);
  }

  DeleteLandlordById(ID:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+ID)
  }


}
