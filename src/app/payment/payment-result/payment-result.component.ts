import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-result',
  standalone: false,
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss']
})
export class PaymentResult implements OnInit{
  success = false;
  txnRef: string | null = null;
  amount: number | null = null;
  bankCode: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.txnRef = params['vnp_TxnRef'];
      this.amount = params['vnp_Amount'] ? +params['vnp_Amount'] / 100 : null;
      this.bankCode = params['vnp_BankCode'] || null;
      this.success = params['vnp_ResponseCode'] === '00';
    });
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


