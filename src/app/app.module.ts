import { CreateReviewComponent } from './create-review/create-review.component';
import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { ReportsComponent } from './reports/reports.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ComparisonComponent } from './comparison/comparison.component'; 
import { RouterModule } from '@angular/router';
import { MatCardModule} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ContinueCreateReviewComponent } from './continue-create-review/continue-create-review.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';   
import { ChartsModule } from 'ng2-charts';
import { FillReviewComponent } from './fill-review/fill-review.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { LoginComponent } from './login/login.component';
import { ReviewService } from './service/review.service';
import { EmployeeService } from './service/employees.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MenuComponent } from './menu/menu.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeReviewsComponent } from './employee-reviews/employee-reviews.component';
import { EmployeeReportsComponent } from './employee-reports/employee-reports.component';
import { EmployeeGoalsComponent } from './employee-goals/employee-goals.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesComponent,
    ReportsComponent,
    ReviewsComponent,
    ComparisonComponent,
    CreateReviewComponent,
    ContinueCreateReviewComponent,
    EmployeeDetailsComponent,
    FillReviewComponent,
    AddEmployeeComponent,
    LoginComponent,
    MenuComponent,
    EmployeeProfileComponent,
    EmployeeReviewsComponent,
    EmployeeReportsComponent,
    EmployeeGoalsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    FontAwesomeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    NgSelectModule, 
    ChartsModule,
    NgbModule,
    MatStepperModule,
    MatExpansionModule,
    MatSliderModule,
    MatSnackBarModule
  ],
  exports:[
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'en-GB',
    },
    ReviewService,
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
