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

  showContent(field: string): void {
    this.currentField = field;
  }
  toggleSideNavView() {
    this.isSideNavEnabled = !this.isSideNavEnabled;
  }
}
