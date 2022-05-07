import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employees.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit,AfterViewInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  user_role:any;
  user_id:any;
  userDetails:any;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private observer: BreakpointObserver, private router: Router) { 
    this.subscription = this.employeeService.onMessage().subscribe(data => {
      if (data.employeeId != undefined) {
        this.user_id = data.employeeId
      }
      if (data.role != undefined) {
        this.user_role = data.role
      }
      this.getEmployeeDetailsById();
  });
  }

  ngOnInit(): void {
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
    this.getEmployeeDetailsById();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  logout(){
   this.router.navigate(['/login']);
  }

   getEmployeeDetailsById(){
   if(this.user_role==='EMPLOYEE'){
    this.employeeService.getEmployeeDetailsById(this.user_id)
    .subscribe(res=>
      {
        this.userDetails = res;
      })
    }
  else if (this.user_role==='HR'||this.user_role==='MANAGER'){
    this.employeeService.getManagersAndHRDetailsById(this.user_id)
    .subscribe(res=>
      {
        this.userDetails = res;
      })
    }
  }
  
}
