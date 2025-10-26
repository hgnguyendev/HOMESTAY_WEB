import { Component } from '@angular/core';
import { UserService } from '../../_services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class Home {

  bannerImages = [
    { id: 1, image: '../../../assets/image/banner3.png' },
    { id: 2, image: '../../../assets/image/banner4.jpg' },
    { id: 3, image: '../../../assets/image/homestay-dep5.webp' }
  ]
  searchData = {
    address: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    price: 0,
    limit: 10,
    skip: 0
  };

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  constructor(
    private _userService: UserService,
    private router: Router,
  ) { }



  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startSlideshow();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.searchData.checkIn = this.formatDate(today);
    this.searchData.checkOut = this.formatDate(tomorrow);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startSlideshow() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.bannerImages.length;
    }, 5000);
  }



  async handleLogout() {
    try {
      await this._userService.logout();
      this.router.navigate(['auth']);
    } catch (error: any) {
      console.log("Lỗi khi logout:", error);
    }
  }

  increaseGuests() {
    if (this.searchData.guests < 10) {
      this.searchData.guests++;
    }
  }

  decreaseGuests() {
    if (this.searchData.guests > 1) {
      this.searchData.guests--;
    }
  }

  get isSearchPage() {
    return this.router.url.includes('/home/search');
  }


  onSubmit() {
    if (!this.searchData.address) {
      alert('Vui lòng nhập địa điểm!');
      return;
    }

    // Xử lý tìm kiếm - có thể gọi service ở đây
    console.log('Search data:', this.searchData);
    this.router.navigate(['/home/search'], { queryParams: { q: JSON.stringify(this.searchData) } })

    // Hiển thị thông tin tìm kiếm
    alert(`Đang tìm kiếm:\n\nĐịa điểm: ${this.searchData.address}\nNgày nhận: ${this.searchData.checkIn}\nNgày trả: ${this.searchData.checkOut}\nSố khách: ${this.searchData.guests}`);
  }

}
