import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskViewComponent } from 'src/app/task-view/task-view.component';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.scss']
})
export class NewtaskComponent implements OnInit {

  form:FormGroup
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskViewComponent, any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm()
  }
  private initForm(){
    this.form = this.fb.group({
      task:null
    })
  }
  created(){
    this.dialogRef.close(this.form.value);
  }

}
