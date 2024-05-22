import { Data } from "@angular/router";

// export interface Student{
//     id:string
//     profileimage: File;
//     firstname: string;
//     lastname: string;
//     address: string;
//     dob: Date ;
//     gender: string;

// }

export class Student {
    id:string
    profileimage: File | string;
    firstname: string;
    lastname: string;
    address: string;
    dob:  Date ;
    gender: string;
  imgPath: any;
  
    
    constructor(obj: any,init?: Partial<Student>) {
      this.id = obj['id'] || '';
      this.profileimage = obj['profileimage'] || null;
      this.firstname = obj['firstname'] || '';
      this.lastname = obj['lastname'] || '';
      this.address = obj['address'] || '';
      this.dob = obj['dob'] || new Date();
      this.gender = obj['gender'] || '';
      

    }
  }