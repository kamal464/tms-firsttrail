import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';
import { API_BASE_URL ,Api_Base} from '../shared/api-config';
import { HTTP_INTERCEPTORS , HttpClient,HttpHeaders} from '@angular/common/http';
import { SharedServiceService } from '../shared/shared-service.service';

@Component({
  selector: 'app-schema-column',
  templateUrl: './schema-column.component.html',
  styleUrls: ['./schema-column.component.scss']
})
export class SchemaColumnComponent implements OnInit {
  @Output() onAction: EventEmitter<string> = new EventEmitter<string>();
  __currentAction = 'view';
  fkSchemaTableId :string;
  coloumnRows: any= [];
  _selected_option:any = this.coloumnRows[0];
  SchemaColumn :any = [];
  filteredData : any = [];
SelectedColumnData : any  =[];
  selectedColumn: any = '';
  isChecked = true; 
  description: string;
  notes: string;
  columnType: string[]= [];
  dataType: string[]= [];
  columnTypeDrop:any[];
  dataTypeDrop:any[];
columnname:string;
id:string;
selectedObject:any;
  constructor(private sharedservice: SharedServiceService,private http : HttpClient) {
    // this.coloumnRows = this.sharedservice.getColoumnRows();
    this.fkSchemaTableId = this.sharedservice.getFkSchemaTableId();
    console.log(this.fkSchemaTableId)
    console.log(this.coloumnRows)
  }
  




  
  selectObject(index: number = 0) {
  
    if (this.filteredData && this.filteredData.length > index) {
      this.selectedObject = this.filteredData[index];
    console.log(this.selectedObject)
      this.columnType = [this.selectedObject?.columntype] || [];
      this.dataType = [this.selectedObject?.datatype] || [];
      this.description = this.selectedObject?.description || '';
      this.notes = this.selectedObject?.notes || '';
      this.isChecked = this.selectedObject?.isactive || '';
    }

    
  }
  // selectColumn(column: string) {
  //   console.log(column);
  //   this.SelectedColumnData = this.filteredData.find(item => item.columnname === column || item.id === column);
  //   this.isChecked = this.SelectedColumnData.isactive;
  // }
  selectColumn(column: string) {
    console.log(column);
    this.SelectedColumnData = this.filteredData.find(item => item.columnname === column || item.id === column);
    this.columnname = this.filteredData.some(item => item.columnname === column) ? column : '';
    this._selected_option = this.columnname
    this.selectedColumn = column;
    if (this.SelectedColumnData) {
      this.id = this.SelectedColumnData.id 
      console.log(this.id)
      console.log(this.SelectedColumnData.columntype);
    } else {
      console.log("Column not found.");
    }
  }
  

  ngOnInit(): void {
    this.getSchemaColumn();
    this.getDropColumnType();
    this.getDropDataType();
  }

  doAction(action:string): void {
this.__currentAction = action;
console.log(this.__currentAction)
if(action == 'edit'){

}
else if (action == 'save') {
  this.editColumns()
  this.__currentAction = 'view';
  }
  else if (action == 'cancel') {
    
    this.__currentAction = 'view';
  }
  }

getSchemaColumn(){
  this.http.post(`${API_BASE_URL}/t/schemacolumn/getall`,{}).subscribe((data) => {
      if(data != undefined && data != null){
this.SchemaColumn = data
console.log(this.SchemaColumn)
 this.filteredData = this.SchemaColumn.filter(item => item.fkschematableid === this.fkSchemaTableId);
 this.selectObject(this.filteredData[0])
console.log(this.filteredData);
this.coloumnRows = this.filteredData.map(item => item.columnname);
console.log(this.coloumnRows)
this._selected_option = this.coloumnRows[0]
console.log(this._selected_option)
this.selectedColumn = this.coloumnRows[0];
console.log(this.selectedColumn)
// this.SelectedColumnData = this.filteredData[0]
const baseid = this.filteredData[0].id
this.selectColumn(this.coloumnRows[0])
console.log(baseid)
      }
  })
  
}


editColumns() {
  const requestBody = {
    id: this.id,
    fkschematableid:this.fkSchemaTableId,
    columnname: this.columnname,
    columntype: this.columnType.toString(),
    datatype:this.dataType.toString(),
    description: this.description,
    notes: this.notes,
    isactive: this.isChecked ? '1' : '0'
  };
console.log(requestBody)
  this.http.post(`${API_BASE_URL}/t/schemacolumn/update`, requestBody)
    .subscribe(() => {
      console.log("editColumns called");
    });
}





getDropColumnType(){
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('reason', 'SchemaColumnType')
  this.http.post(`${Api_Base}/utils/dropdown/reason`, {}, { headers }).subscribe(
    (response:any) => {
      this.columnTypeDrop = response;
      console.log(response);
    },
   
  );
}




getDropDataType(){
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('reason', 'SchemaColumnDataType')
  this.http.post(`${Api_Base}/utils/dropdown/reason`, {}, { headers }).subscribe(
    (response:any) => {
      this.dataTypeDrop = response;
      console.log(response);
    },
   
  );
}


  
}
