import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private selectedOptionSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  coloumnRows: string[] = [];
  dynamicNavItems: any[] = [];
  _selected_option: any;
  private actionParameter: any;
  fkSchemaTableId: string;
  selectedOption: string;
  private actionName: string = '';
  constructor() {}
  setActionParameter(action: any): void {
    console.log('data is set', action);
    this.actionParameter = action;
  }

  getActionParameter(): any {
    console.log('data is sent');
    return this.actionParameter;
  }
  setActionName(actionName: string): void {
    this.actionName = actionName;
  }
  getActionName(): string {
    return this.actionName;
  }
  setColoumnRows(columns: string[]) {
    this.coloumnRows = columns;
    console.log(this.coloumnRows);
  }

  getColoumnRows() {
    console.log(this.coloumnRows);
    return this.coloumnRows;
  }
  setData(data: any): void {
    this.dataSubject.next(data);
  }

  getData(): BehaviorSubject<any> {
    return this.dataSubject;
  }
  setColumnData(data: any): void {
    this.dataSubject.next(data);
    console.log(data);
  }
  getColumnData() {
    return this.dataSubject;
  }

  setFkSchemaTableId(id: string) {
    this.fkSchemaTableId = id;
  }
  getFkSchemaTableId() {
    return this.fkSchemaTableId;
  }

  setSelectedOption(option: string): void {
    this.selectedOption = option;
  }

  getSelectedOption() {
    return this.selectedOption;
  }

  addNavItem(action) {
    if (!this.dynamicNavItems.includes(action)) {
      this.dynamicNavItems = [
        ...this.dynamicNavItems,
        action,
      ];
    }
  }
  removeItem(item) {
    const index = this.dynamicNavItems.indexOf(item);
    if (index !== -1) {
      this.dynamicNavItems.splice(index, 1);
      if (this.dynamicNavItems.length > 0) {
        this._selected_option =
          this.dynamicNavItems[this.dynamicNavItems.length - 1];
      } else {
        this._selected_option = null; // or assign a default value if needed
      }
    }
  }

  getNavItems() {
    return this.dynamicNavItems;
  }
}
