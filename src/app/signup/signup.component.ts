import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
 form:FormGroup
 iconstatus=true;
 type="password"
  constructor( private fb:FormBuilder ) { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(){
    this.form = this.fb.group({
      email:null,
      password:null
    })
  }
}
