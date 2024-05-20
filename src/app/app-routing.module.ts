import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { EditStudentComponent } from './edit-student/edit-student.component';


const routes: Routes = [
  {path:'app',component:AppComponent},
  {path:'home',component:HomeComponent},
  {path:'',component:StudentRegistrationComponent},
  {path:'submit',component:StudentRegistrationComponent},
  { path: 'edit/:id', component: EditStudentComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
