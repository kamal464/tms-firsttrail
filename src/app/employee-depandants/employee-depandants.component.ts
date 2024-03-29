import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Api_Base,API_BASE_URL } from '../shared/api-config';
@Component({
  selector: 'app-employee-depandants',
  templateUrl: './employee-depandants.component.html',
  styleUrls: ['./employee-depandants.component.scss']
})
export class EmployeeDepandantsComponent implements OnInit {
  _currentAction = 'view';
  _editIndex:  number = -1;
  hasEdit:any = false;
  dependantArray:any=[];
  relationsArray:any = [];
  gendersArray:any = [];
  dependentData :any =[];
  constructor(private http : HttpClient, private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getGenders();
    this.getRelationType();
    this.getDependents();
    console.log(this._currentAction)
  }

  handleInput(inputName: string, inputValue: string): void {
    console.log(inputName,inputValue)
    this.dependentData[inputName] = inputValue;
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

    getGenders(){
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', 'EmpGender');
      this.http.post(`${Api_Base}/utils/dropdown/reason`,{},{headers}).subscribe((data) => {
        this.gendersArray = data;
        console.log(this.gendersArray)
              })
    }
    
    getRelationType(){
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('reason', 'EmpRelation');
    
      this.http.post(`${Api_Base}/utils/dropdown/reason`, {}, { headers }).subscribe(
        (data: any) => {
          this.relationsArray = data;
          console.log(this.relationsArray)
         
        },
        
      );
    }


    getDependents(){
      this.http.post(`${API_BASE_URL}/v1/empdependent/getall`,{}).subscribe((data)=>{
        console.log(data);
        this.dependantArray = data;
      })
    }

updateDependent(dependent){
  let dob = null;
  if (this.dependentData.birthdate) {
    const dateObj = new Date(this.dependentData.birthdate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
    const day = dateObj.getDate();
    dob = `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
  }
  const timestamp = new Date().getTime();
  const requestBody ={
    id:dependent.id,
    fkempid:dependent.fkempid,
    dependentname:this.dependentData.dependentname?this.dependentData.dependentname:dependent.dependentname,
    gender:this.dependentData.gender?this.dependentData.gender : dependent.gender,
    birthdate:dob?dob:dependent.birthdate,
    relationtype:this.dependentData.relationtype?this.dependentData.relationtype:dependent.relationtype,
    remarks:null,
  }
  this.http.post(`${API_BASE_URL}/v1/empdependent/update`,requestBody).subscribe((data)=>{
    console.log(data)
  })
  this.cdr.detectChanges();
}

doDelete(id){
  this.deleteDependent(id);
      }


      deleteDependent(id: number) {
        const combinedObject = this.dependantArray.find((item) => item.id === id);
      console.log(id)
        if (combinedObject) {
          const dependentId = combinedObject.id;
          console.log(dependentId);
          const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('id', dependentId.toString());
    
      
          this.http.post(`${API_BASE_URL}/v1/empdependent/delete`, {}, { headers }).subscribe(
            (data) => {
              console.log('Address is deleted', dependentId);
              this.dependantArray = this.dependantArray.filter((item) => item.id !== dependentId );
            }
            );
        }
      }


}
