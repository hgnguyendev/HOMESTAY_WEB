
import { Injectable } from '@angular/core';
import { BaseService } from "./base.service";
import { AppConfig } from '../_configs/app-config';

@Injectable({
    providedIn: 'root'
})
export class OtpService {

    constructor(private _baseService: BaseService) { }

    async createOtp(data: any) {
        console.log("data", data)
        return await this._baseService.post(`${AppConfig.settings.apiEndpoint}/otp/create-otp`, data);
    }

    async checkOtp(data: any) {
        return this._baseService.post(`${AppConfig.settings.apiEndpoint}/otp/check-otp`, data);
    }

}
