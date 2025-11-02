
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppConfig } from '../_configs/app-config';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    constructor(private _baseService: BaseService) { }

    createPayment(data: any) {
        return this._baseService.post(`${AppConfig.settings.apiEndpoint}/payment/create-payment`, data);
    }

}
