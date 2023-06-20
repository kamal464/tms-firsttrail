import { Component, OnInit,Input,Output,EventEmitter,OnChanges, SimpleChanges } from '@angular/core';
import { API_BASE_URL ,Api_Base} from '../shared/api-config';
import { HTTP_INTERCEPTORS , HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared/shared-service.service';


@Component({
  selector: 'app-schemacolumn-attribute',
  templateUrl: './schemacolumn-attribute.component.html',
  styleUrls: ['./schemacolumn-attribute.component.scss']
})
export class SchemacolumnAttributeComponent implements OnInit,OnChanges {
  @Input() currentSelectedReason:any = null;
  _currentAction = 'view'
  currentIndex = 0;
  newid :string;
  enteredType: any;
  enteredDesc: string;
  enteredactive:boolean = true;
  commentTypeDrop :any;
  editid:any;
  editable: boolean;
  constructor(private http : HttpClient) { }
fields : any= [];
  ngOnInit(): void {
  //  this.getAttributes('8000002') ;
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
  
    this.http.post<any[]>(`${API_BASE_URL}/t/schemacolumnattr/getall`, {}, { headers })
      .subscribe((data) => {
        console.log(data);
  
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
      fkschemacolumnid: this.currentSelectedReason.id,
      description: this.enteredDesc,
      isactive: this.enteredactive ? '1' : '0',
    };
    
    //  this.isChecked = true
    console.log(requestBody)
    
    this.http.post(`${API_BASE_URL}/t/schemacolumnattr/add`,requestBody).subscribe(() => {
      this.enteredDesc = '',
      this.fields.push(requestBody);
      this.enteredType = ''
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
        fkschemacolumnid: this.currentSelectedReason.id,
        description: fieldToUpdate.description,
        isactive: fieldToUpdate.isactive
      };
  
      console.log(updateData);
  
      this.http.post(`${API_BASE_URL}/t/schemacolumnattr/update`, updateData).subscribe(() => {
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
