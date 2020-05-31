import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private started: boolean;
  resetTimer: EventEmitter<void>;
  startPauseTimer: EventEmitter<boolean>;


  constructor() {
    this.started = false;
    this.resetTimer = new EventEmitter();
    this.startPauseTimer = new EventEmitter();
  }

  public isStarted(): boolean {
    return this.started;
  }

  public startStop(): boolean {
    this.started = !this.started;
    this.startPauseTimer.emit(this.started);
    return this.started;
  }

  public reset() {
    this.started = false;
    this.resetTimer.emit();
  }

}
