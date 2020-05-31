import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tc';
  default: '#454545';


  color: string;
  outOfTime: Subscription;
  timerLabel: string;


  resetTimer: EventEmitter<void>;
  startPauseTimer: EventEmitter<boolean>;

  started: boolean;


  ngOnInit(): void {
    this.timerLabel = 'Start';
    this.started = false;
    this.outOfTime = null;
    this.color = this.default;
    this.resetTimer = new EventEmitter();
    this.startPauseTimer = new EventEmitter();
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
    this.resetTimer.emit(null);
    this.resetColors();
    this.started = false;
    this.timerLabel = 'Start';
  }

  private setColor(color: string) {
    this.color = this.color === color ? this.default : color;
  }

  public startStop() {

    this.started = !this.started;

    if (!this.started) {
      this.timerLabel = 'Start';
    } else {
      this.timerLabel = 'Stop';
    }

    this.startPauseTimer.emit(null);
  }
}
