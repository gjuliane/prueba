import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class HelpersPipe implements PipeTransform {

  transform(value: string): string {
    if (value == 'f') {
      return 'Femenino'
    }
    if (value == 'm') {
      return 'Masculino'
    }
    return '';
  }

}
