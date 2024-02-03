import { Component,ViewChild, ViewContainerRef, ComponentFactoryResolver,OnInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { EmployeeComponent } from '../../employee.component';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from 'src/app/shared/api-config';
import { TabeventserviceService } from 'src/app/shared/tabeventservice.service';
import { DialogComponent, AnimationSettingsModel } from '@syncfusion/ej2-angular-popups';
import { CheckBoxComponent, ButtonModel } from '@syncfusion/ej2-angular-buttons';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { EmitType } from '@syncfusion/ej2-base';
@Component({
  selector: 'app-employee-add-success-popup',
  templateUrl: './employee-add-success-popup.component.html',
  styleUrls: ['./employee-add-success-popup.component.scss']
})
export class EmployeeAddSuccessPopupComponent implements OnInit  {
  empData :any = [];
  constructor(public dialog: MatDialog,public sharedService : SharedServiceService,private http:HttpClient,
    private tabeventservice:TabeventserviceService) { }

 

closeTab(){
  this.tabeventservice.triggerRemoveTab(-1);
  
//  this.sharedService.addReRender('Find Employee')
  // this.sharedService.triggerChange();
  

}

getEmployees(){
  this.http.post(`${API_BASE_URL}/v1/emp/getall`,{}).subscribe((data)=>{
    console.log(data,"employees data fetched");
    this.empData = data;
  })
}


@ViewChild('ejDialog') ejDialog: DialogComponent | any;
// The Dialog shows within the target element.
@ViewChild('container', { read: ElementRef, static: true }) container: ElementRef | any;
// The Dialog shows within the target element.
public targetElement?: HTMLElement;

// To get all element of the dialog component after component get initialized.
ngOnInit() {
  this.initilaizeTarget();
}

// Initialize the Dialog component target element.
public initilaizeTarget: EmitType<object> = () => {
  this.targetElement = this.container.nativeElement.parentElement;
}
// Sample level code to handle the button click action
public onOpenDialog = (event: any): void => {
    // Call the show method to open the Dialog
    this.ejDialog.show();
};
// Sample level code to hide the Dialog when click the Dialog overlay
public onOverlayClick: EmitType<object> = () => {
    this.ejDialog.hide();
}





}