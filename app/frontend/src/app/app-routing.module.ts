import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: StudentHomeComponent},
  {path: 'faculty', component: FacultyListComponent},
  {path: 'organization', component: OrganizationListComponent},
  {path: 'voucher', component: VoucherListComponent},
  {path: 'student', component: StudentListComponent},
  {path: 'login', component: LoginFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
