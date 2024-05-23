import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../models/student.model';
import { StudentserviceService } from '../studentservice.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { AsyncSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userForm!: FormGroup;
  addStudentComponent: Student = new Student({});
  profileImage: File | null = null;
  photoFileName: string = '';
  response: any;

  constructor(private studentServices: StudentserviceService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'address': new FormControl(null),
      'dob': new FormControl(null, Validators.required),
      'gender': new FormControl('male'),
      'profileimage': new FormControl(null, Validators.required)
    });
  }
/////////////////////////////////////////////////////////////////////////////////////
  progress: number | undefined;
  message: string | undefined;
  @Output() public onUploadFinished = new EventEmitter();
  uploadFile = (files: FileList | any) => {
    if (!files || files.length === 0) {
      return;
    }

    let fileToUpload = files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    let base64 = this.toFilesBase64(files,[])
    console.log(base64);
    
    this.http.post('https://localhost:7097/api/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.addStudentComponent.profileimage = (event.body as any).dbPath;
          this.addStudent();
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Upload error:', err);
        this.message = `Upload failed: ${err.message}`;
      }
    });
  }
  
  selectedFile: File | null = null;


  public toFilesBase64(files: File[], selectedFiles: any[]): Observable<any[]> {
    const result = new AsyncSubject<any[]>();
    if (files?.length) {
      Object.keys(files)?.forEach(async (file, i) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (e) => {
          selectedFiles = selectedFiles?.filter(f => f?.name != files[i]?.name)
          selectedFiles.push({ name: files[i]?.name, file: files[i], base64: reader?.result as string })
          result.next(selectedFiles);
          if (files?.length === (i + 1)) {
            result.complete();
          }
        };
      });
      return result;
    } else {
      result.next([]);
      result.complete();
      return result;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files ? event.target.files[0] : null;
    this.uploadFile(event.target.files); // Start upload immediately after file selection

  }


  addStudent() {
    // this.addStudentComponent.profileimage = this.response.dbPath; // Assuming response has a 'dbPath' field

    this.studentServices.addStudent(this.addStudentComponent)
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  // uploadFinished = (event: any) => { 
  //   this.response = event; 
  // }

  onCreate() {
    const studentItem = {
      firstname: this.userForm.get('firstname')?.value,
      lastname: this.userForm.get('lastname')?.value,
      address: this.userForm.get('address')?.value,
      gender: this.userForm.get('gender')?.value,
      dob: this.userForm.get('dob')?.value,
      profileimage: this.response.dbPath // Assuming response has a 'dbPath' field
    }

    // this.addStudentComponent.profileimage = this.response.dbPath; // Assuming response has a 'dbPath' field

    // this.studentServices.addStudent(this.addStudentComponent)
    //   .subscribe({
    //     next: (student) => {
    //       this.router.navigate(['']);
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     }
    //   });
  }
}
