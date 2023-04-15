import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dtpl';
  currentField: string = '';

  showContent(field: string): void {
    this.currentField = field;
  }
}
