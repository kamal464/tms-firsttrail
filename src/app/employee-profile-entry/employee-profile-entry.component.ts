import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-profile-entry',
  templateUrl: './employee-profile-entry.component.html',
  styleUrls: ['./employee-profile-entry.component.scss']
})
export class EmployeeProfileEntryComponent implements OnInit {
  _available_options : any=['Reset Password','Change Email','Change Phone Number','Confirm Employee','Change Supervisor','Change Office','New Promotion','Resign','Delete Employee']
  constructor() { }
  _selected_option = '';
  ngOnInit(): void {
  }

}
