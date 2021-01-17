import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddworkComponent } from './addwork/addwork.component';
import { SignupComponent } from './signup/signup.component';
import { TaskViewComponent } from './task-view/task-view.component';


const routes: Routes = [
  {path:'',component:TaskViewComponent},
  {path:'list/:listId/:title',component:TaskViewComponent},
  {path:'login',component:SignupComponent},
  {path:'addBoard',component:AddworkComponent}
  // {path:'',redirectTo:'list'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
