import { Component, OnInit, Input, Output, EventEmitter, Renderer2, OnChanges, HostListener, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pomodoro } from 'src/app/pages/pomodoro-card/pomodoro.model';
import { PomodoroService } from "src/app/shared/pomodoro.service";

@Component({
  selector: 'app-pomodoro-card',
  templateUrl: './pomodoro-card.component.html',
  styleUrls: ['./pomodoro-card.component.scss']
})
export class PomodoroCardComponent implements OnInit, OnChanges {

  @Input() title!: string;
  @Input() est!: number;
  @Input() act!: number;
  @Input() note!: string;
  @Input() showAddForm!: boolean;
  @Input() isDone = false;
  @Input() index!: Pomodoro;
  @Input() pomodoro!: Pomodoro;
  @Input() selectedPomodoro!: Pomodoro;
  @Input() pomodoros!: Pomodoro[];

  @Output('marked') markedEvent = new EventEmitter();
  @Output('getEst') estEvent = new EventEmitter();
  @Output('getEditedEst') editedEstEvent = new EventEmitter();

  @ViewChild('editForm') el!: ElementRef;

  openNotearea = false;
  showEditForm = false;

  constructor(private renderer: Renderer2, private pomodoroService: PomodoroService) { }

  ngOnInit() {

    this.pomodoros = this.pomodoroService.getPomodoros();
  
  }

  ngOnChanges() {

    return this.showEditForm;
  }

  @HostListener('document:click', ['$event']) onDocumentClick($event: any) {
    console.log("show Add Form onn HostListener:", this.showAddForm);
  }

  pomodoroEditForm!: NgForm;

  onEditPomodoro(pomodoroEditForm: NgForm) {

    this.pomodoros.forEach((x) => {

      if (x.showEditForm === true) {

        x.showEditForm = false;
        console.log("editForm True")
      }
    })

    if (this.showAddForm) this.showAddForm = true; //is not working
    this.index.showEditForm = true;
    pomodoroEditForm.value.isDone = this.index.isDone;
    pomodoroEditForm.value.title = this.index.title;
    pomodoroEditForm.value.est = this.index.est;
    
    if (this.index.note) {

      this.openNotearea = true;
      pomodoroEditForm.value.note = this.index.note;
    };
  
    console.log("OnEdit Form note:", this.index.note);
  }

  onMarkedPomodoro(item: Pomodoro) {

    this.isDone = !this.isDone;
    item.isDone = this.isDone;

    this.markedEvent.emit(this.isDone);

  }

  onGetEstCount(item: Pomodoro) {

    this.estEvent.emit(item.est);

  }

  OnFormUpdate(pomodoroEditForm: NgForm) {
    console.log(pomodoroEditForm);

    this.pomodoro = this.pomodoroService.update(this.index,
      pomodoroEditForm.value.title,
      pomodoroEditForm.value.est,
      pomodoroEditForm.value.noteArea);
      
    this.index.showEditForm = false;
    console.log("pomodoros after update:", this.pomodoros);
    
    if(pomodoroEditForm.value.isDone !== true) {
      this.editedEstEvent.emit( pomodoroEditForm.value.est);
    }
    console.log("OUTPUT EDITED EST:", pomodoroEditForm.value.est);

  }

  deletePomodoro(item: Pomodoro) {

    let index = this.pomodoroService.getIndex(item);
    this.pomodoros.splice(index, 1);
    if(this.isDone == false){
     
      this.estEvent.emit(item.est);
    }
    console.log("est count delete:", item.est);
    console.log("delete pomodoro:", item);
    console.log("after deleting pomodoro", this.pomodoros);
  }

  // decreaseEst(est:number){
  //   est > 0 ? est = Number(est)-1: est;
  //   console.log("DECREASE EST:", est);
  // }

  // increaseEst(est:number){
  //   est < 100 ? est = Number(est) + 1: est;
  //   console.log("INCREASE EST:", est);
  //}

}






//-------------------------------------------------
// ngOnInit() {

  //   this.pomodoroService.getPomodoros()
  //     .subscribe(
         
  //       (data: Pomodoro[]) => this.pomodoros = data,
  //       (err: any) => console.log(err),
  //       () => console.log('All done getting pomodoros')
  //     )

  //   //this.pomodoros = this.pomodoroService.getPomodoros();
  
  // }