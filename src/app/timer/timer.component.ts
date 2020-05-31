import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  private started: number;
  private pausedTime: number;
  time: string;
  private timer: Subscription;


  @Input()
  reset: EventEmitter<void>;

  @Input()
  startPause: EventEmitter<boolean>;


  ngOnInit(): void {
    this.pausedTime = 0;
    this.time = '00:00';


    this.reset.subscribe(() => {
      this.resetTime();
    });

    this.startPause.subscribe(() => {
      this.startStop();
    });

  }

  private leadingZeros(num: number): string {
    let str = num.toString();
    if (num < 10) {
      str = `0${num}`;
    }
    return str;
  }

  private stopTime() {
    if (this.timer) {
      this.timer.unsubscribe();
      this.timer = null;
    }
  }

  resetTime() {
    this.stopTime();
    this.started = 0;
    this.time = '00:00';
    this.pausedTime = 0;
  }

  public startStop() {
    if (this.timer) {
      this.stopTime();
      this.pausedTime = new Date().getTime();
    } else {
      if (!this.started) {
        this.started = new Date().getTime();
        this.pausedTime = 0;
      } else {
        if (this.pausedTime) {
          this.started += new Date().getTime() - this.pausedTime;
        }
      }

      this.timer = interval(500).subscribe((count) => {
        if (!this.timer) {
          return;
        }

        const current = new Date().getTime();

        const diff = current - this.started;
        const min = Math.trunc(diff / 1000 / 60);
        const sec = Math.round((diff / 1000) % 60);

        const minStr = this.leadingZeros(min);
        const secStr = this.leadingZeros(sec);
        this.time = `${minStr}:${secStr}`;
      });

    }
  }
}
