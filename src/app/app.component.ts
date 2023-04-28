import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dtpl';
  currentField: string = '';
  isSideNavEnabled = false;
  _selected_option = null;
  showContent(field: string): void {
    this.currentField = field;
  }
  toggleSideNavView() {
    this.isSideNavEnabled = !this.isSideNavEnabled;
  }



doAction(action: any): void {
 
  this._selected_option= action;
 
  }
  
}
