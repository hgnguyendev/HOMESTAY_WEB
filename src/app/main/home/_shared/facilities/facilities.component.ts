import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-facilities',
  standalone: false,
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.scss'
})
export class Facilities {
  @Input() amenities: any = [];

  getAmenityInfo(name: string) {
    switch (name) {
      case 'wifi':
        return { name: 'Wifi', icon: 'bi bi-wifi' };
      case 'airConditioner':
        return { name: 'Điều hoà', icon: 'bi-snow' };
      case 'tv':
        return { name: 'TV', icon: 'bi-tv' };
      case 'kitchen':
        return { name: 'Bếp', icon: 'bi-cup-hot' };
      case 'washingMachine':
        return { name: 'Máy giặt', icon: 'bi-droplet' };
      case 'parking':
        return { name: 'Chỗ đậu xe', icon: 'bi-car-front' };
      case 'balcony':
        return { name: 'Ban công', icon: 'bi-house' };
      case 'hotWater':
        return { name: 'Nước nóng', icon: 'bi-droplet-fill' };
      default:
        return { name: '', icon: '' };
    }
  }

}
