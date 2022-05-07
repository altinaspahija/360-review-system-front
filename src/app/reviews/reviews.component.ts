import { ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Component} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewService } from '../service/review.service';

export interface OpenReviews {
  reviewName1: String;
  employee1: String;
  createdDate: Date;
}

export interface CloseReviews {
  reviewName2: String;
  employee2: String;
  expiredDate: Date;
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})

export class ReviewsComponent implements OnInit,AfterViewInit{

  searchForm1!: FormGroup;
  searchForm2!: FormGroup;
  openReviews: OpenReviews[]=[];
  closedReviews: CloseReviews[]=[];

  displayedOpenReviewsColumns: string[] = [
  'reviewName', 
  'name',
  'createdDate'
  ];
  
  displayedCloseReviewsColumns: string[] = [
    'reviewName',
    'name',
    'expirationDate'
    ];

  dataSource1 = new MatTableDataSource<OpenReviews>();
  dataSource2 = new MatTableDataSource<CloseReviews>();

  @ViewChild('MatSort1', {static: false})
  MatSort1!: MatSort;
  
  @ViewChild('MatPaginator1',{static: false})
  MatPaginator1!: MatPaginator;
  
  @ViewChild('MatSort2', {static: false})
  MatSort2!: MatSort;
  
  @ViewChild('MatPaginator2',{static: false})
  MatPaginator2!: MatPaginator;

  public reviewName1 = '';
  public employee1 = '';
  public createdDate = '';
  public name = '';
  public reviewName = '';
  public expirationDate = "";

  user_role:any;
  user_id:any;

  constructor(private reviewService: ReviewService, private fb: FormBuilder, private router: Router)
  {
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
  }

  ngOnInit() : void {
    this.searchForm1 = this.fb.group({
      reviewName1: new FormControl(""),
      employee1: new FormControl("", Validators.pattern('^[a-zA-Z ]+$')),
      createdDate: new FormControl(""),
    });
    this.searchForm2 = this.fb.group({
      reviewName2: new FormControl(""),
      employee2: new FormControl("", Validators.pattern('^[a-zA-Z ]+$')),
      expiredDate: new FormControl(""),
    });

    this.getEmployeesAndOpenReviews();
    this.getEmployeesAndCloseReviews();
  }

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
    this.dataSource1.sort = this.MatSort1;
    this.dataSource2.paginator = this.MatPaginator2;
    this.dataSource2.sort = this.MatSort2;
  }

  getEmployeesAndOpenReviews(){
    this.reviewService.getEmployeesAndOpenReviews()
    .subscribe((res)=>{
      this.dataSource1.data= res;
      this.dataSource1.sort = this.MatSort1
      this.dataSource1.paginator = this.MatPaginator1;
    })
    this.dataSource1.data.length > 0;
  }

  getEmployeesAndCloseReviews(){
    this.reviewService.getEmployeesAndCloseReviews()
    .subscribe((res)=>{
      this.dataSource2.data= res;
      this.dataSource2.sort = this.MatSort2
      this.dataSource2.paginator = this.MatPaginator2;
    })
    this.dataSource2.data.length > 0;
  }

  createReview() {
    this.router.navigate(['createReview']);
  }

  clearFilters1() {
    this.searchForm1.get('reviewName1')!.reset()
    this.searchForm1.get('employee1')!.reset()
    this.searchForm1.get('createdDate')!.reset()
    this.getEmployeesAndOpenReviews();
  }

  clearFilters2() {
    this.searchForm2.get('reviewName2')!.reset()
    this.searchForm2.get('employee2')!.reset()
    this.searchForm2.get('expiredDate')!.reset()
    this.getEmployeesAndCloseReviews();
  }

  filterOpenReviewsByEmployee(){
    const employee1 = this.searchForm1.get('employee1')!.value;
    this.reviewService.getOpenReviewsByEmployee(employee1)
    .subscribe((res)=>{
        this.dataSource1.data = res;
        this.dataSource1.data.length > 1;
      })
  }

  filterClosedReviewsByEmployee(){
    const employee2 = this.searchForm2.get('employee2')!.value;
    this.reviewService.getClosedReviewsByEmployee(employee2)
    .subscribe((res)=>{
        this.dataSource2.data = res;
        this.dataSource2.data.length > 1;
      })
  }

  filterOpenReviewsByCreatedDate(){
    const createdDate = (this.searchForm1.get('createdDate')!.value).toLocaleDateString("fr-CA");
    this.reviewService.getOpenReviewsByCreatedDate(createdDate)
    .subscribe((res)=>{
        this.dataSource1.data = res;
        this.dataSource1.data.length > 1;
      })
  }

  filterClosedReviewsByExpiredDate(){
    const expiredDate = (this.searchForm2.get('expiredDate')!.value).toLocaleDateString("fr-CA");
    this.reviewService.getClosedReviewsByExpiredDate(expiredDate)
    .subscribe((res)=>{
        this.dataSource2.data = res;
        this.dataSource2.data.length > 1;
      })
  }

  filteredOpenReviews(){
    const employee1 = this.searchForm1.get('employee1')!.value;
    const reviewName1 = this.searchForm1.get('reviewName1')!.value;
    let createdDate
    if(this.searchForm1.get('createdDate')!.value){
      createdDate = (this.searchForm1.get('createdDate')!.value).toLocaleDateString("fr-CA");
    }
    this.reviewService.getfilteredOpenReviews(employee1,createdDate,reviewName1)
    .subscribe((res)=>{
        this.dataSource1.data = res;
        this.dataSource1.data.length > 1;
      })
  }

  filteredClosedReviews(){
    const employee2 = this.searchForm2.get('employee2')!.value;
    const reviewName2 = this.searchForm2.get('reviewName2')!.value;
    let expiredDate
    if(this.searchForm2.get('expiredDate')!.value){
     expiredDate = (this.searchForm2.get('expiredDate')!.value).toLocaleDateString("fr-CA");
    }
    this.reviewService.getfilteredClosedReviews(employee2,expiredDate,reviewName2)
    .subscribe((res)=>{
        this.dataSource2.data = res;
        this.dataSource2.data.length > 1;
      })
  }

}


