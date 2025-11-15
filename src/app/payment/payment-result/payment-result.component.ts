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
  resultPayment: string = '';


  //p_PayDate=20251115235824&vnp_ResponseCode=24&vnp_TmnCode=VE8VGB5T&vnp_TransactionNo=0&vnp_TransactionStatus=02&vnp_TxnRef=460929d8-21ea-4685-944f-a42d467c75b7&vnp_SecureHash=60cfe8f8362fb35ce4377e6791958722d216851c555cf7cfee18de959463261e9acad7cf82bc5ea50a3204edeeadf28a318a696060c1149f915b6d3bb3807acf

  //http://localhost:4200/payment-result?vnp_Amount=200032900&vnp_BankCode=NCB&vnp_BankTranNo=VNP15263735&vnp_CardType=ATM&vnp_OrderInfo=69072f0a98d615e5136fba5e&vnp_PayDate=20251116000149&vnp_ResponseCode=00&vnp_TmnCode=VE8VGB5T&vnp_TransactionNo=15263735&vnp_TransactionStatus=00&vnp_TxnRef=33fced49-c917-4fa0-bca3-78316598c8c8&vnp_SecureHash=fe1aecf8ad1dac4f3b20ebec04191f80bf4c87253bf54d661e1b72492b07af2f2c8394260c0811c56c8c6d355164ef6989b140318ca8c6497e727083e08f7247

  //http://localhost:4200/payment-result?vnp_Amount=1000000&vnp_BankCode=VNPAY&vnp_CardType=QRCODE&vnp_OrderInfo=68fe537c5f38a02753317217&vnp_PayDate=20251116000620&vnp_ResponseCode=24&vnp_TmnCode=VE8VGB5T&vnp_TransactionNo=0&vnp_TransactionStatus=02&vnp_TxnRef=7c3f4cbd-8981-4cfb-974c-7269b875cf91&vnp_SecureHash=77f68a59f5e97b8b7684de24dd0a66b8a516cef0d794db4b20f316b3e48a30ded7c1416e05098b653ccd02ea8c230cae04d68b8ab2afbf94e9620278ef0e108c

  constructor(private route: ActivatedRoute, private router: Router, private _homestayBooked: HomestayBookedService) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.txnRef = params['vnp_TxnRef'];
      this.amount = params['vnp_Amount'] ? +params['vnp_Amount'] / 100 : null;
      this.bankCode = params['vnp_BankCode'] || null;
      this.success = params['vnp_ResponseCode'] === '00';
      this.homestay_id = params['vnp_OrderInfo']
      this.resultPayment = params['vnp_TransactionNo']
    });
    if (!this.resultPayment || this.resultPayment === "0") {
      console.log("Giao dịch thất bại hoặc bằng 0 → Không gọi API");
      return;
    }
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


