import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_BASE_URL } from 'src/app/shared/api-config';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-attendence-rules',
  templateUrl: './attendence-rules.component.html',
  styleUrls: ['./attendence-rules.component.scss'],
})
export class AttendenceRulesComponent implements OnInit {
  _currentAction = 'view';
    constructor() { }

    ngOnInit(): void {
    }
  doAction(action): void {
    console.log(action, 'sdfsdf');
    this._currentAction = action;
    if (action == 'popup') {
    } else if (action == 'cancel') {
      this._currentAction = 'view';
    } else if (action == 'save') {
      this._currentAction = 'view';
    }
  }

}
