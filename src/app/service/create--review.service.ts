import { DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateReviewService {

  baseUrl: string = "http://localhost:9090";

  http: any;

  private subject = new Subject<any>();
  
  constructor(private httpClient: HttpClient) { }

  createReview(data:any){
    return this.httpClient.post(`${this.baseUrl}/oneReview`, data);
  }

  createQuestionByCategory(data:any){
    return this.httpClient.post(`${this.baseUrl}/oneQuestionByCategory`, data);
  }

 getAllQuestions():Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl}/allQuestions`);
 }

 getAllQuestionsByCategoryTitle(categoryTitle:string):Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl}/questionsDetailsByCategoryTitle/${categoryTitle}`);
}

getReviewsIds():Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl}/getReviewsIdsDesc`);
 }

postReviewQuestionDetails(data:any):Observable<any>{
  let body = JSON.stringify(data)
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  return this.httpClient.post(`${this.baseUrl}/reviewQuestionDetails`, body, httpOptions);
}

getReviewQuestionsDetails(reviewQuestionId:number):Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl}/reviewQuestion/${reviewQuestionId}`);
}

deleteReviewQuestionDetails(reviewQuestionId:number):Observable<any>{
  return this.httpClient.delete<any>(`${this.baseUrl}/reviewQuestionDetail/${reviewQuestionId}`);
}

deleteReviewInvitation(reviewInvitation:number):Observable<any>{
  return this.httpClient.delete<any>(`${this.baseUrl}/reviewInvitation/${reviewInvitation}`);
}

getReviewInvitation(reviewInvitation:number):Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl}/reviewInvitationById/${reviewInvitation}`);
}

getFillDataDetails(reviewId:number, categoryDescription:string):Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl}/getFillDataDetails?reviewId=${reviewId}&categoryDescription=${categoryDescription}`);
}

getAllFillDataDetails(reviewId:number):Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl}/getAllFillDataDetails?reviewId=${reviewId}`);
}

getAllFillDataDetailsByReviewIdAndEmployeeId(reviewId:number,employeeId:number):Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl}/getAllFillDataDetailsByReviewIdAndEmployeeId?reviewId=${reviewId}&employeeId=${employeeId}`);
}

fillDataAnswers(data:any):Observable<any>{
  return this.httpClient.post(`${this.baseUrl}/oneReviewAnswer`, data);
}

getEmployeesDataforAnswersByReviewId(reviewId:number):Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl}/reviews/reviewForEmployee/${reviewId}`);
}

sendInvitation(data:any, email:string):Observable<any>{
  return this.httpClient.post(`${this.baseUrl}/sendEmail/${email}`, data, {responseType: 'text'} );
}

postReviewInvitation(data:any):Observable<any>{
  return this.httpClient.post(`${this.baseUrl}/oneReviewInvitation`, data);
}

getReviewInvitationsByOpenStatusAndEmployee(userId:number):Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl}/reviewInvitationsByOpenStatusAndEmployee/${userId}`);
}

updateReviewInvitationStatusAndCompletedDate(status: string, completedDate: string, reviewInvitationId: number): Observable<any> { 
  return this.httpClient.put(`${this.baseUrl}/reviewInvitation/update/${status}/${completedDate}/${reviewInvitationId}`, { responseType: 'text' as 'json' } );
}

sendMessagetoReset(clear: boolean) {
  this.subject.next(clear);
}

getMessagetoReset(): Observable<any> {
  return this.subject.asObservable();
}

} 