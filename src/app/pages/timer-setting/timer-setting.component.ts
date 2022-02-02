import { Component, Input, Output, EventEmitter, OnInit, DoCheck } from '@angular/core';
import { PomodoroService } from 'src/app/shared/pomodoro.service';

@Component({
  selector: 'timer-setting',
  templateUrl: './timer-setting.component.html',
  styleUrls: ['./timer-setting.component.scss']
})

export class TimerSettingComponent implements OnInit, DoCheck {

  @Input() showSetting = false;
  @Input() pSecond!: number;
  @Input() shortSecond!: number;
  @Input() longSecond!: number;

  @Output() pSecondChange = new EventEmitter();
  @Output() shortSecondChange = new EventEmitter();
  @Output() longSecondChange = new EventEmitter();
  @Output() showSettingChange = new EventEmitter();


  constructor(public _pomodoroService : PomodoroService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    console.log("changes of the setting component:", this.showSetting)
  }
  
  change(newValue: number, sec:number, emit: any){
    console.log("newValue:", newValue)
    sec = newValue;
    emit.emit(newValue);
   
  }

  pChange(newValue:number){
    this.change( newValue, this.pSecond, this.pSecondChange);
  }
  
  shortChange(newValue:number){
    this.change( newValue, this.shortSecond, this.shortSecondChange)
  }

  longChange(newValue:number){
    this.change( newValue, this.longSecond, this.longSecondChange)
  }

  close(newVal:any){
    this.showSetting = false;
    newVal= this.showSetting
    this.showSettingChange.emit(newVal)
  }
}
