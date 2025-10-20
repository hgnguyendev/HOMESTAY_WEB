import { Component } from "@angular/core";

@Component({
    standalone: false,
    templateUrl: 'auth.component.html'
})

export class AuthComponent {
    step: 'login' | 'register' | 'otp' = 'login';
    dataRegister: { email: string, password: string } = {
        email: '',
        password: ''
    };

    images = [
        { id: 1, img: '../../assets/image/homestay1.jpeg' },
        { id: 2, img: '../../assets/image/homestay2.jpeg' },
        { id: 3, img: '../../assets/image/homestay3.jpeg' }
    ]
    currentIndex = 0;
    intervalId: any;

    ngOnInit() {
        this.startAutoSlide();
    }

    ngOnDestroy() {
        this.stopAutoSlide();
    }

    startAutoSlide() {
        this.intervalId = setInterval(() => {
            this.next();
        }, 3000);  // chuyển ảnh mỗi 3 giây
    }

    stopAutoSlide() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    next() {
        if (this.images && this.images.length > 0) {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        }
    }

    goToRegister() {
        this.step = 'register';
    }
    goToLogin() {
        this.step = 'login';
    }
    goToOtp(data?: any) {
        this.step = 'otp';
        this.dataRegister = { email: data.email.value, password: data.password.value };
    }

}