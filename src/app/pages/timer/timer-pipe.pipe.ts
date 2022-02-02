import { Pipe, PipeTransform } from "@angular/core"

@Pipe({name: 'timer'})

export class TimerPipe implements PipeTransform{
 transform(value: number) {
      let minutes: any = Math.floor(value / 60);
      let seconds: any = (value - minutes * 60);
      minutes < 10 ? minutes = "0" + (+minutes): minutes;
      seconds < 10 ? seconds = "0" + (+seconds): minutes;
      return minutes + ':' + seconds;
   }
}