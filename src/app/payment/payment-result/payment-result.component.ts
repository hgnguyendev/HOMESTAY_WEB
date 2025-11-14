import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomestayBookedService } from '../../_services/homestay_booked.service';
import { CommentsService } from '../../_services/comments.service';

@Component({
  selector: 'app-payment-result',
  standalone: false,
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss']
})
export class PaymentResult implements OnInit {
  success = false;
  txnRef: string = '';
  amount: number | null = null;
  bankCode: string | null = null;
  homestay_id: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private _homestayBooked: HomestayBookedService) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.txnRef = params['vnp_TxnRef'];
      this.amount = params['vnp_Amount'] ? +params['vnp_Amount'] / 100 : null;
      this.bankCode = params['vnp_BankCode'] || null;
      this.success = params['vnp_ResponseCode'] === '00';
      this.homestay_id = params['vnp_OrderInfo']
    });
    console.log("homestay_id")
    const data = {
      _id: this.homestay_id
    }
    await this._homestayBooked.updateBookedPayment(this.txnRef, data);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  viewOrder() {
    if (this.txnRef) {
      this.router.navigate(['/order', this.txnRef]);
    } else {
      this.goHome();
    }
  }

}


