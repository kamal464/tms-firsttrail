import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
@Component({
  selector: 'app-employee-add-success-popup',
  templateUrl: './employee-add-success-popup.component.html',
  styleUrls: ['./employee-add-success-popup.component.scss']
})
export class EmployeeAddSuccessPopupComponent implements OnInit {
  @Output() rerenderEvent = new EventEmitter<void>();
  constructor(public dialog: MatDialog,public sharedService : SharedServiceService) { }

  ngOnInit(): void {

  }

closeTab(){
  this.sharedService.removeItem('addemployee');
  // this.sharedService.triggerChange();
}

}
