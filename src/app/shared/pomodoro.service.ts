import { Injectable } from '@angular/core';
import { Pomodoro } from '../pages/pomodoro-card/pomodoro.model';

@Injectable({
  providedIn: 'root'
})

export class PomodoroService {

  pomodoros: Pomodoro[] = new Array();

  constructor() {}
  
  getPomodoros() {
    
    return this.pomodoros;
  }

  getIndex(pomodoro:Pomodoro){
    return this.pomodoros.indexOf(pomodoro);
  }

  addPomodoros(newPomodoro: Pomodoro) {

    this.pomodoros.push(newPomodoro);
    let index = this.pomodoros.length - 1;
    
    return index;

  }

  deletePomodoro(id:number){
    this.pomodoros.splice(id, 1);
  }

  clearPomodoros(x: Pomodoro[]){
    let question = confirm(`Are you sure you want to delete all tasks??`) 
                   
    if(question === true){
      x = x.splice(0, x.length);
    }
  }

  clearIsDone(x: Pomodoro[]){
    
    x = x.filter(item => item.isDone === false); 
    return x; 
  }

  update(item: Pomodoro, title: string, est: number, note: string){
    let index = this.getIndex(item)
    let pomodoro = this.pomodoros[index];
    pomodoro.title = title;
    pomodoro.est = est;
    pomodoro.note = note;
    return pomodoro;
  }
}



// -------------------------------------------------------------

 // getPomodoros(): Observable<Pomodoro[]> {
    
  //   console.log("Getting all pomodoros from the server")
  //   return this.http.get<Pomodoro[]>('/api')
  //     .pipe(catchError(this.handleError<Pomodoro[]>('getPomodoros', [])))
  //   //return this.pomodoros;
   
  // }
  // private handleError<T>(operation = 'operation', result?: T){

  //   return (error:any): Observable<T> => {
  //       console.error(error);
  //       return of(result as T)
  //   }
  // }

  // addPomodoros(newPomodoro: Pomodoro): Observable<Pomodoro> {

  //   this.pomodoros.push(newPomodoro)
  //   return this.http.post<Pomodoro>('/api', newPomodoro, {
  //     headers: new HttpHeaders({
  //       'Content-type': 'application/json'
  //     })
  //   })
    
  //   //this.pomodoros.push(newPomodoro)
  //   // let index = this.pomodoros.length - 1
    
  //   // return index;


  // }

 