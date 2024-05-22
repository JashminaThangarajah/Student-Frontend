import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from './models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {
  GetStudent: any;
  DeleteStudent: any;
  constructor(private http: HttpClient) { }
  baseURL: string = environment.baseUrl;

  getAllStudents():Observable<Student[]>
  {
    return this.http.get<Student[]>(this.baseURL + '/api/Student/GetStudent');
  }

  addStudent(addStudentComponent: Student): Observable<Student>{
    addStudentComponent.id = '0';
    return this.http.post<Student>(this.baseURL+ '/api/Student/AddStudent',addStudentComponent);  
  }

  getStudent(id: any): Observable<Student> {
    return this.http.get<Student>(`${this.baseURL}/api/Student/${id}`);
  }
  
  updateStudent(updateStudentRequest: Student): Observable<Student>{
    return this.http.put<Student>(this.baseURL + "/api/Student/",updateStudentRequest);
  }

  // deleteStudent(id: any): Observable<any> {
  //   return this.http.delete<Student>(`${this.baseURL}/api/Student/DeleteStudent/${id}`);
  // }

  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.baseURL}/api/Student/${id}`);
    
  
  }

  
  
}
