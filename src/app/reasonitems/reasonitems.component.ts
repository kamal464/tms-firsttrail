import { Component,Inject ,OnInit ,Input,Output,EventEmitter,OnChanges} from '@angular/core';

import { HTTP_INTERCEPTORS , HttpClient,HttpHeaders} from '@angular/common/http';
import { API_BASE_URL ,Api_Base} from '../shared/api-config'; 

@Component({
  selector: 'app-settingsitems',
  templateUrl: './reasonitems.component.html',
  styleUrls: ['./reasonitems.component.scss']
})
export class ReasonitemsComponent implements OnInit,OnChanges {
  @Input() currentSelectedReason:any = null;
  @Input() reasonToogle = false;
  @Output() onReasonUpdate = new EventEmitter<any>();
  @Output() fieldsData = new EventEmitter<any>();
  currentIndex = 0;
  reasonItemDrop :any = [];
  reasonItemData : any = [];
 newid:any;
 deleteid : any;
 editid:any;
  enteredCode: string;
enteredText: string;
  fields : any=[];
  editable: boolean;

  sendFieldsData() {
    this.fieldsData.emit(this.reasonItemData);
    
    console.log(this.reasonItemData)
  }

  _currentAction = 'view';
  errorMsg = '';
  isProcessing = false;
  
  serialno = 0;
  isLoading = false;
 

  saveFieldData(code:string,value:string): void {
   

    // this.fields.push({ code, value });
    this.addReasonitem();
    // this.fields.push(field);
   
    // this.editReasonitem(code , value);
    // console.log(field)
    
  }

editFieldData(){
 
   {
    for (let field of this.fields) {
      var code = field.code;
      var value = field.value;
    var data = {code,value}
    // this.editReasonitem(data);
      // Perform operations with code and value
      console.log("Code: " + code);
      console.log("Value: " + value);
    }
  }
  
}

reasonItems(){

  console.log('it is called')
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('reason', 'OfficeType')
  this.http.post(`${Api_Base}/utils/dropdown/reason`,{},{headers}).subscribe((data) =>{
    console.log(data);
    this.reasonItemDrop = data;
  })
}
  doAction(action): void {
   
      this._currentAction = action;

      if(action == 'save'){
      //  this.editFieldData()
      this.editReasonitem()
       this._currentAction = 'view';
      }
      else if(action == 'cancel'){
        this._currentAction = 'view';

      }
  }
getfield(field):void{
  this.editid = field;
  for (let field of this.fields) {
    this.editable = field.id === field;
  }
  
  console.log(field)
}

isEditable(fieldId: number): boolean {
  return this.editid === fieldId;
}

 
  ngOnChanges() {
    if (this.currentSelectedReason) {
      this.newid = this.currentSelectedReason.id
      console.log(this.currentSelectedReason.id)
    console.log(this._currentAction)
      this.getReasons(this.newid.toString());
      console.log(this.fields)
    }
    this._currentAction = 'view';
  }
  

  moveFieldUp(index: number) {
    if (index > 0) {
      const temp = this.fields.splice(index, 1)[0];
      this.fields.splice(index - 1, 0, temp);
      // this.currentIndex = Math.max(1, this.currentIndex - 1); // Decrement currentIndex and ensure it's at least 1
    }
  }
  moveFieldDown(index: number) {
    if (index < this.fields.length - 1) {
      const temp = this.fields.splice(index, 1)[0];
      this.fields.splice(index + 1, 0, temp);
      // this.currentIndex = Math.min(this.fields.length, this.currentIndex + 1); // Increment currentIndex and ensure it's at most the number of fields
    }}

    deleteField(index: number) {
      this.deleteid = index;
      this.fields.splice(index, 1);
     
    }
  constructor( private http : HttpClient) { 
   ;
  }


 
  editReasonitem() {
    const fieldId = this.editid;
    const fieldToUpdate = this.fields.find((field) => field.id === fieldId);
  
 if(fieldToUpdate){
    const requestBody = {
      id: this.editid,
      fkreasonid:this.currentSelectedReason.id,
     code:fieldToUpdate.code,
    value:fieldToUpdate.value,

    };
    console.log(fieldToUpdate.code, fieldToUpdate.value,this.editid,this.currentSelectedReason.id)
    this.http.post(`${API_BASE_URL}/v1/reasonitem/update`, requestBody).subscribe(() => {
    });
  } 
  }

  getReasons(id: string) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'fkreasonid')
      .set('filtervalue', id);
  
    this.http.post(`${API_BASE_URL}/v1/reasonitem/getall`, {}, { headers })
      .subscribe((data) => {
        console.log(data);
  
        // if (typeof data === 'object' && data !== null) {
         
          // this.fields.push(data);
        // } else {
         
        // }
        if (Array.isArray(data)) {
          this.fields = data.map((item: any) => ({ code: item.code, value: item.value ,id:item.id}));
        
        } else {
          this.fields = [];
        }
        console.log(this.fields);
      
      });
  }
  
  addReasonitem(){

    const timestamp = new Date().getTime(); 
    const requestBody = {
      id: timestamp,
      fkreasonid:this.currentSelectedReason.id,
      serialno:'3',
      iseditable:'1',
      isactive:'0',
      code: this.enteredCode,
      value:this.enteredText, 
    }; 
    console.log(requestBody)
    this.http.post(`${API_BASE_URL}/v1/reasonitem/add`,requestBody).subscribe(() => {
      this.enteredCode = '';
      this.enteredText = '';
    this.fields.push(requestBody)
    }) 
    
  }
  ngOnInit(): void {
    this.reasonItems();
    // this.getReasons('');
    setTimeout(() => {
      this.sendFieldsData();
    }, 2000);
    console.log(this.currentSelectedReason)
  }



  deleteReasons() {
    const identity = this.editid;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('id', [identity]); // Convert reason to an array
  
    console.log();
  
    this.http.post(`${API_BASE_URL}/v1/reasonitem/delete`, {}, { headers })
      .subscribe();
  
    console.log('delete called');
  }

}
