import { Component, Input } from '@angular/core';

@Component({
  selector: 'list-service-introduction',
  standalone: false,
  templateUrl: './list-service-introduction.component.html',
})
export class ListServiceIntroduction {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}
