
import { Injectable } from '@angular/core';
import { BaseService } from "./base.service";
import { AppConfig } from '../_configs/app-config';

@Injectable({
    providedIn: 'root'
})
export class CommentsService {

    constructor(private _baseService: BaseService) { }

    getComments(room_id: string) {
        return this._baseService.get(`${AppConfig.settings.apiEndpoint}/comments/get-comment/${room_id}`);
    }

    sendComments(data: any) {
        return this._baseService.post(`${AppConfig.settings.apiEndpoint}/comments/create-comments`, data);
    }

}
