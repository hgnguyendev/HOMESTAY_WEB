import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ɵInternalFormsSharedModule, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpForgotService } from '../../_services/otp-forgot-password.service';
import { LoadingPage } from "../../_shared/components/loading-page/loading-page";

@Component({
  selector: 'app-forgot-password',
  imports: [ɵInternalFormsSharedModule, FormsModule, ReactiveFormsModule, CommonModule, LoadingPage],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {
  form!: FormGroup

  @Output() emitNavigatorLogin = new EventEmitter<any>();
  @Output() emitOtp = new EventEmitter<any>();
  @Output() emitDataOtp = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private _otpForgotPasswordService: OtpForgotService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  handleNavigatoLogin() {
    this.emitNavigatorLogin.emit('login');
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    try {
      const data = {
        email: this.form.get('email')?.value
      }
      const result = await this._otpForgotPasswordService.RenderOtpForgotPassword(data);
      console.log("result otp", result);
      this.emitDataOtp.emit(result);
      this.emitOtp.emit('otp');
    } catch (error: any) {

    }
  }

}
