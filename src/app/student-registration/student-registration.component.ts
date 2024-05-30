import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../models/student.model';
import { StudentserviceService } from '../studentservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {
  
 itemsPerPage:number=8;
 p:number = 1;
 totalProduct:any;

  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7079/${serverPath}`; 
  }
  
  searchPost : any;
  searchTerm!:string;

  search(studentItem:string)
  {
    this.students = this.searchPost.filter((val:any)=>
      val.firstname.toLowerCase().includes(studentItem) || val.lastname.toLowerCase().includes(studentItem)
  )
  }

   color1 = "white";
   color = "purple";

  constructor(private fb: FormBuilder, private renderer: Renderer2,private studentService:StudentserviceService,private router:Router) {}
  students:Student[] = [];
  ngOnInit(): void {
    this.studentService.getAllStudents()
    .subscribe({
      next:(students) => {
       this.students = students;
       this.totalProduct = students.length;
      },
      error:(response)=>
        {
          console.log(response);
        }  
    });

    
  }

  
  deleteStudent(id: any) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.students = this.students.filter(StudentItem => StudentItem.id !== id);
        },
        error: (error) => {
          console.error('Error deleting student:', error);
        }
      });
    }
  }


  openModal() {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      this.renderer.addClass(modalElement, 'show');
      modalElement.style.display = 'block';
    }
  }

  closeModal() {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      this.renderer.removeClass(modalElement, 'show');
      modalElement.style.display = 'none';
    }
  }
}
