import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ImageTransform,
  ImageCroppedEvent,
  base64ToFile,
  Dimensions,
} from 'ngx-image-cropper';

export interface AvatarSelectionData {
  is_rounded: boolean;
  title: string;
}

@Component({
  selector: 'app-avatar-selection',
  templateUrl: './avatar-selection.component.html',
  styleUrls: ['./avatar-selection.component.scss']
})
export class AvatarSelectionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AvatarSelectionData,
    private ref: ChangeDetectorRef
  ) {}

  error_text: string;
  dragAreaClass: string;
  uploadedFileName = '';
  croppedFile: any = '';
  imageDroppedFile = null;
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  ngOnInit(): void {
    console.log(this.data)
    this.dragAreaClass = 'dropleft';
  }

  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = 'dropenter';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = 'dropenter';
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    this.dragAreaClass = 'dropleft';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = 'dropleft';
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event: any) {
    this.dragAreaClass = 'dropleft';
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      if (event.dataTransfer.files.length > 1) {
        this.error_text = 'Only one file at time allow';
      } else {
        this.error_text = '';
        this.loadImage(event.dataTransfer.files[0]);
      }
    }
  }

  loadImage(file): void {
    this.uploadedFileName = file.name.substr(0, file.name.lastIndexOf('.'));
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageDroppedFile = new Blob([e.target.result], {
        type: file.type,
      });
      this.ref.markForCheck();
    };
    reader.readAsArrayBuffer(file);
  }

  fileChangeEvent(event: any): void {
    this.loadImage(event.target.files[0]);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedFile = new File(
      [base64ToFile(event.base64)],
      this.uploadedFileName + '.png'
    );
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }
}
