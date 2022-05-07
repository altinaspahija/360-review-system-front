import { EmployeeService } from './../service/employees.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEmployeeComponent implements OnInit {

  user_role: any;
  user_id: any;
  department: any;
  role: any;
  position: any;
  registerForm!: FormGroup;
  submitted = false;
  roleId: any;
  id: any;
  positionByDep: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private employeesService: EmployeeService, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl("", Validators.required),
      surname: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      email: new FormControl("", Validators.pattern(this.emailPattern)),
      password: new FormControl("", Validators.required),
      phoneNumber: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      roleId: new FormControl("", Validators.required),
      departmentId: new FormControl("", Validators.required),
      positionId: new FormControl("", Validators.required)
    });

    this.getDepartments();
    this.getRoles();
    this.getPositions();
  }

  get email() {
    return this.registerForm.get('email');
  }

  getDepartments() {
    this.employeesService.getAllDepartments()
      .subscribe((res) => {
        this.department = res;
      })
  }

  getRoles() {
    this.employeesService.getRoles()
      .subscribe((res) => {
        this.role = res;
      })
  }

  getPositions() {
    this.employeesService.getPositions()
      .subscribe((res) => {
        this.position = res;
      })
  }

  getSelected(value: any) {
    let departmentId = value.value;
    this.positionByDep = [];
    this.employeesService.getPositionsByDepartment(departmentId)
      .subscribe((res) => {
        this.positionByDep = res;
      })
  }

  registerEmployee() {
    let name = this.registerForm.get('name')!.value;
    let surname = this.registerForm.get('surname')!.value;
    let username = this.registerForm.get('username')!.value;
    let password = this.registerForm.get('password')!.value;
    let email = this.registerForm.get('email')!.value;
    let phoneNumber = this.registerForm.get('phoneNumber')!.value;
    let startDate = (this.registerForm.get('startDate')!.value).toLocaleDateString("fr-CA");
    let roleId = this.registerForm.get('roleId')!.value;
    let positionId = this.registerForm.get('positionId')!.value;

    this.submitted = true;
    if (this.registerForm.valid) {
      this.employeesService.registerEmployee
        (name, surname, username, encodeURI(password), email, phoneNumber, startDate, roleId, positionId).pipe(take(1))
        .subscribe((res) => {
          this._snackBar.open("User is created successfully", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['green-snackbar'] })
          this.registerForm.reset();
        });
    }
    else {
      this._snackBar.open("Fill all the data", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['red-snackbar'] })
    }
  }

}


