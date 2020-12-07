import { Component } from '@angular/core';
import {DateService} from '../../services/date.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public dateService: DateService) { }

  goTo(step: number): void {
    this.dateService.changeMonth(step);
  }
}
