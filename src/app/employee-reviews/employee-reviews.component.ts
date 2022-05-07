import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employees.service';
import { ReportsService } from '../service/reports.service';
import { ReviewService } from '../service/review.service';

export interface EmployeesReview {
  userId: number;
  reviewName: String;
  createdDate: Date;
  expirationDate: Date;
  completedDate: Date;
  status: String;
  name: String;
  surname: String;
  createdTo: number;
  answer: number;
}

@Component({
  selector: 'app-employee-reviews',
  templateUrl: './employee-reviews.component.html',
  styleUrls: ['./employee-reviews.component.scss']
})
export class EmployeeReviewsComponent implements OnInit, AfterViewInit {

  user_role: any;
  user_id: any;
  user: any;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private reportsService: ReportsService, private reviewService: ReviewService, private router: Router) {
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.getUsersReviews();
    this.getReviewsByEmployee()
  }

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
    this.dataSource1.sort = this.MatSort1;
    this.dataSource2.paginator = this.MatPaginator2;
    this.dataSource2.sort = this.MatSort2;
  }


  @ViewChild('MatSort1')
  MatSort1!: MatSort;

  @ViewChild('MatPaginator1')
  MatPaginator1!: MatPaginator;

  @ViewChild('MatSort2')
  MatSort2!: MatSort;

  @ViewChild('MatPaginator2')
  MatPaginator2!: MatPaginator;

  displayedColumns1: string[] = [
    'reviewName', 'createdDate', 'expirationDate'
  ];

  displayedColumns2: string[] = [
    'reviewName', 'createdDate', 'completedDate'
  ];

  dataSource1 = new MatTableDataSource<EmployeesReview>();
  dataSource2 = new MatTableDataSource<EmployeesReview>();

  getUserDetails() {
    this.employeeService.getUserById(this.user_id)
      .subscribe(res => {
        this.user = res;
      })
  }

  getUsersReviews() {
    this.reviewService.getReviewsForEmployee(this.user_id)
      .subscribe(res => {
        this.dataSource1.data = res;
      })
    this.dataSource1.data.length > 0;
  }

  getReviewsByEmployee() {
    this.reportsService.getReviewsByEmployee(this.user_id)
      .subscribe(res => {
        this.dataSource2.data = res;
      })
    this.dataSource2.data.length > 0;
  }

}
