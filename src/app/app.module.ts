import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { NewlistComponent } from './dialog/newlist/newlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewtaskComponent } from './dialog/newtask/newtask.component';
import { EditlistComponent } from './dialog/editlist/editlist.component';
import { EdittaskComponent } from './dialog/edittask/edittask.component';
import { AddworkComponent } from './addwork/addwork.component';
@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    SignupComponent,
    NewlistComponent,
    NewtaskComponent,
    EditlistComponent,
    EdittaskComponent,
    AddworkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  entryComponents: [
    NewlistComponent,
    NewtaskComponent,
    EditlistComponent,
    EdittaskComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
