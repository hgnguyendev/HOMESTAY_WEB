import { Component } from '@angular/core';
import { HomestayBookedService } from '../../_services/homestay_booked.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalDetailsInvoice } from './shared/modal-details-invoice/modal-details-invoice.component';
import { SwalService } from '../../_services/swal.service';

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
    private _nzModal: NzModalService,
    private _swalService: SwalService
  ) { }

  ngOnInit() {
    this.getHomestayBookedByUser();
  }


  menuStatusHomestay = [
    { id: 2, name: 'Đã hoàn thành', type: 'paid' },
    { id: 3, name: 'Đã Huỷ', type: 'cancel' }
  ]

  filters: any = {
    status: this.isActive
  }

  async getHomestayBookedByUser() {
    try {
      const reponse = await this._homestayBookedService.getHomestayByUser(this.filters);
      this.listHomestayBooked = reponse;
    } catch (error: any) {

    }
  }

  async handleChangeStatusHomestay(type: string) {
    try {
      this.isActive = type;
      this.filters.status = type;
      this.getHomestayBookedByUser();
    } catch (error: any) {

    }
  }

  handlleDetailsInvoice(item: any) {
    this._nzModal.create({
      nzTitle: 'Thông tin chi tiết hoá đơn thanh toán phòng của bạn',
      nzWidth: '900px',
      nzCentered: true,
      nzBodyStyle: {
        'max-height': '700px',
        'overflow-y': 'auto'
      },
      nzData: {
        details: item
      },
      nzContent: ModalDetailsInvoice,
      nzFooter: null
    });
  }

  async handleDeleteHomestayBooked(id: string) {
    const confirm = await this._swalService.warning('Bạn có muốn xoá lịch sử thanh toán này không');
    if (!confirm) {
      return;
    }
    try {
      await this._homestayBookedService.deleteHomestayBooked(id);
      this._swalService.success('Xoá lịch sử homestay đã đặt thành công');
      this.getHomestayBookedByUser();
    } catch (error: any) {
      this._swalService.error('Xoá lịch sử homestay đã đặt chưa thành công');
    }
  }

}
