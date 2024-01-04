import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-working-day-add',
  templateUrl: './working-day-add.component.html',
  styleUrls: ['./working-day-add.component.scss']
})
export class WorkingDayAddComponent implements OnInit {

  @Input() _currentAction = 'new';
  @Output() onAction = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  doAction(action): void {
    this._currentAction = action;
    console.log(action)
      switch (action) {
        case 'delete':
          break;
        case 'edit':
          this._currentAction = action;
          break;
        case 'save':
          this._currentAction = 'view';
          
          break;
        case 'cancel':
          this._currentAction = 'view';
          this.onAction.emit(action);
          break;
        default:
      }
    
    }}

