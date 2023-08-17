import { Injectable } from '@angular/core';
import { BehaviorSubject ,Observable} from 'rxjs';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private selectedOptionSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
    private employeeIdSubject = new BehaviorSubject<any>(null);
    employeeId$: Observable<any> = this.employeeIdSubject.asObservable();
   
  coloumnRows: string[] = [];
  dynamicNavItems: any[] = [];
  _selected_option: any;
  private actionParameter: any;
  fkSchemaTableId: string;
  selectedOption: string;
  private actionName: string = '';
  employeeid :number;




  setEmployeeid(empid : any) : void {
    this.employeeIdSubject.next(empid);
  }

  getEmployeeid() {
    return this.employeeid;
  }

 rendertoggle = false;
  private changeSubject = new Subject<void>();
  changeOccurred$ = this.changeSubject.asObservable();

  triggerChange() {
    this.rendertoggle = true;
    console.log('this is triggered')
    this.changeSubject.next();
  }
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
        this._selected_option = item
          this.dynamicNavItems[this.dynamicNavItems.length - 1];
      } else {
        this._selected_option = null;
      }
    }
  }

  getNavItems() {
    return this.dynamicNavItems;
  }
}
