import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';
import { API_BASE_URL ,Api_Base} from '../shared/api-config';
import { HTTP_INTERCEPTORS , HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared/shared-service.service';


@Component({
  selector: 'app-schema-attribute',
  templateUrl: './schema-attribute.component.html',
  styleUrls: ['./schema-attribute.component.scss']
})
export class SchemaAttributeComponent implements OnInit ,OnChanges {
  @Input() currentSelectedReason:any = null;
  _currentAction = 'view';
  isChecked = false;
  commentTypeDrop :any;
  newid:any;
  editid:any;
  editable: boolean;
  enteredType: any;
  enteredDesc: string;
  enteredactive:boolean = true;
  currentIndex = 0;
  constructor(private http : HttpClient,
    private router: Router,private sharedService:SharedServiceService ) { }
  fields:any = [];
 
  _OptionsType = [];
  ngOnInit(): void {
    // this.getAttributes('7000001');
    this.getDropCommentType();
    // this.getAttributes(this.newid)
    console.log(this.currentSelectedReason)

  }
  sendData(): void {
    const data = 'column';
    this.sharedService.setData(data);
  
    const url = '/column'; // URL for the new tab
  
    // setTimeout(() => {
    //   const column = this.sharedService.getColoumnRows();
    //   console.log(column);
    //   this.sharedService.setColoumnRows(column);
    //   // window.open(url, '_blank');
    // }, 2000);
    // this.router.navigate(['/column']);
  }

  // sendData(): void {
  //   const url = '/column'; // URL for the new tab
  //   window.open(url, '_blank');
  // }


  getfield(field):void{
    this.editid = field;
    for (let field of this.fields) {
      this.editable = field.id === field;
    }
    console.log(field)
    console.log(this.editid)
  }

  
// openComponentInNewTab(pageName: string) {
//  const newTab = window.open('/column', '_blank');
//     newTab.focus();
// }
navigateToNewTab(): void {
  const url = '/column';
    window.open(url, '_blank');
    this.router.navigateByUrl(url);
}


  doActionedit(action: string, index: number){
    this._currentAction = action;
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


  




  ngOnChanges() {
    if (this.currentSelectedReason) {
      this.newid = this.currentSelectedReason.tablename
      this._currentAction = 'view';
      console.log(this.currentSelectedReason.id)
    
      this.getAttributes(this.newid);
      console.log(this.newid)
      console.log(this.fields)
    }
  }



updateAttribute() {
  const fieldId = this.editid;
  const fieldToUpdate = this.fields.find((field) => field.id === fieldId);

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

    this.http.post(`${API_BASE_URL}/v1/schematableattr/update`, updateData).subscribe(() => {
      console.log('editAttribute is called');
      
      
    });
  }
}

isEditable(fieldId: number): boolean {
  return this.editid === fieldId;
}




  getAttributes(id) {
    console.log(id);
  
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'tablename')
      .set('filtervalue', [id]);
  
    this.http.post<any[]>(`${API_BASE_URL}/v1/schematableattr/getall`, {}, { headers })
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


  addAttribute(){

    const timestamp = new Date().getTime(); 
    const requestBody = {
      id: timestamp,
      serialno: '2',
      attrtype:  Array.isArray(this.enteredType) ? this.enteredType.toString() : this.enteredType,
      // fkschematableid: this.currentSelectedReason.id,
      description: this.enteredDesc,
      isactive: this.enteredactive ? '1' : '0',
      tablename:this.currentSelectedReason.tablename
    };
    
    //  this.isChecked = true
    console.log(requestBody)
    
    this.http.post(`${API_BASE_URL}/v1/schematableattr/add`,requestBody).subscribe(() => {
      this.enteredDesc = '',
      this.fields.push(requestBody);
      this.enteredType = ''
    })
    console.log('called addAttribute')
  }


}
