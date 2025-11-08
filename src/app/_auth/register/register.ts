import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SwalService } from '../../_services/swal.service';
import { OtpService } from '../../_services/otp.service';
import { UserService } from '../../_services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  @Output() emitLogin = new EventEmitter<void>();
  @Output() emitOtp = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private _swalService: SwalService,
    private _otpService: OtpService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form submitted:', this.registerForm.value);
      // Xử lý đăng ký ở đây
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.markAsTouched();
    });
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get phone() { return this.registerForm.get('phone'); }
  get address() { return this.registerForm.get('address') }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get acceptTerms() { return this.registerForm.get('acceptTerms'); }

  handleLogin() {
    this.emitLogin.emit();
  }

  async handleOtp() {
    if (this.registerForm.valid) {
      this.markFormGroupTouched();
    }
    const emailValue = this.email?.value;
    const passwordValue = this.password?.value;
    const dataemit = {
      name: this.firstName,
      email: this.email,
      password: this.password,
      address: this.address,
      phone: this.phone,
      step: 'otp-register'
    }
    try {
      const data = {
        email: this.email?.value
      };
      await this._otpService.createOtp(data);
      this._swalService.success(`Chúng tôi đã gửi mã OTP đến Email ${this.email}`);
      this.emitOtp.emit(dataemit);
    } catch (error: any) {
    }
  }

}
