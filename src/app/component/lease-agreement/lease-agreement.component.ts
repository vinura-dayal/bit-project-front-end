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

  page = 0;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;
  pageSizeOptions = [5, 10, 20];

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
              this.page = 0;
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
  this.leaseagreementService.GetAllLeaseAgreements(this.page, this.pageSize).subscribe(allData=>{
    const list = allData?.data?.dataList || [];
    const totalPages = allData?.data?.totalPages || 0;
    if (list.length === 0 && this.page > 0 && this.page >= totalPages) {
      this.page = Math.max(totalPages - 1, 0);
      this.GetAllLeaseAgreements();
      return;
    }
    this.leaseagreements = list;
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
  this.GetAllLeaseAgreements();
}

changePageSize(event: Event): void {
  const value = Number((event.target as HTMLSelectElement).value);
  this.pageSize = value;
  this.page = 0;
  this.GetAllLeaseAgreements();
}

get pageNumbers(): number[] {
  return Array.from({ length: this.totalPages }, (_, index) => index);
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
