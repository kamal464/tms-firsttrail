import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../shared/api-config';
@Component({
  selector: 'app-reasons',
  templateUrl: './reasons.component.html',
  styleUrls: ['./reasons.component.scss']
})
export class ReasonsComponent implements OnInit {
  _currentAction = 'view';
  input :any;
  id:string;
  reasonName:string;
  receivedFieldsData: any=[];
  currentSelectedReason: any = null;
  reasonData : any = [];
  errorMsg = '';
  isProcessing = false;
  _selected_option:any=''
  _OptionsType = [
    { name: 'Code', value: 'Code', key: 'code' },
    { name: 'Text', value: 'Text', key: 'valuestr' },
    { name: 'Integer', value: 'Int', key: 'valueint' },
    { name: 'Decimal', value: 'Num', key: 'valuenum' },
  ];
  filteredReasons = [{"name":"ServerBaseFolder"},{
    "name":"DepartmentType"
  },];

  receiveFieldsData(data: any) {
    this.receivedFieldsData = data;
    console.log(this.receivedFieldsData);
  }
  doAction(action): void {
    const previousAction = this._currentAction;
    this._currentAction = action;
    if (action == 'edit') {
    } else if (action == 'cancel') {
    
      this._currentAction = 'view';
    } else if (action == 'save') {
      if(previousAction == 'new' && action == 'save'){
        this.addReasons();
        // this._selected_option=this.reasonData[0].name
        // this.currentSelectedReason = this.reasonData[0];
        this.input = '';
        
      }else if(previousAction == 'edit' && action == 'save'){
        this.editReasons(this.currentSelectedReason.id);
        
      }
      
     
    } else if (action == 'delete') {
      this.deleteReasons(this.currentSelectedReason.id);
      console.log(this.currentSelectedReason)
      this._currentAction = 'view';
    }
      else if(action == 'new'){
        this._selected_option='New-Reason'
        this.input = '';
      }
        else if(action == 'view'){
         
        }
      
      
    console.log( '2nd == ', this._currentAction,'1st==', previousAction)
  }
  constructor(private http: HttpClient) {}
 
  getReasons(id: string) {
    this.http
      .post(`${API_BASE_URL}/t/reason/getall`, {},{
        // headers: new HttpHeaders().set('id', id)
      }).subscribe((data) =>{
        this.reasonData = data;
        this._selected_option = data[0].name;
        this.currentSelectedReason = data[0];
        
        console.log(data);
      })
      
  }

  addReasons(){

    const timestamp = new Date().getTime(); 
    const requestBody = {
      id: timestamp,
      group: '',
      name: this.input ? this.input : undefined, 
      isEditable:'',
    }; 
    console.log(requestBody)
    this.http.post(`${API_BASE_URL}/t/reason/add`,requestBody).subscribe(()=> {
      this.reasonData.push(requestBody);
      this.currentSelectedReason = this.reasonData[0];
      this._selected_option = this.reasonData[0].name;
      this._currentAction ='view';
    })
   
    
  }
  editReasons(reason: any) {
    const requestBody = {
      id: this.currentSelectedReason.id,
      group: '',
      name: this.input,
      isEditable: '0',
    };
    
    // this.reasonData.push(requestBody)
    console.log(this.input)
    this.http.post(`${API_BASE_URL}/t/reason/update`, requestBody).subscribe(() => {
      // Handle the response or any necessary actions after successfully editing the reason
      const index = this.reasonData.findIndex((reasonitem) => reasonitem.id === this.currentSelectedReason.id);
      if (index !== -1) {
        this.reasonData[index] = requestBody;
      }
    });
  }
  

  deleteReasons(reason: any) {
    const identity = reason;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('id', [identity]); // Convert reason to an array
  
    console.log(reason);
  
    this.http.post(`${API_BASE_URL}/t/reason/delete`, {}, { headers })
      .subscribe(() => {
        console.log(this.currentSelectedReason)
        const index = this.reasonData.findIndex((reasonitem) => reasonitem.id === reason );
        if (index !== -1) {
          this.reasonData.splice(index, 1);
          this.currentSelectedReason = this.reasonData[index];
          this._selected_option = this.reasonData[index].name;
        }
        console.log('delete called');
      });
  }

  doReason(action: any): void {
    this._selected_option = action.name;
    console.log(this._selected_option)
   this.input = action.name;
 
    this.currentSelectedReason= action;
    console.log(this.currentSelectedReason)
    this._currentAction = 'view';
  }



  ngOnInit(): void {
    this.getReasons('100000002');
 
  }



}
