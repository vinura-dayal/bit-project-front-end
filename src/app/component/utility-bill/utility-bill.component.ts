import { Component } from '@angular/core';
import { UtilityBillRepresentation } from '../services/api/module/utility-bill-representation';
import { UtilityBillService } from '../services/api/utility-bill/utility-bill.service';
import { StatusService } from '../services/api/status/status.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';

@Component({
  selector: 'app-utilityBill',
  templateUrl: './utility-bill.component.html',
  styleUrls: ['./utility-bill.component.scss']
})
export class UtilityBillComponent {

  utilityBillObj:UtilityBillRepresentation = {};
  utilityBills: Array<any> = [];
  allStatus:any;

  type:string;
  statusValue:any;
  isEditUtilityBill:boolean=false;
  dtDynamicVerticalScrollExample:any;

  canCreate = false;
  canUpdate = false;
  canDelete = false;

  constructor(
    private utilityBillService:UtilityBillService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.isEditUtilityBill = false;
    this.canCreate = this.permissionHelper.has(AuthIds.AGENT_CREATE);
    this.canUpdate = this.permissionHelper.has(AuthIds.AGENT_UPDATE);
    this.canDelete = this.permissionHelper.has(AuthIds.AGENT_DELETE);
    this.GetAllStatus();
    this.GetAllUtilityBills();
}


SaveUtilityBill():void{

    this.type = this.isEditUtilityBill==false?'Add':'Update';
    if(this.type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          this.utilityBillService.createUtilityBill(this.utilityBillObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.GetAllUtilityBills();  
            }
          });
          swal("Sucessfull!", "UtilityBill has been Adedd!", "success");
        }
       
      });
    }else{
      console.log(this.utilityBillObj);
      
      this.utilityBillService.createUtilityBill(this.utilityBillObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.GetAllUtilityBills();  
            }
          });
      swal("Sucessfull!", "UtilityBill has been updated!", "success");

  
    }

    
}

GetUtilityBillById(ID:any){
  this.utilityBillService.GetUtilityBillsById(ID).subscribe(allData=>{ 
  this.utilityBillObj = allData.data.dataList[0];

  this.isEditUtilityBill = true;
  this.statusValue=allData.data.dataList[0].status.name;
  this.utilityBillObj.status = allData.data.dataList[0].status.id;
  
})
}

GetAllUtilityBills(){
  this.utilityBillService.GetAllUtilityBills().subscribe(allData=>{
    this.utilityBills = allData?.data?.dataList || [];
  })
}

DeleteById(ID:any){

    swal({
      title: "Are you sure",
      text: "That you want to Delete this UtilityBill?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Order has been deleted!", "success");
        this.utilityBillService.DeleteUtilityBillById(ID).subscribe(allData=>{
          this.GetAllUtilityBills();
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
  this.utilityBillObj.status = E.target.value;
  
}

}
