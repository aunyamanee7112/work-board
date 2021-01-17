import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskViewComponent } from 'src/app/task-view/task-view.component';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.scss'],
})
export class EdittaskComponent implements OnInit {
  form: FormGroup;
  get task (){
    return this.form.get('task')
  }
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskViewComponent, any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    console.log(this.data);
    this.initForm();
  }
  private initForm() {
    this.form = this.fb.group({
      task: null,
    });
    this.task.patchValue(this.data);
  }
  created() {
    this.dialogRef.close(this.form.value);
  }
}
