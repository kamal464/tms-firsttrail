import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  @Input() title = '';
  @Input() hasDelete = true;
  @Input() hasNew = false;
  @Input() hasEdit = true;
  @Input() hasPop = true;
  @Input() hasDate = true;
  @Input() hasActive = false;
  @Input() noTransform = false;
  @Input() active = true;
  @Input() currentAction = 'view';
  @Output() onAction = new EventEmitter<any>();
  @Output() onEdit  = new EventEmitter<any>();
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  constructor(private ref: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.refreshView();
    console.log(this.currentAction,"present currentAction")
  }

  saveData() {
    // Emit the onSave event to notify the parent component
    this.onSave.emit();
  }
  ngOnInit(): void {}

    _doAction(action): void {
      console.log(action)
      this.onAction.emit(action);
    }
    _editIndex():void {
      console.log('editindex')
      this.onEdit.emit()
    }

  refreshView(): void {
    setTimeout(() => {
      this.ref.markForCheck();
    }, 200);
  }
}
