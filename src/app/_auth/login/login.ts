import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalService } from '../../_services/swal.service';
import { UserService } from '../../_services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  @Output() emitRegister = new EventEmitter<void>();
  loginForm: FormGroup;
  hidePassword = true;
  rememberMe = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private swalService: SwalService,
    private _userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      console.log('Login form submitted:', this.loginForm.value);

      // Giả lập API call
      setTimeout(() => {
        this.isLoading = false;
        // Chuyển hướng sau khi đăng nhập thành công
        this.router.navigate(['/dashboard']);
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  loginWithSocial(provider: string): void {
    console.log(`Login with ${provider}`);
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    }, 1500);
  }

  forgotPassword(): void {
    console.log('Forgot password clicked');
    // Chuyển hướng đến trang quên mật khẩu
    this.router.navigate(['/forgot-password']);
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  handleRegister() {
    this.emitRegister.emit();
  }

  async handleLogin() {
    const { email, password } = this.loginForm.value
    try {
      await this._userService.loginWithEmail(email, password);
      await this._userService.getUserInfo();
      console.log(123);
      this.router.navigateByUrl('')
    } catch (error: any) {
      this.swalService.error('Đăng nhập thất bại vui lòng thử lại');
    }
  }

}
