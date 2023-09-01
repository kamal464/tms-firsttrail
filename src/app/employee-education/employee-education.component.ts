import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_BASE_URL } from '../shared/api-config';
import { Subscription } from 'rxjs';
import { SharedServiceService } from '../shared/shared-service.service';

@Component({
  selector: 'app-employee-education',
  templateUrl: './employee-education.component.html',
  styleUrls: ['./employee-education.component.scss']
})
export class EmployeeEducationComponent implements OnInit {
  _currentAction = 'view';
  _editIndex:  number = -1;
  hasEdit:any = false;
  educationArray:any=[];
  employeeId:any;
  constructor(private http :HttpClient,private sharedService:SharedServiceService) { }
  private subscription : Subscription
  ngOnInit(): void {
    this.getEducation();
    this.subscription = this.sharedService.employeeId$.subscribe((empid) => {
      this.employeeId = empid;
      if (this.employeeId) {
        console.log('Employee ID in Component B:', this.employeeId);
        // You can perform further actions with the employee ID here
      } else {
        console.log('Employee ID not set in Component B');
      }
    });
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

getEducation(){
  this.http.post(`${API_BASE_URL}/t/empeducation/getall`,{}).subscribe((data)=>{
    console.log(data,'data is fetched');
    this.educationArray = data;
  })
}

updateEducation(item){
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
  const requestBody ={
    id: item.id,
    fkempid: this.employeeId,
    course: item.course,
    institute: item.institute,
    specialization: item.specialization,
    fromDate: formatDateField(item.fromDate),
    toDate: formatDateField(item.toDate),
    score: item.score,
    scoremax: item.scoremax,
    scoremetric: item.scoremetric,
    type: item.type,
    remarks: item.remarks,
    isactive: 0,
    reviewedbyfkempid: null,
    reviewdate: null
  }

  this.http.post(`${API_BASE_URL}/t/empeducation/update`,requestBody).subscribe((data)=>{
    console.log(data)
  })
}

doDelete(id){
  this.deleteEducation(id);
      }

      deleteEducation(id: number) {
        const combinedObject = this.educationArray.find((item) => item.id === id);
      console.log(id)
        if (combinedObject) {
          const addressId = combinedObject.id;
          console.log(addressId);
          const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('id', addressId.toString());
    
      
          this.http.post(`${API_BASE_URL}/t/empeducation/delete`, {}, { headers }).subscribe(
            (data) => {
              console.log('workhistory is deleted', addressId);
              this.educationArray = this.educationArray.filter((item) => item.id !== addressId );
            }
            );
        }
      }





}
