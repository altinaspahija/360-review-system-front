import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../service/employees.service';
import { ThrowStmt } from '@angular/compiler';

export interface EmployeeDetails {
  userId: number;
  name: String;
  surname: String;
  email: String;
  phoneNumber: String;
  startDate: Date;
  profileImage: String;
  positionId: Number;
  roleId: Number;
  positionTitle: String;
  departmentTitle: String;
}

export interface Department {
  departmentId: number;
  departmentTitle: String;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  manager: EmployeeDetails[] = [];
  employee: EmployeeDetails[] = [];
  department: Department[] = [];
  softwareDev: EmployeeDetails[] = [];
  it: EmployeeDetails[] = [];
  cloud: EmployeeDetails[] = [];
  engineering: EmployeeDetails[] = [];
  filterDeptTitlesArray: String[] = [];
  allusers: EmployeeDetails[] = [];

  user_role: any;
  user_id: any;

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
  }

  ngOnInit(): void {
    this.getManagers();
    this.getEmployees();
    this.getAllDepartments();
    this.getEmployeesByDep();
    this.getAllUsers();
  }

  getManagers() {
    this.employeeService.getManagers()
      .subscribe((res) => {
        this.manager = res;
      })
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe((res) => {
        this.employee = res;
      })
  }

  getEmployeesByDep() {
    this.employeeService.getDepartments()
      .subscribe((res) => {
        this.department = res;
        this.filterDeptTitlesArray = res.map(obj => obj.departmentTitle);
      })
    this.filterDeptTitlesArray.includes("Software Development")
    this.employeeService.getEmployeesByDep("Software Development")
      .subscribe((res) => {
        this.softwareDev = res;
      })
    this.filterDeptTitlesArray.includes("IT")
    this.employeeService.getEmployeesByDep("IT")
      .subscribe((res) => {
        this.it = res;
      })
    this.filterDeptTitlesArray.includes("Cloud")
    this.employeeService.getEmployeesByDep("Cloud")
      .subscribe((res) => {
        this.cloud = res;
      })
    this.filterDeptTitlesArray.includes("Engineering")
    this.employeeService.getEmployeesByDep("Engineering")
      .subscribe((res) => {
        this.engineering = res;
      })
  }

  getAllDepartments() {
    this.employeeService.getDepartments()
      .subscribe((res) => {
        this.department = res;
      })
  }

  getAllUsers() {
    this.employeeService.getAllUsers()
      .subscribe((res) => {
        this.allusers = res;
      })
  }

  employeeDetails(userId: number) {
    if (this.user_role !== 'EMPLOYEE') {
      this.router.navigate(['employeeDetails', userId]);
    }
    else if (this.user_role === 'MANAGER' || this.user_role === 'HR') {
      this.router.navigate(['employees']);
    }
  }

  addEmployee() {
    this.router.navigate(['addEmployee']);
  }

}


