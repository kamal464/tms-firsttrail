import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-profile-entry-rightsidenav',
  templateUrl: './employee-profile-entry-rightsidenav.component.html',
  styleUrls: ['./employee-profile-entry-rightsidenav.component.scss']
})
export class EmployeeProfileEntryRightsidenavComponent implements OnInit {
  _available_options : any=['Reset Password','Change Email','Change Phone Number','Confirm Employee','Change Supervisor','Change Office','New Promotion','Resign','Delete Employee']
  constructor() { }
  _selected_option = '';
  ngOnInit(): void {
  }

}
