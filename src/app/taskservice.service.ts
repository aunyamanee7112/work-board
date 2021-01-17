import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from 'api/db/models/';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  constructor(private webRequest :WebRequestService) { }
  createList(title:string){
   return this.webRequest.post('list',{title});
  }
  createTasks(listId,title){
    return this.webRequest.post(`list/${listId}/tasks`,{title})
  }
  getList(){
    return this.webRequest.get('list');
  }

  getTasks(listId:string){
    return this.webRequest.get(`list/${listId}/tasks`)
  }

  deleteList(id){
    return this.webRequest.deleter(`list/${id}`)
  }
  deleteTask(task){
    return this.webRequest.deleter(`list/${task._listId}/tasks/${task._id}`)
  }
  updateList(id,title){
    return this.webRequest.patch(`list/${id}`,{title})
  }
  updateTask(task,title){
    return this.webRequest.patch(`list/${task._listId}/tasks/${task._id}`,{title})
  }
  completed(task,condition){
    return this.webRequest.patch(`list/${task._listId}/tasks/${task._id}`
    ,{completed:condition}
  )}

}
