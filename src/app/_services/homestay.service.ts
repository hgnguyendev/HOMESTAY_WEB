
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppConfig } from '../_configs/app-config';

@Injectable({
    providedIn: 'root'
})
export class HomestayService {
    constructor(private _baseService: BaseService) { }

    getAllHomestay() {
        return this._baseService.get(`${AppConfig.settings.apiEndpoint}/homestay/get-homestay`);
    }

    searchHomestay(data: any) {
        return this._baseService.get(`${AppConfig.settings.apiEndpoint}/homestay/search-homestay`, { params: data });
    }

}
