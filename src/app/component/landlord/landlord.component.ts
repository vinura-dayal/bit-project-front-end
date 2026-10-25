import { Component, TemplateRef, ViewChild } from '@angular/core';
import { LandlordRepresentation } from '../services/api/module/landlord-representation';
import { LandlordService } from '../services/api/landlord/landlord.service';
import { StatusService } from '../services/api/status/status.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent {

  @ViewChild('landlordModal') landlordModal: TemplateRef<any>;
  private modalRef?: NgbModalRef;

  landlordObj:LandlordRepresentation = {};
  landlords: Array<any> = [];
  allStatus:any;

  type:string;
  statusValue:any;
  isEditLandlord:boolean=false;
  dtDynamicVerticalScrollExample:any;

  canCreate = false;
  canUpdate = false;
  canDelete = false;

  constructor(
    private landlordService:LandlordService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder,
    private modalService: NgbModal,
    private toast: ToastService

  ){}

  ngOnInit(): void {
    this.isEditLandlord = false;
    this.canCreate = this.permissionHelper.has(AuthIds.LANDLORD_CREATE);
    this.canUpdate = this.permissionHelper.has(AuthIds.LANDLORD_UPDATE);
    this.canDelete = this.permissionHelper.has(AuthIds.LANDLORD_DELETE);
    this.GetAllStatus();
    this.GetAllLandlords();
}


SaveLandlord():void{

    this.type = this.isEditLandlord==false?'Add':'Update';
    if(this.type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          this.landlordService.createLandlord(this.landlordObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.modalRef?.close();
              this.GetAllLandlords();  
            }
          });
          swal("Sucessfull!", "Landlord has been Adedd!", "success");
        }
       
      });
    }else{
      console.log(this.landlordObj);
      
      this.landlordService.createLandlord(this.landlordObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.modalRef?.close();
              this.GetAllLandlords();  
            }
          });
      swal("Sucessfull!", "Landlord has been updated!", "success");

  
    }

    
}

GetLandlordById(ID:any){
  this.landlordService.GetLandlordsById(ID).subscribe(allData=>{ 
  this.landlordObj = allData.data.dataList[0];

  this.isEditLandlord = true;
  this.statusValue=allData.data.dataList[0].status.name;
  this.landlordObj.status = allData.data.dataList[0].status.id;
  this.modalRef = this.modalService.open(this.landlordModal, { centered: true, backdrop: 'static' });
  
})
}

GetAllLandlords(){
  this.landlordService.GetAllLandlords().subscribe(allData=>{
    this.landlords = allData?.data?.dataList || [];
  })
}

DeleteById(ID:any){

    swal({
      title: "Are you sure",
      text: "That you want to Delete this Landlord?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Order has been deleted!", "success");
        this.landlordService.DeleteLandlordById(ID).subscribe(allData=>{
          this.GetAllLandlords();
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
  this.landlordObj.status = E.target.value;
  
}


openAddModal(): void{
  this.landlordObj = {};
  this.isEditLandlord = false;
  this.modalRef = this.modalService.open(this.landlordModal, { centered: true, backdrop: 'static' });

}

}
