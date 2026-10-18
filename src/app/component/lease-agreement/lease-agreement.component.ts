import { Component, TemplateRef, ViewChild } from '@angular/core';
import { LeaseAgreementRepresentation } from '../services/api/module/lease-agreement-representation';
import { LeaseAgreementService } from '../services/api/lease-agreement/lease-agreement.service';
import { StatusService } from '../services/api/status/status.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-leaseagreement',
  templateUrl: './lease-agreement.component.html',
  styleUrls: ['./lease-agreement.component.scss']
})
export class LeaseAgreementComponent {

  @ViewChild('leaseAgreementModal') leaseAgreementModal!: TemplateRef<any>;
  private modalRef?: NgbModalRef;

  leaseagreementObj:LeaseAgreementRepresentation = {};
  leaseagreements: Array<any> = [];
  allStatus:any;

  type:string;
  statusValue:any;
  isEditLeaseAgreement:boolean=false;
  dtDynamicVerticalScrollExample:any;

  canCreate = false;
  canUpdate = false;
  canDelete = false;

  constructor(
    private leaseagreementService:LeaseAgreementService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder,
    private modalService: NgbModal,
    private toast: ToastService
  ){}

  ngOnInit(): void {
    this.isEditLeaseAgreement = false;
    this.canCreate = this.permissionHelper.has(AuthIds.LEASE_AGREEMENT_CREATE);
    this.canUpdate = this.permissionHelper.has(AuthIds.LEASE_AGREEMENT_UPDATE);
    this.canDelete = this.permissionHelper.has(AuthIds.LEASE_AGREEMENT_DELETE);
    this.GetAllStatus();
    this.GetAllLeaseAgreements();
}


SaveLeaseAgreement():void{

    this.type = this.isEditLeaseAgreement==false?'Add':'Update';
    if(this.type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          this.leaseagreementService.createLeaseAgreement(this.leaseagreementObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.modalRef?.close();
              this.GetAllLeaseAgreements();  
            }
          });
          swal("Sucessfull!", "LeaseAgreement has been Adedd!", "success");
        }
       
      });
    }else{
      console.log(this.leaseagreementObj);
      
      this.leaseagreementService.createLeaseAgreement(this.leaseagreementObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.modalRef?.close();
              this.GetAllLeaseAgreements();  
            }
          });
      swal("Sucessfull!", "LeaseAgreement has been updated!", "success");

  
    }

    
}

GetLeaseAgreementById(ID:any){
  this.leaseagreementService.GetLeaseAgreementsById(ID).subscribe(allData=>{ 
  this.leaseagreementObj = allData.data.dataList[0];

  this.isEditLeaseAgreement = true;
  this.statusValue=allData.data.dataList[0].status.name;
  this.leaseagreementObj.status = allData.data.dataList[0].status.id;
  this.modalRef = this.modalService.open(this.leaseAgreementModal, { centered: true, backdrop: 'static' });
  
})
}

GetAllLeaseAgreements(){
  this.leaseagreementService.GetAllLeaseAgreements().subscribe(allData=>{
    this.leaseagreements = allData?.data?.dataList || [];
  })
}

DeleteById(ID:any){

    swal({
      title: "Are you sure",
      text: "That you want to Delete this LeaseAgreement?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Order has been deleted!", "success");
        this.leaseagreementService.DeleteLeaseAgreementById(ID).subscribe(allData=>{
          this.GetAllLeaseAgreements();
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
  this.leaseagreementObj.status = E.target.value;
  
}


openAddModal(): void{
  this.leaseagreementObj = {};
  this.isEditLeaseAgreement = false;
  this.modalRef = this.modalService.open(this.leaseAgreementModal, { centered: true, backdrop: 'static' });
}

}
