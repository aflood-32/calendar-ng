import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../../services/date.service';

interface IDay {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface IWeek {
  days: IDay[];
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit{
  calendar: IWeek[];

  constructor(public dateService: DateService) { }

  ngOnInit(){
      this.dateService.date.subscribe(this.generate.bind(this));
  }

  generate(dateNow: moment.Moment){
    const startDay = dateNow.clone().startOf('month').startOf('week');
    const endDay = dateNow.clone().endOf('month').endOf('week');
    const date = startDay.clone().subtract(1, 'day');

    const calendar = [];

    while (date.isBefore(endDay, 'day')){
      calendar.push({
        days: Array(7).fill(0).map(() => {
          const value = date.add(1, 'day').clone();
          const active = moment().isSame(value, 'date');
          const disabled = !dateNow.isSame(value, 'month');
          const selected = dateNow.isSame(value, 'date');
          return {value, disabled, selected, active};
        })
      });
    }
    this.calendar = calendar;
  }

  select(day: moment.Moment) {
    this.dateService.changeDate(day);
  }
}
