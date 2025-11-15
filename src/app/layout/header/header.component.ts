import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/users.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalInfor } from './components/modal-infor/modal-infor.component';


@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class Header {

  constructor(private router: Router, private _userService: UserService, private _nzModal: NzModalService) { }

  navigator = [
    { id: 1, name: 'Trang chủ', url: 'home', isActive: false },
    { id: 2, name: 'Homestay', url: 'homestay', isActive: false },
    { id: 3, name: ' Homestay đã đặt', url: 'booked', isActive: false },
    { id: 4, name: 'Liên hệ', url: 'contact', isActive: false }
  ];

  isActiveRoute(url: string) {
    this.router.url.startsWith(url);
  }

  handleNavigator(url: string) {
    this.navigator = this.navigator.map((item) => ({
      ...item,
      isActive: item.url === url,
    }));
    this.router.navigate([`${url}`]).then();
  }

  handleInfo() {
    const modalRef = this._nzModal.create({
      nzWidth: '800px',
      nzTitle: 'Thông tin của bạn',
      nzContent: ModalInfor,
      nzFooter: null
    })
  }

  async handleLogout() {
    try {
      await this._userService.logout();
      this.router.navigateByUrl('/auth').then();
    } catch (error: any) {
      alert('Đăng xuất thất bại');
    }
  }
}
