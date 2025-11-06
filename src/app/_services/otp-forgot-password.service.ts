
import { Injectable } from '@angular/core';
import { BaseService } from "./base.service";
import { AppConfig } from '../_configs/app-config';

@Injectable({
    providedIn: 'root'
})
export class OtpForgotService {

    constructor(private _baseService: BaseService) { }

    async RenderOtpForgotPassword(data: any) {
        return this._baseService.post(`${AppConfig.settings.apiEndpoint}/otp-forgot-password/render-otp`, data);
    }

    async checkOtp(data: any) {
        return this._baseService.post(`${AppConfig.settings.apiEndpoint}/otp-forgot-password/check-otp`, data);
    }

}
