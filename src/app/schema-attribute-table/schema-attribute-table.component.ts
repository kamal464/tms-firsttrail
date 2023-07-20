import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { API_BASE_URL,Api_Base } from '../shared/api-config';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-schema-attribute-table',
  templateUrl: './schema-attribute-table.component.html',
  styleUrls: ['./schema-attribute-table.component.scss']
})
export class SchemaAttributeTableComponent implements OnInit {
  @Input() formData: any = [];
  @Input() currentSelectedReason :any;
@Input() commentTypeDrop : any = [];
  _currentAction = 'view'
  currentIndex = 0;
  editable: boolean;
  editid:any;
  deleteid : any;
  editMode: false 
  inputLabel: any = [ "#","Type","Description","Isactive"," "];
  constructor( private http : HttpClient) { 
    
  }
  toggleEditMode(data: any) {
    data.editMode = !data.editMode;
  }


  getfield(field):void{
    this.editid = field;
    for (let field of this.formData) {
      this.editable = field.id === field;
    }
    
    console.log(field)
  }

  doAction(action): void {
   
    this._currentAction = action;

  
}
  ngOnInit(): void {
  }

  updateAttribute() {
    const fieldId = this.editid;
    const fieldToUpdate = this.formData.find((field) => field.id === fieldId);
  
    if (fieldToUpdate) {
      const updateData = {
        id: this.editid,
        serialno: '2',
        attrtype: fieldToUpdate.attrtype,
        fkschematableid: this.currentSelectedReason.id,
        description: fieldToUpdate.description,
        isactive: fieldToUpdate.isactive
      };
  
      console.log(updateData);
  
      this.http.post(`${API_BASE_URL}/t/schematableattr/update`, updateData).subscribe(() => {
        console.log('editAttribute is called');
        
        
      });
    }
  }

}
