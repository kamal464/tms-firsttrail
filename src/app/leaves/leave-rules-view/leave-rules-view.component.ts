import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-rules-view',
  templateUrl: './leave-rules-view.component.html',
  styleUrls: ['./leave-rules-view.component.scss']
})
export class LeaveRulesViewComponent implements OnInit {
  isFilterOpen = false;
  isSortOpen = false;
  isOpen=true;
  _currentAction = 'view';
  _editIndex: number = -1;
  hasEdit:any = false;
  educationArray: any = [{ sdfdsfsd: 'dsffsd' }, { dsff: 'sdfs' }];
  constructor() {}

  ngOnInit(): void {}
  doAction(action): void {
    this._currentAction = action;
    console.log(action)
      switch (action) {
        case 'new':
      this._currentAction = action;
      
      break;
        case 'delete':
          this._currentAction = 'view';
          break;
        case 'edit':
          this._currentAction = action;
          break;
        case 'save':
          this._currentAction = 'view';
          this._editIndex = -1;
          break;
        case 'cancel':
          this._currentAction = 'view';
          this._editIndex = -1;
          break;
        default:
      }
    }

    toggleFilterOptions() {
  this.isFilterOpen = !this.isFilterOpen;

  if (this.isFilterOpen) {
    this.isSortOpen = false; 
    this.isOpen = true// Close the sort when opening the filter
  }
}

toggleSortOptions() {
  this.isSortOpen = !this.isSortOpen;

  if (this.isSortOpen) {
    this.isFilterOpen = false;
    this.isOpen = false // Close the filter when opening the sort
  }
}
  startEdit(index: number) {
    this._editIndex = index;
    this.hasEdit = true;
  }
}
