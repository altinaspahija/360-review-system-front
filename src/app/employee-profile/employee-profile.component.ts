import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../service/employees.service';


export interface User{
  userId: number;
  name: String;
  surname: String;
  email: String;
  phoneNumber: String;
  start_date: Date;
  profileImage: String;
  positionId: Number;
  roleId: Number;
  positionTitle: String;
  departmentTitle: String;
  }

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  user_id:any;
  user_role:any;
  user:any;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
  }

  ngOnInit(): void {
    this.getEmployeeDetailsById();
  }

  getEmployeeDetailsById(){
    if(this.user_role==='EMPLOYEE'){
     this.employeeService.getEmployeeDetailsById(this.user_id)
     .subscribe(res=>
       {
         this.user = res;
       })
     }
   else if (this.user_role==='HR'||this.user_role==='MANAGER'){
     this.employeeService.getManagersAndHRDetailsById(this.user_id)
     .subscribe(res=>
       {
         this.user = res;
       })
     }
   }

}
