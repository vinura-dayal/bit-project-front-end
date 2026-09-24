import { Component } from '@angular/core';
import { AgentRepresentation } from '../services/api/module/agent-representation';
import { AgentService } from '../services/api/agent/agent.service';
import { StatusService } from '../services/api/status/status.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent {

  agentObj:AgentRepresentation = {};
  agents: Array<any> = [];
  allStatus:any;

  type:string;
  statusValue:any;
  isEditAgent:boolean=false;
  dtDynamicVerticalScrollExample:any;

  canCreate = false;
  canUpdate = false;
  canDelete = false;

  constructor(
    private agentService:AgentService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.isEditAgent = false;
    this.canCreate = this.permissionHelper.has(AuthIds.STUDENT_CREATE);
    this.canUpdate = this.permissionHelper.has(AuthIds.STUDENT_UPDATE);
    this.canDelete = this.permissionHelper.has(AuthIds.STUDENT_DELETE);
    this.GetAllStatus();
    this.GetAllAgents();
}


SaveAgent():void{

    this.type = this.isEditAgent==false?'Add':'Update';
    if(this.type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          this.agentService.createAgent(this.agentObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.GetAllAgents();  
            }
          });
          swal("Sucessfull!", "Agent has been Adedd!", "success");
        }
       
      });
    }else{
      console.log(this.agentObj);
      
      this.agentService.createAgent(this.agentObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.GetAllAgents();  
            }
          });
      swal("Sucessfull!", "Agent has been updated!", "success");

  
    }

    
}

GetAgentById(ID:any){
  this.agentService.GetAgentsById(ID).subscribe(allData=>{ 
  this.agentObj = allData.data.dataList[0];

  this.isEditAgent = true;
  this.statusValue=allData.data.dataList[0].status.name;
  this.agentObj.status = allData.data.dataList[0].status.id;
  
})
}

GetAllAgents(){
  this.agentService.GetAllAgents().subscribe(allData=>{
    this.agents = allData?.data?.dataList || [];
  })
}

DeleteById(ID:any){

    swal({
      title: "Are you sure",
      text: "That you want to Delete this Agent?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Order has been deleted!", "success");
        this.agentService.DeleteAgentById(ID).subscribe(allData=>{
          this.GetAllAgents();
        })
      }
    });

}

GetAllStatus(){
  this.statusService.GetAllStatus().subscribe(allData=>{
    this.allStatus = allData.data.dataList; 
    
  })
}

onChangeStatus(E:any){
  this.agentObj.status = E.target.value;
  
}

}
