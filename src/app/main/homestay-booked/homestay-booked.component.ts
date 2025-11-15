import { Component } from '@angular/core';
import { HomestayBookedService } from '../../_services/homestay_booked.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalDetailsInvoice } from './shared/modal-details-invoice/modal-details-invoice.component';

@Component({
  selector: 'app-homestay-booked',
  standalone: false,
  templateUrl: './homestay-booked.component.html',
  styleUrl: './homestay-booked.component.scss'
})
export class HomestayBooked {

  isActive: string = 'paid';
  listHomestayBooked: any;

  constructor(
    private _homestayBookedService: HomestayBookedService,
    private _nzModal: NzModalService
  ) { }

  ngOnInit() {
    this.getHomestayBookedByUser();
  }


  menuStatusHomestay = [
    { id: 2, name: 'Đã hoàn thành', type: 'paid' },
    { id: 3, name: 'Đã Huỷ', type: 'cancel' }
  ]

  async getHomestayBookedByUser() {
    try {
      const reponse = await this._homestayBookedService.getHomestayByUser();
      this.listHomestayBooked = reponse;
    } catch (error: any) {

    }
  }

  async handleChangeStatusHomestay(type: string) {
    try {
      this.isActive = type;
    } catch (error: any) {

    }
  }

  handlleDetailsInvoice(item: any) {
    this._nzModal.create({
      nzTitle: 'Thôn tin chi tiết hoá đơn thanh toán phòng của bạn',
      nzContent: ModalDetailsInvoice,
      nzFooter: null
    });
  }

}
