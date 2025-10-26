import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-homestay',
  standalone: false,
  templateUrl: './card-homestay.component.html',
  styleUrl: './card-homestay.component.scss'
})
export class CardHomestay {
  @Input() ItemHomestay: any;
  @Output() emitDetailsDataHomestay = new EventEmitter<void>();


  handleDetails(item: any) {
    this.emitDetailsDataHomestay.emit(item);
  }
}
