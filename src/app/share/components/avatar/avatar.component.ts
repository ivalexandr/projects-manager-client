import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() imgSource: string = '';
  @Input() name: string = '';

  get base64ForImage() {
    return this.imgSource;
  }

  get linkForImage() {
    return `${environment.uploadApi}/${this.imgSource}`;
  }

  get linkOrBase64() {
    if (this.imgSource.includes('base64')) {
      return this.base64ForImage;
    }
    return this.linkForImage;
  }
}
