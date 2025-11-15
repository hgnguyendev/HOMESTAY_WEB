import { Component } from '@angular/core';
import { HomestayBookedService } from '../../_services/homestay_booked.service';

@Component({
  selector: 'app-homestay-booked',
  standalone: false,
  templateUrl: './homestay-booked.component.html',
  styleUrl: './homestay-booked.component.scss'
})
export class HomestayBooked {

  isActive: string = 'upcoming';

  constructor(
    private _homestayBookedService: HomestayBookedService
  ) { }


  menuStatusHomestay = [
    { id: 1, name: 'Sắp tới', type: 'upcoming' },
    { id: 2, name: 'Đã hoàn thành', type: 'paid' },
    { id: 3, name: 'Đã Huỷ', type: 'cancel' }
  ]

  async getHomestayBookedByUser() {
    try {
      const reponse = await this._homestayBookedService.getHomestayByUser();
      console.log("response", reponse);
    } catch (error: any) {

    }
  }

  async handleChangeStatusHomestay(type: string) {
    try {
      this.isActive = type;
    } catch (error: any) {

    }
  }

}
