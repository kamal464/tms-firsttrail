import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { API_BASE_URL,Api_Base } from '../shared/api-config';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-attribute-view',
  templateUrl: './attribute-view.component.html',
  styleUrls: ['./attribute-view.component.scss']
})
export class AttributeViewComponent implements OnInit {
  @Input() formData: any = [];
  @Input() currentSelectedReason :any;
  @Output() customEvent = new EventEmitter<string>();
   _currentAction = 'view'
  currentIndex = 0;
  editable: boolean;
  editid:any;
  deleteid : any;
  editMode: false 
  inputLabel: any = [ "", "#","Code","Text", "Actions"];
  constructor( private http : HttpClient) { 
    ;
   }

   doAction(action): void {
   
    this._currentAction = action;

  
}
  ngOnInit(): void {
  }
  toggleEditMode(data: any) {
    data.editMode = !data.editMode;
  }
  toggleEditable(data: any) {
    data.editableCode = !data.editableCode;
    data.editableValue = !data.editableValue;
  }

  getfield(field):void{
    this.editid = field;
    for (let field of this.formData) {
      this.editable = field.id === field;
    }
    
    console.log(field)
  }
  isEditable(fieldId: number): boolean {
    return this.editid === fieldId;
  }
  deleteField(index: number) {
    this.deleteid = index;
    this.formData.splice(index, 1);
   
  }


  moveFieldUp(index: number) {
    if (index > 0) {
      const temp = this.formData.splice(index, 1)[0];
      this.formData.splice(index - 1, 0, temp);
      // this.currentIndex = Math.max(1, this.currentIndex - 1); // Decrement currentIndex and ensure it's at least 1
    }
  }
  moveFieldDown(index: number) {
    if (index < this.formData.length - 1) {
      const temp = this.formData.splice(index, 1)[0];
      this.formData.splice(index + 1, 0, temp);
      // this.currentIndex = Math.min(this.fields.length, this.currentIndex + 1); // Increment currentIndex and ensure it's at most the number of fields
    }}



  deleteReasons() {
    const identity = this.editid;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('id', [identity]); // Convert reason to an array
  
    console.log();
  
    this.http.post(`${API_BASE_URL}/t/reasonitem/delete`, {}, { headers })
      .subscribe();
  
    console.log('delete called');
  }

  editReasonitem() {
    const fieldId = this.editid;
    const fieldToUpdate = this.formData.find((field) => field.id === fieldId);
  
 if(fieldToUpdate){
    const requestBody = {
      id: this.editid,
      fkreasonid:this.currentSelectedReason.id,
     code:fieldToUpdate.code,
    value:fieldToUpdate.value,

    };
    console.log(fieldToUpdate.code, fieldToUpdate.value,this.editid,this.currentSelectedReason.id)
    this.http.post(`${API_BASE_URL}/t/reasonitem/update`, requestBody).subscribe(() => {
    });
  } 
  }

}
