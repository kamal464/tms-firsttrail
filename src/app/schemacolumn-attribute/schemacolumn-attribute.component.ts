import { Component, OnInit,Input,Output,EventEmitter,OnChanges, SimpleChanges } from '@angular/core';
import { API_BASE_URL ,Api_Base} from '../shared/api-config';
import { HTTP_INTERCEPTORS , HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared/shared-service.service';
import { inputs } from '@syncfusion/ej2-angular-popups/src/dialog/dialog.component';


@Component({
  selector: 'app-schemacolumn-attribute',
  templateUrl: './schemacolumn-attribute.component.html',
  styleUrls: ['./schemacolumn-attribute.component.scss']
})
export class SchemacolumnAttributeComponent implements OnInit,OnChanges {
  @Input() currentSelectedReason:any = null;
  @Input() selectedColumn:any = null;
  _currentAction = 'view'
  currentIndex = 0;
  newid :string;
  enteredType: any;
  enteredDesc: string;
  enteredactive:boolean = true;
  commentTypeDrop :any;
  editid:any;
  editable: boolean;
  constructor(private http : HttpClient,) { }
fields : any= [];
  ngOnInit(): void {
  //  this.getAttributes('8000002') ;
  console.log(this.currentSelectedReason,'currentselectedobject')
   this.getDropCommentType();
  }
ngOnChanges(changes: SimpleChanges): void {
  if (this.currentSelectedReason) {
    this.newid = this.currentSelectedReason.id

    this._currentAction = 'view';
    console.log(this.currentSelectedReason.id)
  
    this.getAttributes(this.newid);
  }
}




  getAttributes(id: string) {
    console.log(id);
  
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'fkschemacolumnid')
      .set('filtervalue', [id]);
  
const requestBody = {
  "page": 0,
  "limit": 0,
  "filters": [
                {
                  "name": "tablename", 
                  "value": this.currentSelectedReason.tablename
                },
                {
                  "name": "columnname" ,
                  "value": this.selectedColumn
                }
              ],
  "order_by": [
                {
                  "name": "columnname", 
                  "direction": "asc"
                }
              ]
}


    this.http.post<any[]>(`${API_BASE_URL}/v1/schemacolumnattr/getlist`, requestBody)
      .subscribe((data) => {
        console.log(data);
        console.log(requestBody)
  
        if (Array.isArray(data)) {
          this.fields = data;
        } else {
          this.fields = [];
        }
        console.log(this.fields);
      });
  }
  
  doAction(action): void {
    this._currentAction = action;
    if (action == 'edit') {
    } else if (action == 'cancel') {
     
      this._currentAction = 'view';
    } else if (action == 'save') {
      this.updateAttribute();
      this._currentAction = 'view';
    } else if (action == 'delete') {
      this._currentAction = 'view';
    } 

    console.log(this._currentAction)

  }

  saveData() {
    console.log(this.fields)
    this.addAttribute();
  }
  addAttribute(){

    const timestamp = new Date().getTime(); 
    const requestBody = {
      id: timestamp,
      serialno: '2',
      attrtype:  Array.isArray(this.enteredType) ? this.enteredType.toString() : this.enteredType,
      // fkschemacolumnid: this.currentSelectedReason.id,
      description: this.enteredDesc,
      isactive: this.enteredactive ? '1' : '0',
      tablename:this.currentSelectedReason.tablename,
      columnname:this.selectedColumn,

    };
    
    //  this.isChecked = true
    console.log(requestBody)
    
    this.http.post(`${API_BASE_URL}/v1/schemacolumnattr/add`,requestBody).subscribe((data) => {
      this.fields.push(data);
      this.enteredDesc = '',
      this.enteredType = ''
    },
    (error) => {
      console.error('Error:', error);
      // Handle the error appropriately
    })
    console.log('called addAttribute')
  }


  updateAttribute() {
    const fieldId = this.editid;
    const fieldToUpdate = this.fields.find((field) => field.id === fieldId);
  
    if (fieldToUpdate) {
      const updateData = {
        id: this.editid,
        serialno: '2',
        attrtype: fieldToUpdate.attrtype,
        // fkschemacolumnid: this.currentSelectedReason.id,
        description: fieldToUpdate.description,
        isactive: fieldToUpdate.isactive,
        tablename:fieldToUpdate.tablename,
        columnname:fieldToUpdate.columnname
      };
  
      console.log(updateData);
  
      this.http.post(`${API_BASE_URL}/v1/schemacolumnattr/update`, updateData).subscribe(() => {
        console.log('editAttribute is called');
      });
    }
  }
  isEditable(fieldId: number): boolean {
    return this.editid === fieldId;
  }

  getfield(field):void{
    this.editid = field;
    console.log(field)
    for (let field of this.fields) {
      this.editable = field.id === field;
    }

  }

  getDropCommentType() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'SchemaTableAttrType');
  
    this.http.post(`${Api_Base}/utils/dropdown/reason`, {}, { headers }).subscribe(
      (data: any) => {
        this.commentTypeDrop = data;
        console.log(this.commentTypeDrop)
        console.log(data);
      },
      
    );
  }

}
