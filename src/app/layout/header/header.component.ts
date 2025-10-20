import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class Header {

  constructor(private router: Router) { }

  navigator = [
    { id: 1, name: 'Trang chủ', url: 'home', isActive: false },
    { id: 2, name: 'Homestay', url: 'homestay', isActive: false },
    { id: 3, name: 'Dịch vụ', url: 'service', isActive: false },
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
}
