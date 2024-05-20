import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentserviceService } from '../studentservice.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  color = "purple";

  studentDetails: Student = new Student({});

  constructor(private route: ActivatedRoute, private studentService: StudentserviceService,private router:Router) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe({
        next: (params) => {
          const id = params.get('id');
          if (id) {
            // Convert id from string to integer
            const studentId = parseInt(id, 10);
            this.studentService.getStudent(studentId)
              .subscribe({
                next: (response : any) => {
                  this.studentDetails.id = response.id;
                  this.studentDetails.profileimage = response.profileimage;
                  this.studentDetails.firstname = response.firstname;
                  this.studentDetails.lastname = response.firstname
                  this.studentDetails.address = response.address;
                  this.studentDetails.dob = new Date(response.dob);
                  this.studentDetails.gender = response.gender;
                }
              });
          }
        }
      });
  }

  public updateStudent() {
    // Format the date to match the expected format on the backend
    this.studentDetails.dob = new Date(this.studentDetails.dob);
  
    // Call the updateStudent method from the service
    this.studentService.updateStudent(this.studentDetails)
      .subscribe({
        next: (response) => {
          // Redirect to the student list page after successful update
          this.router.navigate(['student']);
        },
        error: (error) => {
          // Handle error, log or display error message
          console.error('Error updating student:', error);
        }
      });
  }
  
  


}
