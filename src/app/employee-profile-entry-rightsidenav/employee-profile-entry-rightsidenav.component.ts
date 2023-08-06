import { Component, OnInit ,Input,Output,EventEmitter, OnChanges, SimpleChanges,} from '@angular/core';

@Component({
  selector: 'app-employee-profile-entry-rightsidenav',
  templateUrl: './employee-profile-entry-rightsidenav.component.html',
  styleUrls: ['./employee-profile-entry-rightsidenav.component.scss']
})
export class EmployeeProfileEntryRightsidenavComponent implements OnInit,OnChanges {
  _available_options : any=['Reset Password','Change Email','Change Phone Number','Confirm Employee','Change Supervisor','Change Office','New Promotion','Resign','Delete Employee']
  constructor() { }
  @Input() _currentAction = '';
  _selected_option = '';
  ngOnInit(): void {
  }

ngOnChanges(changes: SimpleChanges): void {
    console.log(this._currentAction)
}

}
