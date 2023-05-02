import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private valueSubject = new BehaviorSubject<any>('')
  constructor() { }
  setValue(value: any) {
    this.valueSubject.next(value);
  }

  getValue() {
    return this.valueSubject.asObservable();
  }
}
