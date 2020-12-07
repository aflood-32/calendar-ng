import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment';

export interface ITask {
  id?: string;
  title: string;
  date?: string;
}

interface ICreateResponse {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  static URL = 'https://calendar-b3606-default-rtdb.firebaseio.com/tasks';
  constructor( private http: HttpClient) { }

  load(date: moment.Moment): Observable<ITask[]>{
    return this.http.get<ITask>(`${TasksService.URL}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        console.log(tasks);
        if (!tasks){
          return [];
        }
        return Object.keys(tasks).map(key => ({...tasks[key], id: key}));
      }));
  }

  create(task: ITask): Observable<ITask>{
   return this.http.post<ICreateResponse>(`${TasksService.URL}/${task.date}.json`, task)
      .pipe(map(res => {
        console.log(res);
        return {
          ...task, id: res.name
        };
      }));
  }

  delete(task: ITask): Observable<void>{
    console.log(task);
    return this.http.delete<void>(`${TasksService.URL}/${task.date}/${task.id}.json`);
  }
}
