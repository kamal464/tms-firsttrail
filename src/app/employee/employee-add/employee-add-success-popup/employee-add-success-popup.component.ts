import { Component,ViewChild, ViewContainerRef, ComponentFactoryResolver,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { EmployeeComponent } from '../../employee.component';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from 'src/app/shared/api-config';
@Component({
  selector: 'app-employee-add-success-popup',
  templateUrl: './employee-add-success-popup.component.html',
  styleUrls: ['./employee-add-success-popup.component.scss']
})
export class EmployeeAddSuccessPopupComponent implements OnInit {
  empData :any = [];
  constructor(public dialog: MatDialog,public sharedService : SharedServiceService,private http:HttpClient) { }

  ngOnInit(): void {

  }

closeTab(){
  this.sharedService.removeItem('addemployee');
//  this.sharedService.addReRender('Find Employee')
  this.sharedService.triggerChange();
  this.getEmployees();

}

getEmployees(){
  this.http.post(`${API_BASE_URL}/t/emp/getall`,{}).subscribe((data)=>{
    console.log(data,"employees data fetched");
    this.empData = data;
  })
}

}
