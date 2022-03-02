import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.less'],
})
export class PhotoComponent {
  @Input() url = '';
  @Input() description = '';
}
