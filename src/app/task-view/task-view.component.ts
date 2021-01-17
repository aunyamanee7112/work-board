import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from './../taskservice.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { NewlistComponent } from '../dialog/newlist/newlist.component';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { NewtaskComponent } from '../dialog/newtask/newtask.component';
import { threadId } from 'worker_threads';
import { EditlistComponent } from '../dialog/editlist/editlist.component';
import { EdittaskComponent } from '../dialog/edittask/edittask.component';
import { takeUntil, filter, switchMap } from 'rxjs/operators';
// import { Task } from 'api/db/models/'
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists;
  tasks;
  taskStatus;
  checklist: boolean = true;
  title;
  listId: string;
  constructor(
    private TaskService: TaskserviceService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getList();
    this.listId = this.route.snapshot.paramMap.get('listId');
    console.log(this.listId);
  }
  createNewList() {
    this.dialog
      .open(NewlistComponent)
      .afterClosed()
      .subscribe((res) => {
        console.log(res.listName);
        if (res) {
          return this.TaskService.createList(res.listName).subscribe(
            (responde: any) => {
              console.log(responde);
              this.getList();
            }
          );
        }
      });
  }

  getList() {
    return this.TaskService.getList().subscribe((res) => {
      console.log(res);
      this.lists = res;
    });
  }

  getTask(item) {
    console.log(item.title);
    try {
      this.router.navigate([`list/${item._id}/${item.title}`]).then(() => {
        this.TaskService.getTasks(item._id).subscribe((res) => {
          console.log(res);
          this.title = this.route.snapshot.paramMap.get('title');
          this.tasks = res;
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  getTaskafterDialog(item) {
    try {
      this.TaskService.getTasks(item).subscribe((res) => {
        console.log(res);
        this.title = this.route.snapshot.paramMap.get('title');
        this.tasks = res;
      });
    } catch (error) {
      console.log(error);
    }
  }

  checkTask(task): void {
    task.completed = !task.completed;
    console.log(task.completed);
  }

  createTask() {
    let id = this.listId
    this.dialog
      .open(NewtaskComponent)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        try {
          if (res) {
            return this.TaskService.createTasks(
              this.listId,
              res.task
            ).subscribe((responde: any) => {
              // this.getTaskafterDialog(id)
              console.log(responde);
            });
          }
        } catch (error) {
          console.log(error);
        }
      });
  }

  deleteList() {
    this.TaskService.deleteList(this.listId).subscribe(() => {
      this.getList();
    });
  }
  deleteTask(task) {
    console.log(task);
    this.TaskService.deleteTask(task).subscribe(() => {
      this.getTaskafterDialog(task._listId);
    });
  }

  updateTask(task) {
    const dialogConfig: MatDialogConfig = {
      data: task.title,
    };
    this.dialog
      .open(EdittaskComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        try {
          if (res) {
            return this.TaskService.updateTask(task, res.task).subscribe(
              (responde: any) => {
                console.log(responde);
                this.getTaskafterDialog(task._listId);
              }
            );
          }
        } catch (error) {
          console.log(error);
        }
      });
  }
  updateList() {
    const title = this.route.snapshot.paramMap.get('title');
    const dialogConfig: MatDialogConfig = {
      data: title,
    };
    this.dialog
      .open(EditlistComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        try {
          if (res) {
            return this.TaskService.updateList(
              this.listId,
              res.task
            ).subscribe((responde: any) => {
              // this.getTask(this.listId)
              console.log(responde);
            });
          }
        } catch (error) {
          console.log(error);
        }
      });
  }
}
