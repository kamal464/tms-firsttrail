import {
  Component,
  OnInit,
  OnChanges,
  Output,
  Input,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL, Api_Base } from '../shared/api-config';  
import { SharedServiceService } from '../shared/shared-service.service';
import { SchemaAttributeComponent } from '../schema-attribute/schema-attribute.component';
import { HomeComponent } from '../home/home.component';
import { Subject } from 'rxjs';
import { DynamicTabComponent,TabbedItem } from '../shared/components/dynamic-tab/dynamic-tab.component';
import { DynamicComponent } from '../shared/components/dynamic-tab/dynamic-component-loader.directive';
import { SchemaColumnComponent } from '../schema-column/schema-column.component';
import { TabeventserviceService } from '../shared/tabeventservice.service';
@Component({
  selector: 'app-schema-manager',
  templateUrl: './schema-manager.component.html',
  styleUrls: ['./schema-manager.component.scss'],
})
export class SchemaManagerComponent implements OnInit {
  @ViewChild(DynamicTabComponent, { static: false })
  @Output() onAction: EventEmitter<string> = new EventEmitter<string>();
 
  // @ViewChild(SchemaAttributeComponent) schemaAttributeComponent: SchemaAttributeComponent;
  isProcessing = false;

 id:any;
 index:any;
  currentEmployee = null;
  coloumnRows: any = [];
  _currentAction = 'view';
  activeButton :string
  // defaultSelectedReasonIndex:number = 2;
  objindex: number;
  tablename: any;
  errorMsg = '';
  currentRoute: string;
  isChecked = true;
  filteredReasons: any = [];
  _OptionsType = [
    { name: 'Code', value: 'Code', key: 'code' },
    { name: 'Text', value: 'Text', key: 'valuestr' },
    { name: 'Integer', value: 'Int', key: 'valueint' },
    { name: 'Decimal', value: 'Num', key: 'valuenum' },
  ];
  currentSelectedReason: any = null;
  onSelectionChange(event: MatSelectChange) {
    this.module = event.value;
    this.feature = event.value;
  }
  module: any =[];
  moduleDrop: any[];
  feature: any = [];
  featureDrop: any[];
  description: any;
  notes: any;
  _selected_option: any = '';
  selectedObject: any;
  columns: any = [];

  constructor(
    private http: HttpClient,
    private sharedservice: SharedServiceService,
    private tabeventservice : TabeventserviceService
  ) {

    
  }
 
  // sendData(): void {
  //   let tableName = this._selected_option;
  //   let field = this.id
  //   window.open(`/meta-table?table=${tableName}&fieldid=${field}`, '_blank');
  // }
//   sendData():void{
// const actionName = 'column'

// this.sharedservice.setActionName(actionName);
// console.log(actionName , "shared")
//   }

  triggerDoAction(): void {
    // this.sharedservice.addNavItem('column'); 
    const tabItem: TabbedItem = {
      id: 'schemacolumn',
      icon: '',
      label: 'Schema-Column',
      isClosable: true,
      item: new DynamicComponent(SchemaColumnComponent, {
        currentEmployee: this.currentEmployee,
        tabEvent: this.tabeventservice.tabEventSubject,
      }),
    };

    this.tabeventservice.openOrAddTab(tabItem)
    this.sharedservice.setFkSchemaTableId(this.tablename);
    this.sharedservice.setSelectedOption(this._selected_option);
  
  }


 

  selectObject(index: number = 0) {
   
    this.index = index;
    console.log(index,'selecteobject')
     
      this.selectedObject = this.filteredReasons[index];
console.log(this.selectedObject)
      this.module = [this.selectedObject?.modulename] || [];
      this.feature = [this.selectedObject?.featurename] || [];
      this.description = this.selectedObject?.description || '';
      this.notes = this.selectedObject?.notes || '';
      this.isChecked = this.selectedObject?.isactive || '';
    
    console.log(this.module,'module')
    
  }

ischeckedFn(bool){
  this.isChecked = bool;
  console.log(bool,'check');
}

