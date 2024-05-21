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
color1 = "white";
// searchText :string='';
// onSearchTextEntered(searchValue:string)
// {
//   this.searchText = searchValue;
//   console.log(this.searchText)
// }


  // StudentArray: any[] = [];
  // isResultLoaded = false;
  // isUpdateFormActive = false;

  // constructor(private fb: FormBuilder, private renderer: Renderer2, private http: HttpClient) {
  //   this.getAllStudent();
  // }
  constructor(private fb: FormBuilder, private renderer: Renderer2,private studentService:StudentserviceService,private router:Router) {}
  students:Student[] = [];
  ngOnInit(): void {
    this.studentService.getAllStudents()
    .subscribe({
      next:(students) => {
       this.students = students;
      },
      error:(response)=>
        {
          console.log(response);
        }  
    });
  }

  // deleteStudent(id: any){
  //   this.studentService.deleteStudent(id)
  //     .subscribe({
  //       next: (response) => {
  //         this.router.navigate(['student']);
  //       },
  //       error: (error) => {
  //         console.error('Error deleting student:', error);
  //       }
  //     });
  // }
  
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
  
  // getAllStudent() {
  //   this.http.get<any[]>("https://localhost:7097/api/Student/GetStudent")
  //     .subscribe(resultData => {
  //       this.isResultLoaded = true;
  //       console.log(resultData);
  //       this.StudentArray = resultData;
  //     });
  // }

  // register() {
  //   let bodyData = {
  //     "firstname": this.firstname,
  //     "lastname": this.lastname,
  //     "address": this.address,
  //     "dob": this.dob,
  //     "gender": this.gender,
  //     "profileimage": this.profileimage,
  //   };
  //   this.http.post("https://localhost:7097/api/Student/AddStudent", bodyData).subscribe((resultData: any) => {
  //     console.log(resultData);
  //     alert("Student Registered Successfully");
  //     this.getAllStudent();
  //   });
  // }

  // setUpdate(data: any) {
  //   this.firstname = data.firstname;
  //   this.lastname = data.lastname;
  //   this.address = data.address;
  //   this.dob = data.dob;
  //   this.gender = data.gender;
  //   this.profileimage = data.profileimage;
  //   this.currentStudentID = data.id;
  // }

  // updateRecords() {
  //   let bodyData = {
  //     "firstname": this.firstname,
  //     "lastname": this.lastname,
  //     "address": this.address,
  //     "dob": this.dob,
  //     "gender": this.gender,
  //     "profileimage": this.profileimage,
  //   };
  //   this.http.patch(`https://localhost:7097/api/Student/UpdateStudent/${this.currentStudentID}`, bodyData).subscribe((resultData: any) => {
  //     console.log(resultData);
  //     alert("Student Record Updated");
  //     this.getAllStudent();
  //   });
  // }

  // save() {
  //   if (this.currentStudentID === '') {
  //     this.register();
  //   } else {
  //     this.updateRecords();
  //   }
  // }

  // setDelete(data: any) {
  //   this.http.delete(`https://localhost:7097/api/Student/DeleteStudent/${data.id}`).subscribe((resultData: any) => {
  //     console.log(resultData);
  //     alert("Student Deleted");
  //     this.getAllStudent();
  //   });
  // }

  color = "purple";

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
