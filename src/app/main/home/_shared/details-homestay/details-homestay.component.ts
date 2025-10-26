import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwalService } from '../../../../_services/swal.service';
import { UserService } from '../../../../_services/users.service';
import { HomestayBookedService } from '../../../../_services/homestay_booked.service';

@Component({
  selector: 'app-details-homestay',
  standalone: false,
  templateUrl: './details-homestay.component.html',
  styleUrl: './details-homestay.component.scss'
})
export class DetailsHomestay {
  @Input() dataDetails: any;
  checkInDate: string = '';
  checkOutDate: string = '';
  totalPrice: number = 0
  guests: number = 1;
  nights: number = 0
  user_name: string = '';
  user_email: string = '';
  user_phone: string = '';

  @Output() emitCloseDetails = new EventEmitter<null>();


  constructor(
    private _swalService: SwalService,
    private _userService: UserService,
    private _homestayBookedService: HomestayBookedService
  ) { }

  totalNights(): number {
    if (!this.checkInDate || !this.checkOutDate) return 0;
    console.log(this.checkInDate, this.checkOutDate)

    const start = new Date(this.checkInDate);
    const end = new Date(this.checkOutDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    return diffDays > 0 ? diffDays : 0;
  }

  updateTotalPrice() {
    const nights = this.totalNights();
    this.nights = nights;
    this.totalPrice = nights * this.dataDetails.price;
  }

  getTotalPrice(): number {
    const nights = this.totalNights();
    return nights > 0 ? nights * this.dataDetails.price : this.dataDetails.price;
  }




  selectedImage: string = '';

  activeTab = 'overview';

  menuTab = [
    { id: 1, name: 'Tổng quan', type: 'overview' },
    { id: 2, name: 'Tiện nghi', type: 'facilities' },
  ]

  ngOnInit() {
    this._userService.currentUser$.subscribe((user) => {
      this.user_name = user.name;
      this.user_email = user.email;
      this.user_phone = user.phone;
    })
    if (this.dataDetails?.images?.length > 0) {
      this.selectedImage = this.dataDetails.images[0];
    }
  }

  async handleBookingHomestay() {
    try {
      const payload = {
        homestay_id: this.dataDetails._id,
        roomName: this.dataDetails.roomName,
        check_in_date: new Date(this.checkInDate),
        check_out_date: new Date(this.checkOutDate),
        total_price: this.totalPrice,
        total_customer: this.guests
      }

      await this._homestayBookedService.createHomestayBooked(payload);
      this._swalService.success('Đặt phòng thành công');
    } catch (error: any) {
      this._swalService.error('Đặt phòng homestay chưa thành công');
    }
  }

  handleCloseDetails() {
     this.emitCloseDetails.emit(null);
  }




}
