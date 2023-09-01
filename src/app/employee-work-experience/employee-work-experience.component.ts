import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { API_BASE_URL } from '../shared/api-config';
@Component({
  selector: 'app-employee-work-experience',
  templateUrl: './employee-work-experience.component.html',
  styleUrls: ['./employee-work-experience.component.scss']
})
export class EmployeeWorkExperienceComponent implements OnInit {
  _currentAction = 'view';
  _editIndex:  number = -1;
  hasEdit:any = false;
  workExperienceArray:any=[];
  constructor(private http : HttpClient ) { }

  ngOnInit(): void {
    this.getWorkHistory();
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


getWorkHistory(){
  this.http.post(`${API_BASE_URL}/t/empworkhistory/getall`,{}).subscribe((data)=>{
    console.log(data)
    this.workExperienceArray = data;
  })
}


updateWorkExperience(item){
  const formatDateField = (dateValue) => {
    if (!dateValue) {
      return null;
    }
    
    const dateObj = new Date(dateValue);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    
    return `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
  };
  const requestBody = {
    id:item.id,
    fkempid:item.fkempid,
    employer:item.employer,
    designation:item.designation,
    roles:item.roles,
    fromdate:formatDateField(item.fromdate),
    todate:formatDateField(item.todate),
    isrelevant:null,
    reviewedbyfkempid:null,
    reviewdate:null,
    remarks:item.remarks,
    isactive:0
  }
  this.http.post(`${API_BASE_URL}/t/empworkhistory/update`,requestBody).subscribe((data)=>{
    console.log(data)
  })
}

doDelete(id){
  this.deleteWorkExperience(id);
      }

      deleteWorkExperience(id: number) {
        const combinedObject = this.workExperienceArray.find((item) => item.id === id);
      console.log(id)
        if (combinedObject) {
          const addressId = combinedObject.id;
          console.log(addressId);
          const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('id', addressId.toString());
    
      
          this.http.post(`${API_BASE_URL}/t/empworkhistory/delete`, {}, { headers }).subscribe(
            (data) => {
              console.log('workhistory is deleted', addressId);
              this.workExperienceArray = this.workExperienceArray.filter((item) => item.id !== addressId );
            }
            );
        }
      }

}
