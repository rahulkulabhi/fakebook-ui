import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Pipe({
  name: 'contentWrap'
})
export class ContentWrapPipe implements PipeTransform {

  constructor(private router: Router) {}

  transform(value: string, count: number = 20): unknown {
    // console.log(value);
    return value.length > count ? `${value.substring(0, count)}...` : value;
  }

}
