import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-homestay',
  standalone: false,
  templateUrl: './card-homestay.component.html',
  styleUrl: './card-homestay.component.scss'
})
export class CardHomestay {
  @Input() ItemHomestay: any; 

}
