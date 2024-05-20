import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../models/student.model';
import { StudentserviceService } from '../studentservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userForm!: FormGroup;
  addStudentComponent: Student = new Student({});

  constructor(private studentServices: StudentserviceService,private router:Router) { }
 
  addStudent() {
    this.studentServices.addStudent(this.addStudentComponent)
      .subscribe({
        next: (student) => {
          this.router.navigate(['students']);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
  
  ngOnInit(): void {
    this.userForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'address': new FormControl(null),
      'dob': new FormControl(null, Validators.required),
      'gender': new FormControl('male'),
      'profileImage': new FormControl(null)
    });
  }
}

