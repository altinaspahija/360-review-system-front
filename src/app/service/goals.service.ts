import { CloseReviews, OpenReviews } from './../reviews/reviews.component';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Review } from '../home/home.component';
import { catchError } from 'rxjs/operators';
import { EmployeesReview, RatingDefinitiion } from '../employee-details/employee-details.component';
import { ReviewsInvitation, ReviewsStatistics } from '../reports/reports.component';
import { Skills } from '../comparison/comparison.component';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  baseURL: string = "http://localhost:9090";
  
  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/categoriesTitles`);
  }

  getAllCategoriesData(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/categories`);
  }

  getCategoriesAndQuestions():Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/questionCategories`);
  }

  getQuestionCategoriesByCategory(categoryDescription: String):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/questionCategoriesByCategory/${categoryDescription}`);
  }

  getRatingsByEmployeeAndCategory(employeeId: number, categoryTitle: String): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/ratingsByEmployeeAndCategory?employeeId=${employeeId}&categoryTitle=${categoryTitle}`);
  }

  getRatingcScales(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/ratingScales`);
  }
  
  getRatingsReviewValues(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/ratingReviewValues`);
  }

  getSkillsByEmployeeId(employeeId:number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/skillsByEmployeeId/${employeeId}`);
  }

  getSkills(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/skills`);
  }

  getSkillsByEmployee(employee:String): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/skillsByEmployee?employee=${employee}`);
  }
  
}