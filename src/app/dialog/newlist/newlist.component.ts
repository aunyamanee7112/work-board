import { Component, Inject, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskViewComponent } from 'src/app/task-view/task-view.component';

@Component({
  selector: 'app-newlist',
  templateUrl: './newlist.component.html',
  styleUrls: ['./newlist.component.scss'],
})
export class NewlistComponent implements OnInit {
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
      listName:null
    })
  }
  created(){
    this.dialogRef.close(this.form.value);
  }
}
