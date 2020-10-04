import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderStatus = new BehaviorSubject<boolean>(false);

  checkLoader = this.loaderStatus.asObservable();

  constructor() { }

  updateStatus(value: boolean) {
    this.loaderStatus.next(value);
  }
}
