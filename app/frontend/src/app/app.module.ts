import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from  '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from "@angular/material/dialog";
import {MatRippleModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { FacultyDetailsComponent } from './faculty-details/faculty-details.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { VoucherDetailsComponent } from './voucher-details/voucher-details.component';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FacultyListComponent,
    FacultyDetailsComponent,
    OrganizationListComponent,
    OrganizationDetailsComponent,
    StudentListComponent,
    StudentDetailsComponent,
    VoucherListComponent,
    VoucherDetailsComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
