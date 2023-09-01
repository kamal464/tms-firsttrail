import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TabbedItem } from './components/dynamic-tab/dynamic-tab.component';
@Injectable({
  providedIn: 'root'
})
export class TabeventserviceService {

  tabEventSubject = new Subject<TabbedItem>();
  private removeTabSubject = new Subject<number>();

  removeTab$ = this.removeTabSubject.asObservable();
 
  openOrAddTab(item: TabbedItem) {
    console.log(item,'tabeventservice');
    this.tabEventSubject.next(item);
  }
  
  triggerRemoveTab(index :any){
    this.removeTabSubject.next(index);
  }

}
