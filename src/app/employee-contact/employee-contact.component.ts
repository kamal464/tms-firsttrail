import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { API_BASE_URL,Api_Base } from '../shared/api-config';

@Component({
  selector: 'app-employee-contact',
  templateUrl: './employee-contact.component.html',
  styleUrls: ['./employee-contact.component.scss']
})
export class EmployeeContactComponent implements OnInit {
  _currentAction = 'view';
    _editIndex:  number = -1; 
    hasEdit:any = false;
  contactsArray : any= [];
  relationTypeArray:any=[];
  empContactName:any;
  empRelation:any;
  contactData:any=[];
   constructor(private http : HttpClient,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getRelationType();
    this.getContacts();
  }

  startEdit(index: number) {
    this._editIndex = index;
    this.hasEdit = true;
  }
  doAction(action): void {
    this._currentAction = action;
    console.log(action)
      switch (action) {
        case 'new':
      this._currentAction = action;
      
      break;
        case 'delete':
          this._currentAction = 'view';
          break;
        case 'edit':
          this._currentAction = action;
          break;
        case 'save':
          this._currentAction = 'view';
          this._editIndex = -1;
          break;
        case 'cancel':
          this._currentAction = 'view';
          this._editIndex = -1;
          break;
        default:
      }
    }

    handleInput(inputName: string, inputValue: string): void {
      console.log(inputName,inputValue)
      this.contactData[inputName] = inputValue;
    }
    updateContact(contact){
      const requestBody = {
        id:contact.id,
         fkempid:contact.fkempid,
         contactname: this.contactData.contactname,
         relationtype: this.contactData.relationtype,
            phonenumber: this.contactData.phonenumber,
             email: this.contactData.email,
              remarks:null
              
            }
            console.log(requestBody);
      this.http.post(`${API_BASE_URL}/t/empcontact/update`,requestBody).subscribe((data)=>{
        console.log(data)
      })
      this.cdr.detectChanges();
    } 

    getRelationType(){
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('reason', 'EmpRelation');
    
      this.http.post(`${Api_Base}/utils/dropdown/reason`, {}, { headers }).subscribe(
        (data: any) => {
          this.relationTypeArray = data;
          console.log(this.relationTypeArray)
         
        },
        
      );
    }


    doDelete(id){
      this.deleteContact(id);
          }
      
          deleteContact(id: number) {
            const combinedObject = this.contactsArray.find((item) => item.id === id);
          console.log(id)
            if (combinedObject) {
              const addressId = combinedObject.id;
              console.log(addressId);
              const headers = new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('id', addressId.toString());
        
          
              this.http.post(`${API_BASE_URL}/t/empcontact/delete`, {}, { headers }).subscribe(
                (data) => {
                  console.log('Address is deleted', addressId);
                  this.contactsArray = this.contactsArray.filter((item) => item.id !== addressId );
                }
                );
            }
          }
          

getContacts(){
  this.http.post(`${API_BASE_URL}/t/empcontact/getall` , {}).subscribe((data)=>{
    console.log(data)
    this.contactsArray = data;

  
  })
}


}
