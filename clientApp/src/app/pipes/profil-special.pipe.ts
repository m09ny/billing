import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profilSpecial'
})
export class ProfilSpecialPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 'profilSpecial') {
      return 'profil Special';
    }
  }

}
