import { Component, OnInit ,  Input,
  Output,
  EventEmitter,ChangeDetectorRef,  SimpleChanges,} from '@angular/core';

@Component({
  selector: 'tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
 
})
export class ToolBarComponent implements OnInit {
  @Input() title = '';
  @Input() hasDelete = false;
  @Input() hasNew = false;  
  @Input() hasEdit = true;
  @Input() noTransform = false;
  @Input() currentAction = 'view';
  @Output() onAction = new EventEmitter<any>();


  constructor(private ref: ChangeDetectorRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.refreshView();
  }
  ngOnInit(): void {
  }
   
  _doAction(action): void {
    this.onAction.emit(action);
  }

  refreshView(): void {
    setTimeout(() => {
      this.ref.markForCheck();
    }, 200);
  }
}
