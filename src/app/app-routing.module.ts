import { EmployeeGoalsComponent } from './employee-goals/employee-goals.component';
import { EmployeeReportsComponent } from './employee-reports/employee-reports.component';
import { EmployeeReviewsComponent } from './employee-reviews/employee-reviews.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { LoginComponent } from './login/login.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { FillReviewComponent } from './fill-review/fill-review.component';
import { ContinueCreateReviewComponent } from './continue-create-review/continue-create-review.component';
import { CreateReviewComponent } from './create-review/create-review.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { ReportsComponent } from './reports/reports.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'reports', component: ReportsComponent }, 
  { path: 'reviews', component: ReviewsComponent }, 
  { path: 'comparison', component: ComparisonComponent},
  { path: 'createReview', component: CreateReviewComponent},
  { path: 'fillReview/:reviewId/:employeeId', component: FillReviewComponent},
  { path: 'continueCreateReview', component: ContinueCreateReviewComponent },
  { path: 'employeeDetails/:id', component: EmployeeDetailsComponent},
  { path: 'addEmployee', component: AddEmployeeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: EmployeeProfileComponent},
  { path: 'employeeReview', component: EmployeeReviewsComponent},
  { path: 'employeeReports', component: EmployeeReportsComponent},
  { path: 'employeeGoals', component: EmployeeGoalsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
