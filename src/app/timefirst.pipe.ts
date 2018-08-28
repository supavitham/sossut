import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timefirst'
})
export class TimefirstPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
