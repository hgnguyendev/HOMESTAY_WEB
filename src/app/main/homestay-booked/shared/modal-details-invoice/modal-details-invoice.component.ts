import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-modal-details-invoice',
  standalone: false,
  templateUrl: './modal-details-invoice.component.html',
})
export class ModalDetailsInvoice {

  detailsPayment: any;

  constructor(
    @Inject(NZ_MODAL_DATA) public data: any,
    private _nzModalRef: NzModalRef,
    private _router: Router
  ) {
    this.detailsPayment = data.details;
  }

  handleHome() {
    this._nzModalRef.close();
    this._router.navigate(['/']);
  }

}
