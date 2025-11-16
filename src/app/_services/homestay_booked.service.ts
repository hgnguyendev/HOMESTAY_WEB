
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppConfig } from '../_configs/app-config';

@Injectable({
    providedIn: 'root'
})
export class HomestayBookedService {
    constructor(private _baseService: BaseService) { }

    createHomestayBooked(data: any) {
        return this._baseService.post(`${AppConfig.settings.apiEndpoint}/homestay-booking/create-booked`, data);
    }

    updateBookedPayment(txn_ref: string, data: any) {
        return this._baseService.put(`${AppConfig.settings.apiEndpoint}/homestay-booking/booked-payment/${txn_ref}`, data);
    }

    getHomestayBooked(homestay_id: string) {
        return this._baseService.get(`${AppConfig
            .settings.apiEndpoint}/homestay-booking/homestay-booked/${homestay_id}`);
    }


    getHomestayByUser(params: any) {
        return this._baseService.get(`${AppConfig.settings.apiEndpoint}/homestay-booking/homestay-booked-user`, { params });
    }

    deleteHomestayBooked(id: string) {
        return this._baseService.delete(`${AppConfig.settings.apiEndpoint}/homestay-booking/homestay-booked-user/${id}`);
    }

}
