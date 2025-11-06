import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, NgZone, Output, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../_services/users.service';
import { OtpForgotService } from '../../_services/otp-forgot-password.service';

@Component({
  selector: 'app-opt',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './opt.html',
  styleUrl: './opt.scss'
})
export class Opt {
  otpArray: string[] = new Array(6).fill('');
  @Input() dataRegister: any;
  @Input() dataOtpForget: any;
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  timeLeft: number = 60;
  interval: any;
  otpExpired: boolean = false;
  hiddenResend: boolean = false

  constructor(
    private ngZone: NgZone,
    private _userService: UserService,
    private _checkOtpForgotPassword: OtpForgotService

  ) { }

  openModal() {
    this.startTimer();
  }

  startTimer() {
    this.timeLeft = 60;
    this.otpExpired = false;
    clearInterval(this.interval);
    this.ngZone.run(() => {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.otpExpired = true;
          clearInterval(this.interval);
        }
      }, 1000);
    });
  }

  otpForm = new FormGroup({
    otp0: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    otp1: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    otp2: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    otp3: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    otp4: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    otp5: new FormControl('', [Validators.required, Validators.pattern('[0-9]')])
  });

  moveNext(event: any, index: number) {
    const inputLength = event.target.value.length;
    if (inputLength === 1 && index < 5) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    } else if (inputLength === 0 && index > 0) {
      this.otpInputs.get(index - 1)?.nativeElement.focus();
    }
  }

  async onSubmit() {
    if (this.otpForm.valid) {
      // await this._userService.createUserFirebase(this.dataRegister.email, this.dataRegister.password);
      try {
        const otpCode = Object.values(this.otpForm.value).join('');
        const data = {
          _id: this.dataOtpForget._id,
          email: this.dataOtpForget.email,
          code: otpCode
        }
        const result = await this._checkOtpForgotPassword.checkOtp(data);
        await this._userService.sendPassWordReset(this.dataOtpForget.email);
      } catch (error: any) {
        alert('Otp không đúng')
      }

      this.resetOtpFields()
    }
  }

  handleRensendOtp() {
    if (this.timeLeft > 0) return;
    this.startTimer();
  }

  resendOtp() {
    this.startTimer();
  }

  resetOtpFields() {
    this.otpForm.reset()
    this.otpInputs.first?.nativeElement.focus()
  }

}
