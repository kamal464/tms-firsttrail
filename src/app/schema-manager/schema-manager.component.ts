import { Component, OnInit ,OnChanges, Output,Input,EventEmitter} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_BASE_URL, Api_Base } from '../shared/api-config';
import { SharedServiceService } from '../shared/shared-service.service';
@Component({
  selector: 'app-schema-manager',
  templateUrl: './schema-manager.component.html',
  styleUrls: ['./schema-manager.component.scss']
})
export class SchemaManagerComponent implements OnInit,OnChanges{
  @Output() onAction: EventEmitter<string> = new EventEmitter<string>();
  isProcessing = false;
  coloumnRows :any = [];
  _currentAction = 'view';
  defaultSelectedReasonIndex:number = 7000001;
objindex:number;
id : any;
  errorMsg = '';
  currentRoute: string;
  isChecked = true; 
  filteredReasons:any = [];
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
  module: string[] = [];
  moduleDrop : any[];
  feature:  string[]= [];
  featureDrop : any[];
    description: string;
  notes: string;
   _selected_option:any = '';
  selectedObject: any;
  columns:any=[];




ngOnChanges(){

}


  selectObject(index: number = 0) {
  
    if (this.filteredReasons && this.filteredReasons.length > index) {
      this.selectedObject = this.filteredReasons[index];
    
      this.module = [this.selectedObject?.modulename] || [];
      this.feature = [this.selectedObject?.featurename] || [];
      this.description = this.selectedObject?.description || '';
      this.notes = this.selectedObject?.notes || '';
      this.isChecked = this.selectedObject?.isactive || '';
    }

    
  }
  
  
  

  // onEditClick() {
  //   this._currentAction = 'edit';
  //   this.module = ''; 
  //   this.feature = '';
  //   this.description= '';
  //   this.notes = '';
  //   this.isChecked = this.isChecked ; 
  // }


  

onSave(value){
  this._currentAction = 'view';

}

  constructor(private http : HttpClient,private router: Router,private sharedservice : SharedServiceService) { }

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
    this.id = action.id;
    console.log(this._selected_option)
    this.getColumns()
    
    this.currentSelectedReason= action;
    console.log(this.currentSelectedReason)
    this._currentAction = 'view';
    this.sharedservice.setFkSchemaTableId(this.id)
  }

  getReasons() {
    this.http
      .post(`${API_BASE_URL}/t/schematable/getall`, {},{
        // headers: new HttpHeaders().set('id', id)
      }).subscribe((data) =>{
        if (data !== undefined && data !== null) {
        this.filteredReasons = data;
        this._selected_option = data[0].tablename;
        this.currentSelectedReason = data[0]
        this.id= data[0].id
        console.log(this.id)
        this.sharedservice.setFkSchemaTableId(this.id)
        
        console.log(this.filteredReasons,this._selected_option);
        this.selectObject(0);
        }
       
      }) 
    }  


    editColumns() {
      const requestBody = {
        id: this.id,
        tablename:this._selected_option,
        modulename: this.module.toString(),
        featurename: this.feature.toString(),
        description: this.description,
        notes: this.notes,
        isactive: this.isChecked ? '1' : '0'
      };
    console.log(requestBody)
      this.http.post(`${API_BASE_URL}/t/schematable/update`, requestBody)
        .subscribe(() => {
          console.log("editColumns called");
        });
    }
    
    getColumns() {
      const table = this._selected_option ? this._selected_option : this.filteredReasons[0].tablename;

      console.log(table);
      this.http
        .post(`${API_BASE_URL}/t/${table}/getall`, {}, {
          // headers: new HttpHeaders().set('id', id)
        })
        .subscribe(
          (data) => {
            console.log(data);
            if (Array.isArray(data) && data.length > 0) {
              this.columns = data;
               console.log(this.columns)
              const firstRow = this.columns[0];
              if (firstRow) {
                const columnNames = Object.keys(firstRow); // Extract column names from the first row
                console.log('Column names:', columnNames);
                this.coloumnRows = columnNames;
                this.sharedservice.setColoumnRows(columnNames);
               
              }
            }
          }
          
        );
    }
    
    
  



    getDropModule(){
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'SchemaTableModule')
      this.http.post(`${Api_Base}/utils/dropdown/reason`, {}, { headers }).subscribe(
        (response:any) => {
          this.moduleDrop = response;
          console.log(response);
        },
       
      );
  }
  getDropFeature() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'SchemaTableFeature');
  
    this.http.post(`${Api_Base}/utils/dropdown/reason`, {}, { headers }).subscribe(
      (data: any) => {
        this.featureDrop = data;
        
        console.log(data);
      },
     
    );
  }
  


  



  doAction(action): void {
    this._currentAction = action;
    if (action == 'edit') {
     console.log(this.module);
    } else if (action == 'cancel') {
      this.errorMsg = '';
      this._currentAction = 'view';
    } else if (action == 'save') {
      this.editColumns()
      this._currentAction = 'view';
    } else if (action == 'delete') {
      this._currentAction = 'view';
    } 

    
    
  }
}
