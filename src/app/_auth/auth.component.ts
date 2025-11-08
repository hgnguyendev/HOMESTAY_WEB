import { Component } from "@angular/core";
import { OtpForgotService } from "../_services/otp-forgot-password.service";
import { UserService } from "../_services/users.service";
import { SwalService } from "../_services/swal.service";
import { Router } from "@angular/router";
import { OtpService } from "../_services/otp.service";

@Component({
    standalone: false,
    templateUrl: 'auth.component.html'
})

export class AuthComponent {
    step: 'login' | 'register' | 'otp-forgotPassWord' | 'forgotPassword' | 'otp-register' = 'login';
    dataRegister: { email: string, password: string, phone: number, address: string, name: string } = {
        name: '',
        email: '',
        password: '',
        phone: 0,
        address: ''
    };
    dataOtp: any;

    images = [
        { id: 1, img: '../../assets/image/homestay1.jpeg' },
        { id: 2, img: '../../assets/image/homestay2.jpeg' },
        { id: 3, img: '../../assets/image/homestay-dep5.webp' }
    ]
    currentIndex = 0;
    intervalId: any;

    constructor(
        private _checkOtpForgotPassword: OtpForgotService,
        private _userService: UserService,
        private _swalService: SwalService,
        private _router: Router,
        private _optService: OtpService
    ) { }

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
        this.step = data.step;
        this.dataRegister = { email: data.email.value, password: data.password.value, phone: data.phone.value, address: data.address.value, name: data.name.value };
        console.log("register", data);
    }
    handleForgotPassword(item: any) {
        this.step = item;
        console.log("item pass word ", this.dataRegister)
    }

    async handleRegister(item: string) {
        if (!this.dataRegister?.email || !this.dataRegister?.password) {
            this._swalService.error('Vui lòng nhập đủ email và mật khẩu.');
            return;
        }

        try {
            const sendOtp = {
                otp: item,
                email: this.dataRegister.email
            };
            const resultOtp = await this._optService.checkOtp(sendOtp);

            const result = await this._userService.createUserFirebase(
                this.dataRegister.email,
                this.dataRegister.password
            );
            const dataUser = {
                _id: result.user?.uid || '',
                name: this.dataRegister.name,
                phone: this.dataRegister.phone,
                email: this.dataRegister.email,
                role: 'user'
            }
            await this._userService.createUser(dataUser);
            this._swalService.success('Đăng ký thành công!');
            this._router.navigate(['/auth']);
        } catch (error: any) {
            const errMsg = error?.message || 'Có lỗi xảy ra, vui lòng thử lại.';
            this._swalService.error(errMsg);
        }
    }

    async handleOtpForgotPassword(otpCode: number) {
        try {
            const data = {
                _id: this.dataOtp._id,
                email: this.dataOtp.email,
                code: otpCode
            }
            const result = await this._checkOtpForgotPassword.checkOtp(data);
            await this._userService.sendPassWordReset(this.dataOtp.email);
            this._swalService.success('Đã yêu cầu đổi mật khẩu thành công . Vui lòng kiểm tra Email nhập vào đường Link mật khẩu mới');
            this._router.navigate(['/auth']);

        } catch (error: any) {

        }
    }

}