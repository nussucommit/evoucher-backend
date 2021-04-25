import { WebadmindashboardComponent } from './webadmindashboard/webadmindashboard.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { StudentLoginFormComponent } from './login-form/student-login-form/login-form.component';
import { AuthGuard } from './model-service/users/auth.guard';
import { StudentAuthGuard } from './model-service/users/student-login/auth.guard';
import { OrgAdminDashboardComponent } from './org-admin-dashboard/org-admin-dashboard.component';
import { IsSecureGuard } from './model-service/secureredirection.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [IsSecureGuard] },
  { path: 'home', component: StudentHomeComponent, canActivate: [StudentAuthGuard, IsSecureGuard] },
  { path: 'faculty', component: FacultyListComponent, canActivate: [IsSecureGuard] },
  { path: 'organization', component: OrganizationListComponent, canActivate: [IsSecureGuard] },
  { path: 'voucher', component: VoucherListComponent, canActivate: [AuthGuard, IsSecureGuard] },
  { path: 'student', component: StudentListComponent, canActivate: [IsSecureGuard] },
  { path: 'admin', component: LoginFormComponent, canActivate: [IsSecureGuard] },
  { path: 'login', component: StudentLoginFormComponent, canActivate: [IsSecureGuard] },
  { path: 'signup', component: SignUpFormComponent, canActivate: [IsSecureGuard] },
  { path: 'webadmin', component: WebadmindashboardComponent, canActivate: [AuthGuard, IsSecureGuard] },
  { path: 'orgadmin', component: OrgAdminDashboardComponent, canActivate: [AuthGuard, IsSecureGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
