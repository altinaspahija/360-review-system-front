import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { User } from '../employee-details/employee-details.component';
import { Department, EmployeeDetails} from '../employees/employees.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = "http://localhost:9090";

  private subject = new   Subject<any>();

  constructor(private httpClient: HttpClient) { }

  getManagers(): Observable<EmployeeDetails[]>{
    return this.httpClient.get<EmployeeDetails[]>(`${this.baseUrl}/managers`);
  }

  getEmployeesByDep(departmentTitle: String): Observable<EmployeeDetails[]>{
    return this.httpClient.get<EmployeeDetails[]>(`${this.baseUrl}/employeesByDepartment/${departmentTitle}`);
  }

  getEmployeesByDepForReview(departmentTitle: String): Observable<EmployeeDetails[]>{
    return this.httpClient.get<EmployeeDetails[]>(`${this.baseUrl}/employeesByDepartmentForReview/${departmentTitle}`);
  }

  getEmployeesForReview(): Observable<EmployeeDetails[]>{
    return this.httpClient.get<EmployeeDetails[]>(`${this.baseUrl}/employeesForReview`);
  }

  getEmployees(): Observable<EmployeeDetails[]>{
    return this.httpClient.get<EmployeeDetails[]>(`${this.baseUrl}/employees`);
  }

  getEmployeeDetailsById(id:number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/employeeDetails/${id}`);
  }

  getManagersAndHRDetailsById(id:number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/managersAndHRDetails/${id}`);
  }

  getDepartments(): Observable<Department[]>{
    return this.httpClient.get<Department[]>(`${this.baseUrl}/departmentsTitles`);
  }

  getAllDepartments(): Observable<Department[]>{
    return this.httpClient.get<Department[]>(`${this.baseUrl}/departments`);
  }

  getPositionsByDepartment(departmentId:number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/positionsTitles/${departmentId}`);
  }

  getAllUsers(): Observable<EmployeeDetails[]>{
    return this.httpClient.get<EmployeeDetails[]>(`${this.baseUrl}/users`);
  }

  getUserById(userId: number): Observable <User>{
    return this.httpClient.get<User>(`${this.baseUrl}/users/${userId}`)
  }

  getRoles(): Observable <any>{
    return this.httpClient.get<any>(`${this.baseUrl}/roles`)
  }

  getPositions(): Observable <any>{
    return this.httpClient.get<any>(`${this.baseUrl}/positions`)
  }

  registerEmployee(name:string,surname:string,username:string,password:string,email:string,phoneNumber:string,startDate:string,roleId:number,positionId:number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.post(`${this.baseUrl}/oneEmployee?name=${name}&surname=${surname}&username=${username}&password=${password}&email=${email}&phoneNumber=${encodeURI(phoneNumber)}&startDate=${startDate}&roleId=${roleId}&positionId=${positionId}`, 
    httpOptions);
  }

  signInEmployee(username:string,password:string) : Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/signIn?username=${username}&password=${password}`, {responseType:'text' as 'json'});
  }

  getRoleBasedOnUsername(username:string):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/getRole?username=${username}`, {responseType: 'text' as 'json'} );
  }

  getUserIdBasedOnUsername(username:string):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/getUserId?username=${username}`, {responseType: 'text' as 'json'} );
  }

  sendMessage(options: {employeeId?: string, role?: number}) {
    this.subject.next({ employeeId: options.employeeId, role: options.role });
  }

  onMessage(): Observable<any> {
    return this.subject.asObservable();
  }

} 