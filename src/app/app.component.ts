import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {TimerService} from './timer/timer.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TimerService]
})
export class AppComponent implements OnInit {
  title = 'tc';
  default: '#454545';


  color: string;
  outOfTime: Subscription;
  timerLabel: string;


  constructor(private timerService: TimerService) {}


  ngOnInit(): void {
    this.timerLabel = 'Start';
    this.outOfTime = null;
    this.color = this.default;
  }

  green() {
    this.resetTimeout();
    this.setColor('green');
  }

  yellow() {
    this.resetTimeout();
    this.setColor('yellow');
  }

  red() {
    this.resetTimeout();
    this.setColor('red');
  }

  timeout() {
    if (!this.outOfTime) {
      this.outOfTime = interval(1000).subscribe((count) => {
        this.color = count % 2 ? 'red' : this.default;
      });
    } else {
      this.resetColors();
    }
  }

  private resetColors() {
    this.resetTimeout();
    this.color = this.default;
  }

  private resetTimeout() {
    if (this.outOfTime) {
      this.outOfTime.unsubscribe();
      this.outOfTime = null;
    }

  }

  public resetAll() {
    this.timerService.reset();
    this.resetColors();
    this.timerLabel = 'Start';
  }

  private setColor(color: string) {
    this.color = this.color === color ? this.default : color;
  }

  public startStop() {
    if (!this.timerService.startStop()) {
      this.timerLabel = 'Start';
    } else {
      this.timerLabel = 'Stop';
    }

  }
}
