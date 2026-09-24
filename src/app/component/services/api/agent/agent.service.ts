import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgentRepresentation } from '../module/agent-representation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private baseUrl : string= 'http://localhost:8010/api/v1/agent'; 

  constructor(
    private http:HttpClient
  ) { }

  createAgent(agent:any,type:any):Observable<any>{
      if(type=='Add'){
        return this.http.post(this.baseUrl,agent);
      }else{
        return this.http.put(this.baseUrl+"/"+agent.id,agent);
    }
        
  }

  GetAllAgents():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  GetAgentsById(ID:any):Observable<any>{
    return this.http.get(this.baseUrl+"/"+ID);
  }

  DeleteAgentById(ID:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+ID)
  }


}
