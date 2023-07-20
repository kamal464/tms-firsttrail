import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  _currentAction = 'view';
  _countries = [];
  constructor() { }

  ngOnInit(): void {
  }

  doAction(action): void {
    switch (action) {
      case 'edit':
        this._currentAction = action;
        break;
      case 'save':
        break;
      default:
        this._currentAction = 'view';
    }
  }


}
