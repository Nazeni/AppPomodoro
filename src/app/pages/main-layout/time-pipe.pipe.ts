import { Pipe, PipeTransform } from "@angular/core"

@Pipe({name: 'getTime'})

export class TimePipe implements PipeTransform{
 transform(value: number) {
        let hours: any = Math.floor(value / 60);
        let minutes: any = value - (hours * 60);
        hours < 10 ? hours = "0" + (+hours): hours;
        minutes < 10 ? minutes = "0" + (+minutes): minutes;
        return hours + ':' + minutes;
   }
}