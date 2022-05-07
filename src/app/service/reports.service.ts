import { CloseReviews, OpenReviews } from './../reviews/reviews.component';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Review } from '../home/home.component';
import { catchError } from 'rxjs/operators';
import { EmployeesReview } from '../employee-details/employee-details.component';
import { ReviewsInvitation, ReviewsStatistics } from '../reports/reports.component';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  baseURL: string = "http://localhost:9090";
  
  constructor(private httpClient: HttpClient) { }

  getTopAverageRatingReviews(): Observable<ReviewsStatistics[]>{
    return this.httpClient.get<ReviewsStatistics[]>(`${this.baseURL}/topAverageRatingReviews`);
  }

  gettopAverageRatingRecentReviews(): Observable<ReviewsStatistics[]>{
    return this.httpClient.get<ReviewsStatistics[]>(`${this.baseURL}/topAverageRatingRecentReviews`);
  }

  getAverageOverallRating(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/averageOverallRating`);
  }

  getNumberOfRespondentsOfRecentReview(): Observable<ReviewsInvitation[]>{
    return this.httpClient.get<ReviewsInvitation[]>(`${this.baseURL}/numberOfRespondentsOfRecentReview`);
  }

  getNumberOfInivatiationsOfRecentReview(): Observable<ReviewsInvitation[]>{
    return this.httpClient.get<ReviewsInvitation[]>(`${this.baseURL}/numberOfInvitationsOfRecentReview`);
  }

  getOverallNumberOfRespondents(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/overallNumberOfRespondents`);
  }

  getOverallNumberOfInvitations(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/overallNumberOfInvitations`);
  }

  getNumberOfRespondents(): Observable<ReviewsInvitation[]>{
    return this.httpClient.get<ReviewsInvitation[]>(`${this.baseURL}/numberOfRespondents`);
  }

  getNmberOfInivtations(): Observable<ReviewsInvitation[]>{
    return this.httpClient.get<ReviewsInvitation[]>(`${this.baseURL}/numberOfInvitations`);
  }

  getAverageReviewsRating(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/averageReviewsRating`);
  }

  getReviewsByEmployee(employeeId: number): Observable<EmployeesReview[]>{
    return this.httpClient.get<EmployeesReview[]>(`${this.baseURL}/reviews/reviewsByEmployee/${employeeId}`);
  }

  getReviewsToEmployee(employeeId: number): Observable<EmployeesReview[]>{
    return this.httpClient.get<EmployeesReview[]>(`${this.baseURL}/reviews/reviewsToEmployee/${employeeId}`);
  }

  getAverageRatingsToEmployee(employeeId: number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviews/averageRatingsToEmployee/${employeeId}`);
  }

  getAverageRatingsByEmployee(employeeId: number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviews/averageRatingsByEmployee/${employeeId}`);
  }

  getOverallAverageRatingToEmployee(employeeId: number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviews/averageOverallRatingToEmployee/${employeeId}`);
  }
  
  getOverallAverageRatingByEmployee(employeeId: number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviews/averageOverallRatingByEmployee/${employeeId}`);
  }

  getNumberOfRespondentsToEmployee(employeeId: number): Observable<any>{
    return this.httpClient
    .get<any>(`${this.baseURL}/numberOfRespondentsToEmployee/${employeeId}`);
  }

  getNumberOfRespondentsByEmployee(employeeId: number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/numberOfRespondsByEmployee/${employeeId}`);
  }

  getOverallNumberOfRespondentsToEmployee(employeeId: number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/overallNumberOfRespondentsToEmployee/${employeeId}`);
  }
  
  getOverallNumberOfRespondentsByEmployee(employeeId: number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/overallNumberOfRespondsByEmployee/${employeeId}`);
  }
  
  getReviewsNumberOfRespondsByEmployee(employeeId: number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviewsNumberOfRespondsByEmployee/${employeeId}`);
  }
  
  getReviewsNumberOfRespondentsToEmployee(employeeId: number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviewsNumberOfRespondentsToEmployee/${employeeId}`);
  }

  getReviewsAverageRatingsToEmployee(employeeId: number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviews/averageReviewsRatingsToEmployee/${employeeId}`);
  }

  getReviewsAverageRatingsByEmployee(employeeId: number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviews/averageReviewsRatingsByEmployee/${employeeId}`);
  }

}