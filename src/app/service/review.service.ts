import { CloseReviews, OpenReviews } from './../reviews/reviews.component';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Review } from '../home/home.component';
import { catchError } from 'rxjs/operators';
import { EmployeesReview } from '../employee-details/employee-details.component';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseURL: string = "http://localhost:9090";
  
  constructor(private httpClient: HttpClient) { }

  getReviews(): Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${this.baseURL}/reviews`);
  }
  getReviewsByCreatedTo(employeeId:number): Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${this.baseURL}/reviews/reviewsCreatedTo?createdTo=${employeeId}`);
  }

  getReviewById(id: number): Observable <Review[]>{
    return this.httpClient.get<Review[]>(`${this.baseURL}/reviews/${id}`)
  }
  
  getReviewCount():Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${this.baseURL}/reviews/count`);
  }

  getOpenReviewCount():Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviews/countByOpenStatus`);
  }

  getCloseReviewCount():Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviews/countByCloseStatus`);
  }

  getReviewCountByUserId(userId:number):Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${this.baseURL}/reviews/countAllReviewsByUserId?employeeId=${userId}`);
  }

  getOpenReviewCountByUserId(userId:number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviews/countByOpenStatusAndUserId?employeeId=${userId}`);
  }

  getCloseReviewCountByUserId(userId:number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviews/countByCloseStatusAndUserId?employeeId=${userId}`);
  }

  getReviewsByReviewName(reviewName:String): Observable <Review[]>{
    return this.httpClient
    .get<Review[]>(`${this.baseURL}/reviews/reviewsNameLike?reviewName=${reviewName}`)
    .pipe(catchError(this.erroHandler));
  }

  getReviewsByStatus(status: String): Observable <Review[]>{
    return this.httpClient
    .get<Review[]>(`${this.baseURL}/reviews/reviewsStatusLike?status=${status}`)
    .pipe(catchError(this.erroHandler));
  }

  getReviewsByCreatedDate(createdDate: Date): Observable <Review[]>{
    return this.httpClient
    .get<Review[]>(`${this.baseURL}/reviews/reviewsCreatedDate?createdDate=${createdDate}`)
    .pipe(catchError(this.erroHandler));
  }
  
  getReviewsByExpirationDate(expirationDate: Date): Observable <Review[]>{
    return this.httpClient
    .get<Review[]>(`${this.baseURL}/reviews/reviewsExpirationDate?expirationDate=${expirationDate}`)
    .pipe(catchError(this.erroHandler));
  }

  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }

  getEmployeesAndOpenReviews(): Observable<OpenReviews[]>{
    return this.httpClient.get<OpenReviews[]>(`${this.baseURL}/reviews/employeesAndOpenReviews`)
    .pipe(catchError(this.erroHandler));
  }
  
  getEmployeesAndCloseReviews(): Observable<CloseReviews[]>{
    return this.httpClient.get<CloseReviews[]>(`${this.baseURL}/reviews/employeesAndCloseReviews`)
    .pipe(catchError(this.erroHandler));
  }

  getOpenReviewsByEmployee(fullname: String): Observable<OpenReviews[]>{
    return this.httpClient
    .get<OpenReviews[]>(`${this.baseURL}/reviews/openReviewsByEmployee?employee=${fullname}`)
    .pipe(catchError(this.erroHandler));
  }

  getClosedReviewsByEmployee(fullname: String): Observable<CloseReviews[]>{
    return this.httpClient
    .get<CloseReviews[]>(`${this.baseURL}/reviews/closeReviewsByEmployee?employee=${fullname}`)
    .pipe(catchError(this.erroHandler));
  }

  getOpenReviewsByCreatedDate(createdDate: Date): Observable<OpenReviews[]>{
    return this.httpClient
    .get<OpenReviews[]>(`${this.baseURL}/reviews/openReviewsByCreatedDate?createdDate=${createdDate}`)
    .pipe(catchError(this.erroHandler));
  }

  getClosedReviewsByExpiredDate(expirationDate: Date): Observable<CloseReviews[]>{
    return this.httpClient
    .get<CloseReviews[]>(`${this.baseURL}/reviews/closeReviewsByExpirationDate?expirationDate=${expirationDate}`)
    .pipe(catchError(this.erroHandler));
  }
  
  getReviewsForEmployee(employeeId: number): Observable<EmployeesReview[]>{
    return this.httpClient
    .get<EmployeesReview[]>(`${this.baseURL}/reviews/reviewsForEmployee/${employeeId}`)
    .pipe(catchError(this.erroHandler));
  }

  countAllReviewsForEmployee(employeeId: number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviews/countAllReviewsForEmployee/${employeeId}`);
  }

  countAllReviewsToEmployee(employeeId: number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviews/countAllReviewsToEmployee/${employeeId}`);
  }

  countAllReviewsByEmployee(employeeId: number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/reviews/countAllReviewsByEmployee/${employeeId}`);
  }

  getReviewsByEmployee(employeeId: number): Observable<EmployeesReview[]>{
    return this.httpClient
    .get<EmployeesReview[]>(`${this.baseURL}/reviews/reviewsByEmployee/${employeeId}`)
    .pipe(catchError(this.erroHandler));
  }

  getReviewsToEmployee(employeeId: number): Observable<EmployeesReview[]>{
    return this.httpClient
    .get<EmployeesReview[]>(`${this.baseURL}/reviews/reviewsToEmployee/${employeeId}`)
    .pipe(catchError(this.erroHandler));
  }

  getAverageRatingsToEmployee(employeeId: number): Observable<any>{
    return this.httpClient
    .get<any>(`${this.baseURL}/reviews/averageRatingsToEmployee/${employeeId}`)
    .pipe(catchError(this.erroHandler));
  }

  getAverageRatingsByEmployee(employeeId: number): Observable<any>{
    return this.httpClient
    .get<any>(`${this.baseURL}/reviews/averageRatingsByEmployee/${employeeId}`)
    .pipe(catchError(this.erroHandler));
  }

  getOverallAverageRatingToEmployee(employeeId: number): Observable<any>{
    return this.httpClient
    .get<any>(`${this.baseURL}/reviews/averageOverallRatingToEmployee/${employeeId}`)
    .pipe(catchError(this.erroHandler));
  }
  
  getOverallAverageRatingByEmployee(employeeId: number): Observable<any>{
    return this.httpClient
    .get<any>(`${this.baseURL}/reviews/averageOverallRatingByEmployee/${employeeId}`)
    .pipe(catchError(this.erroHandler));
  }

  getfilteredOpenReviews(employee?: String, createdDate?: Date, reviewName?: String):Observable<OpenReviews[]>{
    if (employee!=undefined&&createdDate==undefined&&reviewName==undefined) {
      return this.httpClient
      .get<OpenReviews[]>(`${this.baseURL}/reviews/openReviewsByEmployeeAndCreatedDateAndReviewName?employee=${employee}`)
      .pipe(catchError(this.erroHandler));  
    }
    else if (employee==undefined&&createdDate!=undefined&&reviewName==undefined) {
      return this.httpClient
      .get<OpenReviews[]>(`${this.baseURL}/reviews/openReviewsByEmployeeAndCreatedDateAndReviewName?createdDate=${createdDate}`)
      .pipe(catchError(this.erroHandler));  
    }
    else if (employee==undefined&&createdDate==undefined&&reviewName!=undefined) {
      return this.httpClient
      .get<OpenReviews[]>(`${this.baseURL}/reviews/openReviewsByEmployeeAndCreatedDateAndReviewName?reviewName=${reviewName}`)
      .pipe(catchError(this.erroHandler));  
    }
    else if(employee!=undefined&&createdDate!=undefined&&reviewName==undefined){
      return this.httpClient
      .get<OpenReviews[]>(`${this.baseURL}/reviews/openReviewsByEmployeeAndCreatedDateAndReviewName?employee=${employee}&createdDate=${createdDate}`)
      .pipe(catchError(this.erroHandler)); 
    }
    else if(employee!=undefined&&createdDate==undefined&&reviewName!=undefined){
      return this.httpClient
      .get<OpenReviews[]>(`${this.baseURL}/reviews/openReviewsByEmployeeAndCreatedDateAndReviewName?employee=${employee}&reviewName=${reviewName}`)
      .pipe(catchError(this.erroHandler)); 
    }
    else if(employee==undefined&&createdDate!=undefined&&reviewName!=undefined){
      return this.httpClient
      .get<OpenReviews[]>(`${this.baseURL}/reviews/openReviewsByEmployeeAndCreatedDateAndReviewName?createdDate=${createdDate}&reviewName=${reviewName}`)
      .pipe(catchError(this.erroHandler)); 
    }
    else {
      return this.httpClient
      .get<OpenReviews[]>(`${this.baseURL}/reviews/openReviewsByEmployeeAndCreatedDateAndReviewName?employee=${employee}&createdDate=${createdDate}&reviewName=${reviewName}`)
      .pipe(catchError(this.erroHandler));  
    }
  }

  getfilteredClosedReviews(employee?: String, expirationDate?: Date, reviewName?: String):Observable<CloseReviews[]>{
    if (employee==undefined&&expirationDate==undefined&&reviewName==undefined) {
      return this.httpClient
      .get<CloseReviews[]>(`${this.baseURL}/reviews/closeReviewsByEmployeeAndExpirationDateAndReviewName?`)
      .pipe(catchError(this.erroHandler));  
    }
    else if(employee!=undefined&&expirationDate==undefined&&reviewName==undefined){
      return this.httpClient
      .get<CloseReviews[]>(`${this.baseURL}/reviews/closeReviewsByEmployeeAndExpirationDateAndReviewName?employee=${employee}`)
      .pipe(catchError(this.erroHandler)); 
    }
    else if(employee==undefined&&expirationDate!=undefined&&reviewName==undefined){
      return this.httpClient
      .get<CloseReviews[]>(`${this.baseURL}/reviews/closeReviewsByEmployeeAndExpirationDateAndReviewName?expirationDate=${expirationDate}`)
      .pipe(catchError(this.erroHandler)); 
    }
    else if(employee==undefined&&expirationDate==undefined&&reviewName!=undefined){
      return this.httpClient
      .get<CloseReviews[]>(`${this.baseURL}/reviews/closeReviewsByEmployeeAndExpirationDateAndReviewName?reviewName=${reviewName}`)
      .pipe(catchError(this.erroHandler)); 
    }
    else if(employee!=undefined&&expirationDate!=undefined&&reviewName==undefined){
      return this.httpClient
      .get<CloseReviews[]>(`${this.baseURL}/reviews/closeReviewsByEmployeeAndExpirationDateAndReviewName?employee=${employee}&expirationDate=${expirationDate}`)
      .pipe(catchError(this.erroHandler)); 
    }
    else if(employee!=undefined&&expirationDate==undefined&&reviewName!=undefined){
      return this.httpClient
      .get<CloseReviews[]>(`${this.baseURL}/reviews/closeReviewsByEmployeeAndExpirationDateAndReviewName?employee=${employee}&reviewName=${reviewName}`)
      .pipe(catchError(this.erroHandler)); 
    }
    else if(employee==undefined&&expirationDate!=undefined&&reviewName!=undefined){
      return this.httpClient
      .get<CloseReviews[]>(`${this.baseURL}/reviews/closeReviewsByEmployeeAndExpirationDateAndReviewName?expirationDate=${expirationDate}&reviewName=${reviewName}`)
      .pipe(catchError(this.erroHandler)); 
    }
    else {
      return this.httpClient
      .get<CloseReviews[]>(`${this.baseURL}/reviews/closeReviewsByEmployeeAndExpirationDateAndReviewName?employee=${employee}&expirationDate=${expirationDate}&reviewName=${reviewName}`)
      .pipe(catchError(this.erroHandler));  
    }
    }

    getAllReviews(reviewName?: String, status?: String, createdDate?: Date,expirationDate?: Date):Observable<Review[]>{
    if(reviewName!=undefined&&status==undefined&&createdDate==undefined&&expirationDate==undefined){
      return this.httpClient
      .get<Review[]>(`${this.baseURL}/reviews/filterReviews?reviewName=${reviewName}`)
      .pipe(catchError(this.erroHandler)); 
    }
   else if(reviewName==undefined&&status!=undefined&&createdDate==undefined&&expirationDate==undefined){
    return this.httpClient
    .get<Review[]>(`${this.baseURL}/reviews/filterReviews?status=${status}`)
    .pipe(catchError(this.erroHandler)); 
  }
  else if(reviewName==undefined&&status==undefined&&createdDate!=undefined&&expirationDate==undefined){
    return this.httpClient
    .get<Review[]>(`${this.baseURL}/reviews/filterReviews?createdDate=${createdDate}`)
    .pipe(catchError(this.erroHandler)); 
  }
  else if(reviewName==undefined&&status==undefined&&createdDate==undefined&&expirationDate!=undefined){
    return this.httpClient
    .get<Review[]>(`${this.baseURL}/reviews/filterReviews?expirationDate=${expirationDate}`)
    .pipe(catchError(this.erroHandler)); 
  }
else if(reviewName!=undefined&&status!=undefined&&createdDate==undefined&&expirationDate==undefined){
  return this.httpClient
  .get<Review[]>(`${this.baseURL}/reviews/filterReviews?reviewName=${reviewName}&status=${status}`)
  .pipe(catchError(this.erroHandler)); 
}
else if(reviewName!=undefined&&status==undefined&&createdDate==undefined&&expirationDate!=undefined){
  return this.httpClient
  .get<Review[]>(`${this.baseURL}/reviews/filterReviews?reviewName=${reviewName}&expirationDate=${expirationDate}`)
  .pipe(catchError(this.erroHandler)); 
}
else if(reviewName!=undefined&&status==undefined&&createdDate!=undefined&&expirationDate==undefined){
  return this.httpClient
  .get<Review[]>(`${this.baseURL}/reviews/filterReviews?reviewName=${reviewName}&createdDate=${createdDate}`)
  .pipe(catchError(this.erroHandler)); 
}
else if(reviewName==undefined&&status!=undefined&&createdDate==undefined&&expirationDate!=undefined){
  return this.httpClient
  .get<Review[]>(`${this.baseURL}/reviews/filterReviews?status=${status}&expirationDate=${expirationDate}`)
  .pipe(catchError(this.erroHandler)); 
}
else if(reviewName==undefined&&status!=undefined&&createdDate!=undefined&&expirationDate==undefined){
  return this.httpClient
  .get<Review[]>(`${this.baseURL}/reviews/filterReviews?status=${status}&createdDate=${createdDate}`)
  .pipe(catchError(this.erroHandler)); 
}
else if(reviewName==undefined&&status==undefined&&createdDate!=undefined&&expirationDate!=undefined){
  return this.httpClient
  .get<Review[]>(`${this.baseURL}/reviews/filterReviews?createdDate=${createdDate}&expirationDate=${expirationDate}`)
  .pipe(catchError(this.erroHandler)); 
}
else if(reviewName!=undefined&&status!=undefined&&createdDate!=undefined&&expirationDate==undefined){
  return this.httpClient
  .get<Review[]>(`${this.baseURL}/reviews/filterReviews?reviewName=${reviewName}&status=${status}&createdDate=${createdDate}`)
  .pipe(catchError(this.erroHandler)); 
}
else if(reviewName!=undefined&&status!=undefined&&createdDate==undefined&&expirationDate!=undefined){
  return this.httpClient
  .get<Review[]>(`${this.baseURL}/reviews/filterReviews?reviewName=${reviewName}&status=${status}&expirationDate=${expirationDate}`)
  .pipe(catchError(this.erroHandler)); 
}
else if(reviewName==undefined&&status!=undefined&&createdDate!=undefined&&expirationDate!=undefined){
  return this.httpClient
  .get<Review[]>(`${this.baseURL}/reviews/filterReviews?reviewName=${reviewName}&status=${status}&createdDate=${createdDate}&expirationDate=${expirationDate}`)
  .pipe(catchError(this.erroHandler)); 
}
else
  {
    return this.httpClient
    .get<Review[]>(`${this.baseURL}/reviews/filterReviews?reviewName=${reviewName}&status=${status}&createdDate=${createdDate}&expirationDate=${expirationDate}`)
    .pipe(catchError(this.erroHandler)); 
  }
  }
   
}
