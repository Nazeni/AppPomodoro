import { Input, Output, Component, OnInit, EventEmitter, ElementRef, DoCheck, ViewChild } from '@angular/core';
import { Pomodoro } from 'src/app/pages/pomodoro-card/pomodoro.model';
import { PomodoroService } from 'src/app/shared/pomodoro.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})

export class TimerComponent implements OnInit, DoCheck {
  @Input() selectedPomodoro!: Pomodoro;
  @Input() pSecond!: number;
  @Input() shortSecond!: number;
  @Input() longSecond!:number;

  @Output() totalActChange = new EventEmitter(); 

  @ViewChild('timerButtons') el!: ElementRef;
  @ViewChild('thickLine') elLine!: ElementRef;

  intervalId = 0;
  second = 1;
  changeButton = false;
  selected!: string;
  list: any;
  showTime = 0;
  totalAct = 0;


  constructor(private elementRef: ElementRef , public _pomodoroService : PomodoroService) {
  
    this.list = ["Pomodoro", "Short Break", "Long Break"];
    this.selected = this.list[0];

  }

  ngOnInit() {
    this.showTime = this.second * 60;
   }

  ngDoCheck() {
    this.checkSelectOption();
    console.log("second change:", this.pSecond);
    console.log("second of the short change:", this.shortSecond);
    console.log("second of the long change:", this.longSecond);
    
  }

  startTimer() {
    
    this.changeButton = true;
    this.countDown( this.second);
    this.elLine.nativeElement.style.width = "100%";
    let x = this.showTime;
    console.log("Naz X:", x);
    let c = "width " + x + 's' + ' ' + 'linear';
    this.elLine.nativeElement.style.transition = c;

  }

  stopTimer() {

    this.changeButton = false;
    this.clearTimer();
    let w = this.elLine.nativeElement.offsetWidth;
    this.elLine.nativeElement.style.width = w + 'px';
    this.elLine.nativeElement.style.transition = "width 0s linear";

  }

  clearTimer() {
    clearInterval(this.intervalId);
  }

  clearTimeLine() {

    this.elLine.nativeElement.style.width = "0%";
    this.elLine.nativeElement.style.transition = "width 0s linear";

  }
  
  countDown(second: number) {
    second = second * 60;
    
    this.clearTimer();
    this.intervalId = window.setInterval(() => {

      second = second - 1;
      console.log("second minus one", second);
      this.showTime = second;
      if (second < 0) {
        this.outputAct();
        
        console.log(" add total act:", this.totalAct);
        
        this.clearTimer();
        this.playAudio();
        this.switchTimerOptions();
        console.log("destroyed");

      }  
    }, 1000)
  }

  outputAct(){
    this.totalAct += 1;
    this.totalActChange.emit(this.totalAct);
  }

  playForeward() {

    let x = confirm(`Are you sure you want to finish the round early? 
                    (The remaining time will not be counted in the report.)`)
    if (x === true) {

      this.clearTimer();
      this.clearTimeLine();
      this.switchTimerOptions();

    }
  }

  switchTimerOptions() {
    switch (this.selected) {

      case "Pomodoro":
        this.selected = "Short Break";
        this.second = this.shortSecond;
        this.showTime = this.second*60;
        console.log("TEST",this.selected, this.second, this.showTime)
        this.break(this.second, "#4C9195");
        break;

      case "Short Break":
        this.selected = "Long Break";
        this.second = this.longSecond;
        this.showTime =this.second*60;
        console.log("TEST",this.selected, this.second, this.showTime)
        this.break(this.second, "#457CA3");
        console.log("change to long break");
        break;


      case "Long Break":
        this.selected = "Pomodoro";
        this.second = this.pSecond
        this.showTime =this.second*60;
        console.log("TEST",this.selected, this.second, this.showTime)
        this.pomodoro(this.second, "#D95550");
        console.log("change to pomodoro");
        break;
    }
  }

  pomodoro(second: number, color: any) {

    this.break(second, color);
    console.log("pomodoro active")

  }

  shortBreak(second: number, color: any) {
    this.break(second, color)
    console.log("pomodoro active")
  }

  longBreak(second: number, color: any) {
    this.break(second, color)
  }

  break(second: number, color: any) {

    this.second = second;
    this.changeButton = false;
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = color;
    this.el.nativeElement.style.color = color;

  }

  select(item: string) {

    this.selected = item;
    this.clearTimer();
    this.clearTimeLine();
    switch (this.selected) {

      case "Pomodoro": {
        
        console.log("TEST",this.selected, this.second, this.showTime)
        this.second = this.pSecond;
        this.showTime =this.second*60;

        this.break(this.pSecond, "#D95550");
        console.log("select pomodoro function");
        console.log("after select pomodoro function:", this.second);
        break;
      }
      case "Short Break": {
        
        console.log("TEST",this.selected, this.second, this.showTime)
        this.second = this.shortSecond;
        this.showTime =this.second*60;

        this.break(this.shortSecond, "#4C9195");
        console.log("select short break function");
        console.log("after select short break function:", this.shortSecond);
        break;
      }
      case "Long Break": {
        console.log("TEST",this.selected, this.second, this.showTime)
        this.second = this.longSecond;
        this.showTime =this.second*60;
        
        this.break(this.longSecond, "#457CA3");
        console.log("call long break function");
        break;
      }
    }
    console.log("selected Timer option", this.selected, item)
  }

  checkSelectOption() {

    switch (this.selected) {

      case "Pomodoro": {
        this.second = this.pSecond;
        break;
      }
      case "Short Break": {
        this.second = this.shortSecond;
        break;
      }
      case "Long Break": {
        this.second = this.longSecond;
        break;
      }
    }
  }

  isActive(item: string) {
    return this.selected === item;
  }

  playAudio() {

    let audio: HTMLAudioElement = new Audio('/../../../assets/sounds/alarm.wav');
    audio.play();
    console.log("audio")

  }

  playAudioClick() {

    let audio: HTMLAudioElement = new Audio('/../../../assets/sounds/click.wav');
    audio.play();
    console.log("audio click")

  }
}





//this.list = [{
                // name:"Pomodoro",
                // act: this.pomodoro(2, 2, "red")
            //   },
            //   {
            //     name:"Short Braek",
            //     act: this.shortBreak(5, 5, "blue")
            //   },
            //   { 
            //     name:"Long Braek",
            //     act: this.longBreak(10, 10, "green")
            //   }];

            //   this.list[0].act =  this.pomodoro(2, 2, "red");
            //   this.list[1].act = this.shortBreak(5, 5, 'blue');
            // }]

