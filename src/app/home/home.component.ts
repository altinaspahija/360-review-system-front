import { ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Component} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewService } from '../service/review.service';
import { CreateReviewService } from '../service/create--review.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Location } from '@angular/common';
import { ReportsService } from '../service/reports.service';
import { EmployeeService } from '../service/employees.service';
import { Subscription } from 'rxjs';


export interface Review{
  userId: number;
  reviewId: number;
  reviewName: String;
  createdDate: Date;
  expirationDate: Date;
  status: String;
  createdFrom: String;
  createdFor: String;
}

export interface ReviewInvitation{
  reviewId: number;
  reviewName: String;
  createdDate: Date;
  expirationDate: Date;
  employeeId: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{

  reviews:Review[]=[];
  reviewsInvitations:ReviewInvitation[]=[];
  searchForm!: FormGroup;
  collapse = true;
  count:any;
  countOpen:any;
  countClose:any;

  displayedColumns: string[] = [
    'reviewName','status','createdDate', 'expirationDate'
    ];
  
    displayedColumns2: string[] = [
      'reviewName','createdDate', 'expirationDate', 'name', 'fillReview'
    ];


  public dataSource = new MatTableDataSource<Review>();
  public dataSource2 = new MatTableDataSource<ReviewInvitation>();

  @ViewChild('MatSort1', {static: false})
  MatSort1!: MatSort;
  
  @ViewChild('MatPaginator1',{static: false})
  MatPaginator1!: MatPaginator;
  
  @ViewChild('MatSort2', {static: false})
  MatSort2!: MatSort;
  
  @ViewChild('MatPaginator2',{static: false})
  MatPaginator2!: MatPaginator;

  public reviewName = '';
  public createdDate = '';
  public expirationDate = '';
  public status = '';

  subscription: Subscription;
  user_role:any;
  user_id:any;

  constructor(public location: Location, private employeeService: EmployeeService, private reviewService: ReviewService, private createReviewService: CreateReviewService, private fb: FormBuilder, private router: Router){
    
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")

    this.subscription = this.employeeService.onMessage().subscribe(data => {
      if (data.employeeId != undefined) {
        this.user_id = data.employeeId
      }
      if (data.role != undefined) {
        this.user_role = data.role
      }
      this.getallReviews();
      this.reviewsCount();
      this.openReviewsCount();
      this.closeReviewsCount();
      this.getPendingReviews();
  });
  }

  ngOnInit() : void {
    this.searchForm = this.fb.group({
      reviewName: new FormControl(""),
      status: new FormControl(""),
      createdDate: new FormControl(""),
      expiredDate: new FormControl("")
    });
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")

    this.getallReviews();
    this.reviewsCount();
    this.openReviewsCount();
    this.closeReviewsCount();
    this.getPendingReviews();
  }

getallReviews(){
  if(this.user_role==='HR'||this.user_role==='MANAGER')
  {
    this.reviewService.getReviews()
    .subscribe((res:any)=>{
      this.dataSource.data = res;
      this.dataSource.sort = this.MatSort1
      this.dataSource.paginator = this.MatPaginator1;
    })
    this.dataSource.data.length > 0;
  }
  else if(this.user_role==='EMPLOYEE')  
  {
    this.reviewService.getReviewsByCreatedTo(this.user_id)
      .subscribe((res:any) => {
        this.dataSource.data = res;
      })
    this.dataSource.data.length > 0;
  }
}

getPendingReviews(){
  this.createReviewService.getReviewInvitationsByOpenStatusAndEmployee(this.user_id)
  .subscribe((res)=>{
    this.dataSource2.data = res;
  })
  this.dataSource2.data.length > 0;
}

reviewsCount(){
  if(this.user_role==='HR'||this.user_role==='MANAGER')
  {
    this.reviewService.getReviewCount().subscribe((res)=>{
      this.count = res;
    })
  }
  else if(this.user_role==='EMPLOYEE')  
  {
    console.log(this.user_id)
    this.reviewService.getReviewCountByUserId(this.user_id).subscribe((res)=>{
      this.count = res;
      console.log(this.count)
    })
  }
}

openReviewsCount(){
  if(this.user_role==='HR'||this.user_role==='MANAGER')
  {
  this.reviewService.getOpenReviewCount().subscribe((res)=>{
    this.countOpen = res;
  })
}
  else if(this.user_role==='EMPLOYEE')  
  {
    this.reviewService.getOpenReviewCountByUserId(this.user_id).subscribe((res)=>{
      this.countOpen = res;
    })
  }
}

closeReviewsCount(){
  if(this.user_role==='HR'||this.user_role==='MANAGER')
  {
  this.reviewService.getCloseReviewCount().subscribe((res)=>{
    this.countClose = res;
  })
  }
  else if(this.user_role==='EMPLOYEE')  
  {
    this.reviewService.getCloseReviewCountByUserId(this.user_id).subscribe((res)=>{
      this.countClose = res;
    })
  }
}

  ngAfterViewInit() {
    this.dataSource.paginator = this.MatPaginator1;
    this.dataSource.sort = this.MatSort1;
    this.dataSource2.paginator = this.MatPaginator2;
    this.dataSource2.sort = this.MatSort2;
  }

  createReview() {
    this.router.navigate(['createReview']);
  }

  fillReview(reviewId:number,employeeId:number){
    this.router.navigate(['fillReview', reviewId, employeeId]);
  }

  clearFilters() {
    this.searchForm.get('reviewName')!.reset()
    this.searchForm.get('status')!.reset()
    this.searchForm.get('createdDate')!.reset()
    this.searchForm.get('expiredDate')!.reset()
    this.getallReviews();
  }
  
  filterReviewsByReviewName(){
    const reviewName = this.searchForm.get('reviewName')!.value;
    this.reviewService.getReviewsByReviewName(reviewName)
    .subscribe(
      res => {
        if(res!=null){
        this.dataSource.data = res;
        this.dataSource.data.length > 1;
        }
        else{
        this.dataSource.data.length == 0;
        }
      })   
  }

  filterReviewsByStatus(){
    const status = this.searchForm.get('status')!.value;
    this.reviewService.getReviewsByStatus(status)
    .subscribe(
      res => {
        if(res!=null){
        this.dataSource.data = res;
        this.dataSource.data.length > 1;
        }
        else{
        this.dataSource.data.length == 0;
        }
      })
  }

  filterReviewsByCreatedDate(){
    const createdDate = (this.searchForm.get('createdDate')!.value).toLocaleDateString("fr-CA");
    this.reviewService.getReviewsByCreatedDate(createdDate)
    .subscribe(
      res => {
        if(res!=null){
        this.dataSource.data = res;
        this.dataSource.data.length > 1;
        }
        else{
        this.dataSource.data.length == 0;
        }
      })
  }

  filterReviewsExpirationDate(){
    const expirationDate = (this.searchForm.get('expiredDate')!.value).toLocaleDateString("fr-CA")
    this.reviewService.getReviewsByExpirationDate(expirationDate)
    .subscribe(
      res => {
      if(res!=null){
      this.dataSource.data = res;
      this.dataSource.data.length > 1;
      }
      else{
      this.dataSource.data.length == 0;
      }
    })
  }

  filterAllReviews(){
    const reviewName = this.searchForm.get('reviewName')!.value;
    const status = this.searchForm.get('status')!.value;
    let createdDate
    if(this.searchForm.get('createdDate')!.value){
     createdDate = (this.searchForm.get('createdDate')!.value).toLocaleDateString("fr-CA");
    }
    let expiredDate
    if(this.searchForm.get('expiredDate')!.value){
     expiredDate = (this.searchForm.get('expiredDate')!.value).toLocaleDateString("fr-CA");
    }
    this.reviewService.getAllReviews(reviewName,status,createdDate,expiredDate)
    .subscribe((res)=>{
        this.dataSource.data = res;
        this.dataSource.data.length > 1;
      })
  }

}


