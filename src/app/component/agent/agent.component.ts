import { Component } from '@angular/core';
import { AgentRepresentation } from '../services/api/module/agent-representation';
import { AgentService } from '../services/api/agent/agent.service';
import { StatusService } from '../services/api/status/status.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';
import {TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent {

  @ViewChild('agentModal') agentModal!: TemplateRef<any>;
  private modalRef?: NgbModalRef;

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

  page = 0;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;
  pageSizeOptions = [5, 10, 20];

  constructor(
    private agentService:AgentService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder,
    private modalService: NgbModal,
    private toast: ToastService
  ){}

  ngOnInit(): void {
    this.isEditAgent = false;
    this.canCreate = this.permissionHelper.has(AuthIds.AGENT_CREATE);
    this.canUpdate = this.permissionHelper.has(AuthIds.AGENT_UPDATE);
    this.canDelete = this.permissionHelper.has(AuthIds.AGENT_DELETE);
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
              this.modalRef?.close();
              this.page = 0;
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
              this.modalRef?.close();
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
    this.modalRef = this.modalService.open(this.agentModal, { centered: true, backdrop: 'static' });
  
})
}

GetAllAgents(){
  this.agentService.GetAllAgents(this.page, this.pageSize).subscribe(allData=>{
    const list = allData?.data?.dataList || [];
    const totalPages = allData?.data?.totalPages || 0;
    if (list.length === 0 && this.page > 0 && this.page >= totalPages) {
      this.page = Math.max(totalPages - 1, 0);
      this.GetAllAgents();
      return;
    }
    this.agents = list;
    this.page = allData?.data?.page ?? this.page;
    this.totalPages = totalPages;
    this.totalElements = allData?.data?.totalElements || 0;
  })
}

goToPage(nextPage: number): void {
  if (nextPage < 0 || nextPage >= this.totalPages || nextPage === this.page) {
    return;
  }
  this.page = nextPage;
  this.GetAllAgents();
}

changePageSize(event: Event): void {
  const value = Number((event.target as HTMLSelectElement).value);
  this.pageSize = value;
  this.page = 0;
  this.GetAllAgents();
}

get pageNumbers(): number[] {
  return Array.from({ length: this.totalPages }, (_, index) => index);
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

  openAddModal(): void{
  this.agentObj = {};
  this.isEditAgent = false;
  this.modalRef = this.modalService.open(this.agentModal, { centered: true, backdrop: 'static' });
}


}
