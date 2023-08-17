import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, OnInit ,Input,Output} from '@angular/core';
import { API_BASE_URL,Api_Base } from 'src/app/shared/api-config';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-employee-profile-personal-add',
  templateUrl: './employee-profile-personal-add.component.html',
  styleUrls: ['./employee-profile-personal-add.component.scss']
})
export class EmployeeProfilePersonalAddComponent implements OnInit {
  private subscription: Subscription;
@Input() empDetails:any;


employeeId:number;
genderArray:any=[];
empGender:any;
// empPersonalDateOfBirth:any;
empPersonaldob:any;
empPersonalDateOfMarriage : any;
empPersonalEmail:any;
empPersonalMobile:any;
empPersonalLinkedIn:any;
empPersonalTwitter:any;
empPersonalInstagram:any;
empPersonalFacebook:any;
empPersonalWebsite:any;




  constructor(private http : HttpClient,private sharedService:SharedServiceService) { }

  ngOnInit(): void {
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




  

//   updateEmpPersonal(){
//     let dob = null;
//     let dom = null;
//     if (this.empPersonaldob) {
//       const dateObj = new Date(this.empPersonaldob);
//       const year = dateObj.getFullYear();
//       const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
//       const day = dateObj.getDate();
//       dob = `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
//     }
  
//     if (this.empPersonalDateOfMarriage) {
//       const dateObj = new Date(this.empPersonalDateOfMarriage);
//       const year = dateObj.getFullYear();
//       const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
//       const day = dateObj.getDate();
//       dom = `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
//     }
//   const requestBody = {
// id:this.empDetails.personalData.id,
// fkempid:this.employeeId,
// dateofmarriage:dom,
// dateofbirth:dob,
// email:this.empPersonalEmail,
// mobile:this.empPersonalMobile,
// linkedin:this.empPersonalLinkedIn,
// twitter:this.empPersonalTwitter,
// instagram:this.empPersonalInstagram,
// facebook:this.empPersonalFacebook,
// website:this.empPersonalWebsite

//   };
//   console.log(requestBody)
// this.http.post(`${API_BASE_URL}/t/emppersonal/update`,requestBody).subscribe((data)=>{
//   console.log('updatedEmpPersonal',data);
// })

//   }


  




}