  // onEditClick() {
  //   this._currentAction = 'edit';
  //   this.module = '';
  //   this.feature = '';
  //   this.description= '';
  //   this.notes = '';
  //   this.isChecked = this.isChecked ;
  // }

  onSave(value) {
    this._currentAction = 'view';
  }

  ngOnInit(): void {
    // this.getColumns()
    this.getReasons();
    this.getDropModule();
    this.getDropFeature();
    setTimeout(() => {
      this.getColumns();
    }, 2000);
  }
  doReason(action: any): void {
    this._selected_option = action.tablename;
    this.tablename = action.tablename;
    console.log(this._selected_option);
    this.getColumns();

    this.currentSelectedReason = action;
    console.log(this.currentSelectedReason);
    this._currentAction = 'view';
    
  }

  getReasons() {
    this.http
      .post(
        `${API_BASE_URL}/v1/schematable/getall`,
        {},
        {
          // headers: new HttpHeaders().set('id', id)
        }
      )
      .subscribe((data) => {
        if (data !== undefined && data !== null) {
          this.filteredReasons = data;
          this._selected_option = data[0]?.tablename;
          this.currentSelectedReason = data[0];
          this.id = data[0].id;
          this.tablename = data[0].tablename;
          console.log(this.tablename);
          this.sharedservice.setFkSchemaTableId(this.tablename);

          console.log(this.filteredReasons, this._selected_option);
          this.selectObject(0);
          this.sharedservice.setSelectedOption(this._selected_option);
          // this.schemaAttributeComponent.currentSelectedReason = this.currentSelectedReason;
          // this.schemaAttributeComponent.getAttributes(this.currentSelectedReason.id);
        }
      });
  }

  editColumns() {
    const requestBody = {
      id: this.selectedObject.id,
      tablename: this._selected_option,
      modulename: this.module.toString(),
      featurename: this.feature.toString(),
      description: this.description,
      notes: this.notes,
      isactive: this.isChecked ? '1' : '0',
    };
    console.log(requestBody);
    this.http
      .post(`${API_BASE_URL}/v1/schematable/update`, requestBody)
      .subscribe((data) => {
        this.module = requestBody.modulename,
        this.feature = requestBody.featurename,
        this.description = requestBody.description,
        this.notes = requestBody.notes,
      
        console.log('editColumns called' ,data);
       
      });
      this.getReasons();
   
      
  }

  getColumns() {
    const table = this._selected_option
      ? this._selected_option
      : this.filteredReasons[0]?.tablename;

    console.log(table);
    this.http
      .post(
        `${API_BASE_URL}/v1/${table}/getall`,
        {},
        {
          // headers: new HttpHeaders().set('id', id)
        }
      )
      .subscribe((data) => {
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
          this.columns = data;
          console.log(this.columns);
          const firstRow = this.columns[0];
          if (firstRow) {
            const columnNames = Object.keys(firstRow); // Extract column names from the first row
            console.log('Column names:', columnNames);
            this.coloumnRows = columnNames;
            this.sharedservice.setColoumnRows(columnNames);
            this.sharedservice.setSelectedOption(this._selected_option);
          }
        }
      });
  }

  getDropModule() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'SchemaTableModule');
    this.http
      .post(`${Api_Base}/utils/dropdown/reason`, {}, { headers })
      .subscribe((response: any) => {
        this.moduleDrop = response;
        console.log(response);
      });
  }
  getDropFeature() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'SchemaTableFeature');

    this.http
      .post(`${Api_Base}/utils/dropdown/reason`, {}, { headers })
      .subscribe((data: any) => {
        this.featureDrop = data;

        console.log(data);
      });
  }

  doAction(action): void {
    this._currentAction = action;
    if (action == 'edit') {
      console.log(this.module);
    } else if (action == 'cancel') {
      this.errorMsg = '';
      this._currentAction = 'view';
    } else if (action == 'save') {
      this.editColumns();
      this._currentAction = 'view';
    } else if (action == 'delete') {
      this._currentAction = 'view';
    }
  }
}
