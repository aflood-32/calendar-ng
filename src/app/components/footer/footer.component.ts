import { Component, OnInit } from '@angular/core';
import {DateService} from '../../services/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ITask, TasksService} from '../../services/tasks.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  form: FormGroup;
  tasks: ITask[] = [];

  constructor(public dateService: DateService, public taskService: TasksService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  submit(){
    const {title} = this.form.value;
    const task: ITask = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    };
    this.tasks.push(task);
    this.taskService.create(task).subscribe(() => {
      this.form.reset();
    }, err => console.error);
  }

  remove(task: ITask) {
    this.taskService.delete(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    }, err => console.error(err));
  }
}
