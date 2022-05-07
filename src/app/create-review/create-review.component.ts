import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { CreateReviewService } from '../service/create--review.service';
import { EmployeeService } from '../service/employees.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})

export class CreateReviewComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  subscription: Subscription = new Subscription;

  selectedValue: boolean = false;
  hide: boolean = true;
  show: boolean = false;
  showMain: boolean = true;
  finalShow: boolean = false;
  finalShowButton: boolean = false;
  showFinal: boolean = false;
  submitted = false;
  value: any;
  valuetext: any;
  employeeId: any;
  employeefromallId: any;
  searchFormMain!: FormGroup;
  employeeName: any;
  isReadonly = true;
  public reviewName!: String;
  public reviewId!: number;
  topItem = 1;
  status = "Open";
  departmentArray: any;
  department: any;
  employees: any;
  filterDeptTitlesArray: String[] = [];
  employeeByDepartament: any;
  employee: any;
  allEmployees: any;
  user_role: any;
  user_id: any;

  createdDate = new Date().toISOString().substring(0, 10);
  d = new Date();
  sevenDaysFromNow = this.d.setDate(this.d.getDate() + 14);
  sevenDaysFromNowIso = new Date(this.sevenDaysFromNow).toISOString().substring(0, 10);

  constructor(private employeeService: EmployeeService, private createReviewService: CreateReviewService, private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) {
    this.subscription = this.createReviewService.getMessagetoReset().subscribe(reset => {
      this.searchFormMain.reset()
    });
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
  }

  ngOnInit(): void {
    this.searchFormMain = this.fb.group({
      reviewName: new FormControl("", Validators.required),
      createdDate: new FormControl(this.createdDate, Validators.required),
      expirationDate: new FormControl(this.sevenDaysFromNowIso, Validators.required),
      status: new FormControl(this.status, Validators.required),
      department: new FormControl(""),
      createdFrom: new FormControl(this.user_id),
      createdTo: new FormControl("", Validators.required)
    });

    this.getAllDepartments();
    this.getAllEmployees();
  }

  onKeyUp(event: any) {
    this.reviewName = event.target.value;
  }

  getAllDepartments() {
    this.employeeService.getDepartments()
      .subscribe((res: any) => {
        this.departmentArray = res;
      })
  }

  getAllEmployees() {
    this.allEmployees = []
    this.employeeService.getEmployeesForReview()
      .subscribe((res: any) => {
        this.allEmployees = res;
      })
  }

  getSelected(value: any) {
    let department = value.value.departmentTitle
    this.employeeByDepartament = []

    if (department === 'Software Development')
      this.employeeService.getEmployeesByDepForReview("Software Development")
        .subscribe((res: any) => {
          this.employeeByDepartament = res;
        })
    else if (department === 'IT')
      this.employeeService.getEmployeesByDepForReview("IT")
        .subscribe((res: any) => {
          this.employeeByDepartament = res;
        })
    else if (department === 'Cloud')
      this.employeeService.getEmployeesByDepForReview("Cloud")
        .subscribe((res: any) => {

          this.employeeByDepartament = res;
        })
    else if (department === 'Engineering')
      this.employeeService.getEmployeesByDepForReview("Engineering")
        .subscribe((res: any) => {
          this.employeeByDepartament = res;
        })
  }

  getSelected2(value: any) {
    this.employeeId = value.value.userId
  }

  click(selected: boolean) {
    this.selectedValue = selected;
    if (this.employeeId === undefined) {
      this.selectedValue = selected;
    }
  }

  clearSearch() {
    this.searchFormMain.get('department')!.reset()
    this.searchFormMain.get('createdTo')!.reset()
    this.selectedValue = false;
  }

  continueReviewMain() {

    this.submitted = true;

    if (this.searchFormMain.valid) {

      this.showFinal = false;
      this.hide = false;
      {
        this.createReviewService.createReview(this.searchFormMain.value)
          .subscribe((res) => {
            this._snackBar.open("Review is created successfully", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['green-snackbar'] })
          });
      }
    }
    else {
      this._snackBar.open("Fill all data before review creation", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['red-snackbar'] })
    }
  }

  continueReview1() {
    this.submitted = true;
    if (!this.searchFormMain.get('reviewName')!.invalid) {
      this.show = true;
      this.showMain = false;
      this.showFinal = true
    }
    else {
      this.show = false;
      this.showMain = true;
    }
  }

}




