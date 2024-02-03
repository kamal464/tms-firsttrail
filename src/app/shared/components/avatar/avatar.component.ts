import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  HostListener,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
// import { VfsService } from '../../services/vfs.service';
import { getRandomColor, isColorDark } from '../../utils/colors';
import { AvatarSelectionComponent } from '../avatar-selection/avatar-selection.component';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { headersFootersProperty } from '@syncfusion/ej2/documenteditor';
import { vfsApi,API_BASE_URL } from '../../api-config';
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit,OnChanges {
  @Input() size!: number;
  @Input() color!: string;
  @Input() text!: string;
  @Input() avatar!: number;
  @Input() avatarChangeTitle = 'Change avatar for employee';
  @Input() rounded = true;
  @Input() readonly = true;
  @Output() onChange = new EventEmitter<File>();

  avatarImage = null;
  avatarText: string;
  avatarStyle: object = {};
  avatarImgStyle: object = {};
  avatarHoldStyle: object = {};

  constructor(
    private dialog: MatDialog,
    private http:HttpClient,
    // private vfsService: VfsService,
    private sanitizer: DomSanitizer,
    private ref: ChangeDetectorRef
  ) {
    this.avatarText = 'ME';
  }

  ngOnInit() {
    console.log(this.avatar);
    const bgColor = this.color != null ? this.color : getRandomColor();
    const txtColor = isColorDark(bgColor) ? '#fff' : '#000';
    this.avatarText = this.text.substring(0, 2).toUpperCase();
    this.avatarStyle = {
      width: this.size + 'px',
      height: this.size + 'px',
      'font-size': this.size / 2 + 'px',
      'line-height': this.size + 'px',
      'border-radius': (this.rounded ? this.size : 0) + 'px',
      'background-color': bgColor,
      color: txtColor,
    };
    this.avatarImgStyle = {
      ...this.avatarStyle,
      'background-color': 'transparent',
    };
    this.avatarHoldStyle = {
      width: this.size + 3 + 'px',
      height: this.size + 5 + 'px',
    };
    if (this.avatar) this._fetchAvatar();
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.[avatar] && changes.avatar.currentValue) {
    //   this._fetchAvatar();
    // }
  }

  _fetchAvatar(): void {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'fkorgid')
      .set('filtervalue', '1');
  
    this.http.post(`${API_BASE_URL}/v1/vfs/getall`, {}, { headers }).subscribe(
      (file: any) => {
        console.log(file)
        if (file instanceof Blob) {
          const fileURL = window.URL.createObjectURL(file);
          this.avatarImage = this.sanitizer.bypassSecurityTrustStyle(
            `url(${fileURL})`
          );
          this.ref.markForCheck();
        } else {
          console.error('Invalid image data received from the server.');
          // Handle the error gracefully, e.g., display a default avatar.
        }
      },
      (error) => {
        console.error('Error fetching avatar:', error);
        // Handle errors here, e.g., display a default avatar.
      }
    );
  }

  @HostListener('click', ['$event'])
  _changeAvatar(event: any): void {
    if (this.readonly) return;
    event.stopPropagation();
    const dialogRef = this.dialog.open(AvatarSelectionComponent, {
      position: { top: '100px' },
      data: {
        is_rounded: this.rounded,
        title: this.avatarChangeTitle,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onChange.emit(result);
      }
    });
  }
}
