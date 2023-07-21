import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Api_Base,API_BASE_URL } from 'src/app/shared/api-config';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-designation-attribute',
  templateUrl: './designation-attribute.component.html',
  styleUrls: ['./designation-attribute.component.scss']
})
export class DesignationAttributeComponent implements OnInit {
  @Input() formData: any = [];

  @Output() customEvent = new EventEmitter<string>();
   _currentAction = 'view'
  currentIndex = 0;
  editable: boolean;
  editid:any;
  deleteid : any;
  editMode: false 
  inputLabel: any = [ "", "#","Code","Text", "Actions"];
  constructor( private http : HttpClient) { 
    
   }

   doAction(action): void {
   
    this._currentAction = action;

  
}
  ngOnInit(): void {
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
      fkreasonid:1689917033236,
     code:fieldToUpdate.code,
    value:fieldToUpdate.value,

    };
    console.log(fieldToUpdate.code, fieldToUpdate.value,this.editid,)
    this.http.post(`${API_BASE_URL}/t/reasonitem/update`, requestBody).subscribe(() => {
    });
  } 
  }


}
