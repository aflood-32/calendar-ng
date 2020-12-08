import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DateService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());
  public selectedDate: BehaviorSubject<moment.Moment> = this.date;

  changeMonth(dir: number){
    const value = this.date.value.add(dir, 'month');
    this.date.next(value);
  }

  changeSelectedDate(date: moment.Moment){
    const value = this.date.value.set({
      date: date.date(),
      month: date.month(),
    });

    this.selectedDate.next(value);
  }
}
