import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskViewComponent } from 'src/app/task-view/task-view.component';
@Component({
  selector: 'app-editlist',
  templateUrl: './editlist.component.html',
  styleUrls: ['./editlist.component.scss']
})
export class EditlistComponent implements OnInit {

  get task (){
    return this.form.get('task')
  }
  form:FormGroup
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskViewComponent, any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm(this.data)
  }
  private initForm(title){
    this.form = this.fb.group({
      task:null
    });
    this.task.patchValue(title)
  }
  created(){
    this.dialogRef.close(this.form.value);
  }
}
