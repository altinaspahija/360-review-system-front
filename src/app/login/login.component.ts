import { EmployeeService } from './../service/employees.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  employeeForm!: FormGroup;
  authorization: any;

  constructor(private fb:FormBuilder,private employeesService:EmployeeService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("",Validators.required),
    });
  }

  sendMessage(options: {employeeId?: string, role?: number}): void {
    this.employeesService.sendMessage(options);
}
 
  signIn(){
    const username = this.employeeForm.get('username')!.value;
    const password = this.employeeForm.get('password')!.value;
    this.employeesService.signInEmployee(username,password)
    .subscribe((data:any)=>{
      this.authorization = data;
      if (this.authorization==="True"){
      this.employeesService.getRoleBasedOnUsername(username)    
      .subscribe((res:any)=>{
        localStorage.setItem( "user_role", res );
        this.sendMessage( { role: res});
      this.employeesService.getUserIdBasedOnUsername(username)
      .subscribe((res:any)=>{
        localStorage.setItem( "user_id", res );
        this.sendMessage( { employeeId: res });
      },
        error => {
        })
       })
       this.router.navigate(['/home']);
      }
      else if(this.authorization==="Username is Invalid"){
        this._snackBar.open("Username is Invalid", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition,  verticalPosition: this.verticalPosition, panelClass: ['red-snackbar'] })
        this.router.navigate(['/login']);
      }
      else if(this.authorization==="Password is Invalid"){
        this._snackBar.open("Password is Invalid", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition,  verticalPosition: this.verticalPosition, panelClass: ['red-snackbar'] })
        this.router.navigate(['/login']);
      }
      else if(this.authorization==="Invalid credentials"){
        this._snackBar.open("Invalid credentials", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition,  verticalPosition: this.verticalPosition, panelClass: ['red-snackbar'] })
        this.router.navigate(['/login']);
      }
      })
    }

}

