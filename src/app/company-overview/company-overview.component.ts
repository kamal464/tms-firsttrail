import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss'],
})
export class CompanyOverviewComponent implements OnInit {
  currentAction = 'view';
  hasNew = false;
  hasEdit = true;

  constructor() {}
  doAction(action: any): void {
    switch (action) {
      case 'edit':
        this.currentAction = action;
        break;
      case 'save':
        break;
      default:
        this.currentAction = 'view';
    }
  }
  ngOnInit(): void {}
}
