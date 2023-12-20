import { Component, OnInit, Input, OnChanges, SimpleChanges ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResetEmailComponent } from '../changefields/reset-email/reset-email.component';
import { ResetPhonenumberComponent } from '../changefields/reset-phonenumber/reset-phonenumber.component';
import { ResetSupervisorComponent } from '../changefields/reset-supervisor/reset-supervisor.component';
import { ResetOfficeComponent } from '../changefields/reset-office/reset-office.component';
import { ResetNewPromotionComponent } from '../changefields/reset-new-promotion/reset-new-promotion.component';
import { DynamicTabComponent,TabbedItem } from '../shared/components/dynamic-tab/dynamic-tab.component';
import { DynamicComponent } from '../shared/components/dynamic-tab/dynamic-component-loader.directive';
import { SchemaColumnComponent } from '../schema-column/schema-column.component';
import { TabeventserviceService } from '../shared/tabeventservice.service';
import { SharedServiceService } from '../shared/shared-service.service';
import { EmployeeResignComponent } from '../employee-resign/employee-resign.component';
@Component({
  selector: 'app-employee-profile-entry-rightsidenav',
  templateUrl: './employee-profile-entry-rightsidenav.component.html',
  styleUrls: ['./employee-profile-entry-rightsidenav.component.scss']
})
export class EmployeeProfileEntryRightsidenavComponent implements OnInit, OnChanges {
  @ViewChild(DynamicTabComponent, { static: false })
  currentEmployee:any;
  _available_options: string[] = [
    'Reset Password',
    'Change Email',
    'Change Phone Number',
    'Confirm Employee',
    'Change Supervisor',
    'Change Office',
    'New Promotion',
    'Resign',
    'Delete Employee'
  ];

  @Input() _currentAction = '';
  _selected_option = '';

  constructor(private dialog: MatDialog,
    private sharedservice: SharedServiceService,
    private tabeventservice : TabeventserviceService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this._currentAction);
  }

  onSelectOption(option: string): void {
    // Handle option selection logic here
    this._selected_option = option;
    console.log('Selected Option:', option);

    // Use a switch statement to open different modals based on the selected option
    switch (option) {
      case 'Reset Password':
       
        break;
      case 'Change Email':
        this.openResetEmailModal();
        break;
      case 'Change Phone Number':
        this.openResetPhoneNumberModal();
        break;
      case 'Confirm Employee':
        
        break;
      case 'Change Supervisor':
        this.openResetSupervisorModal();
        break;
      case 'Change Office':
        this.openResetOfficeModal();
        break;
      case 'New Promotion':
       this.openResetNewPromotionModal();
        break;
      case 'Resign':
        this.triggerDoAction();
        break;
      case 'Delete Employee':
        
        break;
      default:
        break;
    }
  }

  triggerDoAction(): void {
    // this.sharedservice.addNavItem('column'); 
    const tabItem: TabbedItem = {
      id: 'Resign',
      icon: '',
      label: 'Resign',
      isClosable: true,
      item: new DynamicComponent(EmployeeResignComponent, {
        currentEmployee: this.currentEmployee,
        tabEvent: this.tabeventservice.tabEventSubject,
      }),
    };

    this.tabeventservice.openOrAddTab(tabItem)
    
    this.sharedservice.setSelectedOption(this._selected_option);
  
  }
  openResetEmailModal(): void {
    console.log('Opening ResetEmailComponent modal');
    const dialogRef = this.dialog.open(ResetEmailComponent, {
      width: '900px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('ResetEmailComponent modal closed');
      // Additional logic after the dialog is closed
    });
  }
  openResetPhoneNumberModal(): void {
    
    const dialogRef = this.dialog.open(ResetPhonenumberComponent, {
      width: '900px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe(() => {
      
      // Additional logic after the dialog is closed
    });
  }
  openResetSupervisorModal(): void {
    
    const dialogRef = this.dialog.open(ResetSupervisorComponent, {
      width: '900px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe(() => {
      
      // Additional logic after the dialog is closed
    });
  }
  openResetOfficeModal(): void {
    
    const dialogRef = this.dialog.open(ResetOfficeComponent, {
      width: '900px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe(() => {
      
      // Additional logic after the dialog is closed
    });
  }
  openResetNewPromotionModal(): void {
    
    const dialogRef = this.dialog.open(ResetNewPromotionComponent, {
      width: '900px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe(() => {
      
      // Additional logic after the dialog is closed
    });
  }


}
