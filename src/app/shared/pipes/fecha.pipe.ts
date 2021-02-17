import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {
  transform(fecha: string): string {
    if ( !fecha) {
      return '';
    }
    let fechaActual=fecha.substring(0,10);
    console.log(fecha);
    let fechadia=fechaActual.substring(8,10)
    let fechaMes=fechaActual.substring(5,7)
    let fechaAnio=fechaActual.substring(0,4)
    return fechadia+'/'+fechaMes+'/'+fechaAnio
  }
}